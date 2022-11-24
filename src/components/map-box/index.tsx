import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWFyY29zcmV1cXVlbiIsImEiOiJja3UxbXBzbHQzejJvMnBwcW4yN3pqemZuIn0.z65srWhOb5sS3GilPljOpw",
});
type MapBoxSearchProps = {
  onChange?: (any) => any;
  register?: any;
  name?: string;
  error?: {};
  initCords?: {
    lat: number;
    lng: number;
  };
  [x: string]: any;
};
function MapSearch(props: MapBoxSearchProps) {
  const [query, setQuery] = useState("");
  const initCords = [props.initCords.lng, props.initCords.lat];
  const initialCoords: any = initCords;
  const [coords, setCoords] = useState(initialCoords);

  async function search() {
    const data = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=pk.bf4604bc2b3ea328e732de26a4387fa9&q=${
        query || props.defaultValue
      }&format=json`
    ).then((r) => r.json());
    const lat = parseFloat(data[0].lat);
    const lng = parseFloat(data[0].lon);
    const newCoords = [lng, lat];
    props.onChange({ lat, lng });
    setCoords(newCoords);
  }

  function inputChangeHandler(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }
  const keydownInputHandler = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      search();
    }
  };
  return (
    <div>
      <div>
        <input
          onChange={inputChangeHandler}
          onKeyDown={keydownInputHandler}
          value={query}
          className="input"
          type="text"
          name="q"
        />
        <br />
        <button className="button is-link" onClick={search}>
          Buscar direccion
        </button>
      </div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "300px",
          width: "100%",
        }}
        zoom={[14]}
        center={coords}
        movingMethod="flyTo"
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "veterinary-11", "icon-size": 1.5 }}
        >
          <Feature coordinates={coords} />
        </Layer>
      </Map>
    </div>
  );
}

export { MapSearch };
