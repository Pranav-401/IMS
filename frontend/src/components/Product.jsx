import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiUpload,
  FiEdit,
  FiEye,
  FiTrash2,
  FiBox,
  FiMapPin,
  FiRepeat,
  FiAlertTriangle,
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiX,
  FiSave,
  FiList,
  FiSettings,
  FiChevronsRight,
  FiCornerRightUp,
  FiTruck,
} from "react-icons/fi";

// --- Data Structure (Mock Data) ---
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

// --- Sub-Components ---

/** 4. Product Creation Modal / Slide-Over */
const ProductCreationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-40 flex justify-end">
      <div className="w-full max-w-lg bg-white shadow-3xl transform transition-transform duration-300 translate-x-0 rounded-l-2xl">
        <div className="p-8 h-full flex flex-col">
          <header className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Product
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition"
            >
              <FiX className="w-6 h-6" />
            </button>
          </header>

          <form className="flex-1 overflow-y-auto py-6 space-y-5">
            {/* Product Name & SKU */}
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Product Name *
                </span>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  SKU Code *
                </span>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </label>
            </div>

            {/* Category & UoM */}
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Category
                </span>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
                  <option>Electronics</option>
                  <option>Components</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Unit of Measure
                </span>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
                  <option>Pcs</option>
                  <option>Kgs</option>
                  <option>Grams</option>
                </select>
              </label>
            </div>

            {/* Initial Stock & Location */}
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Initial Stock
                </span>
                <input
                  type="number"
                  min="0"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Location Selector
                </span>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
                  <option>WH-Main Hub</option>
                  <option>WH-East Branch</option>
                </select>
              </label>
            </div>

            {/* Description */}
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Description (Optional)
              </span>
              <textarea
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </label>

            {/* Image Upload */}
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Upload Product Image
              </span>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:border-green-500 transition duration-150">
                <div className="space-y-1 text-center">
                  <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <p className="pl-1">Click to upload or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </label>
          </form>

          <footer className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold rounded-xl text-gray-700 border border-gray-300 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-500/50 transition"
            >
              <FiSave className="inline mr-2" /> Save Product
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

