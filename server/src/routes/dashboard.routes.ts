import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Show current stock for all products
router.get("/reports/stock-summary", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        stockTransactions: true,
      },
      orderBy: {
        Name: "asc",
      },
    });

    const stockSummary = products.map((product) => {
      const netMovement = product.stockTransactions.reduce((sum, tx) => {
        return tx.Transaction_Type === "IN"
          ? sum + tx.Quantity
          : sum - tx.Quantity;
      }, 0);

      const currentStock = product.Initial_Stock + netMovement;

      return {
        Product_ID: product.Product_ID,
        Name: product.Name,
        Category: product.Category,
        Current_Stock: currentStock,
        Purchase_Price: product.Purchase_Price,
        Selling_Price: product.Selling_Price,
      };
    });

    res.status(200).json({ success: true, data: stockSummary });
  } catch (error) {
    console.error("Error fetching stock summary:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stock summary" });
  }
});

// Aggregated purchase totals by month
router.get("/reports/purchase-summary", async (req: Request, res: Response) => {
  try {
    // Fetch all orders for the current year
    const purchaseSummary = await prisma.purchase_Order.findMany({
      where: {
        Order_Date: {
          gte: new Date(new Date().getFullYear(), 0, 1), // Start of current year
        },
      },
      select: {
        Order_Date: true,
        Total_Amount: true,
      },
    });

    // Group the data by month and year
    const monthlySummary: { [key: string]: number } = {};

    purchaseSummary.forEach((order) => {
      const yearMonth = `${order.Order_Date.getFullYear()}-${String(order.Order_Date.getMonth() + 1).padStart(2, "0")}`;
      if (monthlySummary[yearMonth]) {
        monthlySummary[yearMonth] += order.Total_Amount.toNumber();
      } else {
        monthlySummary[yearMonth] = order.Total_Amount.toNumber();
      }
    });

    // Convert the summary into an array of objects
    const formattedSummary = Object.entries(monthlySummary).map(([month, totalAmount]) => ({
      month,
      totalAmount,
    }));

    res.status(200).json({ success: true, data: formattedSummary });
  } catch (error) {
    console.error("Error fetching purchase summary:", error);
    res.status(500).json({ success: false, message: "Failed to fetch purchase summary" });
  }
});  

// Aggregated sales totals by month
router.get("/reports/sales-summary", async (req: Request, res: Response) => {
  try {
    // Fetch all sales orders for the current year
    const salesSummary = await prisma.sales_Order.findMany({
      where: {
        Order_Date: {
          gte: new Date(new Date().getFullYear(), 0, 1), // Start of current year
        },
      },
      select: {
        Order_Date: true,
        Total_Amount: true,
      },
    });

    // Group the data by month and year
    const monthlySummary: { [key: string]: number } = {};

    salesSummary.forEach((order) => {
      const yearMonth = `${order.Order_Date.getFullYear()}-${String(order.Order_Date.getMonth() + 1).padStart(2, "0")}`;
      if (monthlySummary[yearMonth]) {
        monthlySummary[yearMonth] += order.Total_Amount.toNumber();
      } else {
        monthlySummary[yearMonth] = order.Total_Amount.toNumber();
      }
    });

    // Convert the summary into an array of objects
    const formattedSummary = Object.entries(monthlySummary).map(([month, totalAmount]) => ({
      month,
      totalAmount,
    }));

    res.status(200).json({ success: true, data: formattedSummary });
  } catch (error) {
    console.error("Error fetching sales summary:", error);
    res.status(500).json({ success: false, message: "Failed to fetch sales summary" });
  }
});


// Total purchases by supplier
router.get("/reports/supplier-performance", async (req: Request, res: Response) => {
  try {
    // First, get the grouped data by supplier ID
    const summary = await prisma.purchase_Order.groupBy({
      by: ["Supplier_ID"],
      _sum: {
        Total_Amount: true,
      },
    });

    // Extract all supplier IDs to fetch related supplier information
    const supplierIds = summary.map((entry: any) => entry.Supplier_ID);

    // Now, fetch the suppliers
    const suppliers = await prisma.supplier.findMany({
      where: {
        Supplier_ID: { in: supplierIds },
      },
      select: {
        Supplier_ID: true,
        Name: true,
      },
    });

    // Map the summary with supplier names
    const result = summary.map((entry: any) => {
      const supplier = suppliers.find((s: any) => s.Supplier_ID === entry.Supplier_ID);
      return {
        Supplier_ID: entry.Supplier_ID,
        Name: supplier?.Name || "Unknown Supplier",
        Total_Purchases: entry._sum.Total_Amount,
      };
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching supplier performance:", error);
    res.status(500).json({ success: false, message: "Failed to fetch supplier performance" });
  }
});


  

export default router;
