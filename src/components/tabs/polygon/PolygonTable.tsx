import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Placeholder, replace with your Figma icon
import AddIcon from "@mui/icons-material/Add"; // Placeholder, replace with your Figma icon
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PolygonTable = () => {
  const [rows, setRows] = useState([{ lat: "", lng: "" }]);

  const handleAddRow = () => {
    setRows([...rows, { lat: "", lng: "" }]);
  };

  const handleRemoveRow = (index: any) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleChange = (index: any, field: any, value: any) => {
    const newRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(newRows);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="polygon table">
        <TableHead>
          <TableRow>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  value={row.lat}
                  onChange={(e) => handleChange(index, "lat", e.target.value)}
                  placeholder="00.0000"
                  variant="outlined"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.lng}
                  onChange={(e) => handleChange(index, "lng", e.target.value)}
                  placeholder="00.0000"
                  variant="outlined"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </TableCell>
              <TableCell align="right">
                {rows.length > 1 && (
                  <IconButton onClick={() => handleRemoveRow(index)}>
                    <CloseIcon /> {/* Replace with your Figma icon */}
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="center">
              <Button
                startIcon={<AddIcon />} // Replace with your Figma icon
                onClick={handleAddRow}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#7c4dff",
                }}
              >
                Add point
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PolygonTable;
