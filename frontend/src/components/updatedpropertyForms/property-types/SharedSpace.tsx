import React, { useState, useCallback } from "react";
import PropertyName from "../PropertyName";
import PropertyAddress from "../PropertyAddress";
import MapCoordinates from "../MapCoordinates";
import PropertySize from "../PropertySize";
import PropertyFeatures from "../PropertyFeatures";
import Rent from "../residentialrent/Rent";
import Restrictions from "../Restrictions";
import SecurityDeposit from "../residentialrent/SecurityDeposit";
import MaintenanceAmount from "../residentialrent/MaintenanceAmount";
import Brokerage from "../residentialrent/Brokerage";
import AvailabilityDate from "../AvailabilityDate";
import OtherCharges from "../residentialrent/OtherCharges";
import MediaUpload from "../MediaUpload";
import FlatAmenities from "../FlatAmenities";
import SocietyAmenities from "../SocietyAmenities";
import SharingMembers from "../Sharingmembers";

interface SharedSpaceProps {
  propertyId: string; // Property ID passed as a prop
  onSubmit?: (formData: any) => void;
}

const SharedSpace = ({ propertyId, onSubmit }: SharedSpaceProps) => {
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyAddress: {
      flatNo: "",
      floor: "",
      houseName: "",
      address: "",
      pinCode: "",
      city: "",
      street: "",
      state: "",
      zipCode: "",
    },
    coordinates: { latitude: "", longitude: "" },
    size: "",
    features: {},
    rent: {
      expectedRent: "",
      isNegotiable: false,
      rentType: "",
    },
    securityDeposit: {},
    maintenanceAmount: {},
    brokerage: {},
    availability: {},
    otherCharges: {},
    media: { photos: [], video: null },
    flatAmenities: {},
    societyAmenities: {},
    sharingDetails: {
      totalBeds: 1,
      occupiedBeds: 0,
      availableBeds: 1,
      occupancyType: "any",
    },
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Function to update property address details
  const handleAddressChange = useCallback((addressData: any) => {
    setFormData((prev) => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, ...addressData },
    }));
  }, []);

  // Function to save data at each step

  const steps = [
    {
      title: "Basic Information",
      component: (
        <>
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) =>
              setFormData((prev) => ({ ...prev, propertyName: name }))
            }
          />
          <PropertyAddress
            onPropertyNameChange={(name) =>
              setFormData((prev) => ({ ...prev, propertyName: name }))
            }
            onPropertyTypeSelect={(type) =>
              setFormData((prev) => ({ ...prev, propertyType: type }))
            }
            onLatitudeChange={(lat) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, latitude: lat },
              }))
            }
            onLongitudeChange={(lng) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, longitude: lng },
              }))
            }
            onAddressChange={handleAddressChange}
          />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLatitudeChange={(lat) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, latitude: lat },
              }))
            }
            onLongitudeChange={(lng) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, longitude: lng },
              }))
            }
          />
          <PropertySize
            onPropertySizeChange={(size) =>
              setFormData((prev) => ({ ...prev, size }))
            }
            propertyType="shared-space"
          />
        </>
      ),
    },
    {
      title: "Sharing Details",
      component: (
        <SharingMembers
          onOccupancyChange={(sharingDetails) =>
            setFormData((prev) => ({ ...prev, sharingDetails }))
          }
        />
      ),
    },
    {
      title: "Property Details",
      component: (
        <>
          <PropertyFeatures
            onFeaturesChange={(features) =>
              setFormData((prev) => ({ ...prev, features }))
            }
          />
          <FlatAmenities
            onAmenitiesChange={(amenities) =>
              setFormData((prev) => ({ ...prev, flatAmenities: amenities }))
            }
          />
          <SocietyAmenities
            onAmenitiesChange={(amenities) =>
              setFormData((prev) => ({ ...prev, societyAmenities: amenities }))
            }
          />
          <Restrictions
            onRestrictionsChange={(restrictions) =>
              setFormData((prev) => ({ ...prev, restrictions }))
            }
          />
        </>
      ),
    },
    {
      title: "Rental Terms",
      component: (
        <>
          <Rent
            onRentChange={(rent) => setFormData((prev) => ({ ...prev, rent }))}
          />
          {formData.rent.rentType === "exclusive" && (
            <MaintenanceAmount
              onMaintenanceAmountChange={(maintenance) =>
                setFormData((prev) => ({
                  ...prev,
                  maintenanceAmount: maintenance,
                }))
              }
            />
          )}
          <SecurityDeposit
            onSecurityDepositChange={(deposit) =>
              setFormData((prev) => ({ ...prev, securityDeposit: deposit }))
            }
          />
          <OtherCharges
            onOtherChargesChange={(charges) =>
              setFormData((prev) => ({ ...prev, otherCharges: charges }))
            }
          />
          <Brokerage
            onBrokerageChange={(brokerage) =>
              setFormData((prev) => ({ ...prev, brokerage }))
            }
          />
        </>
      ),
    },
    {
      title: "Availability",
      component: (
        <AvailabilityDate
          onAvailabilityChange={(availability) =>
            setFormData((prev) => ({ ...prev, availability }))
          }
        />
      ),
    },
    {
      title: "Property Media",
      component: (
        <MediaUpload
          onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))}
        />
      ),
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onSubmit?.(formData); // Final submit callback
    }
  };


  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
      <h2 className="text-3xl font-bold mb-8">{steps[step].title}</h2>
      {steps[step].component}

      <button
        type="button"
        onClick={handleNext}
        className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
      >
        {step < steps.length - 1 ? "Next" : "List Property"}
      </button>

    </form>
  );
};

export default SharedSpace;