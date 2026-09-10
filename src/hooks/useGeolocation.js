/**
 * useGeolocation.js
 * React hook for browser GPS using navigator.geolocation.watchPosition().
 * Provides continuous location updates while the component is mounted.
 *
 * Returns: { latitude, longitude, accuracy, loading, error, isSupported }
 */

import { useState, useEffect, useRef } from 'react';

const useGeolocation = (options = {}) => {
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
    loading: true,
    error: null,
    isSupported: 'geolocation' in navigator,
  });

  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by your browser.',
      }));
      return;
    }

    const geolocationOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 30000,
      ...options,
    };

    const onSuccess = (position) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        loading: false,
        error: null,
        isSupported: true,
      });
    };

    const onError = (err) => {
      let message = 'Unable to get your location.';
      switch (err.code) {
        case err.PERMISSION_DENIED:
          message = 'Location access denied. Please enable location permissions for this site.';
          break;
        case err.POSITION_UNAVAILABLE:
          message = 'Location information is unavailable. Check your GPS signal.';
          break;
        case err.TIMEOUT:
          message = 'Location request timed out. Retrying...';
          break;
      }
      setState((prev) => ({ ...prev, loading: false, error: message }));
    };

    // Start watching position
    watchIdRef.current = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      geolocationOptions
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};

export default useGeolocation;
