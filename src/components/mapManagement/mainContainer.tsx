import SearchBar from "../tabs/Searchbar";
import TabsSection from "../tabs/Tabs";

type PolygonTableProps = {
  polygonCoords: any;
};

const MainContainer = (props: PolygonTableProps) => {
  const { polygonCoords } = props;
  console.log("🔴main🔴", polygonCoords);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SearchBar />
      <TabsSection polygonCoords={polygonCoords} />
    </div>
  );
};

export default MainContainer;
