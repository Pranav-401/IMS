import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiRepeat,
  FiCheckCircle,
  FiXCircle,
  FiEdit,
  FiEye,
  FiSave,
  FiCalendar,
  FiMapPin,
  FiBox,
  FiList,
  FiArrowRight,
  FiDownload,
  FiPrinter,
  FiClipboard,
  FiAlertTriangle,
  FiTrash2,
} from "react-icons/fi";

// --- Mock Data ---
const mockTransfers = [
  {
    id: 1,
    ref: "IT-045",
    source: "WH-Main Hub",
    destination: "WH-East Branch",
    date: "2025-11-25",
    items: 3,
    status: "Done",
  },
  {
    id: 2,
    ref: "IT-046",
    source: "Returns Area",
    destination: "WH-Main Hub",
    date: "2025-11-26",
    items: 1,
    status: "Waiting",
  },
  {
    id: 3,
    ref: "IT-047",
    source: "WH-East Branch",
    destination: "QC Hold Zone",
    date: "2025-11-27",
    items: 5,
    status: "Draft",
  },
  {
    id: 4,
    ref: "IT-048",
    source: "WH-Main Hub",
    destination: "WH-East Branch",
    date: "2025-11-28",
    items: 2,
    status: "Canceled",
  },
];

const mockTransferDetails = {
  ref: "IT-046",
  status: "Waiting",
  source: "Returns Area",
  destination: "WH-Main Hub",
  date: "2025-11-26",
  notes: "High-value items requiring immediate transfer to main stock.",
  products: [
    {
      product: "Processor Chip X1",
      sku: "PCX1-2024",
      available: 15,
      qtyToMove: 10,
      uom: "Pcs",
    },
    {
      product: "Alloy Chassis V3",
      sku: "ACV3-SML",
      available: 5,
      qtyToMove: 5,
      uom: "Pcs",
    },
  ],
  logs: [
    {
      time: "1m ago",
      activity: "Transfer status set to Waiting.",
      icon: <FiCheckCircle />,
    },
    {
      time: "4h ago",
      activity: "Transfer created by Inventory Manager.",
      icon: <FiPlus />,
    },
  ],
  totalQuantity: 15,
};

const mockLocations = [
  "WH-Main Hub",
  "WH-East Branch",
  "QC Hold Zone",
  "Returns Area",
];

// --- Sub-Components ---

/** Helper to get status badge style */
const StatusBadge = ({ status }) => {
  let style = "bg-gray-100 text-gray-700";
  if (status === "Done") style = "bg-green-100 text-green-700";
  else if (status === "Ready" || status === "Waiting")
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

/** 6. Workflow Indicator */
const WorkflowIndicator = ({ currentStatus }) => {
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

/** 4. Create Transfer Modal (Slide-Over) */
const CreateTransferModal = ({ isOpen, onClose }) => {
  const [lineItems, setLineItems] = useState([
    { product: "", quantity: 1, uom: "Pcs", available: 50 },
  ]);

  if (!isOpen) return null;

  const handleAddLine = () =>
    setLineItems([
      ...lineItems,
      { product: "", quantity: 1, uom: "Pcs", available: 0 },
    ]);
  const handleRemoveLine = (index) =>
    setLineItems(lineItems.filter((_, i) => i !== index));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-40 flex justify-end">
      <div className="w-full max-w-2xl bg-white shadow-3xl transform transition-transform duration-300 translate-x-0 rounded-l-2xl">
        <div className="p-8 h-full flex flex-col">
          <header className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FiRepeat className="mr-2 text-green-600" /> Create Internal
              Transfer
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
                  <FiArrowRight className="w-4 h-4 mr-1 transform rotate-180" />{" "}
                  Source Location *
                </span>
                <select
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option>WH-Main Hub</option>
                  <option>WH-East Branch</option>
                  <option>Returns Area</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FiArrowRight className="w-4 h-4 mr-1" /> Destination Location
                  *
                </span>
                <select
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option>WH-Main Hub</option>
                  <option>WH-East Branch</option>
                  <option>QC Hold Zone</option>
                </select>
              </label>
            </div>

            <h3 className="text-lg font-bold text-gray-800 flex items-center mt-6">
              <FiList className="mr-2 text-green-600" /> Items to Move
            </h3>

            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Product",
                      "SKU",
                      "Available Stock",
                      "Quantity to Move",
                      "UoM",
                      "Remove",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase"
                      >
                        {header}
                      </th>
                    ))}
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
                      <td className="px-3 py-2 text-xs text-green-600 font-semibold">
                        {line.available}
                      </td>
                      <td className="px-3 py-2 text-sm">
                        <input
                          type="number"
                          min="1"
                          max={line.available}
                          value={line.quantity}
                          onChange={(e) => {
                            /* update state */
                          }}
                          className="w-24 border border-gray-200 rounded-lg py-1 px-2 text-sm focus:ring-green-500"
                        />
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-500">Pcs</td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveLine(index)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <FiTrash2 />
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
              <FiCheckCircle className="inline mr-2" /> Validate Transfer
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

