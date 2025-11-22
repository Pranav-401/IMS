import React from "react";
import {
  FiLayers,
  FiSearch,
  FiBell,
  FiUser,
  FiBox,
  FiMapPin,
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiRepeat,
  FiRefreshCcw,
  FiTruck,
  FiGitCommit,
  FiSettings,
  FiBarChart2,
  FiAlertTriangle,
  FiFilter,
  FiCalendar,
  FiGlobe,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
  FiMove,
  FiInfo,
  FiPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";

// --- Utility Components (from Home.jsx theme) ---

// Placeholder for a tiny sparkline (Green Theme)
const MiniSparkline = ({ data }) => {
  const max = Math.max(...data);
  const points = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${30 - (d / max) * 25}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      <polyline
        fill="none"
        stroke="#10B981" // Green Accent
        strokeWidth="3"
        points={points}
      />
    </svg>
  );
};

// --- Data Structures ---

const kpis = [
  {
    icon: <FiBox className="w-6 h-6" />,
    label: "Total Stock Items",
    value: "8,450",
    trend: [10, 15, 12, 18, 20, 15, 22],
  },
  {
    icon: <FiAlertTriangle className="w-6 h-6" />,
    label: "Low Stock Items",
    value: "124",
    trend: [7, 6, 5, 4, 5, 3, 2],
  },
  {
    icon: <FiArrowDownCircle className="w-6 h-6" />,
    label: "Pending Receipts",
    value: "18",
    trend: [1, 2, 4, 3, 5, 4, 6],
  },
  {
    icon: <FiArrowUpCircle className="w-6 h-6" />,
    label: "Pending Deliveries",
    value: "45",
    trend: [2, 5, 7, 6, 8, 9, 10],
  },
  {
    icon: <FiRepeat className="w-6 h-6" />,
    label: "Transfers Waiting",
    value: "5",
    trend: [0, 1, 2, 1, 3, 2, 5],
  },
];

