import { useState, createContext } from "react";

export const ScheduleRulesContext = createContext();

export function ScheduleRulesContextProvider({ children }) {
  const [scheduleRules, setScheduleRules] = useState([]);

  return (
    <ScheduleRulesContext.Provider value={{ scheduleRules, setScheduleRules }}>
      {children}
    </ScheduleRulesContext.Provider>
  );
}
