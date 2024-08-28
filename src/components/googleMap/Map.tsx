import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBjrxMT0pJHSZkRb69wxo0g8zmaBzcse4M",
  });

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        ></GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Map;
