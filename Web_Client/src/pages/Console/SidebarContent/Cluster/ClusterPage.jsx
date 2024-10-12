import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon
import CreateClusterDialog from "./CreateClusterDialog";
import axios from "axios";
import "./ClusterPage.css"; // You can style this if necessary

const ClusterPage = () => {
  const [open, setOpen] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [clusterToDelete, setClusterToDelete] = useState(null);
  const [clusterToDeleteName, setClusterToDeleteName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [clusterToEdit, setClusterToEdit] = useState(null);
  const [editClusterName, setEditClusterName] = useState("");
  const [editClusterDescription, setEditClusterDescription] = useState("");
  const [editClusterStatus, setEditClusterStatus] = useState("TRUE");

  const fetchClusters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9707/api/v1/clusters/",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setClusters(response.data);
    } catch (error) {
      console.error("Error fetching clusters:", error);
    }
  };

  useEffect(() => {
    fetchClusters();
  }, []);

  const handleCreateCluster = () => {
    setOpen(true);
  };

  const handleClusterCreated = (newCluster) => {
    setClusters((prevClusters) => [...prevClusters, newCluster]);
  };

  const handleDeleteClick = (clusterId, clusterName) => {
    setClusterToDelete(clusterId);
    setClusterToDeleteName(clusterName);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!clusterToDelete) return;

    try {
      await axios.delete(
        `http://localhost:9707/api/v1/clusters/${clusterToDelete}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setClusters((prevClusters) =>
        prevClusters.filter((cluster) => cluster.clusterId !== clusterToDelete)
      );

      setSnackbarMessage(
        `Cluster "${clusterToDeleteName}" deleted successfully!`
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting cluster:", error);
      setSnackbarMessage(`Failed to delete cluster "${clusterToDeleteName}"!`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }

    setConfirmDialogOpen(false);
    setClusterToDelete(null);
    setClusterToDeleteName("");
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setClusterToDelete(null);
    setClusterToDeleteName("");
  };

  const handleEditClick = (cluster) => {
    setClusterToEdit(cluster);
    setEditClusterName(cluster.clusterName);
    setEditClusterDescription(cluster.description || "");
    setEditClusterStatus(cluster.isActive);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!clusterToEdit) return;

    const updatedCluster = {
      clusterName: editClusterName,
      description: editClusterDescription,
      isActive: editClusterStatus,
    };

    try {
      await axios.put(
        `http://localhost:9707/api/v1/clusters/${clusterToEdit.clusterId}`,
        updatedCluster,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setClusters((prevClusters) =>
        prevClusters.map((cluster) =>
          cluster.clusterId === clusterToEdit.clusterId
            ? { ...cluster, ...updatedCluster }
            : cluster
        )
      );

      setSnackbarMessage(`Cluster "${editClusterName}" updated successfully!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating cluster:", error);
      setSnackbarMessage(`Failed to update cluster "${editClusterName}"!`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }

    setEditDialogOpen(false);
    setClusterToEdit(null);
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
    setClusterToEdit(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const sortedClusters = clusters.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <div className="flex justify-between items-center pt-6 mb-12">
        <h1 className="text-3xl font-bold text-gray-800">Cluster Management</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCluster}
        >
          Create Cluster
        </Button>
      </div>

      {/* Render clusters as cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedClusters.map((cluster) => (
          <Card
            key={cluster.clusterId}
            className="mb-4"
            style={{
              background: "linear-gradient(to right, #c05621, #7c2d12)", // Gradient from orange-700 to orange-900
              color: "#fff", // White text
              borderRadius: "15px", // Rounded corners
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Card shadow
              padding: "20px", // Padding for content
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                style={{
                  fontWeight: 600, // Semibold for cluster name
                  fontFamily: "'Poppins', sans-serif", // Use Poppins font (import from Google Fonts)
                  fontSize: "1.25rem", // Adjust the font size to make it slightly larger
                }}
              >
                Cluster: {cluster.clusterName}
              </Typography>
              <Typography
                variant="body2"
                color="inherit"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Description: {cluster.description || "No description provided"}
              </Typography>

              <Typography
                variant="body1"
                color="inherit"
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* Dot indicating active or inactive status */}
                Status: {cluster.isActive === "TRUE"
                  ? "Active"
                  : "Inactive"}{" "}
                <span
                  style={{
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginLeft: "12px",

                    marginRight: "8px",

                    backgroundColor:
                      cluster.isActive === "TRUE" ? "green" : "red", // Green for active, red for inactive
                  }}
                ></span>
              </Typography>

              <IconButton
                color="inherit"
                onClick={() => handleEditClick(cluster)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="inherit"
                onClick={() =>
                  handleDeleteClick(cluster.clusterId, cluster.clusterName)
                }
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialogs and Snackbars here */}
      <CreateClusterDialog
        open={open}
        onClose={() => setOpen(false)}
        onClusterCreated={handleClusterCreated}
      />
      <div className="">
        <Dialog
          open={confirmDialogOpen}
          onClose={handleCancelDelete}
          PaperProps={{
            style: {
              background: "linear-gradient(to right, #c05621, #7c2d12)", // Orange gradient
              color: "#fff", // White text color
            },
          }}
        >
          <DialogTitle style={{ fontWeight: 800 }}>
            Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{
                fontWeight: 800,
                color: "#fff", // Ensuring the text is white
                fontSize: "1.1rem", // Slightly larger font size for better visibility
              }}
            >
              Are you sure you want to delete the cluster "
              <strong style={{ color: "black", fontWeight: 1200 }}>
                {clusterToDeleteName}
              </strong>
              "? This action cannot be undone .
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancelDelete}
              style={{ color: "#ffffff", fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              style={{ color: "#ffcccb", fontWeight: 600 }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={editDialogOpen} onClose={handleCancelEdit}>
          <DialogTitle sx={{ fontWeight: 600 }}>Edit Cluster</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Cluster Name"
              type="text"
              fullWidth
              variant="outlined"
              value={editClusterName}
              onChange={(e) => setEditClusterName(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { fontWeight: 600 }, // Label semibold
                "& .MuiInputBase-input": { fontWeight: 600 }, // Input text semibold
              }}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={editClusterDescription}
              onChange={(e) => setEditClusterDescription(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { fontWeight: 600 }, // Label semibold
                "& .MuiInputBase-input": { fontWeight: 600 }, // Input text semibold
              }}
            />
            <Select
              margin="dense"
              label="Status"
              fullWidth
              variant="outlined"
              value={editClusterStatus}
              onChange={(e) => setEditClusterStatus(e.target.value)}
              sx={{ fontWeight: 600 }} // Select text semibold
            >
              <MenuItem value="TRUE" sx={{ fontWeight: 600 }}>
                Active
              </MenuItem>
              <MenuItem value="FALSE" sx={{ fontWeight: 600 }}>
                Inactive
              </MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancelEdit}
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ClusterPage;
