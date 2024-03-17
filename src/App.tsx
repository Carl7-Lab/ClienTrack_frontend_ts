import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { PublicProvider } from './context/PublicProvider';
import { PrivateProvider } from './context/PrivateProvider';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import {
  ConfirmAccount,
  ForgetPassword,
  Login,
  NewPassword,
  Register,
} from './pages/public';
import {
  Client,
  Clients,
  Home,
  // Reports
} from './pages/private';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <PublicProvider>
          <PrivateProvider>
            <Routes>
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forget-password" element={<ForgetPassword />} />
                <Route
                  path="forget-password/:token"
                  element={<NewPassword />}
                />
                <Route
                  path="confirm-account/:id"
                  element={<ConfirmAccount />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Route>

              <Route path="/app" element={<PrivateLayout />}>
                <Route index element={<Navigate to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="clients" element={<Clients />} />
                {/* <Route path="reports" element={<Reports />} /> */}
                <Route path="clients/:id" element={<Client />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </PrivateProvider>
        </PublicProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
