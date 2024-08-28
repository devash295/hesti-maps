import React, { useState } from "react";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add"; // Placeholder, replace with your Figma icon
import CloseIcon from "@mui/icons-material/Close"; // Placeholder, replace with your Figma icon
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"; // Placeholder, replace with your Figma icon

const PointRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const PointInput = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#ddd",
    },
    "&:hover fieldset": {
      borderColor: "#ccc",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7c4dff",
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textTransform: "none",
  fontWeight: 600,
}));

const PointInputForm = () => {
  const [points, setPoints] = useState([{ lat: "", lng: "" }]);

  const handleAddPoint = () => {
    setPoints([...points, { lat: "", lng: "" }]);
  };

  const handleRemovePoint = (index: any) => {
    const newPoints = points.filter((_, i) => i !== index);
    setPoints(newPoints);
  };

  const handleChange = (index: any, field: any, value: any) => {
    const newPoints = points.map((point, i) =>
      i === index ? { ...point, [field]: value } : point
    );
    setPoints(newPoints);
  };

  return (
    <Box sx={{ padding: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
      {points.map((point, index) => (
        <PointRow key={index}>
          <DragIndicatorIcon /> {/* Replace with your Figma drag icon */}
          <PointInput
            value={point.lat}
            onChange={(e) => handleChange(index, "lat", e.target.value)}
            placeholder="00.0000"
          />
          <PointInput
            value={point.lng}
            onChange={(e) => handleChange(index, "lng", e.target.value)}
            placeholder="00.0000"
          />
          {points.length > 1 && (
            <IconButton onClick={() => handleRemovePoint(index)}>
              <CloseIcon /> {/* Replace with your Figma close icon */}
            </IconButton>
          )}
        </PointRow>
      ))}
      <Button
        variant="text"
        startIcon={<AddIcon />} // Replace with your Figma add icon
        onClick={handleAddPoint}
        sx={{
          color: "#7c4dff",
          fontWeight: 600,
          marginBottom: 2,
        }}
      >
        Add point
      </Button>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ActionButton
          variant="outlined"
          sx={{ color: "#7c4dff", borderColor: "#7c4dff" }}
        >
          Cancel
        </ActionButton>
        <ActionButton variant="contained" sx={{ backgroundColor: "#7c4dff" }}>
          Save and apply
        </ActionButton>
      </Box>
    </Box>
  );
};

export default PointInputForm;
