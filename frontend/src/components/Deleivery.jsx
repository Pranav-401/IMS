import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiArrowUpCircle,
  FiCheckCircle,
  FiXCircle,
  FiEdit,
  FiEye,
  FiSave,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiTruck,
  FiList,
  FiRepeat,
  FiDownload,
  FiPrinter,
  FiClipboard,
  FiAlertTriangle,
} from "react-icons/fi";

// --- Mock Data ---
const mockDeliveries = [
  {
    id: 1,
    ref: "DO-019",
    customer: "Customer Alpha Inc",
    date: "2025-11-25",
    products: 4,
    status: "Ready",
    destination: "New York, USA",
    urgent: true,
  },
  {
    id: 2,
    ref: "DO-020",
    customer: "Retailer B Corp",
    date: "2025-11-26",
    products: 2,
    status: "Waiting",
    destination: "Miami, USA",
    urgent: false,
  },
  {
    id: 3,
    ref: "DO-021",
    customer: "Wholesale C Ltd",
    date: "2025-11-27",
    products: 7,
    status: "Done",
    destination: "Los Angeles, USA",
    urgent: false,
  },
  {
    id: 4,
    ref: "DO-022",
    customer: "Customer Alpha Inc",
    date: "2025-11-28",
    products: 1,
    status: "Draft",
    destination: "New York, USA",
    urgent: false,
  },
];

const mockDeliveryDetails = {
  ref: "DO-019",
  status: "Ready",
  customer: "Customer Alpha Inc",
  warehouse: "WH-Main",
  date: "2025-11-25",
  address: "123 Main St, New York, NY 10001",
  notes: "Customer requires signature upon delivery.",
  products: [
    {
      product: "Processor Chip X1",
      sku: "PCX1-2024",
      available: 120,
      ordered: 50,
      delivered: 0,
      status: "Picked",
    },
    {
      product: "Alloy Chassis V3",
      sku: "ACV3-SML",
      available: 15,
      ordered: 20,
      delivered: 0,
      status: "Not Enough Stock",
    },
  ],
  logs: [
    {
      time: "1m ago",
      activity: "Order status changed to Ready.",
      icon: <FiCheckCircle />,
    },
    {
      time: "3h ago",
      activity: "Picking started by Jane Smith.",
      icon: <FiList />,
    },
  ],
};

const mockCustomers = [
  "Customer Alpha Inc",
  "Retailer B Corp",
  "Wholesale C Ltd",
  "E-commerce Partner",
];

// --- Sub-Components ---

