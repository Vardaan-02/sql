import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all stock movements
router.get("/stock-transactions", async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.stock_Transaction.findMany({
      orderBy: {
        Transaction_Date: "desc",
      },
      include: {
        product: {
          select: {
            Product_ID: true,
            Item_ID: true,
            Name: true,
            Category: true,
            Subcategory: true,
            Manufacturer: true,
            Unit: true,
            Location: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching stock transactions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock movements",
    });
  }
});

// Get a specific stock transaction
router.get("/stock-transactions/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const transactionId = Number(id);
  if (isNaN(transactionId)) {
    res.status(400).json({ success: false, message: "Invalid transaction ID" });
    return;
  }

  try {
    const transaction = await prisma.stock_Transaction.findUnique({
      where: { Transaction_ID: transactionId },
      include: {
        product: {
          select: {
            Product_ID: true,
            Item_ID: true,
            Name: true,
            Category: true,
            Unit: true,
            Location: true,
          },
        },
      },
    });

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Stock transaction not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error("Error fetching stock transaction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock transaction",
    });
  }
});

// Manually add a stock transaction (IN/OUT)
router.post("/stock-transactions", async (req: Request, res: Response) => {
  const { Product_ID, Transaction_Type, Quantity } = req.body;

  if (!Product_ID || !["IN", "OUT"].includes(Transaction_Type) || typeof Quantity !== "number") {
    res.status(400).json({ success: false, message: "Missing or invalid transaction data" });
    return;
  }

  try {
    const product = await prisma.product.findUnique({
      where: { Product_ID },
      include: { stockTransactions: true },
    });

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    // Calculate current stock
    const netStock = product.Initial_Stock +
      product.stockTransactions.reduce((acc, tx) => {
        return tx.Transaction_Type === "IN"
          ? acc + tx.Quantity
          : acc - tx.Quantity;
      }, 0);

    if (Transaction_Type === "OUT" && Quantity > netStock) {
      res.status(400).json({
        success: false,
        message: "Insufficient stock for OUT transaction",
      });
      return;
    }

    // Create the new transaction
    const transaction = await prisma.stock_Transaction.create({
      data: {
        Product_ID,
        Transaction_Type,
        Quantity,
      },
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    console.error("Error creating stock transaction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create stock transaction",
    });
  }
});


export default router;
