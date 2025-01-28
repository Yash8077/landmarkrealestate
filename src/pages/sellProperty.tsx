"use client";
import { toast } from 'react-hot-toast';
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UploadButton, UploadDropzone } from "@/components/uploadthing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Building, User, MapPin, Home, ImageIcon } from "lucide-react";
import { submitProperty } from "@/lib/submitProperty";
import PopupContainer from '@/components/popup-container'
import PropertySubmissionConfirmation from '@/components/property-submission-confirmation'

// ... (keep the existing schema, propertyTypes, listingTypes, and formSteps)
const propertySchema = z.object({
  userType: z.enum(["owner", "broker"], {
    required_error: "Please select if you're an owner or broker",
  }),
  name: z.string().min(2, "Property name must be at least 2 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  beds: z.number().min(0, "Number of beds must be positive"),
  baths: z.number().min(0, "Number of baths must be positive"),
  area: z.number().min(0, "Area must be positive"),
  lotSize: z.number().min(0, "Lot size must be positive"),
  yearBuilt: z
    .number()
    .min(1800, "Year must be after 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  type: z.string().min(1, "Property type is required"),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
  }),
  listingType: z.string().min(1, "Listing type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  features: z.array(z.string()),
  ownerEmail: z.string().email("Invalid email address"),
  ownerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const propertyTypes = [
  "Single Family Home",
  "Apartment",
  "Condo",
  "Townhouse",
  "Villa",
  "Land",
  "Commercial",
];

const listingTypes = ["For Sale", "For Rent"];

const formSteps = [
  { id: "user", label: "User Info", icon: User },
  { id: "basic", label: "Basic Info", icon: Building },
  { id: "details", label: "Details", icon: Home },
  { id: "location", label: "Location", icon: MapPin },
  { id: "media", label: "Media", icon: ImageIcon },
];

export default function PropertyForm() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState("user");
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      userType: "owner",
      name: "",
      price: 0,
      beds: 0,
      baths: 0,
      area: 0,
      lotSize: 0,
      yearBuilt: new Date().getFullYear(),
      type: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      },
      listingType: "",
      description: "",
      features: [],
      ownerEmail: "",
      ownerPhone: "",
    },
  });

  const progress =
    ((formSteps.findIndex((step) => step.id === currentStep) + 1) /
      formSteps.length) *
    100;

  async function onSubmit(values: z.infer<typeof propertySchema>) {

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "address") {
        Object.entries(value).forEach(([addressKey, addressValue]) => {
          formData.append(`address.${addressKey}`, addressValue as string);
        });
      } 
      else if(key==="listingType"){
        if(value=="For Sale"){
          value="Buy";
        }
        else if(value=="For Rent"){
          value="Rent";
        }
        formData.append(key, value as string);
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value as string);
      }
    });
    images.forEach((image) => formData.append("images", image));
    
    try {
      const result = await submitProperty(formData);
      if (result.success) {
        toast.success(result.message, {
          duration: 3000,
          position: 'top-center', // Position at top-center
          style: {
            border: '2px solid #28a745', // Green border
            padding: '20px', // Increased padding for a bigger toast
            backgroundColor: '#e9f7e9', // Light green background
            color: '#28a745', // Green text color
            fontSize: '16px', // Bigger font size
            fontWeight: 'bold', // Make the text bold
            borderRadius: '8px', // Rounded corners
            whiteSpace: 'nowrap', // Prevent text from wrapping into multiple lines
            overflow: 'hidden', // Hide any overflow text if it's too long
            textOverflow: 'ellipsis', // Add ellipsis for overflowed text
          },
          iconTheme: {
            primary: '#28a745', // Green icon color
            secondary: '#e9f7e9', // Light green background for icon
          },
        });

        form.reset();
        setCurrentStep("user");
        setImages([]);
        setIsPopupOpen(true)
      } else {
        toast.error(result.message, {
          duration: 3000,
          position: 'top-center', // Change position to top-center
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred", {
        duration: 3000,
        position: 'top-center', // Change position to top-center
      });
    }

  }

  const stepFields: Record<string, string[]> = {
    user: ["userType", "ownerEmail", "ownerPhone"],
    basic: ["name", "type", "listingType", "description"],
    details: ["price", "beds", "baths", "area", "lotSize", "yearBuilt"],
    location: [
      "address.street",
      "address.city",
      "address.state",
      "address.country",
      "address.zipCode",
    ],
    media: [],
  };

  const isStepValid = async (step: string) => {
    const fields = stepFields[step];
    const result = await form.trigger(fields as any);
    return result;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-8">
          {formSteps.map((step, index) => {
            const isDisabled =
              index > formSteps.findIndex((s) => s.id === currentStep);
            return (
              <button
                key={step.id}
                onClick={async () => {
                  if (
                    !isDisabled &&
                    (await isStepValid(formSteps[index - 1]?.id || "user"))
                  ) {
                    setCurrentStep(step.id);
                  }
                }}
                disabled={isDisabled}
                className={`flex flex-col items-center space-y-2 group ${
                  currentStep === step.id
                    ? "text-blue-600"
                    : isDisabled
                    ? "text-gray-300"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-colors duration-200
                  ${
                    currentStep === step.id
                      ? "bg-blue-600 text-white"
                      : isDisabled
                      ? "bg-gray-100 text-gray-300"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                  }
                `}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{step.label}</span>
              </button>
            );
          })}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* ... (keep the existing form fields for each step) */}
          {currentStep === "user" && (
            <div className="space-y-6 animate-in slide-in-from-right-300">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  Tell us about yourself
                </h2>
                <p className="text-gray-600">
                  We&apos;ll use this information to contact you about your listing
                </p>
              </div>

              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Are you an owner or a broker?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <FormItem>
                          <FormControl>
                            <label
                              htmlFor="owner"
                              className={`
                              flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer
                              ${
                                field.value === "owner"
                                  ? "border-blue-600 bg-blue-50"
                                  : "border-gray-200"
                              }
                            `}
                            >
                              <RadioGroupItem value="owner" id="owner" />
                              <label
                                htmlFor="owner"
                                className="font-medium cursor-pointer"
                              >
                                Property Owner
                              </label>
                            </label>
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <label
                              htmlFor="broker"
                              className={`
      flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer
      ${
        field.value === "broker"
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200"
      }
    `}
                            >
                              <RadioGroupItem
                                value="broker"
                                id="broker"
                                className="cursor-pointer"
                              />
                              <span className="font-medium">
                                Property Broker
                              </span>
                            </label>
                          </FormControl>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="ownerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Your phone number"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {currentStep === "basic" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-6 h-6 text-blue-600" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter property name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="listingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select listing type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {listingTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your property..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}
          {currentStep === "details" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-6 h-6 text-blue-600" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter price"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearBuilt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Built</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Year built"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="beds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="baths"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area (sq ft)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lotSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lot Size (sq ft)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          {currentStep === "location" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          {currentStep === "media" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-blue-600" />
                  Property Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    const uploadedImages = res.map((file) => file.url);
                    setImages((prevImages) => [
                      ...prevImages,
                      ...uploadedImages,
                    ]);
                    toast.success(
                      `${res.length} image(s) uploaded successfully`, {
                        duration: 3000,
                        position: 'top-center', 
                        icon: '✅', 
                        style: {
                          border: '2px solid #28a745', // Green border
                          padding: '20px', // Increased padding for a bigger toast
                          backgroundColor: '#e9f7e9', // Light green background
                          color: '#28a745', // Green text color
                          fontSize: '16px', // Bigger font size
                          fontWeight: 'bold', // Make the text bold
                          borderRadius: '8px', // Rounded corners
                          whiteSpace: 'nowrap', // Prevent text from wrapping into multiple lines
                          overflow: 'hidden', // Hide any overflow text if it's too long
                          textOverflow: 'ellipsis', // Add ellipsis for overflowed text
                        },
                        iconTheme: {
                          primary: '#28a745', // Green icon color
                          secondary: '#e9f7e9', // Light green background for icon
                        },
                      }
                    );
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(
                      `${error.message}`, {
                        duration: 3000,
                        position: 'top-center', // Position at the top-center
                      }
                    );
                  }}
                />
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            {currentStep !== "user" && (
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  const currentIndex = formSteps.findIndex(
                    (step) => step.id === currentStep
                  );
                  const previousStep = formSteps[currentIndex - 1].id;
                  if (await isStepValid(previousStep)) {
                    setCurrentStep(previousStep);
                  }
                }}
              >
                Previous
              </Button>
            )}

{currentStep !== "media" ? (
  <Button
    type="button"
    onClick={async () => {
      const currentIndex = formSteps.findIndex((step) => step.id === currentStep);
      const currentFields = stepFields[currentStep];

      try {
        const isValid = await form.trigger(currentFields as any);
        if (isValid) {
          setCurrentStep(formSteps[currentIndex + 1].id);
        }
      } catch (error) {
        console.error("Validation error:", error);
      }
    }}
  >
    Continue
  </Button>
) : (
  <Button
    type="button" // Prevents default form submission
    onClick={async () => {
      if (images.length === 0) {
        toast(
          "Please upload at least one image before submitting.", {
            duration: 3000,
            position: 'top-center', // Position at the top-center
            icon: '⚠️', // Optional icon to indicate a warning
          }
        );
        return;
      }
      // If images are uploaded, programmatically submit the form
      const isValid = await form.trigger();
      if (isValid) {
        form.handleSubmit(onSubmit)();
      }
    }}
  >
    Submit Property
  </Button>
)}


          </div>
        </form>
      </Form>
      
      <PopupContainer isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <PropertySubmissionConfirmation onClose={() => setIsPopupOpen(false)} />
      </PopupContainer>
    </div>
  );
}
