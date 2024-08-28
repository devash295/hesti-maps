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

type PolygonTableProps = {
  polygonCoords: any[];
  onUpdatePolygon?: (index: number, updatedCoords: any[]) => void;
  onDeletePolygon?: (index: number) => void;
};

const PolygonTable = ({
  polygonCoords,
  onUpdatePolygon,
  onDeletePolygon,
}: PolygonTableProps) => {
  const [localPolygons, setLocalPolygons] = useState<any[][]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedCoords, setEditedCoords] = useState<any[]>([]);

  // Effect to update local state when new props are received
  useEffect(() => {
    if (
      polygonCoords.length > 0 &&
      polygonCoords.every((coord) => coord.lat && coord.lng)
    ) {
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
                <TableCell>
                  {editingIndex === index ? (
                    <TextField
                      value={`Polygon ${index + 1}`}
                      variant="outlined"
                      fullWidth
                    />
                  ) : (
                    `Polygon ${index + 1}`
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
                      >
                        + Add point
                      </Button>
                    </>
                  ) : (
                    coords
                      .map((coord: any) => `(${coord.lat}, ${coord.lng})`)
                      .join(", ")
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

export default PolygonTable;
