import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { styled } from "@mui/material/styles";
import MainContainer from "./components/mapManagement/mainContainer";

const PageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const MapContainer = styled("div")(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down("sm")]: {
    height: "50vh",
  },
}));

const RightContainer = styled("div")(({ theme }) => ({
  flex: 1,
  backgroundColor: "#f0f0f0",
  [theme.breakpoints.down("sm")]: {
    height: "50vh",
  },
}));

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY",
  });

  return (
    <PageContainer>
      <MapContainer>
        {isLoaded ? (
          <iframe
            title="maps"
            width="600"
            height="450"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAPa82ehGACl-2ENqfb1XFj7iCNnD1ISJM
    &q=Space+Needle,Seattle+WA"
          ></iframe>
        ) : (
          <div>Loading...</div>
        )}
      </MapContainer>
      <RightContainer>
        <MainContainer />
      </RightContainer>
    </PageContainer>
  );
}

export default App;
