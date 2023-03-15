import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './RootLayout/RootLayout';
import Login from './Login/Login';
import Register from './Register/Register';
import EditProfile from './EditProfile/EditProfile';
import UserDetails from './UserDetails/UserDetails';
import Home from './Home/Home';
import SendOtpCode from './SendOtpCode/SendOtpCode';
import ResetPassword from './ResetPassword/ResetPassword';
import InputOtpCode from './InputOtpCode/InputOtpCode';
import IndexPage from './indexPage/indexPage';
import ReceiveOtp from './ReceiveOtp/ReceiveOtp';
import UpdatePassword from './UpdatePassword/UpdatePassword';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />} >
          <Route index element={<IndexPage />} />
          <Route path='login' element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='edit-profile' element={<EditProfile />} />
          <Route path='reset-password' element={<SendOtpCode />} />
          <Route path='profile' element={<UserDetails />} />
          <Route path='new-password' element={<ResetPassword />} />
          <Route path='password-otp' element={<InputOtpCode />} />
          <Route path='verification' element={<ReceiveOtp />} />
          <Route path='update-password' element={<UpdatePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
