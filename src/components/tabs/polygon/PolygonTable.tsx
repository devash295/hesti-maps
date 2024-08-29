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
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { makeStyles } from "@mui/styles";
import { mainColor } from "../../../App";
import { useMap } from "../../../hook/use-map";

type PolygonTableProps = {
  onUpdatePolygon?: (index: number, updatedCoords: any[]) => void;
  onDeletePolygon?: (index: number) => void;
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

const PolygonTable = ({
  onUpdatePolygon,
  onDeletePolygon,
}: PolygonTableProps) => {
  const [localPolygons, setLocalPolygons] = useState<any[][]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedCoords, setEditedCoords] = useState<any[]>([]);
  const classes = useStyles();
  const { polygonCoords } = useMap();

  // Effect to update local state when new props are received
  useEffect(() => {
    if (
      polygonCoords &&
      polygonCoords?.length > 0 &&
      polygonCoords?.every((coord) => coord.lat && coord.lng)
    ) {
      debugger;
      setLocalPolygons((prevPolygons) => [...prevPolygons, polygonCoords]);
    }
  }, [polygonCoords]);

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditedCoords([...localPolygons[index]]);
  };

  const handleSaveClick = (index: number) => {
    if (onUpdatePolygon) {
      onUpdatePolygon(index, editedCoords);
    }
    const updatedPolygons = [...localPolygons];
    updatedPolygons[index] = editedCoords;
    setLocalPolygons(updatedPolygons);
    setEditingIndex(null);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
  };

  const handleCoordChange = (
    coordIndex: number,
    field: string,
    value: string
  ) => {
    const newCoords = [...editedCoords];
    newCoords[coordIndex][field] = value;
    setEditedCoords(newCoords);
  };

  const handleDeleteClick = (index: number) => {
    const updatedPolygons = localPolygons.filter((_, i) => i !== index);
    setLocalPolygons(updatedPolygons);
    if (onDeletePolygon) {
      onDeletePolygon(index);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="polygon table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Coordinates</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localPolygons.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No polygons available
              </TableCell>
            </TableRow>
          ) : (
            localPolygons.map((coords, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #EBF0F8",
                    height: 30,
                    width: "20%",
                    borderRadius: 1,
                    verticalAlign: "top",
                    paddingTop: "16px",
                  }}
                >
                  {editingIndex === index ? (
                    <TextField
                      value={`Polygon ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      className={classes.outlinedInput}
                    />
                  ) : (
                    <TextField
                      value={`Polygon ${index + 1}`}
                      placeholder="Longitude"
                      variant="outlined"
                      fullWidth
                      className={classes.outlinedInput}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <>
                      {editedCoords.map((coord, coordIndex) => (
                        <div
                          key={coordIndex}
                          style={{ display: "flex", gap: 10, marginBottom: 8 }}
                        >
                          <TextField
                            value={coord.lat}
                            onChange={(e) =>
                              handleCoordChange(
                                coordIndex,
                                "lat",
                                e.target.value
                              )
                            }
                            placeholder="Latitude"
                            variant="outlined"
                            className={classes.outlinedInput}
                          />
                          <TextField
                            value={coord.lng}
                            onChange={(e) =>
                              handleCoordChange(
                                coordIndex,
                                "lng",
                                e.target.value
                              )
                            }
                            placeholder="Longitude"
                            variant="outlined"
                            className={classes.outlinedInput}
                          />
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          setEditedCoords([
                            ...editedCoords,
                            { lat: "", lng: "" },
                          ])
                        }
                        sx={{
                          color: mainColor,
                          size: "18px",
                          "&:hover": {
                            borderColor: mainColor,
                          },
                        }}
                      >
                        + Add point
                      </Button>
                    </>
                  ) : (
                    <TextField
                      value={coords
                        .map((coord: any) => `(${coord.lat}, ${coord.lng})`)
                        .join(", ")}
                      placeholder="Longitude"
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
                          borderRadius: 100,
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
                          borderRadius: 100,
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
                          borderRadius: 100,
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
                          borderRadius: 100,
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

export default PolygonTable;