/** 5. Product Details Side Panel */
const ProductDetailsPanel = ({ product, onClose }) => {
  if (!product) return null;

  // Mock data for the panel content
  const stockBreakdown = [
    { location: "WH-Main Hub", quantity: 100, incoming: 50, outgoing: 30 },
    { location: "WH-East Branch", quantity: 20, incoming: 0, outgoing: 0 },
    { location: "Returns Area", quantity: 30, incoming: 0, outgoing: 0 },
  ];

  const moveHistory = [
    {
      date: "1d ago",
      type: "Receipt",
      qty: 50,
      source: "Supplier Z",
      dest: "WH-Main",
    },
    {
      date: "2d ago",
      type: "Delivery",
      qty: 30,
      source: "WH-Main",
      dest: "Customer A",
    },
    {
      date: "1w ago",
      type: "Transfer",
      qty: 10,
      source: "WH-Main",
      dest: "WH-East",
    },
  ];

  const [activeTab, setActiveTab] = useState("Stock Overview");

  const getOperationIcon = (type) => {
    if (type === "Receipt")
      return <FiArrowDownCircle className="text-green-600" />;
    if (type === "Delivery")
      return <FiArrowUpCircle className="text-red-600" />;
    if (type === "Transfer") return <FiRepeat className="text-blue-600" />;
    if (type === "Adjustment")
      return <FiRefreshCcw className="text-yellow-600" />;
    return <FiBox />;
  };

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-30 flex justify-end">
      <div className="w-full max-w-xl bg-white shadow-3xl transform transition-transform duration-300 translate-x-0 rounded-l-2xl">
        <div className="p-8 h-full flex flex-col">
          <header className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <img
                src={product.img}
                alt={product.name}
                className="w-12 h-12 rounded-lg mr-4 border border-gray-200"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500">
                  SKU: {product.sku} | Category: {product.category}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition"
            >
              <FiX className="w-6 h-6" />
            </button>
          </header>

          <div className="flex border-b border-gray-200 mt-4">
            {["Stock Overview", "Locations Breakdown", "Move History"].map(
              (tab) => (
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
              )
            )}
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            {/* Stock Overview Tab */}
            {activeTab === "Stock Overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries({
                    "On Hand": product.onHand,
                    Forecasted: product.forecasted,
                    Available: product.available,
                    Reserved: product.reserved,
                  }).map(([label, value]) => (
                    <div
                      key={label}
                      className="p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200"
                    >
                      <p className="text-sm text-gray-500">{label}</p>
                      <p
                        className={`text-2xl font-bold ${
                          value <= 0
                            ? "text-red-600"
                            : value < 50
                            ? "text-yellow-600"
                            : "text-gray-900"
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                {product.lowStock && (
                  <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-xl flex items-center space-x-3">
                    <FiAlertTriangle className="w-6 h-6 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      Alert: Stock is near reorder point (set at 20 units).
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Locations Breakdown Tab */}
            {activeTab === "Locations Breakdown" && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-3">
                  Stock by Location
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Location", "Qty", "Incoming", "Outgoing"].map(
                          (header) => (
                            <th
                              key={header}
                              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stockBreakdown.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {item.location}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 font-semibold">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-sm text-green-600">
                            {item.incoming}
                          </td>
                          <td className="px-4 py-3 text-sm text-red-600">
                            {item.outgoing}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Move History Tab */}
            {activeTab === "Move History" && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-3">
                  Recent Stock Movements
                </h4>
                <div className="space-y-3">
                  {moveHistory.map((move, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center text-sm"
                    >
                      <div className="flex items-center space-x-3">
                        {getOperationIcon(move.type)}
                        <div>
                          <p className="font-medium text-gray-900">
                            {move.type} ({move.qty})
                          </p>
                          <p className="text-xs text-gray-500">
                            From {move.source} to {move.destination}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{move.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const Products = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  // Toggle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(mockProducts.map((p) => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Toggle single row select
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((p) => p.id !== id) : [...prev, id]
    );
  };

  // Determine row style based on stock status
  const getRowStyle = (product) => {
    if (product.onHand <= 0) return "bg-red-50 hover:bg-red-100/70"; // Out of stock
    if (product.onHand < 20) return "bg-yellow-50 hover:bg-yellow-100/70"; // Low stock (e.g., threshold is 20)
    return "even:bg-gray-50 hover:bg-gray-100"; // Normal
  };

  // Determine row border/shadow for selected
  const getRowBorderStyle = (id) => {
    return selectedRows.includes(id)
      ? "border-l-4 border-green-600 shadow-inner"
      : "border-l-4 border-transparent";
  };

  const getAlertBadge = (product) => {
    if (product.onHand <= 0)
      return (
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-600 text-white">
          OOS
        </span>
      );
    if (product.lowStock)
      return (
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-400 text-gray-900">
          Low
        </span>
      );
    return null;
  };

  // 7. Alerts Section Data
  const currentAlerts = mockProducts
    .filter((p) => p.onHand <= 20)
    .map((p) => ({
      message:
        p.onHand === 0
          ? `Out of Stock: ${p.name}`
          : `Low Stock: ${p.name} (${p.onHand} left)`,
      color: p.onHand === 0 ? "red" : "yellow",
    }));

  // 8. Empty State Check
  if (mockProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <FiBox className="w-24 h-24 text-green-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          No products yet.
        </h2>
        <p className="text-gray-500 mb-8">
          It looks like you haven't added any products to your inventory.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-6 py-3 text-lg font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/50 transition"
        >
          <FiPlus className="w-5 h-5 mr-2" /> Create your first product
        </button>
        <ProductCreationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative flex">
      <div className="flex-1 p-8">
        {/* 1️⃣ Header Section */}
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h1 className="text-3xl font-extrabold text-gray-900">Products</h1>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, SKU, category..."
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
            <button className="p-3 rounded-xl text-gray-700 hover:bg-gray-100 transition">
              <FiUpload className="w-5 h-5" /> Import CSV
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-5 py-3 text-sm font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-500/50 transition"
            >
              <FiPlus className="w-5 h-5 mr-2" /> Create Product
            </button>
          </div>
        </header>

        <main className="grid grid-cols-12 gap-6">
          {/* Main Table Area (Span 12) */}
          <div className="col-span-12 space-y-6">
            {/* 7️⃣ Alerts Section */}
            {currentAlerts.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {currentAlerts.slice(0, 3).map((alert, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center shadow-md ${
                      alert.color === "red"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-400 text-gray-900"
                    }`}
                  >
                    <FiAlertTriangle className="w-4 h-4 mr-2" /> {alert.message}
                  </div>
                ))}
              </div>
            )}

            {/* 2️⃣ Product Table */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 w-10 text-left">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedRows.length === mockProducts.length}
                          className="rounded text-green-600 focus:ring-green-500"
                        />
                      </th>
                      {[
                        "",
                        "Name",
                        "SKU / Code",
                        "Category",
                        "UoM",
                        "On Hand",
                        "Forecasted",
                        "Allocated",
                        "Available",
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
                    {mockProducts.map((product) => (
                      <tr
                        key={product.id}
                        className={`${getRowStyle(product)} ${getRowBorderStyle(
                          product.id
                        )} transition duration-150`}
                        onClick={() => handleSelectRow(product.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(product.id)}
                            onChange={() => handleSelectRow(product.id)}
                            className="rounded text-green-600 focus:ring-green-500"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-8 h-8 rounded-md"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center space-x-2">
                          <span>{product.name}</span>
                          {getAlertBadge(product)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product.sku}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product.category}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product.uom}
                        </td>
                        <td
                          className={`px-4 py-3 whitespace-nowrap text-sm font-bold ${
                            product.onHand <= 0
                              ? "text-red-600"
                              : "text-gray-900"
                          }`}
                        >
                          {product.onHand}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {product.forecasted}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">
                          {product.reserved}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-green-600">
                          {product.available}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProduct(product);
                              }}
                              className="text-blue-600 hover:text-blue-800 transition"
                            >
                              <FiEye />
                            </button>
                            <button className="text-yellow-600 hover:text-yellow-800 transition">
                              <FiEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-800 transition">
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="p-4 flex justify-between items-center border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing 1 to {mockProducts.length} of {mockProducts.length}{" "}
                  results
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
                    Previous
                  </button>
                  <button className="px-3 py-1 text-sm rounded-lg bg-green-600 text-white shadow-md">
                    1
                  </button>
                  <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 3️⃣ Filters Panel (Expandable Drawer) */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white shadow-2xl p-6 transition-transform duration-300 ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <FiFilter className="mr-2 text-green-600" /> Advanced Filters
          </h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition"
          >
            <FiX className="w-6 h-6" />
          </button>
        </header>

        <div className="space-y-6">
          {Object.entries(mockFilters).map(([key, options]) => (
            <div key={key}>
              <h4 className="text-sm font-semibold uppercase text-gray-700 mb-3">
                {key.replace(/\b\w/g, (l) => l.toUpperCase())}
              </h4>
              <div className="flex flex-wrap gap-2">
                {options.map((option, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors duration-200 
                                    ${
                                      index === 0 && key !== "status"
                                        ? "bg-green-600 text-white shadow-sm shadow-green-500/40"
                                        : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    }`}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          ))}
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

      {/* 4. Product Creation Modal */}
      <ProductCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 5. Product Details Side Panel */}
      <ProductDetailsPanel
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* 6️⃣ Quick Action Buttons (Fixed Right Corner) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* Add Stock */}
        <button
          title="Add Stock"
          className="p-4 bg-white text-green-600 rounded-full shadow-lg border border-gray-200 transition duration-200 hover:ring-4 hover:ring-green-200 hover:shadow-xl"
        >
          <FiCornerRightUp className="w-6 h-6" />
        </button>
        {/* Adjust Stock */}
        <button
          title="Adjust Stock"
          className="p-4 bg-white text-yellow-600 rounded-full shadow-lg border border-gray-200 transition duration-200 hover:ring-4 hover:ring-yellow-200 hover:shadow-xl"
        >
          <FiSettings className="w-6 h-6" />
        </button>
        {/* Transfer Stock */}
        <button
          title="Transfer Stock"
          className="p-4 bg-white text-blue-600 rounded-full shadow-lg border border-gray-200 transition duration-200 hover:ring-4 hover:ring-blue-200 hover:shadow-xl"
        >
          <FiTruck className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Products;
