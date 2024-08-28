import React, { useState } from "react";
import { Tabs, Tab, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import MarkerTab from "./marker/MarkerTab";
import PolygonTab from "./polygon/PolygonTab";

type PolygonTableProps = {
  polygonCoords: any;
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

const TabsSection = (props: PolygonTableProps) => {
  const { polygonCoords } = props;
  console.log("🔴tabs section🔴", polygonCoords);
  const [value, setValue] = useState(0);
  const [mode, setMode] = useState("polygon");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    setMode(newValue === 0 ? "polygon" : "marker");
  };

  return (
    <>
      <TabsContainer>
        <StyledTabs value={value} onChange={handleChange}>
          <Tab label="Polygons management" />
          <Tab label="Markers management" />
        </StyledTabs>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Download
        </Button>
      </TabsContainer>
      <Box>
        {mode === "polygon" && <PolygonTab polygonCoords={polygonCoords} />}
        {mode === "marker" && <MarkerTab />}
      </Box>
    </>
  );
};

export default TabsSection;
