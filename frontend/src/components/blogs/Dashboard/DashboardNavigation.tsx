"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { User, Settings, PenSquare, Home, BarChart2, FileText, LogOut } from "lucide-react"

interface DashboardNavigationProps {
  activeTab: "overview" | "blogs" | "stats" | "settings"
  setActiveTab: (tab: "overview" | "blogs" | "stats" | "settings") => void
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-6 mb-6 md:mb-0 md:sticky md:top-8 md:h-fit">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-black mr-2" />
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>

      <nav className="space-y-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "overview" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Home className="h-5 w-5 mr-3" />
          Overview
        </button>

        <button
          onClick={() => setActiveTab("blogs")}
          className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "blogs" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FileText className="h-5 w-5 mr-3" />
          My Blogs
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "stats" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <BarChart2 className="h-5 w-5 mr-3" />
          Statistics
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "settings" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </button>
      </nav>

      <div className="pt-6 mt-6 border-t border-gray-200">
        <Link
          to="/blogs/Create"
          className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
        >
          <PenSquare className="h-5 w-5 mr-3" />
          Create New Blog
        </Link>

        <Link
          to="/blogs"
          className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
        >
          <Home className="h-5 w-5 mr-3" />
          Back to Home
        </Link>

        <button
          
          className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default DashboardNavigation

