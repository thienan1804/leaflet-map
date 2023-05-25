import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";
import "./App.css";
import LeafletGeocoder from "./LeafletGeocoder";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import { useMapEvents } from "react-leaflet";
import { useRef, useState } from "react";
import DrawLocation from "./DrawLocation";

function App() {
  const position = [10.964112, 106.856461];

  const [viewLocation, setViewLocation] = useState(false)

  const fillBlueOptions = { fillColor: 'blue' }
  const polygon = [
    [10.946120, 106.876259],
    [10.955360, 106.848923],
    [10.954680, 106.794357],
  ]

  return (
    <div className="App">
      <div>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              setViewLocation(!viewLocation)
            }}
          />
          View your location
        </label>
      </div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletGeocoder />
        {/* {viewLocation && <LocationMarker />} */}
        {/* <DrawLocation /> */}
        {/* <Polygon pathOptions={fillBlueOptions} positions={polygon} /> */}
        <LeafletRoutingMachine />

      </MapContainer>
    </div>
  );
}

function LocationMarker() {
  const [position, setPosition] = useState(null)

  const map = useMapEvents({
    click() {
      map.locate()
      console.log(map.locate());
    },

    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}


export default App;