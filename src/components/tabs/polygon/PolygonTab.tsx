import { Box } from "@mui/material";
import PolygonTable from "./PolygonTable";

type PolygonTableProps = {
  onUpdatePolygon?: (index: number, updatedCoords: any[]) => void;
  onDeletePolygon?: (index: number) => void;
};

const PolygonTab = (props: PolygonTableProps) => {
  return (
    <Box>
      <PolygonTable />
    </Box>
  );
};

export default PolygonTab;
