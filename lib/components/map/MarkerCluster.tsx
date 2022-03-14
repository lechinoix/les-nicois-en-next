import { useEffect } from "react";
import L, { LatLngExpression } from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useMap } from "react-leaflet";
import Icon from './icon';

const mcg = L.markerClusterGroup();

type MarkerType = { position: LatLngExpression, text: string }
type PropsType = { markers: MarkerType[] }

const MarkerCluster = ({ markers }: PropsType) => {
  const map = useMap();

  useEffect(() => {
    mcg.clearLayers();
    markers.forEach(({ position, text }: MarkerType) =>
      L.marker(position, {
        icon: Icon
      })
        .addTo(mcg)
        .bindPopup(text)
    );

    // optionally center the map around the markers
    // map.fitBounds(mcg.getBounds());

    // add the marker cluster group to the map
    map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

export default MarkerCluster;
