import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Prisma } from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();

// Get all products
router.get("/products", async (req: Request, res: Response) => {
    try {
      const products = await prisma.product.findMany({
        include: {
          supplier: true,
          purchaseOrderDetails: true,
          salesOrderDetails: true,
          stockTransactions: true,
        },
      });
  
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
  });
  
// Get a specific product
router.get("/products/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const product = await prisma.product.findUnique({
        where: { Product_ID: parseInt(id) },
        include: {
          supplier: true,
          purchaseOrderDetails: true,
          salesOrderDetails: true,
          stockTransactions: true,
        },
      });
  
      if (!product) {
        res.status(404).json({ success: false, message: "Product not found" });
        return;
    }
  
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ success: false, message: "Failed to fetch product" });
    }
  });
  
// Create a new product
router.post("/products", async (req: Request, res: Response) => {
  const {
    itemId,
    itemName,
    category,
    subcategory,
    manufacturer,
    supplier,
    initialStock,
    unit,
    minStock,
    location,
    batchNumber,
    purchasePrice,
    sellingPrice,
    description,
    notes,
  } = req.body;

  // Basic validation
  if (!itemId || !itemName || !purchasePrice || !sellingPrice) {
    res.status(400).json({
      success: false,
      message: "itemId, itemName, purchasePrice, and sellingPrice are required",
    });
    return;
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        Item_ID: itemId,
        Name: itemName,
        Category: category,
        Subcategory: subcategory,
        Manufacturer: manufacturer,
        Supplier_ID: supplier ? parseInt(supplier) : null,
        Initial_Stock: initialStock ? parseInt(initialStock) : 0,
        Unit: unit,
        Min_Stock: minStock ? parseInt(minStock) : 0,
        Location: location,
        Batch_Number: batchNumber,
        Purchase_Price: new Prisma.Decimal(purchasePrice),
        Selling_Price: new Prisma.Decimal(sellingPrice),
        Description: description,
        Notes: notes,
      },
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Failed to create product" });
  }
});

// Edit a product
router.put("/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    itemId,
    itemName,
    category,
    subcategory,
    manufacturer,
    supplier,
    initialStock,
    unit,
    minStock,
    location,
    batchNumber,
    purchasePrice,
    sellingPrice,
    description,
    notes,
  } = req.body;

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { Product_ID: parseInt(id) },
    });

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    const updatedProduct = await prisma.product.update({
      where: { Product_ID: parseInt(id) },
      data: {
        Item_ID: itemId ?? existingProduct.Item_ID,
        Name: itemName ?? existingProduct.Name,
        Category: category ?? existingProduct.Category,
        Subcategory: subcategory ?? existingProduct.Subcategory,
        Manufacturer: manufacturer ?? existingProduct.Manufacturer,
        Supplier_ID: supplier ? parseInt(supplier) : existingProduct.Supplier_ID,
        Initial_Stock: initialStock ? parseInt(initialStock) : existingProduct.Initial_Stock,
        Unit: unit ?? existingProduct.Unit,
        Min_Stock: minStock ? parseInt(minStock) : existingProduct.Min_Stock,
        Location: location ?? existingProduct.Location,
        Batch_Number: batchNumber ?? existingProduct.Batch_Number,
        Purchase_Price: purchasePrice ? new Prisma.Decimal(purchasePrice) : existingProduct.Purchase_Price,
        Selling_Price: sellingPrice ? new Prisma.Decimal(sellingPrice) : existingProduct.Selling_Price,
        Description: description ?? existingProduct.Description,
        Notes: notes ?? existingProduct.Notes,
      },
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
});

// Delete a product
router.delete("/products/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { Product_ID: parseInt(id) },
      });
  
      if (!existingProduct) {
        res.status(404).json({ success: false, message: "Product not found" });
        return;
    }
  
      await prisma.product.delete({
        where: { Product_ID: parseInt(id) },
      });
  
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ success: false, message: "Failed to delete product" });
    }
  });
  
// Get products below stock threshold
router.get("/products/low-stock", async (req: Request, res: Response) => {
  const threshold = parseInt(req.query.threshold as string);

  try {
    const whereClause = threshold
      ? {
          Initial_Stock: {
            lt: threshold,
          },
        }
      : {}; // No filtering if no threshold

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        supplier: true,
      },
    });

    // If no threshold is provided, filter using Min_Stock on the JS side
    const filteredProducts = threshold
      ? products
      : products.filter(
          (p) =>
            typeof p.Min_Stock === "number" &&
            typeof p.Initial_Stock === "number" &&
            p.Initial_Stock < p.Min_Stock
        );

    res.status(200).json({ success: true, data: filteredProducts });
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch low stock products" });
  }
});



export default router;
