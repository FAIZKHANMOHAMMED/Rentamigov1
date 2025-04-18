"use client"

import { useState } from "react"
import { ArrowRight, Droplets, Zap, Flame, Plus } from "lucide-react"

interface OtherChargesProps {
  onOtherChargesChange?: (charges: Record<string, any>) => void
}

const OtherCharges = ({ onOtherChargesChange }: OtherChargesProps) => {
  const [charges, setCharges] = useState({
    water: {
      amount: "",
      type: "",
    },
    electricity: {
      amount: "",
      type: "",
    },
    gas: {
      amount: "",
      type: "",
    },
    others: {
      amount: "",
      type: "",
    },
  })

  const handleChange = (utility: string, field: string, value: string) => {
    const updatedCharges = {
      ...charges,
      [utility]: {
        ...charges[utility as keyof typeof charges],
        [field]: value,
      },
    }
    setCharges(updatedCharges)
    onOtherChargesChange?.(updatedCharges)
  }

  const utilities = [
    { key: "water", label: "Water", icon: Droplets },
    { key: "electricity", label: "Electricity", icon: Zap },
    { key: "gas", label: "Gas", icon: Flame },
    { key: "others", label: "Others", icon: Plus },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold text-black">Other Charges</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Utility Charges</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {utilities.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4 transition-all duration-300 hover:shadow-md"
          >
            <h4 className="text-lg font-medium flex items-center gap-2 text-gray-800">
              <Icon size={20} className="text-gray-600" />
              {label}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`${key}Type`}
                    value="inclusive"
                    checked={charges[key as keyof typeof charges].type === "inclusive"}
                    onChange={(e) => handleChange(key, "type", e.target.value)}
                    className="text-black border-gray-300 bg-white focus:ring-black"
                  />
                  <span className="text-gray-700">Inclusive</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`${key}Type`}
                    value="exclusive"
                    checked={charges[key as keyof typeof charges].type === "exclusive"}
                    onChange={(e) => handleChange(key, "type", e.target.value)}
                    className="text-black border-gray-300 bg-white focus:ring-black"
                  />
                  <span className="text-gray-700">Exclusive</span>
                </label>
              </div>

              {charges[key as keyof typeof charges].type === "exclusive" && (
                <input
                  type="number"
                  min="0"
                  value={charges[key as keyof typeof charges].amount}
                  onChange={(e) => handleChange(key, "amount", e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()} charges`}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-black outline-none transition-colors duration-200 text-gray-800 placeholder:text-gray-400"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OtherCharges

