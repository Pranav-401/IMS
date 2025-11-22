// --- Data Structures pulled directly from Dashboard.jsx ---

const kpis = [
  {
    icon: "Box", // Using string identifiers instead of JSX components
    label: "Total Stock Items",
    value: "8,450",
    trend: [10, 15, 12, 18, 20, 15, 22],
  },
  {
    icon: "AlertTriangle",
    label: "Low Stock Items",
    value: "124",
    trend: [7, 6, 5, 4, 5, 3, 2],
  },
  {
    icon: "ArrowDownCircle",
    label: "Pending Receipts",
    value: "18",
    trend: [1, 2, 4, 3, 5, 4, 6],
  },
  {
    icon: "ArrowUpCircle",
    label: "Pending Deliveries",
    value: "45",
    trend: [2, 5, 7, 6, 8, 9, 10],
  },
  {
    icon: "Repeat",
    label: "Transfers Waiting",
    value: "5",
    trend: [0, 1, 2, 1, 3, 2, 5],
  },
];

const moveHistoryData = [
  {
    type: "Receipt",
    ref: "REC-1021",
    source: "Supplier A",
    dest: "WH-Main",
    status: "Done",
    date: "2m ago",
    qty: 250,
  },
  {
    type: "Delivery",
    ref: "DEL-453",
    source: "WH-Main",
    dest: "Customer B",
    status: "Ready",
    date: "1h ago",
    qty: 45,
  },
  {
    type: "Transfer",
    ref: "TRF-311",
    source: "WH-Main",
    dest: "WH-East",
    status: "Waiting",
    date: "4h ago",
    qty: 120,
  },
  {
    type: "Adjustment",
    ref: "ADJ-05",
    source: "WH-East",
    dest: "N/A",
    status: "Draft",
    date: "1d ago",
    qty: 5,
  },
  {
    type: "Delivery",
    ref: "DEL-452",
    source: "WH-Main",
    dest: "Customer C",
    status: "Canceled",
    date: "2d ago",
    qty: 80,
  },
];

const alertsData = [
  {
    type: "Low Stock",
    message: "Product P-77 is below reorder point (Qty: 12)",
    color: "yellow",
  },
  {
    type: "Out of Stock",
    message: "Product P-21 is completely depleted.",
    color: "red",
  },
  {
    type: "Failed Transfer",
    message: "TRF-309 failed due to insufficient stock at source.",
    color: "red",
  },
  {
    type: "Pending Draft",
    message: "Receipt REC-1022 requires final validation.",
    color: "yellow",
  },
];

const productSnapshot = {
  lowStock: [
    { name: "P-77 (Processor)", qty: 12, color: "red" },
    { name: "P-21 (Chassis)", qty: 0, color: "red" },
    { name: "P-55 (Cable Kit)", qty: 35, color: "yellow" },
  ],
};

const locationOverview = [
  { name: "WH-Main Hub", capacity: "85%", color: "green" },
  { name: "WH-East Branch", capacity: "50%", color: "yellow" },
  { name: "QC Hold Zone", capacity: "95%", color: "red" },
];

const activityTimeline = [
  { color: "green", label: "Receipt REC-1021 created", time: "12:35 PM" },
  {
    color: "blue",
    label: "Delivery DEL-453 ready for picking",
    time: "11:01 AM",
  },
  {
    color: "yellow",
    label: "Internal transfer TRF-311 initiated",
    time: "10:15 AM",
  },
  {
    color: "orange",
    label: "Stock adjusted for P-12 (+10)",
    time: "Yesterday",
  },
  {
    color: "gray",
    label: "System update applied to Ledger",
    time: "Yesterday",
  },
];

/**
 * Fetches all mock dashboard data.
 * In a real application, this would query a database for real-time totals.
 */
export const getDashboardDataService = async () => {
  // Simulate a database read time
  await new Promise((resolve) => setTimeout(resolve, 50));

  return {
    kpis,
    moveHistoryData,
    alertsData,
    productSnapshot,
    locationOverview,
    activityTimeline,
  };
};
