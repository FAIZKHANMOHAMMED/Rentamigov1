"use client"

import { useState, useCallback } from "react"
import { Building2, MapPin, IndianRupee, Calendar, Image } from "lucide-react"
import PropertyName from "../PropertyName"
import PropertyAddress from "../PropertyAddress"
import MapSelector from "../MapSelector"
import PropertySize from "../PropertySize"
import PropertyFeatures from "../PropertyFeatures"
import FlatAmenities from "../FlatAmenities"
import SocietyAmenities from "../SocietyAmenities"
import MediaUpload from "../MediaUpload"
import AvailabilityDate from "../AvailabilityDate"
import Restrictions from "../Restrictions"
import FinalSteps from "../FinalSteps"

interface ApartmentProps {
  propertyId: string
  onSubmit?: () => void
}

interface Address {
  street: string
  city: string
  state: string
  country: string
  pincode: string
  flatNo: string
}

interface Coordinates {
  lat: number
  lng: number
}

interface Size {
  builtUpArea: string
  carpetArea: string
  superBuiltUpArea: string
  unit: string
}

interface Features {
  bedrooms: string
  bathrooms: string
  balconies: string
  parking: string
  furnishing: string
  floor: string
  totalFloors: string
  facing: string
  age: string
  rent: string
  securityDeposit: string
  maintenanceCharges: string
  maintenancePeriod: string
  availableFrom: Date
  preferredTenants: string[]
  amenities: string[]
  propertyFeatures: string[]
  societyFeatures: string[]
  restrictions: string[]
  images: string[]
  videos: string[]
}

interface FormData {
  propertyName: string
  address: Address
  coordinates: Coordinates
  size: Size
  features: Features
}

interface PropertyNameProps {
  propertyName: string
  onPropertyNameChange: (name: string) => void
}

interface MapSelectorProps {
  latitude: string
  longitude: string
  onLocationSelect: (lat: string, lng: string, address?: any) => void
  initialShowMap?: boolean
}

interface PropertySizeProps {
  onPropertySizeChange: (size: string) => void
}

interface PropertyFeaturesProps {
  onFeaturesChange?: (features: Record<string, any>) => void
}

interface FlatAmenitiesProps {
  amenities: string[]
  onChange: (amenities: string[]) => void
}

interface SocietyAmenitiesProps {
  amenities: string[]
  onChange: (amenities: string[]) => void
}

