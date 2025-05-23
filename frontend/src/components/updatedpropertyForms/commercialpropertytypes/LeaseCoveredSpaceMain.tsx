import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import PropertyName from '../PropertyName';
import CoveredOpenSpaceType from '../CommercialComponents/CoveredOpenSpaceType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import CoveredOpenSpaceDetails from '../CommercialComponents/CoveredOpenSpaceDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, Calendar, Loader2, DollarSign, User } from "lucide-react"
import MapLocation from '../CommercialComponents/MapLocation';

interface FormData {
  propertyName: string;
  spaceType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
  spaceDetails: Record<string, any>;
  propertyDetails: Record<string, any>;
  leaseAmount: Record<string, any>;
  leaseTenure: Record<string, any>;
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: {
    water: { amount: number; type: string };
    electricity: { amount: number; type: string };
    gas: { amount: number; type: string };
    others: { amount: number; type: string };
  };
  brokerage: {
    amount?: number;
    required: string;
  };
  availability: {
    date: Date;
    availableImmediately: boolean;
    leaseDuration: string;
    noticePeriod: string;
    petsAllowed: boolean;
  };
  contactDetails: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
  };
  media: {
    photos: {
      exterior: File[];
      interior: File[];
      floorPlan: File[];
      washrooms: File[];
      lifts: File[];
      emergencyExits: File[];
    };
    videoTour: File | null;
    documents: File[];
  };
}

