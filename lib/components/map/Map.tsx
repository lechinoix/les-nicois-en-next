import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import { Adventure } from '~/config/types';

type PropsType = {
  adventures: Adventure[]
}

const GRENOBLE_POSITION = { lat: 45.1839296, lng: 5.6825448 }

const extractPositionFromAdventure = (adventure: Adventure) => {
  if (adventure.places.length === 0) return GRENOBLE_POSITION;
  const mainPlace = adventure.places[0];

  if (!mainPlace.location) return GRENOBLE_POSITION;

  const [lat, lng] = mainPlace
    .location
    .split(',')
    .map(pos => Number(pos));

  return { lat, lng }
 }
const Map = ({ adventures }: PropsType) => (
  <MapContainer className="h-full" center={GRENOBLE_POSITION} zoom={13}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {adventures && adventures.map(adventure => (
      <Marker key={adventure.id} position={extractPositionFromAdventure(adventure)}>
        <Popup>
          {adventure.title}
        </Popup>
      </Marker>
    ))}
  </MapContainer>
)

export default Map