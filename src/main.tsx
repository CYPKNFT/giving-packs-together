import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import SecurityHeaders from "@/components/SecurityHeaders";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SecurityHeaders />
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
);
