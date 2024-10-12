import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const CreateClusterDialog = ({ open, onClose, onClusterCreated }) => {
  const [formValues, setFormValues] = useState({
    clusterName: "",
    description: "",
    isActive: "TRUE",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'

  // Handle input change in form fields
  const handleChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Handle saving a new cluster to the backend
  const handleSaveCluster = async () => {
    const payload = {
      clusterName: formValues.clusterName,
      description: formValues.description,
      isActive: formValues.isActive,
    };

    try {
      const response = await axios.post(
        "http://localhost:9707/api/v1/clusters/create",
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 201) {
        setSnackbarMessage("Cluster created successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true); // Show success message
        onClusterCreated(response.data); // Notify parent component of the new cluster

        // Clear the form values after success
        setFormValues({
          clusterName: "",
          description: "",
          isActive: "TRUE",
        });

        onClose(); // Close the dialog after successful creation
      }
    } catch (error) {
      setSnackbarMessage(error.response?.data || "Error creating cluster!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true); // Show error message
    }
  };

  // Close the Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: 600 }}>Create Cluster</DialogTitle>
        <DialogContent>
          <TextField
            label="Cluster Name"
            value={formValues.clusterName}
            onChange={(e) => handleChange("clusterName", e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiInputLabel-root": { fontWeight: 600 }, // Label semibold
              "& .MuiInputBase-input": { fontWeight: 600 }, // Input text semibold
            }}
          />
          <TextField
            label="Description"
            value={formValues.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiInputLabel-root": { fontWeight: 600 }, // Label semibold
              "& .MuiInputBase-input": { fontWeight: 600 }, // Input text semibold
            }}
          />
          <TextField
            label="Status"
            select
            SelectProps={{ native: true }}
            value={formValues.isActive}
            onChange={(e) => handleChange("isActive", e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiInputLabel-root": { fontWeight: 600 }, // Label semibold
              "& .MuiInputBase-input": { fontWeight: 600 }, // Input text semibold
            }}
          >
            <option value="TRUE" style={{ fontWeight: 600 }}>
              Active
            </option>
            <option value="FALSE" style={{ fontWeight: 600 }}>
              Inactive
            </option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveCluster}
            sx={{ fontWeight: 600 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Close after 4 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Positioning at the top-right
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%", fontWeight: 600 }} // Snackbar message semibold
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateClusterDialog;
