import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  DrawingManager,
} from "@react-google-maps/api";
import { styled } from "@mui/material/styles";
import MainContainer from "./components/mapManagement/mainContainer";
import { useMap } from "./hook/use-map";

const PageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const MapContainer = styled("div")(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down("sm")]: {
    height: "50vh",
  },
}));

const RightContainer = styled("div")(({ theme }) => ({
  flex: 1,
  backgroundColor: "#f0f0f0",
  [theme.breakpoints.down("sm")]: {
    height: "50vh",
  },
}));

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 25.7743,
  lng: -80.1937,
};

export const mainColor = "#57167E" 

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBjrxMT0pJHSZkRb69wxo0g8zmaBzcse4M", // Replace with your API key
    libraries: ["drawing"], // Ensure the drawing library is loaded
  });
  const { setPolygonCoords, markerCoords, setMarkerCoords } = useMap();
  const [drawingManagerOptions, setDrawingManagerOptions] = useState<any>(null);

  useEffect(() => {
    if (isLoaded && window.google) {
      setDrawingManagerOptions({
        drawingControl: true,
        drawingControlOptions: {
          drawingModes: [
            window.google.maps.drawing.OverlayType.POLYGON,
            window.google.maps.drawing.OverlayType.MARKER,
          ],
        },
        polygonOptions: {
          fillColor: "#2196F3",
          fillOpacity: 0.5,
          strokeWeight: 2,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      });
    }
  }, [isLoaded]);

  const onPolygonComplete = useCallback((polygon: any) => {
    const path = polygon.getPath();
    const coordinates = [];
    for (let i = 0; i < path.getLength(); i++) {
      const latLng = path.getAt(i);
      coordinates.push({ lat: latLng.lat(), lng: latLng.lng() });
    }
    setPolygonCoords?.(coordinates);
    console.log("Polygon coordinates:", coordinates);
  }, []);

  const onMarkerComplete = useCallback(
    (marker: any) => {
      const position = marker.getPosition();
      const newCoordinates = { lat: position.lat(), lng: position.lng() };

      // Check if the new coordinates already exist in the markerCoords array
      const isDuplicate = markerCoords?.some(
        (coord) =>
          coord.lat === newCoordinates.lat && coord.lng === newCoordinates.lng
      );

      if (!isDuplicate) {
        setMarkerCoords?.((prev) => [...prev, newCoordinates]);
        console.log("Marker coordinates:", newCoordinates);
      } else {
        console.log("Duplicate marker ignored:", newCoordinates);
      }
    },
    [markerCoords]
  );

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <PageContainer>
      <MapContainer>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
          >
            {drawingManagerOptions && (
              <DrawingManager
                onPolygonComplete={onPolygonComplete}
                onMarkerComplete={onMarkerComplete}
                options={drawingManagerOptions}
              />
            )}
          </GoogleMap>
        ) : (
          <div>Loading...</div>
        )}
      </MapContainer>
      <RightContainer>
        <MainContainer
          onUpdatePolygon={(index: any, updatedCoords: any) =>
            console.log("Update Polygon", index, updatedCoords)
          }
          onDeletePolygon={(index: any) => console.log("Delete Polygon", index)}
          onUpdateMarker={(index: any, updatedCoords: any) =>
            console.log("Update Marker", index, updatedCoords)
          }
          onDeleteMarker={(index: any) => console.log("Delete Marker", index)}
        />
      </RightContainer>
    </PageContainer>
  );
}

export default App;