/** 5. Transfer Details Panel (View Mode) */
const TransferDetailsPanel = ({ transfer, onClose }) => {
  const [activeTab, setActiveTab] = useState("Products");
  if (!transfer) return null;
  const details = mockTransferDetails;

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
                  "Qty to Move",
                  "Source Stock",
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
                  <td className="px-4 py-3 text-sm text-blue-600 font-bold">
                    {p.qtyToMove}
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600 font-bold">
                    {p.available}
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
    if (activeTab === "Movement Summary") {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-xl shadow-inner border border-green-200">
              <FiRepeat className="w-8 h-8 text-green-600 mx-auto mb-1" />
              <p className="text-3xl font-bold text-gray-900">
                {details.products.length}
              </p>
              <p className="text-sm text-gray-600">Items Moved</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl shadow-inner border border-green-200">
              <FiBox className="w-8 h-8 text-green-600 mx-auto mb-1" />
              <p className="text-3xl font-bold text-gray-900">
                {details.totalQuantity}
              </p>
              <p className="text-sm text-gray-600">Total Quantity</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-md">
            <h4 className="font-semibold text-md mb-2">Location Flow</h4>
            <div className="flex items-center justify-between text-sm">
              <div className="text-center">
                <FiMapPin className="w-6 h-6 text-red-600 mx-auto" />
                <p className="font-bold mt-1">{details.source}</p>
                <p className="text-xs text-gray-500">Source</p>
              </div>
              <FiArrowRight className="w-8 h-8 text-green-600" />
              <div className="text-center">
                <FiMapPin className="w-6 h-6 text-blue-600 mx-auto" />
                <p className="font-bold mt-1">{details.destination}</p>
                <p className="text-xs text-gray-500">Destination</p>
              </div>
            </div>
          </div>
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
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Transfer Route
            </h3>
            <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
              <p className="text-red-600 flex items-center">
                <FiMapPin className="mr-1" /> {details.source}
              </p>
              <FiArrowRight className="w-6 h-6 text-green-600" />
              <p className="text-blue-600 flex items-center">
                <FiMapPin className="mr-1" /> {details.destination}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mt-3">
              <p>
                <span className="font-semibold">Created:</span> {details.date}
              </p>
              <p>
                <span className="font-semibold">Scheduled:</span> {details.date}
              </p>
              <p className="col-span-2 mt-2">
                <span className="font-semibold">Notes:</span>{" "}
                {details.notes || "N/A"}
              </p>
            </div>
          </section>

          <WorkflowIndicator currentStatus={details.status} />

          <div className="flex border-b border-gray-200">
            {["Products", "Movement Summary", "Activity / Logs"].map((tab) => (
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
            <button className="px-4 py-2 text-sm font-semibold rounded-xl text-yellow-600 border border-yellow-300 hover:bg-yellow-50 transition">
              <FiEdit className="inline mr-1" /> Edit
            </button>
            {details.status !== "Done" && details.status !== "Canceled" && (
              <button className="px-4 py-2 text-sm font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-500/50 transition">
                <FiCheckCircle className="inline mr-1" /> Validate
              </button>
            )}
            <button className="px-4 py-2 text-sm font-semibold rounded-xl text-red-600 border border-red-300 hover:bg-red-50 transition">
              <FiXCircle className="inline mr-1" /> Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const InternalTransfers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);

  // 8. Alerts Section Data (Mocked)
  const currentAlerts = mockTransfers.filter((t) => t.status === "Waiting");

  // 9. Empty State Check
  if (mockTransfers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <FiRepeat className="w-24 h-24 text-green-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          No internal transfers yet.
        </h2>
        <p className="text-gray-500 mb-8">
          Efficiently manage stock movement between locations.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-6 py-3 text-lg font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/50 transition"
        >
          <FiPlus className="w-5 h-5 mr-2" /> Create Internal Transfer
        </button>
        <CreateTransferModal
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
            <FiRepeat className="mr-3 text-green-600 w-7 h-7" /> Internal
            Transfers
          </h1>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by ref, product, source, destination..."
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
              <FiPlus className="w-5 h-5 mr-2" /> Create Transfer
            </button>
          </div>
        </header>

        {/* 8. Alerts Section */}
        {currentAlerts.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-6">
            {currentAlerts.map((transfer) => (
              <div
                key={transfer.id}
                className="px-4 py-2 rounded-xl text-sm font-medium flex items-center shadow-md bg-yellow-400 text-gray-900"
              >
                <FiAlertTriangle className="w-4 h-4 mr-2" />
                Waiting Validation: {transfer.ref}
              </div>
            ))}
          </div>
        )}

        {/* 2️⃣ Transfers List Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Transfer Reference",
                    "Source Location",
                    "Destination Location",
                    "Scheduled Date",
                    "Total Items",
                    "Status",
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
                {mockTransfers.map((transfer) => (
                  <tr
                    key={transfer.id}
                    onClick={() => setSelectedTransfer(transfer)}
                    className="cursor-pointer hover:bg-green-50/50 transition duration-150 even:bg-gray-50/50"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {transfer.ref}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                      {transfer.source}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                      {transfer.destination}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transfer.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {transfer.items}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <StatusBadge status={transfer.status} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTransfer(transfer);
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

        {/* 7️⃣ Quick Actions Panel (Fixed Right Corner) */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
          {/* Validate */}
          <button
            title="Validate Transfer"
            className="p-4 bg-white text-green-600 rounded-full shadow-lg border border-gray-200 transition duration-200 hover:ring-4 hover:ring-green-200 hover:shadow-xl"
          >
            <FiCheckCircle className="w-6 h-6" />
          </button>
          {/* Print Transfer Slip */}
          <button
            title="Print Slip"
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
            <FiFilter className="mr-2 text-green-600" /> Filter Transfers
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
              <FiMapPin className="w-4 h-4 mr-1" /> Source Location
            </h4>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
              <option>All Sources</option>
              {mockLocations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-700 mb-3 flex items-center">
              <FiMapPin className="w-4 h-4 mr-1" /> Destination Location
            </h4>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
              <option>All Destinations</option>
              {mockLocations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
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

      {/* 4. Create Transfer Modal */}
      <CreateTransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 5. Transfer Details Panel */}
      <TransferDetailsPanel
        transfer={selectedTransfer}
        onClose={() => setSelectedTransfer(null)}
      />
    </div>
  );
};

export default InternalTransfers;
