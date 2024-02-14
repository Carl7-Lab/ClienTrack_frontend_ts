import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import { PublicProvider } from './context/PublicProvider';
import {
  ConfirmAccount,
  ForgetPassword,
  Login,
  NewPassword,
  Register,
} from './pages/public';
import { Clients, Home, Sales } from './pages/private';
import PageNotFound from './pages/PageNotFound';
import { PrivateProvider } from './context/PrivateProvider';

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
                <Route path="forget-password/:token" element={<NewPassword />} />
                <Route path="confirm-account/:id" element={<ConfirmAccount />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>

              <Route path="/login" element={<PrivateLayout />}>
                <Route index element={<Home />} />
                <Route path="clients" element={<Clients />} />
                <Route path="sales" element={<Sales />} />
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
