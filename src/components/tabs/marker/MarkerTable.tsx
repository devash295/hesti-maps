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
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useMap } from "../../../hook/use-map";
import { makeStyles } from "@mui/styles";
import { mainColor } from "../../../App";

type MarkerTableProps = {
  onUpdateMarker?: (index: number, updatedCoords: any) => void;
  onDeleteMarker?: (index: number) => void;
};

const useStyles = makeStyles((theme) => ({
  outlinedInput: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: mainColor,
      },
    },
  },
}));

const MarkerTable = ({ onUpdateMarker, onDeleteMarker }: MarkerTableProps) => {
  const [localMarkers, setLocalMarkers] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedCoord, setEditedCoord] = useState<any>(null);
  const classes = useStyles();
  const { markerCoords } = useMap();
  useEffect(() => {
    // Only add new markers that do not already exist in localMarkers
    const newMarkers = markerCoords?.filter(
      (newMarker) =>
        !localMarkers.some(
          (existingMarker) =>
            existingMarker.lat === newMarker.lat &&
            existingMarker.lng === newMarker.lng
        )
    );

    if (newMarkers && newMarkers?.length > 0) {
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
                <TableCell
                  sx={{
                    verticalAlign: "top",
                    paddingTop: "16px",
                  }}
                >
                  {editingIndex === index ? (
                    <TextField
                      value={`Marker ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      className={classes.outlinedInput}
                    />
                  ) : (
                    <TextField
                      value={`Marker ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      className={classes.outlinedInput}
                    />
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
                        className={classes.outlinedInput}
                      />
                      <TextField
                        value={editedCoord?.lng || ""}
                        onChange={(e) =>
                          handleCoordChange("lng", e.target.value)
                        }
                        placeholder="Longitude"
                        variant="outlined"
                        className={classes.outlinedInput}
                      />
                    </div>
                  ) : (
                    <TextField
                      value={`(${coord.lat}, ${coord.lng})`}
                      variant="outlined"
                      fullWidth
                      className={classes.outlinedInput}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <div style={{ display: "flex", gap: 4 }}>
                      <IconButton
                        onClick={() => handleSaveClick(index)}
                        sx={{
                          color: mainColor,
                          borderRadius: 10,
                          "&:hover": {
                            backgroundColor: mainColor,
                            color: "#FFFFFF",
                          },
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleCancelClick}
                        sx={{
                          color: mainColor,
                          borderRadius: 10,
                          "&:hover": {
                            backgroundColor: mainColor,
                            color: "#FFFFFF",
                          },
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEditClick(index)}
                        sx={{
                          color: mainColor,
                          borderRadius: 10,
                          "&:hover": {
                            backgroundColor: mainColor,
                            color: "#FFFFFF",
                          },
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(index)}
                        sx={{
                          color: mainColor,
                          borderRadius: 10,
                          "&:hover": {
                            backgroundColor: mainColor,
                            color: "#FFFFFF",
                          },
                        }}
                      >
                        <ClearIcon />
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
