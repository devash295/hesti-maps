import { Box } from "@mui/material";
import PolygonTable from "./PolygonTable";

type PolygonTableProps = {
  polygonCoords: any;
  onUpdatePolygon?: (index: number, updatedCoords: any[]) => void;
  onDeletePolygon?: (index: number) => void;
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
