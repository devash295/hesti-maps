import React, { useState } from "react";
import { Tabs, Tab, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import MarkerTab from "./marker/MarkerTab";
import PolygonTab from "./polygon/PolygonTab";

type TabsSectionProps = {
  onUpdatePolygon?: (index: number, updatedCoords: any[]) => void;
  onDeletePolygon?: (index: number) => void;
  onUpdateMarker?: (index: number, updatedCoords: any) => void;
  onDeleteMarker?: (index: number) => void;
};

const TabsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(1),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const TabsSection = (props: TabsSectionProps) => {
  const { onUpdatePolygon, onDeletePolygon, onUpdateMarker, onDeleteMarker } =
    props;
  const [value, setValue] = useState(0);
  const [mode, setMode] = useState("polygon");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    setMode(newValue === 0 ? "polygon" : "marker");
  };

  return (
    <>
      <TabsContainer sx={{ paddingLeft: 2 }}>
        <StyledTabs value={value} onChange={handleChange}>
          <Tab label="Polygons management" />
          <Tab label="Markers management" />
        </StyledTabs>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Download
        </Button>
      </TabsContainer>
      <Box>
        {mode === "polygon" && (
          <PolygonTab
            onUpdatePolygon={onUpdatePolygon}
            onDeletePolygon={onDeletePolygon}
          />
        )}
        {mode === "marker" && (
          <MarkerTab
            onUpdateMarker={onUpdateMarker}
            onDeleteMarker={onDeleteMarker}
          />
        )}
      </Box>
    </>
  );
};

export default TabsSection;
