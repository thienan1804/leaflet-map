import React, { Component, useState } from "react";
import { MapContainer, TileLayer, Circle, FeatureGroup } from "react-leaflet";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

//

let polyline;

const DrawLocation = () => {
  // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

  const [onChange, setOnchange] = useState("");
  const _onChange = () => {
    // _editableFG contains the edited geometry, which can be manipulated through the leaflet API

    if (!_editableFG || !onChange) {
      return;
    }

    const geojsonData = _editableFG.leafletElement.toGeoJSON();
    console.log("a:", geojsonData);

    setOnchange(geojsonData);
  };

  const _onEdited = (e) => {
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    _onChange();
  };

  const _onCreated = (e) => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    } else {
      console.log("_onCreated: something else created:", type, e);
    }
    // Do whatever else you need to. (save to db; etc)

    _onChange();
  };

  const _onDeleted = (e) => {
    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    _onChange();
  };

  const _onMounted = (drawControl) => {
    console.log("_onMounted", drawControl);
  };

  const _onEditStart = (e) => {
    console.log("_onEditStart", e);
  };

  const _onEditStop = (e) => {
    console.log("_onEditStop", e);
  };

  const _onDeleteStart = (e) => {
    console.log("_onDeleteStart", e);
  };

  const _onDeleteStop = (e) => {
    console.log("_onDeleteStop", e);
  };
  return (
    <MapContainer
      center={[10.964112, 106.856461]}
      zoom={13}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMapContainer</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup
        ref={(reactFGref) => {
          _onFeatureGroupReady(reactFGref);
        }}
      >
        <EditControl
          position="topright"
          onEdited={_onEdited}
          onCreated={_onCreated}
          onDeleted={_onDeleted}
          onMounted={_onMounted}
          onEditStart={_onEditStart}
          onEditStop={_onEditStop}
          onDeleteStart={_onDeleteStart}
          onDeleteStop={_onDeleteStop}
          draw={{
            rectangle: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

const _editableFG = null;

const _onFeatureGroupReady = (reactFGref) => {
  // populate the leaflet FeatureGroup with the geoJson layers

  let leafletGeoJSON = new L.GeoJSON(getGeoJson());
  let leafletFG = reactFGref?.leafletElement;

  leafletGeoJSON.eachLayer((layer) => {
    leafletFG?.addLayer(layer);
  });

  // store the ref for future access to content

  const _editableFG = reactFGref;
};

// data taken from the example in https://github.com/PaulLeCam/react-leaflet/issues/176

function getGeoJson() {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [-122.47979164123535, 37.830124319877235],
            [-122.47721672058105, 37.809377088502615],
          ],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-122.46923446655273, 37.80293476836673],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-122.48399734497069, 37.83466623607849],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-122.47867584228514, 37.81893781173967],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-122.48069286346434, 37.800637436707525],
              [-122.48069286346434, 37.803104310307276],
              [-122.47950196266174, 37.803104310307276],
              [-122.47950196266174, 37.800637436707525],
              [-122.48069286346434, 37.800637436707525],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-122.48103886842728, 37.833075326166274],
              [-122.48065531253813, 37.832558431940114],
              [-122.4799284338951, 37.8322660885204],
              [-122.47963070869446, 37.83231693093747],
              [-122.47948586940764, 37.832467339549524],
              [-122.47945636510849, 37.83273426112019],
              [-122.47959315776825, 37.83289737938241],
              [-122.48004108667372, 37.833109220743104],
              [-122.48058557510376, 37.83328293020496],
              [-122.48080283403395, 37.83332529830436],
              [-122.48091548681259, 37.83322785163939],
              [-122.48103886842728, 37.833075326166274],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-122.48043537139893, 37.82564992009924],
              [-122.48129367828368, 37.82629397920697],
              [-122.48240947723389, 37.82544653184479],
              [-122.48373985290527, 37.82632787689904],
              [-122.48425483703613, 37.82680244295304],
              [-122.48605728149415, 37.82639567223645],
              [-122.4898338317871, 37.82663295542695],
              [-122.4930953979492, 37.82415839321614],
              [-122.49700069427489, 37.821887146654376],
              [-122.4991464614868, 37.82171764783966],
              [-122.49850273132326, 37.81798857543524],
              [-122.50923156738281, 37.82090404811055],
              [-122.51232147216798, 37.823344820392535],
              [-122.50150680541992, 37.8271414168374],
              [-122.48743057250977, 37.83093781796035],
              [-122.48313903808594, 37.82822612280363],
              [-122.48043537139893, 37.82564992009924],
            ],
          ],
        },
      },
    ],
  };
}

export default DrawLocation;
