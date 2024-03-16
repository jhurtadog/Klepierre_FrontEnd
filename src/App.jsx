import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Communications from "./pages/Communications";
import NewCommunication from "./pages/NewCommunication";
import EditCommunication from "./pages/EditCommunication";
import Contracts from "./pages/Contracts";
import EditContract from "./pages/EditContract";
import Login from "./pages/Login";
import Users from "./pages/Users";
import NewUser from "./pages/NewUser";
import NewPassword from "./pages/NewPassword";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./context/AuthProvider";
import { CommunicationsProvider } from "./context/CommunicationsProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CommunicationsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<NewUser />} />
              <Route path="olvide-password" element={<ForgotPassword />} />
              <Route path="olvide-password/:token" element={<NewPassword />} />
            </Route>
            <Route path="/comunicados" element={<ProtectedLayout />}>
              <Route index element={<Communications />} />
              <Route path="crear-comunicado" element={<NewCommunication />} />
              <Route path="editar/:id" element={<EditCommunication />} />
            </Route>
            <Route path="/contratos" element={<ProtectedLayout />}>
              <Route index element={<Contracts />} />
              <Route path="editar/:id" element={<EditContract />} />
            </Route>
            <Route path="/usuarios" element={<ProtectedLayout />}>
              <Route index element={<Users />} />
              <Route path="crear-usuario" element={<NewUser />} />
            </Route>
          </Routes>
        </CommunicationsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
