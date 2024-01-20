import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Register from './Register';
import VerifyEmail from './VerifyEmail';
import Login from './Login';
import Dashboard from './dashboard';  // Make sure this is correctly imported
import Capsule from './capsule';  // Import Capsule component
import CapsuleList from './capsule-list';  // Import CapsuleList component
import { useState, useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './PrivateRoute';
import { Navigate } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/capsule" element={
            <PrivateRoute>
              <Capsule />  // Route for the Capsule component
            </PrivateRoute>
          } />
          <Route path="/capsule-list" element={
            <PrivateRoute>
              <CapsuleList />  // Route for the CapsuleList component
            </PrivateRoute>
          } />
        </Routes>  
      </AuthProvider>
    </Router>
  );
}

export default App;
