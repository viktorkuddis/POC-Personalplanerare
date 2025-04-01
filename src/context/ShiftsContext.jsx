import { useState, createContext } from "react";

export const ShiftsContext = createContext();

export function ShiftsContextProvider({ children }) {
  const [shifts, setShifts] = useState([]);

  return (
    <ShiftsContext.Provider value={{ shifts, setShifts }}>
      {children}
    </ShiftsContext.Provider>
  );
}
