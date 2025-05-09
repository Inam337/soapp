"use client";

import React, { useState, useRef } from "react";
import { useIntl } from "react-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon, FileIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormValues {
  complainantType: "general" | "child";
  fullName: string;
  cnic: string;
  email: string;
  mobileNumber: string;
  phone?: string;
  region?: string;
  address: string;
  title: string;
  description: string;
  affirmAffidavit: boolean;
  attachment?: File | null;
}

const RegisterComplaint: React.FC = () => {
  const intl = useIntl();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isRtl, setIsRtl] = useState(document.dir === "rtl");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function for translations
  const t = (id: string) => intl.formatMessage({ id });

  // Initial form values
  const initialValues: FormValues = {
    complainantType: "general",
    fullName: "",
    cnic: "",
    email: "",
    mobileNumber: "",
    phone: "",
    region: "",
    address: "",
    title: "",
    description: "",
    affirmAffidavit: false,
    attachment: null,
  };

  // Validation schemas for each step
  const step1ValidationSchema = Yup.object({
    complainantType: Yup.string()
      .oneOf(["general", "child"])
      .required(t("complaint.validation.required")),
    fullName: Yup.string().required(t("complaint.validation.required")),
    cnic: Yup.string()
      .matches(/^\d{13}$/, t("complaint.validation.cnic"))
      .required(t("complaint.validation.required")),
    email: Yup.string()
      .email(t("complaint.validation.email"))
      .required(t("complaint.validation.required")),
    mobileNumber: Yup.string()
      .required(t("complaint.validation.required"))
      .matches(/^[0-9+\-\s]+$/, t("complaint.validation.mobile")),
    address: Yup.string().required(t("complaint.validation.required")),
  });

  const step2ValidationSchema = Yup.object({
    title: Yup.string()
      .min(10, t("complaint.validation.title"))
      .max(100, t("complaint.validation.title"))
      .required(t("complaint.validation.required")),
    description: Yup.string()
      .min(20, t("complaint.validation.description"))
      .required(t("complaint.validation.required")),
    affirmAffidavit: Yup.boolean()
      .oneOf([true], t("complaint.validation.affidavit"))
      .required(t("complaint.validation.required")),
  });

  // Get validation schema based on current step
  const getValidationSchema = () => {
    switch (currentStep) {
      case 1:
        return step1ValidationSchema;
      case 2:
        return step2ValidationSchema;
      default:
        return Yup.object({});
    }
  };

  // Setup formik
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: getValidationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (currentStep < 2) {
        // Move to the next step
        setCurrentStep((prev) => prev + 1);
      } else {
        // Submit the form
        console.log("Form submitted:", values);
        setShowSuccessDialog(true);
      }
    },
  });

  // Handle previous button click
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Helper to check if a field has an error
  const hasError = (fieldName: keyof FormValues) => {
    return !!(formik.touched[fieldName] && formik.errors[fieldName]);
  };

  // Helper to get error message for a field
  const getErrorMessage = (fieldName: keyof FormValues) => {
    return hasError(fieldName) ? formik.errors[fieldName] : "";
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    formik.setFieldValue("attachment", file);
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    formik.setFieldValue("attachment", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Get file size in readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white">
        <p className="text-sm text-muted-foreground mb-6">
          {t("complaint.details")} ({t("common.mandatory")})
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Step 1: Complainant Information */}
          {currentStep === 1 && (
            <div className="w-full flex flex-col">
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                {t("complaint.type")}
              </h3>
              <div
                className={cn(
                  "flex items-center gap-2",
                  isRtl && "flex-col-reverse"
                )}
              >
                <RadioGroup
                  name="complainantType"
                  className={cn(
                    "flex flex-row ",
                    isRtl && "items-start flex-col-reverse"
                  )}
                  defaultValue={formik.values.complainantType}
                  onValueChange={(value: string) =>
                    formik.setFieldValue("complainantType", value)
                  }
                >
                  <div className={cn("flex items-center gap-2")}>
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general">
                      {t("complaint.type.general")}
                    </Label>
                  </div>
                  <div className={cn("flex items-center gap-2")}>
                    <RadioGroupItem value="child" id="child" />
                    <Label htmlFor="child">{t("complaint.type.child")}</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="border-t pt-6 mt-6"></div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                {t("complaint.information")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {t("complaint.fullName")}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("fullName") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("fullName") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("fullName")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnic">
                    {t("complaint.cnic")}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cnic"
                    name="cnic"
                    value={formik.values.cnic}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("cnic") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("cnic") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("cnic")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t("complaint.email")}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("email") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("email") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("email")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">
                    {t("complaint.mobile")}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("mobileNumber") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("mobileNumber") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("mobileNumber")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("complaint.phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">{t("complaint.region")}</Label>
                  <Input
                    id="region"
                    name="region"
                    value={formik.values.region}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">
                    {t("complaint.address")}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("address") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("address") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("address")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Complaint Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{t("complaint.details")}</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    {t("complaint.title")}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("title") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("title") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("title")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    {t("complaint.description")}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      "min-h-[150px]",
                      hasError("description") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    placeholder="Placeholder"
                  />
                  <div className="text-right text-xs text-muted-foreground">
                    {formik.values.description?.length || 0}/1000
                  </div>
                  {hasError("description") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("description")}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">{t("complaint.attachment")}</h4>
                  <div className="border-dashed border border-primary rounded-md p-4 bg-gray-50">
                    <div
                      className={cn(
                        "flex flex-col md:flex-row justify-between items-center gap-4",
                        isRtl && "md:flex-row-reverse"
                      )}
                    >
                      <div
                        className={cn(
                          "w-full md:flex-grow",
                          isRtl && "text-right"
                        )}
                      >
                        <p className="font-medium">{t("complaint.upload")}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("complaint.upload.hint")}
                        </p>
                      </div>
                      <Button
                        type="button"
                        className="w-full md:w-auto text-primary-foreground text-white"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Upload
                      </Button>
                      <input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                      />
                    </div>

                    {selectedFile && (
                      <div className="mt-4 p-3 bg-white border rounded-md">
                        <div
                          className={cn(
                            "flex items-center justify-between",
                            isRtl && "flex-row-reverse"
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-center gap-2",
                              isRtl && "flex-row-reverse"
                            )}
                          >
                            <FileIcon className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">
                                {selectedFile.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(selectedFile.size)}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={handleRemoveFile}
                          >
                            <XIcon className="h-4 w-4" />
                            <span className="sr-only">Remove file</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={cn(
                    "flex items-start",
                    isRtl ? "space-x-reverse space-x-2" : "space-x-2",
                    "pt-4"
                  )}
                >
                  <Checkbox
                    id="affirmAffidavit"
                    name="affirmAffidavit"
                    checked={formik.values.affirmAffidavit}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue("affirmAffidavit", checked)
                    }
                    className={cn(
                      hasError("affirmAffidavit") && "border-red-500"
                    )}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="affirmAffidavit"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("complaint.affidavit")}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {t("complaint.affidavit.text")}
                    </p>
                    {hasError("affirmAffidavit") && (
                      <p className="text-sm text-red-500">
                        {getErrorMessage("affirmAffidavit")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step indicator and navigation buttons */}
          <div className="border-t pt-6 mt-6"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              {t("complaint.step")} {currentStep} {t("complaint.of")} 2
            </div>
            <div
              className={cn(
                "flex justify-end",
                isRtl ? "space-x-reverse space-x-4" : "space-x-4"
              )}
            >
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  {t("common.cancel")}
                </Button>
              )}
              <Button type="submit" className="bg-primary">
                {currentStep < 2 ? t("common.next") : t("common.register")}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader className="w-full flex items-center flex-row ">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="w-10/12 flex flex-col justify-start items-start rounded-full px-4 ">
              <DialogTitle className="text-left text-lg font-medium leading-6 text-gray-900 mt-4">
                {t("complaint.success.title")}
              </DialogTitle>
              <DialogDescription className="text-left mt-2">
                {t("complaint.success.message")}
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="mt-5">
            <Button
              className="w-full"
              onClick={() => {
                setShowSuccessDialog(false);
                // Reset form and go back to first step
                formik.resetForm();
                setCurrentStep(1);
              }}
            >
              {t("common.register")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterComplaint;
