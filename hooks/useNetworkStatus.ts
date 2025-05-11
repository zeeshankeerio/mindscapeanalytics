import { useEffect, useState } from 'react';

interface NetworkStatusState {
  online: boolean;
  effectiveConnectionType: string | null;
  downlink: number | null;
  rtt: number | null;
  saveData: boolean | null;
}

export function useNetworkStatus(): NetworkStatusState {
  const initialState: NetworkStatusState = {
    online: true, // Assume online by default
    effectiveConnectionType: null,
    downlink: null,
    rtt: null,
    saveData: null,
  };

  const [networkStatus, setNetworkStatus] = useState<NetworkStatusState>(initialState);

  useEffect(() => {
    // Check if we're running in the browser
    if (typeof window === 'undefined') {
      return;
    }

    // Set initial state based on current network status
    setNetworkStatus({
      online: navigator.onLine,
      effectiveConnectionType: getEffectiveConnectionType(),
      downlink: getConnectionDownlink(),
      rtt: getConnectionRTT(),
      saveData: getConnectionSaveData(),
    });

    // Event listeners for online/offline status changes
    const handleOnline = () => {
      setNetworkStatus(prev => ({ ...prev, online: true }));
    };

    const handleOffline = () => {
      setNetworkStatus(prev => ({ ...prev, online: false }));
    };

    // Event listener for connection changes
    const handleConnectionChange = () => {
      setNetworkStatus(prev => ({
        ...prev,
        effectiveConnectionType: getEffectiveConnectionType(),
        downlink: getConnectionDownlink(),
        rtt: getConnectionRTT(),
        saveData: getConnectionSaveData(),
      }));
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Add connection change listener if supported
    const connection = getNetworkConnection();
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return networkStatus;
}

// Helper functions to safely access connection properties
function getNetworkConnection(): any {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    return (navigator as any).connection;
  }
  return null;
}

function getEffectiveConnectionType(): string | null {
  const connection = getNetworkConnection();
  return connection?.effectiveType || null;
}

function getConnectionDownlink(): number | null {
  const connection = getNetworkConnection();
  return connection?.downlink || null;
}

function getConnectionRTT(): number | null {
  const connection = getNetworkConnection();
  return connection?.rtt || null;
}

function getConnectionSaveData(): boolean | null {
  const connection = getNetworkConnection();
  return connection?.saveData || null;
} 