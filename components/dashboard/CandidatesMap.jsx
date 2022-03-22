import { GoogleApiWrapper } from "google-maps-react";
import mapConfig from "../../base/GoogleMapConfig";
import React, { useEffect } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const CandidatesMap = ({ candidatesLocations, google }) => {
  useEffect(() => {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: { lat: -32, lng: -60 },
      maxZoom: 11,
      backgroundColor: "#f0f3f4",
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
    map.setOptions({ styles: mapConfig });
    const markers = [];
    for (const canditateLocation of candidatesLocations) {
      const lat = canditateLocation.locations?.lat;
      const lng = canditateLocation.locations?.lng;
      if (!lat || !lng) return;
      const icon = "/assets/marker.svg";
      const marker = new google.maps.Marker({
        position: {
          lat,
          lng,
        },
      });
      marker.setIcon(icon);
      markers.push(marker);
    }
    const markerCluster = new MarkerClusterer({
      map,
      markers,
      renderer: {
        render: (x) => {
          const Markers = x?.markers.map((m) =>
            candidatesLocations?.find(
              (a) =>
                a.latitude === m.position.lat() &&
                a.longitude === m.position.lng()
            )
          );
          const marker = new google.maps.Marker({
            ...x.marker,
            position: { lat: x.position.lat(), lng: x.position.lng() },
          });
          const icon = `/assets/marker${
            Markers.length < 5 ? Markers.length : 5
          }.svg`;
          marker.setIcon(icon);
          return marker;
        },
      },
    });
  }, [candidatesLocations]);
  return (
    <div className="CandidatesMap">
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9JHUyupozNNbADOmNQzFSSMoAheekvGM&callback=initMap&v=weekly"
        async
      />
      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          borderTopRightRadius: "3px",
          borderBottomRightRadius: "3px",
          boxShadow: "0px 6px 6px rgba(9, 14, 37, 0.04)"
        }}
      />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD9JHUyupozNNbADOmNQzFSSMoAheekvGM",
})(CandidatesMap);
