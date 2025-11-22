// This data is static mock data based on your React frontend.
// In a real application, these arrays would be fetched from a database (e.g., PostgreSQL).
const mockProducts = [
  {
    id: 1,
    img: "https://via.placeholder.com/40",
    name: "Processor Chip X1",
    sku: "PCX1-2024",
    category: "Electronics",
    uom: "Pcs",
    onHand: 150,
    forecasted: 180,
    reserved: 30,
    available: 120,
    lowStock: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/40",
    name: "Alloy Chassis V3",
    sku: "ACV3-SML",
    category: "Components",
    uom: "Pcs",
    onHand: 15,
    forecasted: 15,
    reserved: 0,
    available: 15,
    lowStock: true,
  },
  {
    id: 3,
    img: "https://via.placeholder.com/40",
    name: "Power Supply 600W",
    sku: "PSU-600W",
    category: "Electronics",
    uom: "Pcs",
    onHand: 0,
    forecasted: 50,
    reserved: 0,
    available: 0,
    lowStock: true,
  },
  {
    id: 4,
    img: "https://via.placeholder.com/40",
    name: "Thermal Paste T10",
    sku: "TP-T10",
    category: "Consumables",
    uom: "Grams",
    onHand: 500,
    forecasted: 500,
    reserved: 0,
    available: 500,
    lowStock: false,
  },
];

const mockFilters = {
  category: ["Electronics", "Components", "Consumables", "Kits"],
  warehouse: ["WH-Main Hub", "WH-East Branch", "WH-Returns"],
  status: ["In Stock", "Low Stock", "Out of Stock"],
};

/**
 * Service to fetch all products.
 * In a real app, this would query the database.
 */
export const getAllProductsService = async () => {
  // Simulate a database delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  return mockProducts;
};

/**
 * Service to fetch the product filters data.
 */
export const getProductFiltersService = async () => {
  return mockFilters;
};

/**
 * Placeholder service for fetching a single product by ID.
 */
export const getProductByIdService = async (id) => {
  const product = mockProducts.find((p) => p.id === parseInt(id));
  return product || null;
};

/**
 * Placeholder service for creating a new product.
 */
export const createProductService = async (productData) => {
  // Logic to insert into DB would go here.
  const newId = mockProducts.length + 1;
  const newProduct = { id: newId, ...productData, onHand: 0, available: 0 };
  // mockProducts.push(newProduct); // In a real app, we would push to the array/DB
  return newProduct;
};

/**
 * Placeholder service for updating a product.
 */
export const updateProductService = async (id, updates) => {
  // Logic to update DB would go here.
  const index = mockProducts.findIndex((p) => p.id === parseInt(id));
  if (index === -1) return null;
  const updatedProduct = { ...mockProducts[index], ...updates };
  // mockProducts[index] = updatedProduct; // In a real app, we would update the array/DB
  return updatedProduct;
};

/**
 * Placeholder service for deleting a product.
 */
export const deleteProductService = async (id) => {
  // Logic to delete from DB would go here.
  // return mockProducts.filter(p => p.id !== parseInt(id));
  return { success: true, id };
};
