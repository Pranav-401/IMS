import React from "react";
import {
  FiBox,
  FiAlertTriangle,
  FiLogIn,
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiRepeat,
  FiLayers,
  FiTruck,
  FiGitCommit,
  FiCornerDownRight,
  FiSettings,
  FiUser,
  FiBarChart2,
  FiFilter,
  FiTrendingUp,
  FiCheckCircle,
  FiXCircle,
  FiMapPin,
  FiCpu,
  FiHardDrive,
  FiRefreshCcw,
  FiTrello,
  FiCalendar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

// --- Custom Components ---

/** * Reusable Green Button Component
 * @param {string} children - Button text
 * @param {boolean} primary - Primary (solid green) or secondary (outline)
 * @param {string} className - Additional classes
 */
const StockButton = ({ children, primary = true, className = "", onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-3 font-semibold rounded-xl transition-all duration-300 transform
      ${
        primary
          ? "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl shadow-green-500/50"
          : "bg-white text-green-600 border border-green-600 hover:bg-green-50 hover:text-green-700"
      }
      ${className}
    `}
  >
    {children}
  </button>
);

/** * KPI Dashboard Card with Glassy Effect
 * @param {React.ReactNode} icon - Icon component
 * @param {string} label - Card label
 * @param {string} value - Card value
 * @param {React.ReactNode} sparkline - Sparkline/mini-graph placeholder
 */
const KPICard = ({ icon, label, value, sparkline }) => (
  <div className="p-5 bg-white rounded-2xl shadow-xl transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100">
    <div className="flex items-center justify-between">
      <div className="p-3 bg-green-50 rounded-lg text-green-600">{icon}</div>
      <div className="text-sm font-medium text-gray-500">{label}</div>
    </div>
    <div className="mt-4 text-3xl font-bold text-gray-900">{value}</div>
    <div className="mt-3 h-10">
      {/* Sparkline/Mini-Graph Placeholder (Green Theme) */}
      {sparkline}
    </div>
  </div>
);

/** * Feature Card
 */
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="text-green-600 text-3xl mb-3">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const MiniBarGraph = ({ data }) => {
  const max = Math.max(...data);
  const normalizedData = data.map((d) => (d / max) * 100);

  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      {normalizedData.map((height, index) => (
        <rect
          key={index}
          x={index * (100 / data.length) + 1}
          y={30 - height * 0.3}
          width={100 / data.length - 2}
          height={height * 0.3}
          fill="#10B981"
          rx="1"
        />
      ))}
    </svg>
  );
};

/** Placeholder for a tiny sparkline (data is relative height) */
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
      <polyline fill="none" stroke="#10B981" strokeWidth="3" points={points} />
    </svg>
  );
};

// --- Layout and Section Data ---

const kpis = [
  {
    icon: <FiBox className="w-5 h-5" />,
    label: "Total Products in Stock",
    value: "8,450",
    sparkline: <MiniBarGraph data={[2, 4, 3, 5, 4, 6, 7]} />,
  },
  {
    icon: <FiAlertTriangle className="w-5 h-5" />,
    label: "Low / Out of Stock Items",
    value: "124",
    sparkline: <MiniBarGraph data={[7, 6, 5, 4, 5, 3, 2]} />,
  },
  {
    icon: <FiArrowDownCircle className="w-5 h-5" />,
    label: "Pending Receipts",
    value: "18",
    sparkline: <MiniSparkline data={[10, 15, 12, 18, 20, 15, 22]} />,
  },
  {
    icon: <FiArrowUpCircle className="w-5 h-5" />,
    label: "Pending Deliveries",
    value: "45",
    sparkline: <MiniSparkline data={[20, 25, 30, 28, 35, 40, 45]} />,
  },
  {
    icon: <FiRepeat className="w-5 h-5" />,
    label: "Internal Transfers Scheduled",
    value: "5",
    sparkline: <MiniBarGraph data={[1, 2, 0, 3, 1, 4, 5]} />,
  },
];

const features = [
  {
    icon: <FiTrello />,
    title: "Product Management",
    description:
      "Centralized catalog, variants, and detailed product lifecycle tracking.",
  },
  {
    icon: <FiArrowDownCircle />,
    title: "Receipts (Incoming Goods)",
    description:
      "Streamline receiving, quality checks, and automated stock updates.",
  },
  {
    icon: <FiArrowUpCircle />,
    title: "Delivery Orders",
    description:
      "Efficient order fulfillment, picking/packing, and shipment tracking.",
  },
  {
    icon: <FiRepeat />,
    title: "Internal Transfers",
    description:
      "Seamlessly move stock between warehouses and internal locations.",
  },
  {
    icon: <FiRefreshCcw />,
    title: "Stock Adjustments",
    description:
      "Conduct cycle counts, audits, and quickly reconcile inventory discrepancies.",
  },
  {
    icon: <FiCpu />,
    title: "Smart Alerts & Multi-Warehouse",
    description:
      "Low stock warnings, reorder points, and manage unlimited locations.",
  },
];

const filterChips = [
  {
    label: "Document Type",
    options: ["Receipts", "Delivery", "Internal", "Adjustments"],
  },
  {
    label: "Status",
    options: ["Draft", "Waiting", "Ready", "Done", "Canceled"],
  },
  {
    label: "Warehouse / Location",
    options: ["Main Hub", "East Branch", "Store A", "QC Hold"],
  },
  {
    label: "Product Category",
    options: ["Electronics", "Components", "Assembly Kits", "Raw Materials"],
  },
];

const sidebarItems = [
  { icon: <FiBarChart2 className="w-5 h-5" />, label: "Dashboard" },
  { icon: <FiBox className="w-5 h-5" />, label: "Products" },
  { icon: <FiLayers className="w-5 h-5" />, label: "Operations" },
  { icon: <FiArrowDownCircle className="w-5 h-5" />, label: "Receipts" },
  { icon: <FiArrowUpCircle className="w-5 h-5" />, label: "Delivery" },
  { icon: <FiRefreshCcw className="w-5 h-5" />, label: "Adjustments" },
  { icon: <FiTruck className="w-5 h-5" />, label: "Move History" },
  { icon: <FiMapPin className="w-5 h-5" />, label: "Warehouse" },
  { icon: <FiSettings className="w-5 h-5" />, label: "Settings" },
  { icon: <FiUser className="w-5 h-5" />, label: "Profile" },
];

// --- Mini Graph Placeholders (SVG for visual effect) ---

/** Placeholder for a tiny bar graph (data is relative height) */


// --- Main Page Component ---

const Home = () => {
  return (
    <div className="min-h-screen montserrat bg-white text-gray-900 font-sans antialiased">
      {/* --- Header (For Login Button) --- */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-extrabold text-gray-900 flex items-center"
          >
            <FiLayers className="w-6 h-6 text-green-600 mr-2" />
            Stock<span className="text-green-600">Master</span>
          </Link>
          <Link to="/login">
            <StockButton
              primary={false}
              className="border-2 border-green-600 flex items-center"
            >
              <FiLogIn className="mr-2" /> Login
            </StockButton>
          </Link>
        </div>
      </header>

      {/* --- Main Content Layout --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pt-10 pb-20">
        {/* 1️⃣ Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">
              Modular Inventory
            </span>
            <h1 className="text-6xl font-extrabold leading-tight mt-2 mb-6">
              Smarter Inventory{" "}
              <span className="text-green-600">Starts Here.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Digitize your stock operations with an intuitive, modular system
              designed for speed and accuracy.
            </p>
            <div className="flex space-x-4">
              <StockButton>Get Started</StockButton>
              <StockButton primary={false}>View Demo</StockButton>
            </div>
          </div>
          {/* Right side: Dashboard Preview Mockup */}
          <div className="p-8 bg-gray-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-1 perspective-[1000px]">
            <div className="bg-white p-6 rounded-2xl shadow-inner border border-green-800/50">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold">Inventory Overview</h2>
                <FiCalendar className="text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-3 bg-green-50 rounded-lg text-green-600 font-bold">
                  In Stock: 8450
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-red-600 font-bold">
                  Low Stock: 124
                </div>
                <div className="col-span-2 h-10 bg-green-200/50 rounded-lg flex items-center p-2 text-sm text-green-800">
                  <FiTrendingUp className="mr-2" /> Performance up 4.5% this
                  month.
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* 2️⃣ Key KPIs Snapshot (Dashboard Style Cards) */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Real-time Metrics, Beautifully Displayed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {kpis.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* 3️⃣ Filters Preview (Horizontal Chip Filters) & 6️⃣ Sidebar Preview */}
        <section className="grid lg:grid-cols-[250px_1fr] gap-12">
          {/* 6️⃣ Sidebar Navigation Preview */}
          <div className="hidden lg:block">
            <h2 className="text-2xl font-bold mb-4">Navigation Preview</h2>
            <div className="p-4 bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-28">
              <ul className="space-y-1">
                {sidebarItems.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-center p-3 rounded-xl transition-colors duration-200 cursor-pointer
                      ${
                        item.label === "Dashboard"
                          ? "bg-green-50 text-green-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Intuitive Filtering</h2>
            <p className="text-lg text-gray-600 mb-8">
              Access the exact data you need with modern, touch-friendly filter
              chips.
            </p>
            {/* 3️⃣ Filters Preview */}
            <div className="space-y-6">
              {filterChips.map((filter, index) => (
                <div key={index}>
                  <h4 className="text-md font-semibold mb-3 text-gray-700 flex items-center">
                    <FiFilter className="mr-2 text-green-600" /> {filter.label}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {filter.options.map((option, idx) => (
                      <span
                        key={idx}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                          ${
                            idx === 0 && filter.label !== "Document Type" // Example active state
                              ? "bg-green-600 text-white shadow-md shadow-green-500/30"
                              : "bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-700 border border-gray-200"
                          }`}
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* 4️⃣ Features Grid (4–6 Cards) */}
        <section>
          <h2 className="text-3xl font-bold mb-12 text-center">
            Powering Every Inventory Function
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* 5️⃣ Inventory Flow Illustration (Simple Line Diagram) */}
        <section className="py-8">
          <h2 className="text-3xl font-bold mb-10 text-center">
            The Modular Inventory Flow
          </h2>
          <div className="flex flex-wrap justify-center items-center text-center">
            {["Receive", "Transfer", "Deliver", "Adjust", "Ledger Logged"].map(
              (step, index, array) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center group">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-600 text-white text-3xl shadow-lg group-hover:bg-green-700 transition-colors duration-300">
                      {index === 0 && <FiArrowDownCircle />}
                      {index === 1 && <FiRepeat />}
                      {index === 2 && <FiArrowUpCircle />}
                      {index === 3 && <FiRefreshCcw />}
                      {index === 4 && <FiCheckCircle />}
                    </div>
                    <p className="mt-3 text-lg font-semibold text-gray-800">
                      {step}
                    </p>
                  </div>
                  {index < array.length - 1 && (
                    <div className="hidden sm:block w-24 h-0.5 bg-green-400 mx-4 relative">
                      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-green-600"></div>
                    </div>
                  )}
                </React.Fragment>
              )
            )}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* 7️⃣ Call to Action Section */}
        <section className="text-center py-16 bg-gray-50 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
            Start Managing Your Inventory the{" "}
            <span className="text-green-600">Smart Way.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses streamlining their operations today.
          </p>
          <div className="flex justify-center space-x-6">
            <StockButton className="text-lg">Sign Up</StockButton>
            <StockButton primary={false} className="text-lg">
              Try Demo
            </StockButton>
          </div>
        </section>
      </main>

      {/* 8️⃣ Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center flex-wrap">
          <div className="text-gray-400">
            &copy; {new Date().getFullYear()} StockMaster. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-green-400 hover:text-green-300 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-green-400 hover:text-green-300 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-green-400 hover:text-green-300 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
