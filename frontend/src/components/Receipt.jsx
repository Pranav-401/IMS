import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiArrowDownCircle,
  FiCheckCircle,
  FiXCircle,
  FiEdit,
  FiEye,
  FiTruck,
  FiSave,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiList,
  FiRepeat,
  FiPaperclip,
  FiDownload,
  FiPrinter,
  FiClipboard,
} from "react-icons/fi";

// --- Mock Data ---
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
    {
      time: "1m ago",
      activity: "Status changed from Draft to Waiting.",
      icon: <FiCheckCircle />,
    },
    {
      time: "4h ago",
      activity: "Receipt created by John Doe.",
      icon: <FiPlus />,
    },
  ],
};

const mockSuppliers = [
  "Supplier A Corp",
  "Vendor B Ltd",
  "Global Parts Inc",
  "Local Distributor",
];

// --- Sub-Components ---

/** Helper to get status badge style */
const StatusBadge = ({ status }) => {
  let style = "bg-gray-100 text-gray-700";
  if (status === "Done") style = "bg-green-100 text-green-700";
  else if (status === "Waiting" || status === "Ready")
    style = "bg-yellow-100 text-yellow-700";
  else if (status === "Canceled") style = "bg-red-100 text-red-700";

  return (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${style}`}
    >
      {status}
    </span>
  );
};

/** 6. Status Flow Indicators */
const StatusFlow = ({ currentStatus }) => {
  const flow = ["Draft", "Waiting", "Ready", "Done"];
  const statusIndex = flow.indexOf(currentStatus);

  const getStepStyle = (index) => {
    if (index <= statusIndex) return "bg-green-600 text-white";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <div className="flex justify-between items-center my-4 text-sm font-medium">
      {flow.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStyle(
                index
              )} transition-colors duration-300 shadow-md`}
            >
              {index === 3 ? <FiCheckCircle /> : index + 1}
            </div>
            <span
              className={`mt-1 text-xs ${
                index <= statusIndex
                  ? "text-green-700 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
          {index < flow.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 ${
                index < statusIndex ? "bg-green-400" : "bg-gray-300"
              } transition-colors duration-300`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/** 4. Create Receipt Modal (Slide-Over) */
const CreateReceiptModal = ({ isOpen, onClose }) => {
  const [lineItems, setLineItems] = useState([
    { product: "", sku: "", quantity: 1, uom: "Pcs" },
  ]);

  if (!isOpen) return null;

  const handleAddLine = () =>
    setLineItems([
      ...lineItems,
      { product: "", sku: "", quantity: 1, uom: "Pcs" },
    ]);
  const handleRemoveLine = (index) =>
    setLineItems(lineItems.filter((_, i) => i !== index));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-40 flex justify-end">
      <div className="w-full max-w-2xl bg-white shadow-3xl transform transition-transform duration-300 translate-x-0 rounded-l-2xl">
        <div className="p-8 h-full flex flex-col">
          <header className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FiArrowDownCircle className="mr-2 text-green-600" /> Create New
              Receipt
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition"
            >
              <FiXCircle className="w-6 h-6" />
            </button>
          </header>

          <form className="flex-1 overflow-y-auto py-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-100">
              <label className="block">
                <span className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FiUser className="w-4 h-4 mr-1" /> Supplier *
                </span>
                <select
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option>Select Supplier</option>
                  {mockSuppliers.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FiMapPin className="w-4 h-4 mr-1" /> Warehouse / Location *
                </span>
                <select
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option>WH-Main Hub</option>
                  <option>WH-East Branch</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FiCalendar className="w-4 h-4 mr-1" /> Scheduled Date
                </span>
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </label>
            </div>

            <h3 className="text-lg font-bold text-gray-800 flex items-center mt-6">
              <FiList className="mr-2 text-green-600" /> Products to Receive
            </h3>

            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Product", "SKU", "Quantity", "UoM", "Remove"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lineItems.map((line, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 text-sm text-gray-900">
                        <select className="w-full border border-gray-200 rounded-lg py-1 px-2 text-xs">
                          <option>Processor Chip X1</option>
                          <option>Alloy Chassis V3</option>
                        </select>
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-500">
                        PCX1-2024
                      </td>
                      <td className="px-3 py-2 text-sm">
                        <input
                          type="number"
                          min="1"
                          value={line.quantity}
                          onChange={(e) => {
                            /* update state */
                          }}
                          className="w-20 border border-gray-200 rounded-lg py-1 px-2 text-sm focus:ring-green-500"
                        />
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-500">Pcs</td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveLine(index)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <FiXCircle />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={handleAddLine}
              className="flex items-center text-green-600 font-semibold text-sm hover:text-green-700 transition"
            >
              <FiPlus className="w-4 h-4 mr-1" /> Add Product Line
            </button>

            <label className="block pt-4">
              <span className="text-sm font-medium text-gray-700">
                Notes (Optional)
              </span>
              <textarea
                rows="2"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </label>
          </form>

          <footer className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-xl text-gray-700 border border-gray-300 hover:bg-gray-50 transition"
            >
              <FiSave className="inline mr-2" /> Save as Draft
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-500/50 transition"
            >
              <FiCheckCircle className="inline mr-2" /> Validate Receipt
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

/** 5. Receipt Details Panel (View Mode) */
const ReceiptDetailsPanel = ({ receipt, onClose }) => {
  const [activeTab, setActiveTab] = useState("Products");
  if (!receipt) return null;
  const details = mockReceiptDetails; // Use mock details for panel content

  const renderTabContent = () => {
    if (activeTab === "Products") {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Product Name",
                  "SKU",
                  "Expected Qty",
                  "Received Qty",
                  "UoM",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {details.products.map((p, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition duration-150"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {p.product}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.sku}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
                    {p.expected}
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600 font-bold">
                    {p.received}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.uom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (activeTab === "Activity / Logs") {
      return (
        <ol className="relative border-l border-gray-200 ml-4">
          {details.logs.map((log, index) => (
            <li key={index} className="mb-4 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-white shadow-md bg-green-100 text-green-600">
                {log.icon}
              </span>
              <h4 className="text-sm font-semibold text-gray-900">
                {log.activity}
              </h4>
              <time className="block text-xs font-normal leading-none text-gray-400">
                {log.time}
              </time>
            </li>
          ))}
        </ol>
      );
    }
    if (activeTab === "Attachments") {
      return (
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FiPaperclip className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Invoice_VBL_1126.pdf</span>
            </div>
            <button className="text-gray-500 hover:text-green-600">
              <FiDownload className="w-5 h-5" />
            </button>
          </div>
          <button className="flex items-center text-green-600 font-semibold text-sm hover:text-green-700 transition">
            <FiPlus className="w-4 h-4 mr-1" /> Add Attachment
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-30 flex justify-end">
      <div className="w-full max-w-xl bg-white shadow-3xl transform transition-transform duration-300 translate-x-0 rounded-l-2xl">
        <div className="p-8 h-full flex flex-col">
          <header className="flex justify-between items-start pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                {details.ref}
              </h2>
              <StatusBadge status={details.status} />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition"
            >
              <FiXCircle className="w-6 h-6" />
            </button>
          </header>

          <section className="py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Supplier:</span>{" "}
                {details.supplier}
              </p>
              <p>
                <span className="font-semibold">Warehouse:</span>{" "}
                {details.warehouse}
              </p>
              <p>
                <span className="font-semibold">Scheduled:</span> {details.date}
              </p>
              <p>
                <span className="font-semibold">Products:</span>{" "}
                {details.products.length}
              </p>
              <p className="col-span-2 mt-2">
                <span className="font-semibold">Notes:</span>{" "}
                {details.notes || "N/A"}
              </p>
            </div>
          </section>

          <StatusFlow currentStatus={details.status} />

          <div className="flex border-b border-gray-200">
            {["Products", "Activity / Logs", "Attachments"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  activeTab === tab
                    ? "border-b-2 border-green-600 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            {renderTabContent()}
          </div>

          <footer className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
            <button className="px-4 py-2 text-sm font-semibold rounded-xl text-gray-700 border border-gray-300 hover:bg-gray-100 transition">
              <FiEdit className="inline mr-1" /> Edit
            </button>
            {details.status !== "Done" && details.status !== "Canceled" && (
              <button className="px-4 py-2 text-sm font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-500/50 transition">
                <FiCheckCircle className="inline mr-1" /> Validate
              </button>
            )}
            {details.status !== "Canceled" && (
              <button className="px-4 py-2 text-sm font-semibold rounded-xl text-red-600 border border-red-300 hover:bg-red-50 transition">
                <FiXCircle className="inline mr-1" /> Cancel
              </button>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const Receipts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // 8. Empty State Check
  if (mockReceipts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <FiArrowDownCircle className="w-24 h-24 text-green-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          No receipts yet.
        </h2>
        <p className="text-gray-500 mb-8">
          Track incoming goods quickly and accurately.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-6 py-3 text-lg font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/50 transition"
        >
          <FiPlus className="w-5 h-5 mr-2" /> Create your first receipt
        </button>
        <CreateReceiptModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="p-8">
        {/* 1️⃣ Header Section */}
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <FiArrowDownCircle className="mr-3 text-green-600 w-7 h-7" />{" "}
            Receipts (Incoming Goods)
          </h1>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by reference, product, supplier..."
                className="w-80 px-4 py-2 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 transition"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Right-side actions */}
            <button
              className="p-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsFilterOpen(true)}
            >
              <FiFilter className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-5 py-3 text-sm font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-500/50 transition"
            >
              <FiPlus className="w-5 h-5 mr-2" /> Create Receipt
            </button>
          </div>
        </header>

        {/* 2️⃣ Receipts List Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Receipt Reference",
                    "Supplier Name",
                    "Scheduled Date",
                    "Total Products",
                    "Status",
                    "Warehouse",
                    "Actions",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-green-600`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockReceipts.map((receipt) => (
                  <tr
                    key={receipt.id}
                    onClick={() => setSelectedReceipt(receipt)}
                    className="cursor-pointer hover:bg-green-50/50 transition duration-150 even:bg-gray-50/50"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {receipt.ref}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {receipt.supplier}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {receipt.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {receipt.products}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <StatusBadge status={receipt.status} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {receipt.warehouse}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReceipt(receipt);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <FiEye />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-800 transition">
                          <FiEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-800 transition">
                          <FiXCircle />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
              Pagination
            </button>
          </div>
        </div>

        {/* 7️⃣ Quick Actions Section (Fixed Right Corner) - Focused on core receipt actions */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
          {/* Add Product Line (Contextual) */}
          <button
            title="Add Product Line"
            className="p-4 bg-white text-green-600 rounded-full shadow-lg border border-gray-200 transition duration-200 hover:ring-4 hover:ring-green-200 hover:shadow-xl"
          >
            <FiPlus className="w-6 h-6" />
          </button>
          {/* Print Receipt */}
          <button
            title="Print Receipt"
            className="p-4 bg-white text-blue-600 rounded-full shadow-lg border border-gray-200 transition duration-200 hover:ring-4 hover:ring-blue-200 hover:shadow-xl"
          >
            <FiPrinter className="w-6 h-6" />
          </button>
          {/* Download PDF */}
          <button
            title="Download PDF"
            className="p-4 bg-white text-yellow-600 rounded-full shadow-lg border border-gray-200 transition duration-200 hover:ring-4 hover:ring-yellow-200 hover:shadow-xl"
          >
            <FiDownload className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 3️⃣ Filters Panel (Expandable Drawer) */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white shadow-2xl p-6 transition-transform duration-300 ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <FiFilter className="mr-2 text-green-600" /> Filter Receipts
          </h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition"
          >
            <FiXCircle className="w-6 h-6" />
          </button>
        </header>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-700 mb-3 flex items-center">
              <FiClipboard className="w-4 h-4 mr-1" /> Status
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Draft", "Waiting", "Ready", "Done", "Canceled"].map(
                (status) => (
                  <span
                    key={status}
                    className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors duration-200 ${
                      status === "Waiting"
                        ? "bg-green-600 text-white shadow-sm shadow-green-500/40"
                        : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    {status}
                  </span>
                )
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-700 mb-3 flex items-center">
              <FiUser className="w-4 h-4 mr-1" /> Supplier
            </h4>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
              <option>All Suppliers</option>
              {mockSuppliers.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-700 mb-3 flex items-center">
              <FiCalendar className="w-4 h-4 mr-1" /> Date Range
            </h4>
            <input
              type="date"
              className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <footer className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 flex justify-between space-x-3 bg-white">
          <button className="px-4 py-2 text-sm font-semibold rounded-xl text-gray-700 border border-gray-300 hover:bg-gray-50 transition">
            Clear All
          </button>
          <button className="px-4 py-2 text-sm font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-500/50 transition">
            Apply Filters
          </button>
        </footer>
      </div>

      {/* 4. Create Receipt Modal */}
      <CreateReceiptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 5. Receipt Details Panel */}
      <ReceiptDetailsPanel
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />
    </div>
  );
};

export default Receipts;
