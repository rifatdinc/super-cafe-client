import { useState, useEffect } from 'react';

export function useElectron() {
  const [electronAvailable, setElectronAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electron) {
      setElectronAvailable(true);
    }
  }, []);

  return {
    electronAvailable,
    ipcRenderer: electronAvailable ? window.electron.ipcRenderer : null,
  };
}
