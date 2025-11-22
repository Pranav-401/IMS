// --- Mock Data pulled directly from Receipts.jsx ---

const mockReceipts = [
  {
    id: 1,
    ref: "RCP-023",
    supplier: "Supplier A Corp",
    date: "2025-11-25",
    products: 5,
    status: "Done",
    warehouse: "WH-Main",
  },
  {
    id: 2,
    ref: "RCP-024",
    supplier: "Vendor B Ltd",
    date: "2025-11-26",
    products: 2,
    status: "Waiting",
    warehouse: "WH-East",
  },
  {
    id: 3,
    ref: "RCP-025",
    supplier: "Global Parts Inc",
    date: "2025-11-27",
    products: 8,
    status: "Draft",
    warehouse: "WH-Main",
  },
  {
    id: 4,
    ref: "RCP-026",
    supplier: "Supplier A Corp",
    date: "2025-11-28",
    products: 3,
    status: "Canceled",
    warehouse: "WH-East",
  },
];

const mockReceiptDetails = {
  // NOTE: In a real DB, this would be looked up by receipt ID
  ref: "RCP-024",
  status: "Waiting",
  supplier: "Vendor B Ltd",
  warehouse: "WH-East",
  date: "2025-11-26",
  notes: "Urgent delivery, must be validated upon arrival.",
  products: [
    {
      product: "Processor Chip X1",
      sku: "PCX1-2024",
      expected: 50,
      received: 0,
      uom: "Pcs",
    },
    {
      product: "Alloy Chassis V3",
      sku: "ACV3-SML",
      expected: 10,
      received: 0,
      uom: "Pcs",
    },
  ],
  logs: [
    { time: "1m ago", activity: "Status changed from Draft to Waiting." },
    { time: "4h ago", activity: "Receipt created by John Doe." },
  ],
};

const mockSuppliers = [
  "Supplier A Corp",
  "Vendor B Ltd",
  "Global Parts Inc",
  "Local Distributor",
];

// --- Service Functions ---

/**
 * Retrieves the list of all receipts.
 */
export const getAllReceiptsService = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return mockReceipts;
};

/**
 * Retrieves the details for a specific receipt.
 */
export const getReceiptByIdService = async (id) => {
  // Look up the summary data first
  const summary = mockReceipts.find((r) => r.id === parseInt(id));
  if (!summary) return null;

  // In a real application, you'd fetch the detailed line items and logs here.
  // For mock data, we return the static details payload combined with the summary ID.
  return { ...summary, ...mockReceiptDetails, id: summary.id };
};

/**
 * Retrieves auxiliary data like suppliers and status filters.
 */
export const getReceiptAuxDataService = async () => {
  return {
    suppliers: mockSuppliers,
    statuses: ["Draft", "Waiting", "Ready", "Done", "Canceled"],
    warehouses: ["WH-Main", "WH-East"],
  };
};

/**
 * Placeholder for creating a new receipt.
 */
export const createReceiptService = async (receiptData) => {
  // Logic to insert into DB would go here.
  const newId = mockReceipts.length + 1;
  const newReceipt = {
    id: newId,
    ref: `RCP-${100 + newId}`,
    ...receiptData,
    status: "Draft",
  };
  return newReceipt;
};

/**
 * Placeholder for updating a receipt's status (e.g., Validate/Cancel).
 */
export const updateReceiptStatusService = async (id, newStatus) => {
  // Logic to update DB would go here.
  const index = mockReceipts.findIndex((r) => r.id === parseInt(id));
  if (index === -1) return null;
  mockReceipts[index].status = newStatus;
  return mockReceipts[index];
};

/**
 * Placeholder for deleting a receipt.
 */
export const deleteReceiptService = async (id) => {
  // Logic to delete from DB would go here.
  return { success: true, id };
};
