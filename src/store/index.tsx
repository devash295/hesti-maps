import React, { createContext, useState, ReactNode } from "react";

interface MyContextType {
  polygonCoords: any[];
  setPolygonCoords: React.Dispatch<React.SetStateAction<any[]>>;
  markerCoords: any[];
  setMarkerCoords: React.Dispatch<React.SetStateAction<any[]>>;
}

const MapContext = createContext<MyContextType | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

const MapProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [polygonCoords, setPolygonCoords] = useState<any[]>([]);
  const [markerCoords, setMarkerCoords] = useState<any[]>([]);

  return (
    <MapContext.Provider
      value={{
        polygonCoords,
        setPolygonCoords,
        markerCoords,
        setMarkerCoords,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
