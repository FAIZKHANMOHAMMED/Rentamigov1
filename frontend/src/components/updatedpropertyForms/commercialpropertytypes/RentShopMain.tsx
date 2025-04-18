"use client"

import type React from "react"
import { useState } from "react"
import MapSelector from "../MapSelector"
import ShopDetails from "../CommercialComponents/ShopDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Rent from "../residentialrent/Rent"
import SecurityDeposit from "../residentialrent/SecurityDeposit"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import OtherCharges from "../residentialrent/OtherCharges"
import Brokerage from "../residentialrent/Brokerage"
import AvailabilityDate from "../AvailabilityDate"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon } from "lucide-react"

interface FormData {
  propertyName: string
  shopType: string
  address: Record<string, string>
  landmark: string
  coordinates: {
    latitude: string
    longitude: string
  }
  isCornerProperty: boolean
  shopDetails: Record<string, any>
  propertyDetails: {
    expectedRent: string
    isNegotiable: boolean
    rentType: string
  }
  securityDeposit: Record<string, any>
  maintenanceAmount: Record<string, any>
  otherCharges: Record<string, any>
  brokerage: Record<string, any>
  availabilityDate: Record<string, any>
  contactDetails: Record<string, string>
  media: {
    images: { category: string; files: { url: string; file: File }[] }[]
    video?: { url: string; file: File }
    documents: { type: string; file: File }[]
  }
}

const RentShopMain = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyName: "",
    shopType: "",
    address: {},
    landmark: "",
    coordinates: {
      latitude: "",
      longitude: ""
    },
    isCornerProperty: false,
    shopDetails: {},
    propertyDetails: {
      expectedRent: "",
      isNegotiable: false,
      rentType: ""
    },
    securityDeposit: {},
    maintenanceAmount: {},
    otherCharges: {},
    brokerage: {},
    availabilityDate: {},
    contactDetails: {},
    media: {
      images: [],
      documents: []
    }
  })

  const [currentStep, setCurrentStep] = useState(0)

  // Function to update coordinates
  const handleLocationSelect = (latitude: string, longitude: string) => {
    setFormData({
      ...formData,
      coordinates: { latitude, longitude },
    })
  }

  const formSections = [
    {
      title: "Basic Information",
      content: (
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Store className="text-black mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Shop Details</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="propertyName" className="block text-black font-medium mb-2">
                Property Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="propertyName"
                  placeholder="Enter shop name"
                  value={formData.propertyName}
                  onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-0 focus:border-black outline-none transition-all duration-200 text-black placeholder:text-black bg-white"
                />
                <Store className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-black font-medium mb-2">Shop Type</label>
              <select
                value={formData.shopType}
                onChange={(e) => setFormData({ ...formData, shopType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-0 focus:border-black outline-none transition-all duration-200 bg-white text-black [&_option]:text-black [&_option]:bg-white"
              >
                <option value="" className="text-black bg-white">Select shop type</option>
                <option value="retail" className="text-black bg-white">Retail Shop</option>
                <option value="commercial" className="text-black bg-white">Commercial Shop</option>
                <option value="food" className="text-black bg-white">Food & Beverage</option>
                <option value="service" className="text-black bg-white">Service Shop</option>
              </select>
            </div>

            <div>
              <label htmlFor="address" className="block text-black font-medium mb-2">
                Address
              </label>
              <textarea
                id="address"
                placeholder="Enter complete address"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-0 focus:border-black outline-none transition-all duration-200 min-h-[100px] text-black placeholder:text-black bg-white"
              />
            </div>

            <div>
              <label htmlFor="landmark" className="block text-black font-medium mb-2">
                Landmark
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="landmark"
                  placeholder="Enter nearby landmark"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-0 focus:border-black outline-none transition-all duration-200 text-black placeholder:text-black bg-white"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
              </div>
            </div>

            <MapSelector
              latitude={formData.coordinates.latitude}
              longitude={formData.coordinates.longitude}
              onLocationSelect={handleLocationSelect}
            />

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCornerProperty}
                  onChange={(e) => setFormData({ ...formData, isCornerProperty: e.target.checked })}
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-black">This is a corner property</span>
              </label>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building2 className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Shop Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <ShopDetails onDetailsChange={(details) => setFormData({ ...formData, shopDetails: details })} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Rental Terms",
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building2 className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Rental Terms</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <Rent onRentChange={(rent) => setFormData({ ...formData, propertyDetails: { ...formData.propertyDetails, ...rent } })} />
              <SecurityDeposit onSecurityDepositChange={(deposit) => setFormData({ ...formData, securityDeposit: deposit })} />
              <MaintenanceAmount onMaintenanceAmountChange={(maintenance) => setFormData({ ...formData, maintenanceAmount: maintenance })} />
              <OtherCharges onOtherChargesChange={(charges) => setFormData({ ...formData, otherCharges: charges })} />
              <Brokerage onBrokerageChange={(brokerage) => setFormData({ ...formData, brokerage: brokerage })} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building2 className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Availability</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <AvailabilityDate onAvailabilityChange={(date) => setFormData({ ...formData, availabilityDate: date })} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Location Details",
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <MapPin className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Location Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <MapSelector 
                latitude={formData.coordinates.latitude}
                longitude={formData.coordinates.longitude}
                onLocationSelect={(lat, lng, address) => {
                  setFormData({
                    ...formData,
                    coordinates: { latitude: lat, longitude: lng },
                    address: address || {}
                  })
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Details",
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <UserCircle className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Contact Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialContactDetails onContactChange={(contact) => setFormData({ ...formData, contactDetails: contact })} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <ImageIcon className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Media</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialMediaUpload onMediaChange={(media) => setFormData({ ...formData, media })} />
            </div>
          </div>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{formSections[currentStep].title}</h2>
        <div className="h-1 w-20 bg-black mt-2 rounded-full"></div>
      </div>

      <div className="space-y-8">{formSections[currentStep].content}</div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-1" size={18} />
          Previous
        </button>

        {currentStep < formSections.length - 1 ? (
          <button
            type="button"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center"
            onClick={handleNext}
          >
            Next
            <ChevronRight className="ml-1" size={18} />
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center"
          >
            List Property
            <ChevronRight className="ml-1" size={18} />
          </button>
        )}
      </div>
    </form>
  )
}

export default RentShopMain

