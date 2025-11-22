import {
  getAllProductsService,
  getProductFiltersService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../model/productModel.js";

// Standardized response function (for consistency)
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

// --- READ Operations ---

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    handleResponse(res, 200, "Products fetched successfully", products);
  } catch (error) {
    next(error);
  }
};

export const getProductFilters = async (req, res, next) => {
  try {
    const filters = await getProductFiltersService();
    handleResponse(res, 200, "Filters fetched successfully", filters);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await getProductByIdService(req.params.id);
    if (!product) return handleResponse(res, 404, "Product not found");
    handleResponse(res, 200, "Product fetched successfully", product);
  } catch (error) {
    next(error);
  }
};

// --- CREATE, UPDATE, DELETE Operations ---

export const createProduct = async (req, res, next) => {
  try {
    // Validation of req.body data would typically happen here
    const newProduct = await createProductService(req.body);
    handleResponse(res, 201, "Product created successfully", newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await updateProductService(req.params.id, req.body);
    if (!updatedProduct) return handleResponse(res, 404, "Product not found");
    handleResponse(res, 200, "Product updated successfully", updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const result = await deleteProductService(req.params.id);
    if (!result.success) return handleResponse(res, 404, "Product not found");
    handleResponse(res, 200, `Product ${req.params.id} deleted successfully`);
  } catch (error) {
    next(error);
  }
};
