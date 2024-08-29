import SearchBar from "../tabs/Searchbar";
import TabsSection from "../tabs/Tabs";

type PolygonTableProps = {
  onUpdatePolygon?: (index: number, updatedCoords: any[]) => void;
  onDeletePolygon?: (index: number) => void;
  onUpdateMarker?: (index: number, updatedCoords: any) => void;
  onDeleteMarker?: (index: number) => void;
};

const MainContainer = (props: PolygonTableProps) => {
  const { onDeleteMarker, onDeletePolygon, onUpdateMarker, onUpdatePolygon } =
    props;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SearchBar />
      <TabsSection
        onDeleteMarker={onDeleteMarker}
        onDeletePolygon={onDeletePolygon}
        onUpdateMarker={onUpdateMarker}
        onUpdatePolygon={onUpdatePolygon}
      />
    </div>
  );
};

export default MainContainer;
