"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useIntl as useReactIntl } from "react-intl";
import { useIntl } from "@/providers/react-intl-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LanguageSwitcher,
  SupportedLocale,
} from "@/components/LanguageSwitcher";

interface FormValues {
  phoneNumber: string;
  email: string;
  fullName: string;
  cnic: string;
  residenceCountry: string;
  nationality: string;
  province: string;
  district: string;
  tehsil: string;
  reasonAbroad: string;
  dateOfBirth: Date | string;
  gender: string;
  landline: string;
  password: string;
  confirmPassword: string;
  address: string;
  affidavit: boolean;
}

export default function RegisterForm() {
  const intl = useReactIntl();
  const { locale, direction, setLocale } = useIntl();
  const isRtl = direction === "rtl";
  const [date, setDate] = useState<Date | undefined>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLocaleChange = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
  };

  const t = (id: string, defaultMessage: string = "") =>
    intl.formatMessage({ id, defaultMessage });

  // Validation schema using Yup
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required(
        t("register.validation.phoneRequired", "Phone number is required")
      )
      .matches(
        /^\+?[0-9]+$/,
        t("register.validation.phoneInvalid", "Invalid phone number")
      ),
    email: Yup.string()
      .email(t("register.validation.emailInvalid", "Invalid email address"))
      .required(t("register.validation.emailRequired", "Email is required")),
    fullName: Yup.string().required(
      t("register.validation.nameRequired", "Full name is required")
    ),
    cnic: Yup.string()
      .required(t("register.validation.cnicRequired", "CNIC is required"))
      .matches(
        /^[0-9]{13}$/,
        t("register.validation.cnicInvalid", "CNIC must be 13 digits")
      ),
    residenceCountry: Yup.string().required(
      t("register.validation.countryRequired", "Residence country is required")
    ),
    nationality: Yup.string().required(
      t("register.validation.nationalityRequired", "Nationality is required")
    ),
    province: Yup.string().required(
      t("register.validation.provinceRequired", "Province is required")
    ),
    district: Yup.string().required(
      t("register.validation.districtRequired", "District is required")
    ),
    tehsil: Yup.string().required(
      t("register.validation.tehsilRequired", "Tehsil is required")
    ),
    dateOfBirth: Yup.date().required(
      t("register.validation.dobRequired", "Date of birth is required")
    ),
    gender: Yup.string().required(
      t("register.validation.genderRequired", "Gender is required")
    ),
    password: Yup.string()
      .required(
        t("register.validation.passwordRequired", "Password is required")
      )
      .min(
        8,
        t(
          "register.validation.passwordLength",
          "Password must be at least 8 characters"
        )
      ),
    confirmPassword: Yup.string()
      .required(
        t(
          "register.validation.confirmPasswordRequired",
          "Confirm password is required"
        )
      )
      .oneOf(
        [Yup.ref("password")],
        t("register.validation.passwordMatch", "Passwords must match")
      ),
    address: Yup.string().required(
      t("register.validation.addressRequired", "Address is required")
    ),
    affidavit: Yup.boolean().oneOf(
      [true],
      t(
        "register.validation.affidavitRequired",
        "You must affirm the affidavit"
      )
    ),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      phoneNumber: "",
      email: "",
      fullName: "",
      cnic: "",
      residenceCountry: "",
      nationality: "",
      province: "",
      district: "",
      tehsil: "",
      reasonAbroad: "",
      dateOfBirth: "",
      gender: "",
      landline: "",
      password: "",
      confirmPassword: "",
      address: "",
      affidavit: false,
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      console.log(values);
      // Handle form submission
    },
  });

  // Country options
  const countryOptions = [
    { value: "pakistan", label: "Pakistan" },
    { value: "usa", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "canada", label: "Canada" },
    // Add more countries
  ];

  // Province options for Pakistan
  const provinceOptions = [
    { value: "sindh", label: "Sindh" },
    { value: "punjab", label: "Punjab" },
    { value: "kpk", label: "Khyber Pakhtunkhwa" },
    { value: "balochistan", label: "Balochistan" },
    // Add more provinces
  ];

  // Districts based on province
  const districtOptions: Record<
    string,
    Array<{ value: string; label: string }>
  > = {
    sindh: [
      { value: "karachi", label: "Karachi" },
      { value: "hyderabad", label: "Hyderabad" },
      { value: "sukkur", label: "Sukkur" },
      // Add more districts
    ],
    punjab: [
      { value: "lahore", label: "Lahore" },
      { value: "faisalabad", label: "Faisalabad" },
      { value: "multan", label: "Multan" },
      // Add more districts
    ],
    // Add more provinces and their districts
  };

  // Gender options
  const genderOptions = [
    { value: "male", label: t("register.gender.male", "Male") },
    { value: "female", label: t("register.gender.female", "Female") },
    { value: "other", label: t("register.gender.other", "Other") },
  ];

  return (
    <div className={cn("w-full max-w-3xl p-4", isRtl && "rtl")}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={cn("text-2xl font-bold", isRtl && "text-right")}>
          {t("register.title", "Citizen Registration")}
        </h1>

        {/* Language Switcher */}
        {isClient && (
          <div className="p-2 bg-gray-100 rounded-lg">
            <LanguageSwitcher
              currentLocale={locale as SupportedLocale}
              onLocaleChange={handleLocaleChange}
            />
          </div>
        )}
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone Number */}
          <div className="space-y-2">
            <Label
              htmlFor="phoneNumber"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.phoneNumber", "Phone Number")}
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder={t("register.phonePlaceholder", "eg.+92xxxxxxxxxx")}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                "w-full",
                formik.touched.phoneNumber &&
                  formik.errors.phoneNumber &&
                  "border-red-500",
                isRtl && "text-right"
              )}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.email", "Email")}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t(
                "register.emailPlaceholder",
                "eg.Example@demo.com"
              )}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                "w-full",
                formik.touched.email && formik.errors.email && "border-red-500",
                isRtl && "text-right"
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.fullName", "Full Name")}
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                "w-full",
                formik.touched.fullName &&
                  formik.errors.fullName &&
                  "border-red-500",
                isRtl && "text-right"
              )}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.fullName}
              </p>
            )}
          </div>

          {/* CNIC */}
          <div className="space-y-2">
            <Label
              htmlFor="cnic"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.cnic", "CNIC")}
            </Label>
            <Input
              id="cnic"
              name="cnic"
              value={formik.values.cnic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                "w-full",
                formik.touched.cnic && formik.errors.cnic && "border-red-500",
                isRtl && "text-right"
              )}
            />
            {formik.touched.cnic && formik.errors.cnic && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.cnic}
              </p>
            )}
          </div>

          {/* Residence Country */}
          <div className="space-y-2">
            <Label
              htmlFor="residenceCountry"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.residenceCountry", "Residence Country")}
            </Label>
            <Select
              name="residenceCountry"
              value={formik.values.residenceCountry}
              onValueChange={(value) =>
                formik.setFieldValue("residenceCountry", value)
              }
            >
              <SelectTrigger className={cn("w-full", isRtl && "text-right")}>
                <SelectValue
                  placeholder={t("register.selectCountry", "Select country")}
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                {countryOptions.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.residenceCountry &&
              formik.errors.residenceCountry && (
                <p
                  className={cn("text-sm text-red-500", isRtl && "text-right")}
                >
                  {formik.errors.residenceCountry}
                </p>
              )}
          </div>

          {/* Nationality */}
          <div className="space-y-2">
            <Label
              htmlFor="nationality"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.nationality", "Nationality")}
            </Label>
            <Select
              name="nationality"
              value={formik.values.nationality}
              onValueChange={(value) =>
                formik.setFieldValue("nationality", value)
              }
            >
              <SelectTrigger className={cn("w-full", isRtl && "text-right")}>
                <SelectValue
                  placeholder={t(
                    "register.selectNationality",
                    "Select nationality"
                  )}
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                {countryOptions.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.nationality && formik.errors.nationality && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.nationality}
              </p>
            )}
          </div>

          {/* Province */}
          <div className="space-y-2">
            <Label
              htmlFor="province"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.province", "Province")}
            </Label>
            <Select
              name="province"
              value={formik.values.province}
              onValueChange={(value) => {
                formik.setFieldValue("province", value);
                formik.setFieldValue("district", "");
              }}
            >
              <SelectTrigger className={cn("w-full", isRtl && "text-right")}>
                <SelectValue
                  placeholder={t("register.selectProvince", "Select province")}
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                {provinceOptions.map((province) => (
                  <SelectItem key={province.value} value={province.value}>
                    {province.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.province && formik.errors.province && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.province}
              </p>
            )}
          </div>

          {/* District */}
          <div className="space-y-2">
            <Label
              htmlFor="district"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.district", "District")}
            </Label>
            <Select
              name="district"
              value={formik.values.district}
              onValueChange={(value) => formik.setFieldValue("district", value)}
              disabled={!formik.values.province}
            >
              <SelectTrigger className={cn("w-full", isRtl && "text-right")}>
                <SelectValue
                  placeholder={t("register.selectDistrict", "Select district")}
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                {formik.values.province &&
                  districtOptions[
                    formik.values.province as keyof typeof districtOptions
                  ]?.map((district) => (
                    <SelectItem key={district.value} value={district.value}>
                      {district.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {formik.touched.district && formik.errors.district && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.district}
              </p>
            )}
          </div>

          {/* Tehsil */}
          <div className="space-y-2">
            <Label
              htmlFor="tehsil"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.tehsil", "Tehsil")}
            </Label>
            <Select
              name="tehsil"
              value={formik.values.tehsil}
              onValueChange={(value) => formik.setFieldValue("tehsil", value)}
              disabled={!formik.values.district}
            >
              <SelectTrigger className={cn("w-full", isRtl && "text-right")}>
                <SelectValue
                  placeholder={t("register.selectTehsil", "Select tehsil")}
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                {/* Add tehsil options here based on selected district */}
                <SelectItem value="tehsil1">Tehsil 1</SelectItem>
                <SelectItem value="tehsil2">Tehsil 2</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.tehsil && formik.errors.tehsil && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.tehsil}
              </p>
            )}
          </div>

          {/* Reason Abroad */}
          <div className="space-y-2">
            <Label
              htmlFor="reasonAbroad"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.reasonAbroad", "Reason Abroad (in case of nicop)")}
            </Label>

            <Select
              name="reasonAbroad"
              value={formik.values.reasonAbroad}
              onValueChange={(value) =>
                formik.setFieldValue("reasonAbroad", value)
              }
            >
              <SelectTrigger className={cn("w-full", isRtl && "text-right")}>
                <SelectValue
                  placeholder={t(
                    "register.reasonLivingAbroad",
                    "Reason living abroad"
                  )}
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="study">Study</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label
              htmlFor="dateOfBirth"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.dateOfBirth", "Date of Birth")}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                    isRtl && "text-right flex-row-reverse"
                  )}
                >
                  <CalendarIcon
                    className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2")}
                  />
                  {date
                    ? format(date, "PPP")
                    : t("register.pickDate", "dd/mm/yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    formik.setFieldValue("dateOfBirth", date);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.dateOfBirth}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label
              htmlFor="gender"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.gender", "Gender")}
            </Label>
            <Select
              name="gender"
              value={formik.values.gender}
              onValueChange={(value) => formik.setFieldValue("gender", value)}
            >
              <SelectTrigger className={cn("w-full", isRtl && "text-right")}>
                <SelectValue
                  placeholder={t("register.selectGender", "Select gender")}
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                {genderOptions.map((gender) => (
                  <SelectItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.gender && formik.errors.gender && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.gender}
              </p>
            )}
          </div>

          {/* Landline */}
          <div className="space-y-2">
            <Label
              htmlFor="landline"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.landline", "Landline")}
            </Label>
            <Input
              id="landline"
              name="landline"
              placeholder={t(
                "register.landlinePlaceholder",
                "eg.+92bxxxxxxxxxx"
              )}
              value={formik.values.landline}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn("w-full", isRtl && "text-right")}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.password", "Password")}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                "w-full",
                formik.touched.password &&
                  formik.errors.password &&
                  "border-red-500",
                isRtl && "text-right"
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className={cn(isRtl && "text-right w-full block")}
            >
              {t("register.confirmPassword", "Confirm Password")}
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                "w-full",
                formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  "border-red-500",
                isRtl && "text-right"
              )}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p
                  className={cn("text-sm text-red-500", isRtl && "text-right")}
                >
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label
            htmlFor="address"
            className={cn(isRtl && "text-right w-full block")}
          >
            {t("register.address", "Address")}
          </Label>
          <Textarea
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn(
              "w-full",
              formik.touched.address &&
                formik.errors.address &&
                "border-red-500",
              isRtl && "text-right"
            )}
          />
          {formik.touched.address && formik.errors.address && (
            <p className={cn("text-sm text-red-500", isRtl && "text-right")}>
              {formik.errors.address}
            </p>
          )}
        </div>

        {/* Affidavit */}
        <div className="space-y-2">
          <div
            className={cn(
              "flex items-start space-x-2",
              isRtl && "flex-row-reverse space-x-reverse"
            )}
          >
            <Checkbox
              id="affidavit"
              checked={formik.values.affidavit}
              onCheckedChange={(checked) =>
                formik.setFieldValue("affidavit", checked)
              }
              className={cn("mt-1", isRtl && "ml-2")}
            />
            <div>
              <Label
                htmlFor="affidavit"
                className={cn(isRtl && "text-right w-full block")}
              >
                {t("register.affirmAffidavit", "I affirm the Affidavit")}
              </Label>
              <p className={cn("text-sm text-gray-500", isRtl && "text-right")}>
                {t(
                  "register.affidavitText",
                  '"I solemnly affirm that the information provided is true to the best of my knowledge and belief, and that this complaint has not been filed elsewhere."'
                )}
              </p>
              {formik.touched.affidavit && formik.errors.affidavit && (
                <p
                  className={cn("text-sm text-red-500", isRtl && "text-right")}
                >
                  {formik.errors.affidavit}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          className={cn(
            "flex justify-end space-x-2 w-full flex-wrap gap-2",
            isRtl && "flex-row-reverse space-x-reverse"
          )}
        >
          <Button variant="outline" type="button" className="w-full sm:w-auto">
            {t("register.cancel", "Cancel")}
          </Button>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
          >
            {t("register.submit", "Register")}
          </Button>
        </div>
      </form>
    </div>
  );
}
