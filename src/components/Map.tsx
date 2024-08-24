import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 37.5665, 
  lng: 126.9780,
};

const Map: React.FC = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [country, setCountry] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleSearch = async () => {
    if (!country) {
      alert('Please enter a country name.');
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data.');
      }

      const data = await response.json();

      if (data.status === 'ZERO_RESULTS') {
        alert('Location not found. Please check the country name and try again.');
        return;
      }

      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCenter({
          lat: location.lat,
          lng: location.lng,
        });
      } else {
        alert('Location not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error('Error fetching location:', err);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={country}
          onChange={handleInputChange}
          placeholder="Enter a country name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>Error: {error}</p>}
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
