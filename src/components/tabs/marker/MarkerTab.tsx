import { Box } from "@mui/material";
import MarkerTable from "./MarkerTable";

type MarkerTabProps = {
  markerCoords: any[];
  onUpdateMarker?: (index: number, updatedCoords: any) => void;
  onDeleteMarker?: (index: number) => void;
};

const MarkerTab = ({
  markerCoords,
  onUpdateMarker,
  onDeleteMarker,
}: MarkerTabProps) => {
  return (
    <Box>
      <MarkerTable
        markerCoords={markerCoords}
        onUpdateMarker={onUpdateMarker}
        onDeleteMarker={onDeleteMarker}
      />
    </Box>
  );
};

export default MarkerTab;