/** Helper to get status badge style */
const StatusBadge = ({ status }) => {
  let style = "bg-gray-100 text-gray-700";
  if (status === "Done") style = "bg-green-100 text-green-700";
  else if (status === "Ready") style = "bg-blue-100 text-blue-700";
  else if (status === "Waiting") style = "bg-yellow-100 text-yellow-700";
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

/** 4. Create Delivery Order Modal */
const CreateDeliveryModal = ({ isOpen, onClose }) => {
  const [lineItems, setLineItems] = useState([
    { product: "", quantity: 1, uom: "Pcs", available: 100 },
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
              <FiArrowUpCircle className="mr-2 text-green-600" /> Create
              Delivery Order
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
                  <FiUser className="w-4 h-4 mr-1" /> Customer *
                </span>
                <select
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option>Select Customer</option>
                  {mockCustomers.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FiMapPin className="w-4 h-4 mr-1" /> Source Location *
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
                  <FiCalendar className="w-4 h-4 mr-1" /> Scheduled Shipping
                  Date
                </span>
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FiList className="w-4 h-4 mr-1" /> External Ref. (Optional)
                </span>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </label>
            </div>

            <h3 className="text-lg font-bold text-gray-800 flex items-center mt-6">
              <FiList className="mr-2 text-green-600" /> Items to Deliver
            </h3>

            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Product",
                      "Available Qty",
                      "Quantity to Deliver",
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
                      <td className="px-3 py-2 text-xs text-green-600 font-semibold">
                        {line.available}
                      </td>
                      <td className="px-3 py-2 text-sm">
                        <input
                          type="number"
                          min="1"
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
              <FiTruck className="inline mr-2" /> Validate & Dispatch
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

/** 5. Delivery Order Details Panel (View Mode) */
const DeliveryDetailsPanel = ({ delivery, onClose }) => {
  const [activeTab, setActiveTab] = useState("Products");
  if (!delivery) return null;
  const details = mockDeliveryDetails; // Use mock details for panel content

  const getProductStatusColor = (status) => {
    if (status === "Picked" || status === "Packed") return "text-yellow-600";
    if (status === "Not Enough Stock") return "text-red-600";
    return "text-green-600";
  };

  const renderProductFulfillmentStatus = (productStatus) => {
    const flow = ["Picking", "Packing", "Ready", "Done"];
    const statusIndex = flow.indexOf(productStatus);

    return (
      <div className="flex space-x-4 mt-2">
        {flow.map((step, index) => (
          <div key={step} className="flex items-center text-xs">
            {index <= statusIndex ? (
              <FiCheckCircle className="w-4 h-4 text-green-600 mr-1" />
            ) : (
              <FiCheckCircle className="w-4 h-4 text-gray-300 mr-1" />
            )}
            <span
              className={
                index <= statusIndex
                  ? "font-semibold text-gray-800"
                  : "text-gray-500"
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    if (activeTab === "Products") {
      return (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Product Name",
                    "Ordered Qty",
                    "Delivered Qty",
                    "Available",
                    "Status",
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
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
                      {p.ordered}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-bold">
                      {p.delivered}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {p.available}
                    </td>
                    <td
                      className={`px-4 py-3 text-sm font-medium ${getProductStatusColor(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h4 className="text-md font-semibold mt-4">Fulfillment Steps:</h4>
          {details.products.map((p, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-xl shadow-inner border border-gray-200"
            >
              <p className="font-medium text-sm text-gray-900 mb-1">
                {p.product}
              </p>
              {renderProductFulfillmentStatus(p.status)}
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === "Activity & Logs") {
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
              <FiClipboard className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Packing_Slip_019.pdf</span>
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
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Order Information
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {details.customer}
              </p>
              <p>
                <span className="font-semibold">Source WH:</span>{" "}
                {details.warehouse}
              </p>
              <p>
                <span className="font-semibold">Scheduled:</span> {details.date}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {details.address.split(",")[0]}
              </p>
            </div>
          </section>

          <WorkflowIndicator currentStatus={details.status} />

          <div className="flex border-b border-gray-200">
            {["Products", "Activity & Logs", "Attachments"].map((tab) => (
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
                <FiCheckCircle className="inline mr-1" /> Final Validate
              </button>
            )}
            <button className="px-4 py-2 text-sm font-semibold rounded-xl text-red-600 border border-red-300 hover:bg-red-50 transition">
              <FiXCircle className="inline mr-1" /> Cancel Order
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const DeliveryOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // 8. Alerts Section Data (Mocked based on table data)
  const currentAlerts = mockDeliveries.filter(
    (d) => d.urgent || d.status === "Waiting"
  );

  // 9. Empty State Check
  if (mockDeliveries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <FiArrowUpCircle className="w-24 h-24 text-green-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          No delivery orders yet.
        </h2>
        <p className="text-gray-500 mb-8">
          Efficiently manage your outbound goods workflow.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-6 py-3 text-lg font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/50 transition"
        >
          <FiPlus className="w-5 h-5 mr-2" /> Create Delivery Order
        </button>
        <CreateDeliveryModal
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
            <FiArrowUpCircle className="mr-3 text-green-600 w-7 h-7" /> Delivery
            Orders (Outgoing Goods)
          </h1>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by DO number, customer, product..."
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
              <FiPlus className="w-5 h-5 mr-2" /> Create Delivery Order
            </button>
          </div>
        </header>

        {/* 8. Alerts Section */}
        {currentAlerts.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-6">
            {currentAlerts.map((delivery) => (
              <div
                key={delivery.id}
                className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center shadow-md ${
                  delivery.urgent
                    ? "bg-red-500 text-white"
                    : "bg-yellow-400 text-gray-900"
                }`}
              >
                <FiAlertTriangle className="w-4 h-4 mr-2" />
                {delivery.urgent
                  ? `Urgent: ${delivery.ref}`
                  : `Waiting Fulfillment: ${delivery.ref}`}
              </div>
            ))}
          </div>
        )}

        {/* 2️⃣ Delivery Order Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Delivery Reference",
                    "Customer Name",
                    "Scheduled Date",
                    "Total Products",
                    "Status",
                    "Destination",
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
                {mockDeliveries.map((delivery) => (
                  <tr
                    key={delivery.id}
                    onClick={() => setSelectedDelivery(delivery)}
                    className={`cursor-pointer hover:bg-green-50/50 transition duration-150 even:bg-gray-50/50 ${
                      delivery.urgent
                        ? "border-l-4 border-red-500"
                        : "border-l-4 border-transparent"
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {delivery.ref}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {delivery.customer}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {delivery.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {delivery.products}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <StatusBadge status={delivery.status} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {delivery.destination}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDelivery(delivery);
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
          {/* Print Delivery Challan */}
          <button
            title="Print Challan"
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
          {/* Cancel Delivery (High visibility, hence red) */}
          <button
            title="Cancel Delivery"
            className="p-4 bg-white text-red-600 rounded-full shadow-lg border border-gray-200 transition duration-200 hover:ring-4 hover:ring-red-200 hover:shadow-xl"
          >
            <FiXCircle className="w-6 h-6" />
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
            <FiFilter className="mr-2 text-green-600" /> Filter Deliveries
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
                      status === "Ready"
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
              <FiUser className="w-4 h-4 mr-1" /> Customer
            </h4>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
              <option>All Customers</option>
              {mockCustomers.map((c) => (
                <option key={c} key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-700 mb-3 flex items-center">
              <FiMapPin className="w-4 h-4 mr-1" /> Warehouse
            </h4>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
              <option>WH-Main Hub</option>
              <option>WH-East Branch</option>
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

      {/* 4. Create Delivery Order Modal */}
      <CreateDeliveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 5. Delivery Order Details Panel */}
      <DeliveryDetailsPanel
        delivery={selectedDelivery}
        onClose={() => setSelectedDelivery(null)}
      />
    </div>
  );
};

export default DeliveryOrders;
