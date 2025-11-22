import express from "express";
import {
  getAllReceipts,
  getReceiptById,
  getReceiptAuxData,
  createReceipt,
  updateReceiptStatus,
  deleteReceipt,
} from "../controller/receiptController.js";

const router = express.Router();

// READ Routes
router.get("/auxdata", getReceiptAuxData); // GET /api/receipts/auxdata (filters, suppliers, etc.)
router.get("/", getAllReceipts); // GET /api/receipts/
router.get("/:id", getReceiptById); // GET /api/receipts/:id

// Management (CRUD) Routes
router.post("/", createReceipt); // POST /api/receipts (Create)
router.put("/status/:id", updateReceiptStatus); // PUT /api/receipts/status/:id (Update Status)
router.delete("/:id", deleteReceipt); // DELETE /api/receipts/:id (Delete)

export default router;
