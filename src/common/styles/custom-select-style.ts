import { StylesConfig } from "react-select";

// Define our custom select styles
const CustomSelectStyles: StylesConfig = {
  // Add any other styles you need here
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // Set the desired z-index value
  }),
  // Use the portal option to render the menu as a separate DOM element
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999, // Set the desired z-index value
  }),
  control: (provided, state) => ({
    ...provided,
    border: "2px solid #3C7062",
    minHeight: "36px",
    boxShadow: "0 0 0px 0px rgba(52, 152, 219, 0.5)",
    "&:hover": {
      border: state.isFocused ? "2px solid #3C7062" : "2px solid #3C7062",
      boxShadow: state.isFocused
        ? "0 0 0px 0px rgba(52, 152, 219, 0.5)"
        : "none",
    },
    height: "36px", // Set your desired height
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "12px",
    backgroundColor: state.isSelected
      ? "#3C7062"
      : state.isFocused
      ? "#f6f6f6"
      : "white",
    color: state.isSelected ? "white" : "#000",
    "&:hover": {
      backgroundColor: state.isSelected ? "#3C7062" : "#28C76F29",
      color: state.isSelected ? "#fff" : "#3C7062",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#ccc" : "#000",
    transition: "color 0.2s",
    "&:hover": {
      color: "#3C7062",
    },
  }),

  valueContainer: (provided) => ({
    ...provided,
    width: "140px",
    maxHeight: "36px",
    fontSize: "12px", // Set your desired height
    overflow: "auto",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#f3f3f3", // Set the background color of the tag
    borderRadius: "2px", // Optional: Set border radius for the tag
    // maxheight: '180px', // Set your desired height
    // overflow: 'auto',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#000",
    fontSize: "12px", // Set the text color of the tag
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    ":hover": {
      backgroundColor: "#f3f3f3", // Set the background color of the tag
      color: "#3C7062",
    },
  }),
};

export default CustomSelectStyles;