const LeaseCoveredSpaceMain = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    spaceType: [],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    spaceDetails: {},
    propertyDetails: {},
    leaseAmount: {},
    leaseTenure: {},
    maintenanceAmount: {
      amount: 0,
      frequency: 'monthly'
    },
    otherCharges: {
      water: { amount: 0, type: 'inclusive' },
      electricity: { amount: 0, type: 'inclusive' },
      gas: { amount: 0, type: 'inclusive' },
      others: { amount: 0, type: 'inclusive' }
    },
    brokerage: {
      required: 'no',
      amount: 0
    },
    availability: {
      date: new Date(),
      availableImmediately: false,
      leaseDuration: '',
      noticePeriod: '',
      petsAllowed: false
    },
    contactDetails: {
      name: '',
      email: '',
      phone: '',
      alternatePhone: '',
      bestTimeToContact: ''
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
  });

  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  // Form prevention utility function
  const preventDefault = (e: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    return false;
  };

  const formSections = [
    {
      title: 'Basic Information',
      icon: <MapPin className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="space-y-8"><PropertyName propertyName={formData.propertyName} onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, propertyName: name }))} />
            <CoveredOpenSpaceType onSpaceTypeChange={(type) => setFormData(prev => ({ ...prev, spaceType: type }))} />
          </div>

          <div className="space-y-8">


            <CommercialPropertyAddress address={formData.address} onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))} />
            <MapLocation
              latitude={formData.coordinates.latitude}
              longitude={formData.coordinates.longitude}
              landmark={formData.landmark}
              onLocationChange={(location) => setFormData(prev => ({ ...prev, coordinates: location }))}
              onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))}
              onLandmarkChange={(landmark) => setFormData(prev => ({ ...prev, landmark }))}
            />
            <CornerProperty isCornerProperty={formData.isCornerProperty} onCornerPropertyChange={(isCorner) => setFormData(prev => ({ ...prev, isCornerProperty: isCorner }))} />
          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-6 h-6" />,
      content: (
        <div className="space-y-8"><CoveredOpenSpaceDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, spaceDetails: details }))} />
          <CommercialPropertyDetails onDetailsChange={(details) => setFormData(prev => ({ ...prev, propertyDetails: details }))} />
        </div>
      )
    },
    {
      title: 'Lease Terms',
      icon: <DollarSign className="w-6 h-6" />,
      content: (
        <div className="space-y-8">

          <LeaseAmount onLeaseAmountChange={(amount) => setFormData(prev => ({ ...prev, leaseAmount: amount }))} />
          <LeaseTenure onLeaseTenureChange={(tenure) => setFormData(prev => ({ ...prev, leaseTenure: tenure }))} />
          <MaintenanceAmount maintenanceAmount={formData.maintenanceAmount} onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({ ...prev, maintenanceAmount: maintenance }))} />
          <OtherCharges otherCharges={formData.otherCharges} onOtherChargesChange={(charges) => {
            // Since the OtherCharges component sends the old state, wait for the component to update
            // by deferring the formData update with setTimeout
            setTimeout(() => {
              setFormData(prev => ({
                ...prev,
                otherCharges: {
                  water: charges.water || { amount: 0, type: 'inclusive' },
                  electricity: charges.electricity || { amount: 0, type: 'inclusive' },
                  gas: charges.gas || { amount: 0, type: 'inclusive' },
                  others: charges.others || { amount: 0, type: 'inclusive' }
                }
              }));
            }, 0);
          }} />
          <Brokerage bro={formData.brokerage} onBrokerageChange={(brokerage) => setFormData(prev => ({ ...prev, brokerage }))} />
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="space-y-8">


          <CommercialAvailability onAvailabilityChange={(availability) => setFormData(prev => ({
            ...prev,
            availability: {
              date: availability.date || new Date(),
              availableImmediately: availability.availableImmediately || false,
              leaseDuration: availability.preferredSaleDuration || '',
              noticePeriod: availability.noticePeriod || '',
              petsAllowed: availability.petsAllowed || false
            }
          }))} />
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <User className="w-6 h-6" />,
      content: (
        <div className="space-y-8">


          <CommercialContactDetails contactInformation={formData.contactDetails} onContactChange={(contact) => setFormData(prev => ({ ...prev, contactDetails: contact }))} />
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <Image className="w-6 h-6" />,
      content: (
        <div className="space-y-8">


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
              const photosByCategory: Record<string, File[]> = {
                exterior: [],
                interior: [],
                floorPlan: [],
                washrooms: [],
                lifts: [],
                emergencyExits: []
              };

              media.photos.forEach(({ category, files }) => {
                if (category in photosByCategory) {
                  photosByCategory[category] = files.map(f => f.file);
                }
              });

              setFormData(prev => ({
                ...prev,
                media: {
                  photos: {
                    exterior: photosByCategory.exterior,
                    interior: photosByCategory.interior,
                    floorPlan: photosByCategory.floorPlan,
                    washrooms: photosByCategory.washrooms,
                    lifts: photosByCategory.lifts,
                    emergencyExits: photosByCategory.emergencyExits
                  },
                  videoTour: media.videoTour || null,
                  documents: media.documents
                }
              }));
            }}
          />
        </div>
      )
    }
  ];


  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
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
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
  };

  // Function to upload media files to a server or cloud storage
  const uploadMediaFiles = async () => {
    // In a real implementation, you would upload files to your server or a cloud service
    // For this example, we'll return the URLs we have (even if they're blob URLs)
    const uploadedMedia = {
      photos: {
        exterior: formData.media.photos.exterior.map(f => URL.createObjectURL(f)) || [],
        interior: formData.media.photos.interior.map(f => URL.createObjectURL(f)) || [],
        floorPlan: formData.media.photos.floorPlan.map(f => URL.createObjectURL(f)) || [],
        washrooms: formData.media.photos.washrooms.map(f => URL.createObjectURL(f)) || [],
        lifts: formData.media.photos.lifts.map(f => URL.createObjectURL(f)) || [],
        emergencyExits: formData.media.photos.emergencyExits.map(f => URL.createObjectURL(f)) || []
      },
      videoTour: formData.media.videoTour ? URL.createObjectURL(formData.media.videoTour) : '',
      documents: formData.media.documents.map(doc => doc.name) || []
    };

    return uploadedMedia;
  };

  // Map frontend form data to backend model structure
  const mapFormDataToBackendModel = async () => {
    // Handle media upload first (this would involve actual file uploads in production)
    const uploadedMedia = await uploadMediaFiles();

    // Function to ensure correct casing for enum values
    const formatEnumValue = (value: string | undefined, enumType: 'leaseType' | 'frequency'): string => {
      if (!value) return '';

      if (enumType === 'leaseType') {
        // First letter capitalized for lease type ('Fixed' or 'Negotiable')
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      } else if (enumType === 'frequency') {
        // First letter capitalized for frequency ('Monthly', 'Quarterly', 'Yearly', 'Half-Yearly')
        if (value.toLowerCase() === 'half-yearly') return 'Half-Yearly';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }

      return value;
    };

    // Format the lease type and frequency values
    const leaseType = formatEnumValue(formData.leaseAmount?.type, 'leaseType');
    const maintenanceFrequency = formatEnumValue(formData.maintenanceAmount?.frequency, 'frequency');

    // Enhanced debugging for property age and other charges
    console.log('Frontend Form Data:', formData);
    console.log('Property Age (raw):', formData.propertyDetails?.propertyAge);
    console.log('Property Age Type:', typeof formData.propertyDetails?.propertyAge);
    console.log('Other Charges (Full Object):', formData.otherCharges);

    // Helper function to handle charge types and amounts
    const formatCharge = (charge: any) => {
      // Default values if charge is undefined
      const defaultCharge = { type: 'inclusive', amount: 0 };
      if (!charge) return defaultCharge;

      return {
        type: charge.type || 'inclusive',
        amount: charge.type === 'exclusive' ? Number(charge.amount || 0) : 0
      };
    };

    // Ensure we have the right structure for charges
    console.log('Other Charges before mapping:', formData.otherCharges);

    // Map the charges from OtherCharges component to the backend format
    const mappedCharges = {
      electricityCharges: formatCharge(formData.otherCharges.electricity),
      waterCharges: formatCharge(formData.otherCharges.water),
      gasCharges: formatCharge(formData.otherCharges.gas),
      otherCharges: formatCharge(formData.otherCharges.others)
    };

    console.log('Mapped charges for backend:', mappedCharges);

    // Create the backend data object with proper mapping
    const backendData = {
      basicInformation: {
        title: formData.propertyName || '',
        shedType: formData.spaceType || [],
        address: {
          street: formData.address.street || '',
          city: formData.address.city || '',
          state: formData.address.state || '',
          zipCode: formData.address.zipCode || ''
        },
        landmark: formData.landmark || '',
        location: {
          latitude: parseFloat(formData.coordinates.latitude) || 0,
          longitude: parseFloat(formData.coordinates.longitude) || 0
        },
        isCornerProperty: formData.isCornerProperty || false
      },
      coveredSpaceDetails: {
        totalArea: Number(formData.spaceDetails?.totalArea) || 0,
        sqaurefeet: formData.spaceDetails?.squareFeet || String(formData.spaceDetails?.totalArea || '0'),
        coveredarea: Number(formData.spaceDetails?.coveredArea) || 0,
        roadwidth: Number(formData.spaceDetails?.roadWidth) || 0,
        roadfeet: formData.spaceDetails?.roadWidthUnit || '',
        ceilingheight: Number(formData.spaceDetails?.ceilingHeight) || 0,
        ceilingfeet: formData.spaceDetails?.ceilingHeightUnit || '',
        noofopenslides: Number(formData.spaceDetails?.openSides) || 0
      },
      propertyDetails: {
        area: {
          totalArea: Number(formData.propertyDetails?.area?.totalArea) || 0,
          builtUpArea: Number(formData.propertyDetails?.area?.builtUpArea) || 0,
          carpetArea: Number(formData.propertyDetails?.area?.carpetArea) || 0
        },
        floor: {
          floorNumber: Number(formData.propertyDetails?.floor?.floorNumber) || 0,
          totalFloors: Number(formData.propertyDetails?.floor?.totalFloors) || 0
        },
        facingDirection: formData.propertyDetails?.facingDirection || '',
        furnishingStatus: formData.propertyDetails?.furnishingStatus || '',
        propertyAmenities: Array.isArray(formData.propertyDetails?.propertyAmenities)
          ? formData.propertyDetails.propertyAmenities
          : [],
        wholeSpaceAmenities: Array.isArray(formData.propertyDetails?.wholeSpaceAmenities)
          ? formData.propertyDetails.wholeSpaceAmenities
          : [],
        electricitySupply: {
          powerLoad: Number(formData.propertyDetails?.electricitySupply?.powerLoad) || 0,
          backup: Boolean(formData.propertyDetails?.electricitySupply?.backup)
        },
        propertyAge: String(formData.propertyDetails?.propertyAge || formData.propertyDetails?.age || '0-5'),
        propertyCondition: formData.propertyDetails?.propertyCondition || formData.propertyDetails?.condition || ''
      },
      leaseTerms: {
        leaseDetails: {
          leaseAmount: {
            amount: Number(formData.leaseAmount?.amount) || 0,
            type: leaseType || 'Fixed',
            duration: Number(formData.leaseAmount?.duration) || 1,
            durationUnit: (formData.leaseAmount?.durationUnit || 'Month').toLowerCase()
          }
        },
        tenureDetails: {
          minimumTenure: Number(formData.leaseTenure?.minimumTenure) || 0,
          minimumUnit: (formData.leaseTenure?.minimumUnit || '').toLowerCase(),
          maximumTenure: Number(formData.leaseTenure?.maximumTenure) || 0,
          maximumUnit: (formData.leaseTenure?.maximumUnit || '').toLowerCase(),
          lockInPeriod: Number(formData.leaseTenure?.lockInPeriod) || 0,
          lockInUnit: (formData.leaseTenure?.lockInUnit || '').toLowerCase(),
          noticePeriod: Number(formData.leaseTenure?.noticePeriod) || 0,
          noticePeriodUnit: (formData.leaseTenure?.noticePeriodUnit || '').toLowerCase()
        },
        maintenanceAmount: {
          amount: Number(formData.maintenanceAmount?.amount) || 0,
          frequency: maintenanceFrequency || 'Monthly'
        },
        otherCharges: mappedCharges,
        brokerage: {
          required: formData.brokerage?.required || 'no',
          amount: Number(formData.brokerage?.amount) || 0
        },
        availability: {
          date: formData.availability?.date || new Date(),
          availableImmediately: Boolean(formData.availability?.availableImmediately),
          leaseDuration: formData.availability?.leaseDuration || '',
          noticePeriod: formData.availability?.noticePeriod || '',
          petsAllowed: Boolean(formData.availability?.petsAllowed)
        }
      },
      contactInformation: {
        name: formData.contactDetails?.name || '',
        email: formData.contactDetails?.email || '',
        phone: formData.contactDetails?.phone || '',
        alternatePhone: formData.contactDetails?.alternatePhone || '',
        bestTimeToContact: formData.contactDetails?.bestTimeToContact || ''
      },
      media: uploadedMedia,
      metadata: {
        status: 'active',
        views: 0,
        favorites: 0,
        isVerified: false,
        createdBy: localStorage.getItem('userId') || null
      }
    };

    // Log for debugging
    console.log('Backend Data:', backendData);
    console.log('Property Age in Backend Data:', backendData.propertyDetails.propertyAge);
    console.log('Property Details in Backend Data:', backendData.propertyDetails);
    console.log('Other Charges in Backend Data:', backendData.leaseTerms.otherCharges);

    return backendData;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      preventDefault(e);
    }

    // If not on the last step, move to the next step instead of submitting
    if (currentStep < formSections.length - 1) {
      handleNext();
      return;
    }

    // Validate the final step before submitting
    if (!validateFinalStep()) {
      toast.error("Please add at least one image or document");
      return;
    }

    try {
      setIsSubmitting(true);
      toast.loading("Submitting your property listing...");

      // Map form data to backend model structure
      const backendData = await mapFormDataToBackendModel();

      // Make API call to create commercial lease covered space
      const response = await axios.post(
        `/api/commercial/lease/covered-space`,
        backendData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        toast.dismiss();
        toast.success("Property listed successfully!");
        navigate('/updatePropertyForm');
      } else {
        toast.dismiss();
        toast.error(response.data.error || "Failed to create property listing");
        console.error('Failed to create property listing:', response.data.error);
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "An error occurred while submitting the form");
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateCurrentStep = () => {
    // Add validation logic based on the current step
    switch (currentStep) {
      case 0: // Basic Information
        return !!formData.propertyName &&
          formData.spaceType.length > 0 &&
          !!formData.address.street &&
          !!formData.address.city &&
          !!formData.address.state &&
          !!formData.address.zipCode;
      case 1: // Property Details
        return !!formData.spaceDetails.totalArea;
      case 2: // Lease Terms
        return !!formData.leaseAmount.amount &&
          !!formData.leaseAmount.duration;
      case 3: // Availability
        return true; // Optional fields
      case 4: // Contact Information
        return !!formData.contactDetails.name &&
          !!formData.contactDetails.email &&
          !!formData.contactDetails.phone;
      case 5: // Property Media
        return true; // We'll validate this in validateFinalStep when actually submitting
      default:
        return true;
    }
  };

  const validateFinalStep = () => {
    // Check if media uploads are required and validate accordingly
    // Check if at least one photo category has files or documents are uploaded
    const hasRequiredMedia =
      Object.values(formData.media.photos).some(files => files.length > 0) ||
      formData.media.documents.length > 0;

    return hasRequiredMedia;
  };

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCurrentStep(index);
                    // Scroll to top of the form when clicking on progress indicators
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
                  }}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep
                      ? 'text-black'
                      : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-12 h-1 transition-colors duration-200 ${index < currentStep ? 'bg-black' : 'bg-gray-200'
                        }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Lease Commercial Covered Space</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep].content}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          <button
            onClick={currentStep === formSections.length - 1 ? handleSubmit : handleNext}
            disabled={isSubmitting}
            className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Submitting...
              </>
            ) : (
              <>
                {currentStep === formSections.length - 1 ? 'Submit' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaseCoveredSpaceMain;
