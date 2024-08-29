import { useContext } from "react";
import { MapContext } from "../store";

export const useMap = () => {
  const mapState = useContext(MapContext);

  return { ...mapState };
};
