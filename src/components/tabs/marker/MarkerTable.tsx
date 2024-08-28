import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type MarkerTableProps = {
  markerCoords: any[];
  onUpdateMarker?: (index: number, updatedCoords: any) => void;
  onDeleteMarker?: (index: number) => void;
};

const MarkerTable = ({
  markerCoords,
  onUpdateMarker,
  onDeleteMarker,
}: MarkerTableProps) => {
  const [localMarkers, setLocalMarkers] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedCoord, setEditedCoord] = useState<any>(null);
  useEffect(() => {
    // Only add new markers that do not already exist in localMarkers
    const newMarkers = markerCoords.filter(
      (newMarker) =>
        !localMarkers.some(
          (existingMarker) =>
            existingMarker.lat === newMarker.lat &&
            existingMarker.lng === newMarker.lng
        )
    );

    if (newMarkers.length > 0) {
      setLocalMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
    }
  }, [markerCoords, localMarkers]);

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditedCoord({ ...localMarkers[index] });
  };

  const handleSaveClick = (index: number) => {
    if (onUpdateMarker) {
      onUpdateMarker(index, editedCoord);
    }
    const updatedMarkers = [...localMarkers];
    updatedMarkers[index] = editedCoord;
    setLocalMarkers(updatedMarkers);
    setEditingIndex(null);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
  };

  const handleCoordChange = (field: string, value: string) => {
    setEditedCoord((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleDeleteClick = (index: number) => {
    const updatedMarkers = localMarkers.filter((_, i) => i !== index);
    setLocalMarkers(updatedMarkers);
    if (onDeleteMarker) {
      onDeleteMarker(index);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="marker table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Coordinate</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localMarkers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No markers available
              </TableCell>
            </TableRow>
          ) : (
            localMarkers.map((coord: any, index: any) => (
              <TableRow key={index}>
                <TableCell>
                  {editingIndex === index ? (
                    <TextField
                      value={`Marker ${index + 1}`}
                      variant="outlined"
                      fullWidth
                    />
                  ) : (
                    `Marker ${index + 1}`
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                      <TextField
                        value={editedCoord?.lat || ""}
                        onChange={(e) =>
                          handleCoordChange("lat", e.target.value)
                        }
                        placeholder="Latitude"
                        variant="outlined"
                      />
                      <TextField
                        value={editedCoord?.lng || ""}
                        onChange={(e) =>
                          handleCoordChange("lng", e.target.value)
                        }
                        placeholder="Longitude"
                        variant="outlined"
                      />
                    </div>
                  ) : (
                    `(${coord.lat}, ${coord.lng})`
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <>
                      <IconButton onClick={() => handleSaveClick(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={handleCancelClick}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditClick(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MarkerTable;
