import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Projects from './components/Projects/Projects';
import Register from './components/Register/Register';
import NewProj from './components/NewProj/NewProj';
import AdminDash from './components/AdminDash/AdminDash';
import AdminLogin from './components/AdminLogin/AdminLogin';
import { useEffect } from 'react';
import {
  AuthorizerProvider,
  Authorizer,
  useAuthorizer,
} from '@authorizerdev/authorizer-react'
import GitHubLogin from './utils/GitHubLogin';
import NewUser from './components/NewUser/NewUser';


function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
  }, []);
  return (
    <BrowserRouter>
      <AuthorizerProvider config={{
        authorizerURL: 'https://authorizer-production-68f0.up.railway.app',
        redirectURL: window.location.origin,
        clientID: 'ab2aadb4-b1a9-4b71-9deb-e90f2f2b4bf9'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/newproject" element={<NewProj />} />
          <Route path="/admin" element={<AdminDash />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/github/callback/:accesstoken" element={<GitHubLogin />} />
          <Route path="/user/new" element={<NewUser />} />
        </Routes>
      </AuthorizerProvider>
    </BrowserRouter>
  );
}

export default App;