const sidebarItems = [
  { icon: <FiBarChart2 />, label: "Dashboard", active: true },
  { icon: <FiBox />, label: "Products" },
  { icon: <FiMapPin />, label: "Locations" },
  { icon: <FiArrowDownCircle />, label: "Receipts (Incoming)" },
  { icon: <FiArrowUpCircle />, label: "Delivery Orders (Outgoing)" },
  { icon: <FiRepeat />, label: "Internal Transfers" },
  { icon: <FiRefreshCcw />, label: "Stock Adjustments" },
  { icon: <FiTruck />, label: "Move History" },
  { icon: <FiGitCommit />, label: "Inventory Overview" },
  { icon: <FiSettings />, label: "Settings" },
  { icon: <FiUser />, label: "Profile" },
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

const filterChips = [
  { label: "Receipts", type: "Document Type", active: true },
  { label: "Delivery", type: "Document Type" },
  { label: "Transfer", type: "Document Type" },
  { label: "Adjustments", type: "Document Type" },
  { label: "Draft", type: "Status" },
  { label: "Ready", type: "Status", active: true },
  { label: "Done", type: "Status" },
  { label: "WH-Main", type: "Warehouse" },
  { label: "Electronics", type: "Category" },
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

const activityTimeline = [
  {
    icon: <FiArrowDownCircle />,
    color: "green",
    label: "Receipt REC-1021 created",
    time: "12:35 PM",
  },
  {
    icon: <FiArrowUpCircle />,
    color: "blue",
    label: "Delivery DEL-453 ready for picking",
    time: "11:01 AM",
  },
  {
    icon: <FiRepeat />,
    color: "yellow",
    label: "Internal transfer TRF-311 initiated",
    time: "10:15 AM",
  },
  {
    icon: <FiRefreshCcw />,
    color: "orange",
    label: "Stock adjusted for P-12 (+10)",
    time: "Yesterday",
  },
  {
    icon: <FiGitCommit />,
    color: "gray",
    label: "System update applied to Ledger",
    time: "Yesterday",
  },
];

// --- Sub-Components ---

/** 3. KPI Card Component */
const DashboardKPICard = ({ icon, label, value, trend }) => (
  <div className="p-5 bg-white rounded-2xl shadow-xl transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100 flex flex-col justify-between h-full">
    <div className="flex items-start justify-between">
      <div className="p-3 bg-green-50 rounded-lg text-green-600 shadow-md">
        {icon}
      </div>
      <div className="text-sm font-medium text-gray-500 text-right">
        {label}
      </div>
    </div>
    <div className="mt-4 text-4xl font-extrabold text-gray-900">{value}</div>
    <div className="mt-3 h-10 w-full">
      <MiniSparkline data={trend} />
    </div>
  </div>
);

/** 4. Central Operations Shortcut */
const OperationShortcutCard = ({ icon, title, description, action }) => (
  <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-transform duration-300 hover:shadow-xl hover:scale-[1.01] flex flex-col justify-between">
    <div className="text-green-600 text-4xl mb-3">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
    <p className="text-gray-500 text-sm mb-4">{description}</p>
    <button className="flex items-center text-green-600 font-semibold text-sm hover:text-green-700 transition duration-150">
      <FiPlus className="w-4 h-4 mr-1" />
      {action}
    </button>
  </div>
);

/** 9. Alert Panel Item */
const AlertItem = ({ type, message, color }) => {
  let icon, colorClass, borderClass;
  if (color === "red") {
    icon = <FiXCircle />;
    colorClass = "text-red-700 bg-red-50";
    borderClass = "border-red-500";
  } else if (color === "yellow") {
    icon = <FiAlertTriangle />;
    colorClass = "text-yellow-700 bg-yellow-50";
    borderClass = "border-yellow-500";
  } else {
    icon = <FiInfo />;
    colorClass = "text-green-700 bg-green-50";
    borderClass = "border-green-500";
  }

  return (
    <div
      className={`p-3 rounded-xl border-l-4 ${borderClass} ${colorClass} flex items-start space-x-3 mb-2 transition-colors duration-200`}
    >
      <span className="mt-1 flex-shrink-0">{icon}</span>
      <div className="text-sm">
        <p className="font-semibold">{type}</p>
        <p className="text-xs text-gray-700">{message}</p>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

const Dashboard = () => {
  const getStatusChipStyle = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-700";
      case "Ready":
        return "bg-blue-100 text-blue-700";
      case "Waiting":
        return "bg-yellow-100 text-yellow-700";
      case "Draft":
        return "bg-gray-100 text-gray-700";
      case "Canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 2️⃣ Left Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-2xl border-r border-gray-100 flex flex-col fixed h-full z-30">
        <div className="flex items-center mb-10">
          <FiLayers className="w-8 h-8 text-green-600 mr-2" />
          <h1 className="text-2xl font-extrabold text-gray-900">
            Stock<span className="text-green-600">Master</span>
          </h1>
        </div>
        <nav className="space-y-1">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={`/${item.label.toLowerCase().replace(/ /g, "-")}`}
              className={`flex items-center p-3 rounded-xl transition-colors duration-200
                ${
                  item.active
                    ? "bg-green-600 text-white font-semibold shadow-md shadow-green-500/50"
                    : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
                }`}
            >
              {React.cloneElement(item.icon, { className: "w-5 h-5 mr-3" })}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 ml-64 flex flex-col">
        {/* 1️⃣ Header / Global Navigation */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
          <div className="max-w-full mx-auto px-8 py-4 flex justify-between items-center">
            {/* Left Header Controls */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center p-2 rounded-xl bg-gray-100 border border-gray-200 w-96">
                <FiSearch className="w-5 h-5 text-gray-400 ml-1 mr-3" />
                <input
                  type="text"
                  placeholder="Global search: Products, Operations, SKUs..."
                  className="bg-transparent text-gray-800 focus:outline-none w-full text-sm"
                />
              </div>
              {/* Warehouse Switcher */}
              <div className="flex items-center text-sm font-medium text-gray-600 cursor-pointer hover:text-green-600 transition">
                <FiGlobe className="w-4 h-4 mr-1 text-green-600" />
                <span className="font-semibold">WH-Main Hub</span>
                <FiArrowDownCircle className="w-3 h-3 ml-1" />
              </div>
            </div>

            {/* Right Header Controls */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition">
                <FiBell className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-xl hover:bg-gray-100 transition">
                <div className="w-9 h-9 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold">
                  JD
                </div>
                <span className="text-sm font-medium text-gray-800">
                  John Doe
                </span>
                <FiArrowDownCircle className="w-3 h-3 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* --- Main Dashboard Content --- */}
        <main className="p-8 space-y-8 bg-gray-50">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Dashboard Overview
          </h2>

          {/* 3️⃣ Top KPI Cards */}
          <section className="grid grid-cols-5 gap-6">
            {kpis.map((kpi, index) => (
              <DashboardKPICard key={index} {...kpi} />
            ))}
          </section>

          {/* Core Content Grid */}
          <section className="grid grid-cols-12 gap-6">
            {/* Left Panel (8/12 Columns) */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* 4️⃣ Central Operations Snapshot */}
              <div className="grid grid-cols-3 gap-6">
                <OperationShortcutCard
                  icon={<FiArrowDownCircle />}
                  title="Receive Goods"
                  description="Create a new inbound shipment receipt."
                  action="Create Receipt"
                />
                <OperationShortcutCard
                  icon={<FiArrowUpCircle />}
                  title="Deliver Goods"
                  description="Create a new outbound customer delivery order."
                  action="Create Delivery"
                />
                <OperationShortcutCard
                  icon={<FiRepeat />}
                  title="Move Stock"
                  description="Execute an internal transfer between locations."
                  action="Internal Transfer"
                />
              </div>

              {/* 6️⃣ Quick Filter Chips */}
              <div className="p-5 bg-white rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FiFilter className="mr-2 text-green-600" /> Quick Filters
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterChips.map((chip, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm
                        ${
                          chip.active
                            ? "bg-green-600 text-white shadow-green-500/40"
                            : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600"
                        }`}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* 5️⃣ Real-Time Stock Movement Table */}
              <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiTruck className="mr-2 text-green-600" /> Real-Time Move
                  History
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Operation Type",
                          "Ref / Doc No",
                          "Source Location",
                          "Destination Location",
                          "Quantity",
                          "Status",
                          "Date",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {moveHistoryData.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-green-50/50 transition duration-150"
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                            {item.type === "Receipt" ? (
                              <FiArrowDownCircle className="text-green-600 mr-2" />
                            ) : item.type === "Delivery" ? (
                              <FiArrowUpCircle className="text-blue-600 mr-2" />
                            ) : (
                              <FiRepeat className="text-yellow-600 mr-2" />
                            )}
                            {item.type}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {item.ref}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {item.source}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {item.dest}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                            {item.qty}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusChipStyle(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                            {item.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Panel (4/12 Columns) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* 9️⃣ Alerts Panel */}
              <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiAlertTriangle className="mr-2 text-red-500" /> Critical
                  Alerts
                </h3>
                <div className="space-y-3">
                  {alertsData.map((alert, index) => (
                    <AlertItem key={index} {...alert} />
                  ))}
                </div>
              </div>

              {/* 7️⃣ Products / Stock Snapshot */}
              <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiBox className="mr-2 text-green-600" /> Products Snapshot
                </h3>
                <div className="space-y-4">
                  <div className="text-sm font-semibold">
                    Top 3 Low Stock Items:
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex justify-between">
                      <span>P-77 (Processor)</span>
                      <span className="text-red-600 font-bold">12 units</span>
                    </li>
                    <li className="flex justify-between">
                      <span>P-21 (Chassis)</span>
                      <span className="text-red-600 font-bold">0 units</span>
                    </li>
                    <li className="flex justify-between">
                      <span>P-55 (Cable Kit)</span>
                      <span className="text-yellow-600 font-bold">
                        35 units
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 8️⃣ Location Overview */}
              <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiMapPin className="mr-2 text-green-600" /> Location Overview
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>WH-Main Hub</span>
                    <span className="text-green-600 font-bold">
                      85% Capacity
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>WH-East Branch</span>
                    <span className="text-yellow-600 font-bold">
                      50% Capacity
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>QC Hold Zone</span>
                    <span className="text-red-600 font-bold">95% Capacity</span>
                  </div>
                </div>
              </div>

              {/* 10️⃣ Activity Timeline */}
              <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiClock className="mr-2 text-green-600" /> Activity Timeline
                </h3>
                <ol className="relative border-l border-gray-200 ml-4">
                  {activityTimeline.map((activity, index) => (
                    <li key={index} className="mb-4 ml-6">
                      <span
                        className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-white shadow-md ${
                          activity.color === "green"
                            ? "bg-green-600 text-white"
                            : activity.color === "blue"
                            ? "bg-blue-500 text-white"
                            : activity.color === "yellow"
                            ? "bg-yellow-500 text-gray-900"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {React.cloneElement(activity.icon, {
                          className: "w-4 h-4",
                        })}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {activity.label}
                      </h4>
                      <time className="block text-xs font-normal leading-none text-gray-400">
                        {activity.time}
                      </time>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </main>

        {/* 11️⃣ Footer */}
        <footer className="bg-white border-t border-gray-100 py-4 mt-auto">
          <div className="max-w-full mx-auto px-8 flex justify-between items-center text-sm text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} StockMaster. All rights
              reserved.
            </p>
            <div className="space-x-4">
              <Link to="/terms" className="hover:text-green-600 transition">
                Terms
              </Link>
              <Link to="/privacy" className="hover:text-green-600 transition">
                Privacy
              </Link>
              <Link to="/support" className="hover:text-green-600 transition">
                Support
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
