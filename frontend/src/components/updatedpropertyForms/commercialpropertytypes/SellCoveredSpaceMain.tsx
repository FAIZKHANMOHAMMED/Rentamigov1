"use client"

import { useState, useRef } from "react"
import PropertyName from "../PropertyName"
import CoveredOpenSpaceType from "../CommercialComponents/CoveredOpenSpaceType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import CornerProperty from "../CommercialComponents/CornerProperty"
import CoveredOpenSpaceDetails from "../CommercialComponents/CoveredOpenSpaceDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import {
  MapPin,
  Building2,
  DollarSign,
  Calendar,
  Warehouse,
  ImageIcon,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import MapLocation from "../CommercialComponents/MapLocation"

const SellCoveredSpaceMain = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    propertyName: "",
    spaceType: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    landmark: "",
    coordinates: { latitude: "", longitude: "" },
    isCornerProperty: false,
    spaceDetails: {},
    propertyDetails: {},
    price: "",
    area: {
      superBuiltUpAreaSqft: "",
      builtUpAreaSqft: "",
      carpetAreaSqft: "",
    },
    registrationCharges: {
      chargestype: "",
      registrationAmount: 0,
      stampDutyAmount: 0,
      brokeragedetails: false,
      brokerageAmount: 0
    },
    brokerage: {
      required: "",
      amount: 0
    },
    availability: {
      type: "immediate",
      isPetsAllowed: false,
      operatingHours: false
    },
    contactDetails: {
      name: "",
      email: "",
      phone: "",
      alternatePhone: "",
      bestTimeToContact: ""
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        lifts: [],
        emergencyExits: []
      },
      videoTour: null,
      documents: []
    }
  })

  const handleChange = (key: string, value: any) => {
    setFormData(prev => {
      const keys = key.split('.');
      if (keys.length > 1) {
        const newData = { ...prev };
        let current: any = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      }
      return { ...prev, [key]: value };
    });
  };

  const [currentStep, setCurrentStep] = useState(0)
  const formRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      title: "Basic Information",
      icon: <Warehouse className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <div className="space-y-6">
            <PropertyName
              propertyName={formData.propertyName}
              onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, propertyName: name }))}
            />
            <CoveredOpenSpaceType
              onSpaceTypeChange={(type) => setFormData((prev) => ({ ...prev, spaceType: type.toString() }))}
            />
          </div>

          <div className="space-y-6">
            <CommercialPropertyAddress 
              address={formData.address}
              onAddressChange={(address) => setFormData((prev) => ({ ...prev, address }))}
            />
            {/* <Landmark onLandmarkChange={(landmark) => setFormData((prev) => ({ ...prev, landmark }))} /> */}
            <MapLocation  
              latitude={formData.coordinates.latitude.toString()}
              longitude={formData.coordinates.longitude.toString()}
              landmark={formData.landmark}
              onLocationChange={(location) => setFormData((prev) => ({ ...prev, coordinates: location }))}
              onAddressChange={(address) => setFormData((prev) => ({ ...prev, address }))}
              onLandmarkChange={(landmark) => setFormData((prev) => ({ ...prev, landmark }))}
            />

            <CornerProperty
              isCornerProperty={formData.isCornerProperty}
              onCornerPropertyChange={(isCorner) =>
                setFormData((prev) => ({ ...prev, isCornerProperty: isCorner }))
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CoveredOpenSpaceDetails
            onDetailsChange={(details) => setFormData((prev) => ({ ...prev, spaceDetails: details }))}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData((prev) => ({ ...prev, propertyDetails: details }))}
          />
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <div className="space-y-4 text-black">
            <Price onPriceChange={(price) => setFormData((prev) => ({ ...prev, price: price.amount }))} />
          </div>
          <div className="text-black">
          <RegistrationCharges onRegistrationChargesChange={(charges) => {
                setFormData(prev => ({
                  ...prev,
                  registration: {
                    chargestype: charges.chargestype,
                    registrationAmount: charges.registrationAmount,
                    stampDutyAmount: charges.stampDutyAmount,
                    brokeragedetails: false,
                    brokerageAmount: 0
                  }
                }));
              }} />
          </div>
          <div className="text-black">
            <Brokerage bro={formData.brokerage} onBrokerageChange={(brokerage) => setFormData(prev => ({
                ...prev,
                brokerage: {
                  required: brokerage.required,
                  amount: brokerage.amount || 0
                }
              }))} />
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialAvailability onAvailabilityChange={(availability) => handleChange('availability', availability)} />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
         <CommercialContactDetails 
            contactInformation={formData.contactDetails}
            onContactChange={(contact) => handleChange('contactDetails', contact)} />
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialMediaUpload
            Media={{
              photos: Object.entries(formData.media.photos).map(([category, files]) => ({
                category,
                files: files.map(file => ({ url: URL.createObjectURL(file), file }))
              })),
              videoTour: formData.media.videoTour || null,
              documents: formData.media.documents
            }}
            onMediaChange={(media) => {
              const photos: Record<string, File[]> = {};
              media.photos.forEach(({ category, files }: { category: string, files: { url: string, file: File }[] }) => {
                photos[category] = files.map(f => f.file);
              });

              setFormData(prev => ({
                ...prev,
                media: {
                  ...prev.media,
                  photos: {
                    ...prev.media.photos,
                    ...photos
                  },
                  videoTour: media.videoTour || null,
                  documents: media.documents
                }
              }));
            }}
          />
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      // Scroll to top of the form
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      // Scroll to top of the form
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }

  const mapFormDataToBackendFormat = () => {
    // Format address from form data
    const addressData = formData.address as any;
    const photoUrls = formData.media.photos;

    // Organize photos by categories - this can be enhanced based on your UI's categorization
    const photos = {
      exterior: photoUrls.slice(0, Math.min(2, photoUrls.length)),
      interior: photoUrls.slice(2, Math.min(4, photoUrls.length)),
      floorPlan: photoUrls.slice(4, Math.min(5, photoUrls.length)),
      washrooms: photoUrls.slice(5, Math.min(6, photoUrls.length)),
      lifts: photoUrls.slice(6, Math.min(7, photoUrls.length)),
      emergencyExits: photoUrls.slice(7, photoUrls.length)
    };

    // Get property details
    const propertyDetailsData = formData.propertyDetails as any;

    return {
      basicInformation: {
        title: formData.propertyName,
        spaceType: [formData.spaceType],
        address: {
          street: addressData.street || "",
          city: addressData.city || "",
          state: addressData.state || "",
          zipCode: addressData.zipCode || "",
        },
        landmark: formData.landmark,
        location: {
          latitude: parseFloat(formData.coordinates.latitude) || 0,
          longitude: parseFloat(formData.coordinates.longitude) || 0,
        },
        isCornerProperty: formData.isCornerProperty,
      },
      spaceDetails: {
        ...(formData.spaceDetails as any)
      },
      propertyDetails: {
        area: {
          totalArea: parseFloat(formData.area.superBuiltUpAreaSqft) || 0,
          builtUpArea: parseFloat(formData.area.builtUpAreaSqft) || 0,
          carpetArea: parseFloat(formData.area.carpetAreaSqft) || 0,
        },
        floor: {
          floorNumber: propertyDetailsData?.floor?.floorNumber || 1,
          totalFloors: propertyDetailsData?.floor?.totalFloors || 1,
        },
        facingDirection: propertyDetailsData?.facingDirection || "North",
        furnishingStatus: propertyDetailsData?.furnishingStatus || "Unfurnished",
        propertyAmenities: propertyDetailsData?.propertyAmenities || [],
        wholeSpaceAmenities: propertyDetailsData?.wholeSpaceAmenities || [],
        electricitySupply: {
          powerLoad: propertyDetailsData?.electricitySupply?.powerLoad || 0,
          backup: propertyDetailsData?.electricitySupply?.backup || false,
        },
        waterAvailability: propertyDetailsData?.waterAvailability || [],
        propertyAge: propertyDetailsData?.propertyAge || 0,
        propertyCondition: propertyDetailsData?.propertyCondition || "Good",
        priceDetails: {
          Price: parseFloat(formData.price) || 0,
          isNegotiable: false,
          registrationCharges: {
            includedInPrice: (formData.registrationCharges as any)?.included || false,
            amount: (formData.registrationCharges as any)?.amount || 0,
            stampDuty: (formData.registrationCharges as any)?.stampDuty || 0,
          },
          brokerage: {
            required: (formData.brokerage as any)?.required || "No",
            amount: (formData.brokerage as any)?.amount || 0,
          },
          availability: {
            type: (formData.availability as any)?.type || "immediate",
            date: (formData.availability as any)?.date || null,
            preferredSaleDuration: (formData.availability as any)?.preferredSaleDuration || "",
            noticePeriod: (formData.availability as any)?.noticePeriod || "",
            isPetsAllowed: (formData.availability as any)?.isPetsAllowed || false,
            operatingHours: (formData.availability as any)?.operatingHours || false,
          }
        }
      },
      availability: {
        type: (formData.availability as any)?.type || "immediate",
        date: (formData.availability as any)?.date || null,
      },
      contactInformation: {
        name: (formData.contactDetails as any)?.name || "",
        email: (formData.contactDetails as any)?.email || "",
        phone: (formData.contactDetails as any)?.phone || "",
        alternatePhone: (formData.contactDetails as any)?.alternatePhone || "",
        bestTimeToContact: (formData.contactDetails as any)?.bestTimeToContact || "",
      },
      media: {
        photos,
        videoTour: formData.media.video,
        documents: [],
      },
      metadata: {
        createdBy: "frontend_user", // This will be replaced by actual user ID from auth on backend
        createdAt: new Date(),
      },
    };
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    setError(null);

    try {
      const backendFormData = mapFormDataToBackendFormat();
      console.log("Formatted data for backend:", backendFormData);

      // Send data to backend API
      const response = await axios.post(
        "/api/commercial/sell/covered-space",
        backendFormData
      );

      console.log("Response:", response.data);
      toast.success("Property listed successfully!");

      // Redirect to listing page or dashboard
    } catch (err: any) {
      console.error("Error submitting form:", err);
      const errorMessage = err.response?.data?.error || "Failed to submit property. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center cursor-pointer"
                  onClick={() => setCurrentStep(i)}
                >
                  <div className="flex flex-col items-center group">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                    >
                      {s.icon}
                    </div>
                    <span
                      className={`text-xs mt-1 font-medium transition-colors duration-200 ${i <= currentStep ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                        }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div
                        className={`w-12 h-1 transition-colors duration-200 ${i < currentStep ? "bg-black" : "bg-gray-200"
                          }`}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Sale Commercial Covered Space</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {steps[currentStep].component}
      </div>
      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-black hover:text-white"
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`flex items-center px-6 py-2 rounded-lg ${loading ? "bg-gray-600" : "bg-black hover:bg-gray-800"
                } text-white transition-all duration-200`}
            >
              {loading ? "Submitting..." : "Submit"}
              {!loading && <ChevronRight className="w-5 h-5 ml-2" />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellCoveredSpaceMain

