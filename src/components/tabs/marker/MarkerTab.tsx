import { Box } from "@mui/material";
import MarkerTable from "./MarkerTable";

type MarkerTabProps = {
  onUpdateMarker?: (index: number, updatedCoords: any) => void;
  onDeleteMarker?: (index: number) => void;
};

const MarkerTab = ({ onUpdateMarker, onDeleteMarker }: MarkerTabProps) => {
  return (
    <Box>
      <MarkerTable
        onUpdateMarker={onUpdateMarker}
        onDeleteMarker={onDeleteMarker}
      />
    </Box>
  );
};

export default MarkerTab;
