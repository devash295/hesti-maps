import React, { useState } from "react";
import { Tabs, Tab, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download"; // Placeholder, use your own icon from Figma
import MarkerTab from "./marker/MarkerTab";
import PolygonTab from "./polygon/PolygonTab";

const TabsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: "#f7f7f7",
  borderBottom: "1px solid #ddd",
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#7c4dff",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  minWidth: "auto",
  color: "#666",
  "&.Mui-selected": {
    color: "#7c4dff",
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const EmptyState = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "300px",
  border: "1px dashed #ccc",
  borderRadius: "8px",
  backgroundColor: "#fafafa",
}));

const TabsSection = () => {
  const [value, setValue] = useState(0);
  const [mode, setMode] = useState("empty"); // Can be 'empty', 'polygon', or 'marker'

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    setMode("empty"); // Reset to empty state on tab change
  };

  const handleAddPolygon = () => {
    setMode("polygon");
  };

  const handleAddMarker = () => {
    setMode("marker");
  };

  return (
    <>
      <TabsContainer>
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab label="Polygons management" />
          <StyledTab label="Markers management" />
        </StyledTabs>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />} // Use your own icon from Figma
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Download
        </Button>
      </TabsContainer>
      <ContentContainer>
        {mode === "empty" && (
          <EmptyState>
            <Typography variant="h6">
              {value === 0 ? "There are no polygons" : "There are no markers"}
            </Typography>
            <Button
              variant="outlined"
              // Replace this icon with your custom icon from Figma
              sx={{
                textTransform: "none",
                fontWeight: 600,
                marginTop: 2,
                color: "#7c4dff",
                borderColor: "#7c4dff",
              }}
              onClick={value === 0 ? handleAddPolygon : handleAddMarker}
            >
              {value === 0 ? "Add first polygon" : "Add first marker"}
            </Button>
          </EmptyState>
        )}
        {mode === "polygon" && <PolygonTab />}
        {mode === "marker" && <MarkerTab />}
      </ContentContainer>
    </>
  );
};

export default TabsSection;
