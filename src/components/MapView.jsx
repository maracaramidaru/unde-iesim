import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "100%" };
const center = { lat: 44.4268, lng: 26.1025 }; // centrul Bucureștiului

function MapView({ places }) {
  return (
    <LoadScript googleMapsApiKey="AICI_PUI_CHEIA_TA">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {places.map((place) => (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            onClick={() => {
              // când dai click pe marker, deschide Google Maps cu indicații
              const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
              window.open(url, "_blank");
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;