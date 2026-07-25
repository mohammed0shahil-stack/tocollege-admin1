import { createContext, useCallback, useState } from 'react';

export const ToastContext = createContext(null);

/**
 * App-wide toast notifications. Wrapping this around <App /> means any
 * component can call the `useToast()` hook instead of managing its own
 * "did this action succeed" banner state.
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast({ message, id: Date.now() });
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}
