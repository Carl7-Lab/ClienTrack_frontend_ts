import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const LocationInput = () => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
    null,
  );
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${import.meta.env.VITE_GMAPS_KEY}`,
  });

  const getCurrentPosition = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newPosition);
          setMarkerPosition(newPosition);
        },
        (error) => {
          console.error('Error getting the location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    setMarkerPosition({ lat: e.latLng?.lat() || 0, lng: e.latLng?.lng() || 0 });
    setLocation({ lat: e.latLng?.lat() || 0, lng: e.latLng?.lng() || 0 });
  }, []);

  console.log('ubicacion', location);
  console.log('cargado', isLoaded);
  console.log('mostrar mapa', showMap);

  return (
    <div>
      <button onClick={() => setShowMap(true)}>Mostrar Mapa</button>
      {showMap &&
        (isLoaded && location ? (
          <div style={{ height: '400px' }}>
            <GoogleMap
              center={location}
              zoom={17}
              onClick={handleMapClick}
              mapContainerStyle={{ width: '100%', height: '100%' }}
            >
              {markerPosition && (
                <Marker
                  position={markerPosition}
                  draggable={true}
                  onDragEnd={(e) =>
                    setMarkerPosition({
                      lat: e.latLng?.lat() || 0,
                      lng: e.latLng?.lng() || 0,
                    })
                  }
                />
              )}
            </GoogleMap>
          </div>
        ) : (
          <p>Obteniendo ubicación...</p>
        ))}
    </div>
  );
};

export default LocationInput;
