import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayouts from './layouts/AuthLayouts';
import {
  ConfirmAccount,
  ForgetPassword,
  Login,
  NewPassword,
  Register,
} from './pages/auth';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthLayouts />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="forget-password/:token" element={<NewPassword />} />
              <Route path="confirm-account/:id" element={<ConfirmAccount />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
