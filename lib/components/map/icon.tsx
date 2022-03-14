import { icon } from "leaflet"

const ICON_SIZE = 32;

const Icon = icon({
  iconUrl: "/icon/marker.svg",
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
  popupAnchor: [0, -ICON_SIZE]
})

export default Icon;