const Apartment = ({ propertyId, onSubmit }: ApartmentProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    propertyName: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      flatNo: ""
    },
    coordinates: {
      lat: 0,
      lng: 0
    },
    size: {
      builtUpArea: "",
      carpetArea: "",
      superBuiltUpArea: "",
      unit: "sq-ft"
    },
    features: {
      bedrooms: "",
      bathrooms: "",
      balconies: "",
      parking: "",
      furnishing: "unfurnished",
      floor: "",
      totalFloors: "",
      facing: "",
      age: "",
      rent: "",
      securityDeposit: "",
      maintenanceCharges: "",
      maintenancePeriod: "monthly",
      availableFrom: new Date(),
      preferredTenants: [],
      amenities: [],
      propertyFeatures: [],
      societyFeatures: [],
      restrictions: [],
      images: [],
      videos: []
    }
  })

  const handleAddressChange = useCallback((newAddress: Address) => {
    setFormData(prev => ({
      ...prev,
      address: newAddress
    }))
  }, [])

  const handleLocationSelect = useCallback((lat: string, lng: string, address?: any) => {
    setFormData(prev => ({
      ...prev,
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      },
      address: {
        ...prev.address,
        street: address?.address || prev.address.street,
        city: address?.city || prev.address.city,
        state: address?.state || prev.address.state,
        country: address?.country || prev.address.country,
        pincode: address?.pinCode || prev.address.pincode
      }
    }))
  }, [])

  const handleSaveStep = async (step: number) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/basicdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          propertyId,
          step,
          data: formData
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Step saved successfully!")
        setCurrentStep(prev => prev + 1)
      } else {
        setError(data.error || "Failed to save step")
      }
    } catch (error) {
      setError("Failed to connect to the server")
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <PropertyName
                  propertyName={formData.propertyName}
                  onPropertyNameChange={(name: string) => setFormData(prev => ({ ...prev, propertyName: name }))}
                />
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_button]:border-black/20 [&_button]:text-black [&_button]:hover:bg-black [&_button]:hover:text-white [&_svg]:text-black">
                <div className="space-y-6">
                  <div className="h-[450px] relative rounded-lg overflow-hidden border border-black/20 [&_.mapboxgl-ctrl-geocoder]:!bg-white [&_.mapboxgl-ctrl-geocoder--input]:!text-black [&_.mapboxgl-ctrl-geocoder--suggestion]:!text-black [&_.mapboxgl-ctrl-geocoder--suggestion-title]:!text-black [&_.mapboxgl-ctrl-geocoder--suggestion-address]:!text-black">
                    <MapSelector
                      latitude={formData.coordinates.lat.toString()}
                      longitude={formData.coordinates.lng.toString()}
                      onLocationSelect={(lat, lng, address) => {
                        handleLocationSelect(lat, lng, address);
                      }}
                      initialShowMap={true}
                    />
                  </div>
                  <PropertyAddress
                    address={formData.address}
                    onAddressChange={handleAddressChange}
                    showFlatNo={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Size</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <PropertySize
                  onPropertySizeChange={(size: string) => setFormData(prev => ({
                    ...prev,
                    size: {
                      ...prev.size,
                      builtUpArea: size
                    }
                  }))}
                />
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Features</h3>
              </div>
              <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_input[type=number]]:text-black [&_input[type=number]]:placeholder:text-black [&_input[type=number]]:bg-white [&_input[type=number]]:border-black/20 [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
                <PropertyFeatures
                  onFeaturesChange={(features: Record<string, any>) => {
                    setFormData(prev => ({
                      ...prev,
                      features: {
                        ...prev.features,
                        ...features
                      }
                    }))
                  }}
                />
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Amenities</h3>
              </div>
              <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
                <FlatAmenities
                  amenities={formData.features.amenities}
                  onChange={(amenities: string[]) => setFormData(prev => ({ ...prev, features: { ...prev.features, amenities } }))}
                />
              </div>
              <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
                <SocietyAmenities
                  amenities={formData.features.societyFeatures}
                  onChange={(amenities: string[]) => setFormData(prev => ({ ...prev, features: { ...prev.features, societyFeatures: amenities } }))}
                />
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Image className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Media Upload</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <MediaUpload
                  images={formData.features.images}
                  videos={formData.features.videos}
                  onImagesChange={(images) => setFormData(prev => ({ ...prev, features: { ...prev.features, images } }))}
                  onVideosChange={(videos) => setFormData(prev => ({ ...prev, features: { ...prev.features, videos } }))}
                />
              </div>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Calendar className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Availability & Restrictions</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <AvailabilityDate
                  date={formData.features.availableFrom}
                  onChange={(date) => setFormData(prev => ({ ...prev, features: { ...prev.features, availableFrom: date } }))}
                />
              </div>
              <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
                <Restrictions
                  restrictions={formData.features.restrictions}
                  onChange={(restrictions) => setFormData(prev => ({ ...prev, features: { ...prev.features, restrictions } }))}
                />
              </div>
            </div>
          </div>
        )
      case 7:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Final Review</h3>
              </div>
              <FinalSteps
                formData={formData}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-6 w-6 text-black" />
          <h1 className="text-2xl font-semibold text-black">List Your Apartment</h1>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
        <p className="text-sm text-black/60 mt-2">Step {currentStep} of 7</p>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1 || loading}
            className="px-6 py-2 bg-white text-black border border-black/20 rounded-lg hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep === 7) {
                onSubmit?.()
              } else {
                handleSaveStep(currentStep)
              }
            }}
            disabled={loading}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : currentStep === 7 ? "Submit" : "Next"}
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {success}
          </div>
        )}
      </div>
    </div>
  )
}

export default Apartment

