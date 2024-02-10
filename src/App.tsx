import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayouts from './layouts/AuthLayouts';
import {
  ConfirmAccount,
  ForgetPassword,
  Login,
  NewPassword,
  Register,
} from './pages/auth';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayouts />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="forget-password/:token" element={<NewPassword />} />
            <Route path="confirm-account/:id" element={<ConfirmAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
