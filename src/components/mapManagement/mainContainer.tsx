import SearchBar from "../tabs/Searchbar";
import TabsSection from "../tabs/Tabs";

type PolygonTableProps = {
  polygonCoords: any;
  markerCoords: any;
  onUpdatePolygon?: (index: number, updatedCoords: any[]) => void;
  onDeletePolygon?: (index: number) => void;
  onUpdateMarker?: (index: number, updatedCoords: any) => void;
  onDeleteMarker?: (index: number) => void;
};

const MainContainer = (props: PolygonTableProps) => {
  const {
    polygonCoords,
    markerCoords,
    onDeleteMarker,
    onDeletePolygon,
    onUpdateMarker,
    onUpdatePolygon,
  } = props;
  console.log("🔴main🔴", polygonCoords);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SearchBar />
      <TabsSection
        polygonCoords={polygonCoords}
        markerCoords={markerCoords}
        onDeleteMarker={onDeleteMarker}
        onDeletePolygon={onDeletePolygon}
        onUpdateMarker={onUpdateMarker}
        onUpdatePolygon={onUpdatePolygon}
      />
    </div>
  );
};

export default MainContainer;
