"use client";

import { createContext, useContext, useState, useCallback } from "react";

type LoaderContextType = {
  loaderDone: boolean;
  setLoaderDone: (done: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDoneState] = useState(false);
  const setLoaderDone = useCallback((done: boolean) => setLoaderDoneState(done), []);
  return (
    <LoaderContext.Provider value={{ loaderDone, setLoaderDone }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const ctx = useContext(LoaderContext);
  return ctx ?? { loaderDone: true, setLoaderDone: () => {} };
}
