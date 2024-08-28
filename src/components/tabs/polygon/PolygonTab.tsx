import { Box } from "@mui/material";
import PolygonTable from "./PolygonTable";

type PolygonTableProps = {
  polygonCoords: any;
};

const PolygonTab = (props: PolygonTableProps) => {
  const { polygonCoords } = props;
  console.log("🔴polygon tab🔴", polygonCoords);
  return (
    <Box>
      <PolygonTable polygonCoords={polygonCoords} />
    </Box>
  );
};

export default PolygonTab;
