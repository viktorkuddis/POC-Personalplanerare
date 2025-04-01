import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { UsersContextProvider } from "./context/usersContext.jsx";
import { ShiftsContextProvider } from "./context/ShiftsContext.jsx";
import { ScheduleRulesContextProvider } from "./context/scheduleRules.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShiftsContextProvider>
      <UsersContextProvider>
        <ScheduleRulesContextProvider>
          <App />
        </ScheduleRulesContextProvider>
      </UsersContextProvider>
    </ShiftsContextProvider>
  </StrictMode>
);
