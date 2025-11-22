import {
  getAllReceiptsService,
  getReceiptByIdService,
  getReceiptAuxDataService,
  createReceiptService,
  updateReceiptStatusService,
  deleteReceiptService,
} from "../model/receiptModel.js";

// Standardized response function (for consistency)
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

// --- READ Operations ---

export const getAllReceipts = async (req, res, next) => {
  try {
    const receipts = await getAllReceiptsService();
    handleResponse(res, 200, "Receipts fetched successfully", receipts);
  } catch (error) {
    next(error);
  }
};

export const getReceiptAuxData = async (req, res, next) => {
  try {
    const auxData = await getReceiptAuxDataService();
    handleResponse(res, 200, "Auxiliary data fetched successfully", auxData);
  } catch (error) {
    next(error);
  }
};

export const getReceiptById = async (req, res, next) => {
  try {
    const receipt = await getReceiptByIdService(req.params.id);
    if (!receipt) return handleResponse(res, 404, "Receipt not found");
    handleResponse(res, 200, "Receipt details fetched successfully", receipt);
  } catch (error) {
    next(error);
  }
};

// --- CREATE, UPDATE, DELETE Operations ---

export const createReceipt = async (req, res, next) => {
  try {
    const newReceipt = await createReceiptService(req.body);
    handleResponse(res, 201, "Receipt created successfully", newReceipt);
  } catch (error) {
    next(error);
  }
};

export const updateReceiptStatus = async (req, res, next) => {
  const { newStatus } = req.body;
  try {
    if (!newStatus) {
      return handleResponse(res, 400, "Missing 'newStatus' in request body");
    }
    const updatedReceipt = await updateReceiptStatusService(
      req.params.id,
      newStatus
    );
    if (!updatedReceipt) return handleResponse(res, 404, "Receipt not found");
    handleResponse(
      res,
      200,
      `Receipt status updated to ${newStatus}`,
      updatedReceipt
    );
  } catch (error) {
    next(error);
  }
};

export const deleteReceipt = async (req, res, next) => {
  try {
    const result = await deleteReceiptService(req.params.id);
    if (!result.success) return handleResponse(res, 404, "Receipt not found");
    handleResponse(res, 200, `Receipt ${req.params.id} deleted successfully`);
  } catch (error) {
    next(error);
  }
};
