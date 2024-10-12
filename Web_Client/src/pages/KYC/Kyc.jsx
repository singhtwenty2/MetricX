// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Button,
//   TextField,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   CircularProgress, // MUI Loader component
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {
//   jobTitleOptions,
//   notificationPreferencesOptions,
//   regionOptions,
//   teamSizeOptions,
//   timeZoneOptions,
// } from "./selectOptions"; // Import options
// import { useTheme } from "@mui/material/styles";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, selectedNames, theme) {
//   return {
//     fontWeight:
//       selectedNames.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// const KycForm = () => {
//   const theme = useTheme();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     companyName: "",
//     phoneNumber: "",
//     teamSize: [],
//     jobTitle: [],
//     notificationPreferences: [],
//     region: [],
//     timeZone: [],
//     postalCode: "",
//     address: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isKycDone, setIsKycDone] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkKycStatus = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login"); // Redirect to login page if no token
//         return;
//       }

//       setLoading(true); // Start loader before API call
//       try {
//         const response = await axios.get(
//           "http://localhost:9707/api/v1/kyc/status",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`, // Send token with the request
//             },
//           }
//         );

//         if (response.status === 200) {
//           const { isKycDone } = response.data;
//           if (isKycDone) {
//             setIsKycDone(true);
//             navigate("/Console"); // Redirect to Console page if KYC is done
//           }
//         }
//       } catch (error) {
//         if (error.response) {
//           const { status } = error.response;
//           switch (status) {
//             case 401:
//               setErrorMessage("Unauthorized. Please log in again.");
//               navigate("/login"); // Redirect to login page if unauthorized
//               break;
//             default:
//               setErrorMessage("An error occurred. Please try again.");
//           }
//         } else {
//           setErrorMessage("Network error. Please check your connection.");
//         }
//         console.error("Error checking KYC status", error);
//       } finally {
//         setLoading(false); // Stop loader after API call
//       }
//     };

//     checkKycStatus();
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMessage("");
//     setErrorMessage("");

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setErrorMessage("User is not authenticated. Please log in.");
//       return;
//     }

//     setLoading(true); // Start loader before form submission
//     try {
//       const response = await axios.post(
//         "http://localhost:9707/api/v1/kyc/insert",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Send token with the request
//           },
//         }
//       );

//       if (response.status === 201) {
//         // Backend returns 201 for successful creation
//         setSuccessMessage(response.data.successMessage);
//         setFormData({
//           firstName: "",
//           lastName: "",
//           companyName: "",
//           phoneNumber: "",
//           teamSize: [],
//           jobTitle: [],
//           notificationPreferences: [],
//           region: [],
//           timeZone: [],
//           postalCode: "",
//           address: "",
//         });
//         setTimeout(() => {
//           navigate("/Console"); // Redirect to Console page after success
//         }, 1000);
//       } else {
//         setErrorMessage("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       if (error.response) {
//         const { status } = error.response;
//         switch (status) {
//           case 400:
//             setErrorMessage("Bad Request. Please check the input.");
//             break;
//           case 404:
//             setErrorMessage("Endpoint not found. Please check the API URL.");
//             break;
//           case 500:
//             setErrorMessage("Server error. Please try again later.");
//             break;
//           case 401:
//             setErrorMessage("Unauthorized. Please log in again.");
//             navigate("/login"); // Redirect to login page if unauthorized
//             break;
//           default:
//             setErrorMessage("Network error. Please check your connection.");
//         }
//       } else {
//         setErrorMessage("Network error. Please check your connection.");
//       }
//       console.error("Error submitting form", error);
//     } finally {
//       setLoading(false); // Stop loader after form submission
//     }
//   };

//   if (isKycDone) {
//     // If KYC is done, redirect to Console
//     return null;
//   }

//   return (
//     <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6">
//       <Box className="bg-white rounded-lg shadow-lg max-w-xl p-6">
//         <h1 className="text-orange-600 font-bold mt-4 mb-6 text-center text-3xl underline">
//           KYC Form
//         </h1>
//         {loading ? (
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             height="100px"
//           >
//             <CircularProgress /> {/* MUI Circular Loader */}
//           </Box>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <TextField
//               label="First Name"
//               variant="outlined"
//               fullWidth
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 style: {
//                   fontWeight: "bold", // Make the input text bold
//                 },
//               }}
//               InputLabelProps={{
//                 style: {
//                   fontWeight: "bold", // Make the label text bold
//                 },
//               }}
//             />

//             <TextField
//               label="Last Name"
//               variant="outlined"
//               fullWidth
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 style: {
//                   fontWeight: "bold", // Make the input text bold
//                 },
//               }}
//               InputLabelProps={{
//                 style: {
//                   fontWeight: "bold", // Make the label text bold
//                 },
//               }}
//             />

//             {/* complany name */}
//             <TextField
//               label="Company Name"
//               variant="outlined"
//               fullWidth
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 style: {
//                   fontWeight: "bold", // Make the input text bold
//                 },
//               }}
//               InputLabelProps={{
//                 style: {
//                   fontWeight: "bold", // Make the label text bold
//                 },
//               }}
//             />

//             {/* phoneNumber */}
//             <TextField
//               label="Phone number "
//               variant="outlined"
//               fullWidth
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 style: {
//                   fontWeight: "bold", // Make the input text bold
//                 },
//               }}
//               InputLabelProps={{
//                 style: {
//                   fontWeight: "bold", // Make the label text bold
//                 },
//               }}
//             />

//             {/* Team Size Dropdown */}
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="teamSize-label" style={{ fontWeight: "bold" }}>
//                 Team Size
//               </InputLabel>
//               <Select
//                 labelId="teamSize-label"
//                 id="teamSize"
//                 name="teamSize"
//                 value={formData.teamSize}
//                 onChange={handleChange}
//                 input={
//                   <OutlinedInput
//                     label="Team Size"
//                     style={{ fontWeight: "bold" }}
//                   />
//                 }
//                 MenuProps={MenuProps}
//               >
//                 {teamSizeOptions.map((option) => (
//                   <MenuItem
//                     key={option.value}
//                     value={option.value}
//                     style={getStyles(option.value, [formData.teamSize], theme)}
//                   >
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* Job Title Dropdown */}
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="job-title " style={{ fontWeight: "bold" }}>
//                 Job Title{" "}
//               </InputLabel>
//               <Select
//                 labelId="job-title"
//                 id="jobTitle"
//                 name="jobTitle"
//                 value={formData.jobTitle}
//                 onChange={handleChange}
//                 input={
//                   <OutlinedInput
//                     label="Job Title"
//                     style={{ fontWeight: "bold" }}
//                   />
//                 }
//                 MenuProps={MenuProps}
//               >
//                 {jobTitleOptions.map((option) => (
//                   <MenuItem
//                     key={option.value}
//                     value={option.value}
//                     style={getStyles(option.value, [formData.jobTitle], theme)}
//                   >
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* Notification Preferences Dropdown */}
//             <FormControl fullWidth margin="normal">
//               <InputLabel
//                 id="notification-level"
//                 style={{ fontWeight: "bold" }}
//               >
//                 Notification Preferences
//               </InputLabel>
//               <Select
//                 labelId="notification-level"
//                 id="notificationPreferences"
//                 name="notificationPreferences"
//                 value={formData.notificationPreferences}
//                 onChange={handleChange}
//                 input={
//                   <OutlinedInput
//                     label="Notification Preferences"
//                     style={{ fontWeight: "bold" }}
//                   />
//                 }
//                 MenuProps={MenuProps}
//               >
//                 {notificationPreferencesOptions.map((option) => (
//                   <MenuItem
//                     key={option.value}
//                     value={option.value}
//                     style={getStyles(
//                       option.value,
//                       [formData.notificationPreferences],
//                       theme
//                     )}
//                   >
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* Region Dropdown */}
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="region-level" style={{ fontWeight: "bold" }}>
//                 Region
//               </InputLabel>
//               <Select
//                 labelId="region-level"
//                 id="region"
//                 name="region"
//                 value={formData.region}
//                 onChange={handleChange}
//                 input={
//                   <OutlinedInput
//                     label="Region"
//                     style={{ fontWeight: "bold" }}
//                   />
//                 }
//                 MenuProps={MenuProps}
//               >
//                 {regionOptions.map((option) => (
//                   <MenuItem
//                     key={option.value}
//                     value={option.value}
//                     style={getStyles(option.value, [formData.region], theme)}
//                   >
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* Time Zone Dropdown */}
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="TimeZone-level" style={{ fontWeight: "bold" }}>
//                 Time Zone
//               </InputLabel>
//               <Select
//                 labelId="timeZone-level"
//                 id="timeZone"
//                 name="timeZone"
//                 value={formData.timeZone}
//                 onChange={handleChange}
//                 input={
//                   <OutlinedInput
//                     label="TimeZone"
//                     style={{ fontWeight: "bold" }}
//                   />
//                 }
//                 MenuProps={MenuProps}
//               >
//                 {timeZoneOptions.map((option) => (
//                   <MenuItem
//                     key={option.value}
//                     value={option.value}
//                     style={getStyles(option.value, [formData.timeZone], theme)}
//                   >
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* postalCode */}
//             <TextField
//               label="Postal Code"
//               variant="outlined"
//               fullWidth
//               name="postalCode"
//               value={formData.postalCode}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 style: {
//                   fontWeight: "bold", // Make the input text bold
//                 },
//               }}
//               InputLabelProps={{
//                 style: {
//                   fontWeight: "bold", // Make the label text bold
//                 },
//               }}
//             />
//             <TextField
//               label="Address"
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={3}
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 style: {
//                   fontWeight: "bold", // Make the input text bold
//                 },
//               }}
//               InputLabelProps={{
//                 style: {
//                   fontWeight: "bold", // Make the label text bold
//                 },
//               }}
//             />

//             {errorMessage && (
//               <Box className="mt-2 text-red-600 text-center">
//                 {errorMessage}
//               </Box>
//             )}

//             {successMessage && (
//               <Box className="mt-2 text-green-600 text-center">
//                 {successMessage}
//               </Box>
//             )}
//             <div className="flex justify-center items-center">
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 className="mt-4 bg-orange-600 hover:bg-orange-700"
//               >
//                 Submit
//               </Button>
//             </div>
//           </form>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default KycForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  CircularProgress, // MUI Loader component
  Snackbar, // Import Snackbar
  Alert, // Import Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  jobTitleOptions,
  notificationPreferencesOptions,
  regionOptions,
  teamSizeOptions,
  timeZoneOptions,
} from "./selectOptions"; // Import options
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedNames, theme) {
  return {
    fontWeight:
      selectedNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const KycForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    teamSize: [],
    jobTitle: [],
    notificationPreferences: [],
    region: [],
    timeZone: [],
    postalCode: "",
    address: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isKycDone, setIsKycDone] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Added for Snackbar

  useEffect(() => {
    const checkKycStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login page if no token
        return;
      }

      setLoading(true); // Start loader before API call
      try {
        const response = await axios.get(
          "http://localhost:9707/api/v1/kyc/status",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Send token with the request
            },
          }
        );

        if (response.status === 200) {
          const { isKycDone } = response.data;
          if (isKycDone) {
            setIsKycDone(true);
            navigate("/Console"); // Redirect to Console page if KYC is done
          }
        }
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          switch (status) {
            case 401:
              setErrorMessage("Unauthorized. Please log in again.");
              navigate("/login"); // Redirect to login page if unauthorized
              break;
            default:
              setErrorMessage("An error occurred. Please try again.");
          }
        } else {
          setErrorMessage("Network error. Please check your connection.");
        }
        console.error("Error checking KYC status", error);
      } finally {
        setLoading(false); // Stop loader after API call
      }
    };

    checkKycStatus();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("User is not authenticated. Please log in.");
      return;
    }

    setLoading(true); // Start loader before form submission
    try {
      const response = await axios.post(
        "http://localhost:9707/api/v1/kyc/insert",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token with the request
          },
        }
      );

      if (response.status === 201) {
        // Backend returns 201 for successful creation
        setSuccessMessage(response.data.successMessage);
        setFormData({
          firstName: "",
          lastName: "",
          companyName: "",
          phoneNumber: "",
          teamSize: [],
          jobTitle: [],
          notificationPreferences: [],
          region: [],
          timeZone: [],
          postalCode: "",
          address: "",
        });
        setSnackbarOpen(true); // Open snackbar on success // Added line
        setTimeout(() => {
          navigate("/Console"); // Redirect to Console page after success
        }, 5000);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        switch (status) {
          case 400:
            setErrorMessage("Bad Request. Please check the input.");
            break;
          case 404:
            setErrorMessage("Endpoint not found. Please check the API URL.");
            break;
          case 500:
            setErrorMessage("Server error. Please try again later.");
            break;
          case 401:
            setErrorMessage("Unauthorized. Please log in again.");
            navigate("/login"); // Redirect to login page if unauthorized
            break;
          default:
            setErrorMessage("Network error. Please check your connection.");
        }
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }
      console.error("Error submitting form", error);
    } finally {
      setLoading(false); // Stop loader after form submission
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the snackbar // Added line
  };
  if (isKycDone) {
    // If KYC is done, redirect to Console
    return null;
  }

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6">
      <Box className="bg-white rounded-lg shadow-lg max-w-xl p-6">
        <h1 className="text-orange-600 font-bold mt-4 mb-6 text-center text-3xl underline">
          KYC Form
        </h1>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100px"
          >
            <CircularProgress /> {/* MUI Circular Loader */}
          </Box>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              InputProps={{
                style: {
                  fontWeight: "bold", // Make the input text bold
                },
              }}
              InputLabelProps={{
                style: {
                  fontWeight: "bold", // Make the label text bold
                },
              }}
            />

            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              InputProps={{
                style: {
                  fontWeight: "bold", // Make the input text bold
                },
              }}
              InputLabelProps={{
                style: {
                  fontWeight: "bold", // Make the label text bold
                },
              }}
            />

            {/* complany name */}
            <TextField
              label="Company Name"
              variant="outlined"
              fullWidth
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              InputProps={{
                style: {
                  fontWeight: "bold", // Make the input text bold
                },
              }}
              InputLabelProps={{
                style: {
                  fontWeight: "bold", // Make the label text bold
                },
              }}
            />

            {/* phoneNumber */}
            <TextField
              label="Phone number "
              variant="outlined"
              fullWidth
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              InputProps={{
                style: {
                  fontWeight: "bold", // Make the input text bold
                },
              }}
              InputLabelProps={{
                style: {
                  fontWeight: "bold", // Make the label text bold
                },
              }}
            />

            {/* Team Size Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="teamSize-label" style={{ fontWeight: "bold" }}>
                Team Size
              </InputLabel>
              <Select
                labelId="teamSize-label"
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    label="Team Size"
                    style={{ fontWeight: "bold" }}
                  />
                }
                MenuProps={MenuProps}
              >
                {teamSizeOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    style={getStyles(option.value, [formData.teamSize], theme)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Job Title Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="job-title " style={{ fontWeight: "bold" }}>
                Job Title{" "}
              </InputLabel>
              <Select
                labelId="job-title"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    label="Job Title"
                    style={{ fontWeight: "bold" }}
                  />
                }
                MenuProps={MenuProps}
              >
                {jobTitleOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    style={getStyles(option.value, [formData.jobTitle], theme)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Notification Preferences Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel
                id="notification-level"
                style={{ fontWeight: "bold" }}
              >
                Notification Preferences
              </InputLabel>
              <Select
                labelId="notification-level"
                id="notificationPreferences"
                name="notificationPreferences"
                value={formData.notificationPreferences}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    label="Notification Preferences"
                    style={{ fontWeight: "bold" }}
                  />
                }
                MenuProps={MenuProps}
              >
                {notificationPreferencesOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    style={getStyles(
                      option.value,
                      [formData.notificationPreferences],
                      theme
                    )}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Region Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="region-level" style={{ fontWeight: "bold" }}>
                Region
              </InputLabel>
              <Select
                labelId="region-level"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    label="Region"
                    style={{ fontWeight: "bold" }}
                  />
                }
                MenuProps={MenuProps}
              >
                {regionOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    style={getStyles(option.value, [formData.region], theme)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Time Zone Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="TimeZone-level" style={{ fontWeight: "bold" }}>
                Time Zone
              </InputLabel>
              <Select
                labelId="timeZone-level"
                id="timeZone"
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    label="TimeZone"
                    style={{ fontWeight: "bold" }}
                  />
                }
                MenuProps={MenuProps}
              >
                {timeZoneOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    style={getStyles(option.value, [formData.timeZone], theme)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* postalCode */}
            <TextField
              label="Postal Code"
              variant="outlined"
              fullWidth
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              InputProps={{
                style: {
                  fontWeight: "bold", // Make the input text bold
                },
              }}
              InputLabelProps={{
                style: {
                  fontWeight: "bold", // Make the label text bold
                },
              }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              InputProps={{
                style: {
                  fontWeight: "bold", // Make the input text bold
                },
              }}
              InputLabelProps={{
                style: {
                  fontWeight: "bold", // Make the label text bold
                },
              }}
            />

            {errorMessage && (
              <Box className="mt-2 text-red-600 text-center">
                {errorMessage}
              </Box>
            )}

            {successMessage && (
              <Box className="mt-2 text-green-600 text-center">
                {successMessage}
              </Box>
            )}
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-4 bg-orange-600 hover:bg-orange-700"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </Box>
      {/* Snackbar for Success Message */}
      <Snackbar
        open={snackbarOpen} // Added line
        autoHideDuration={3000} // Added line
        onClose={handleSnackbarClose} // Added line
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          KYC submitted successfully! {/* Added line */}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default KycForm;
