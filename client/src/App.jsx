import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import RoleProtectedRoute from './components/RoleProtectedRoute';

// Pages
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import RequestForm from './components/RequestForm';
import DonorList from './components/DonorList';
import ViewBloodRequests from './components/ViewBloodRequests';
import AdminDashboard from './components/AdminDashboard';
import DonorDashboard from './components/DonorDashboard';
import ReceiverDashboard from './components/ReceiverDashboard';
import NotFound from './components/NotFound';
import DonorHistory from './components/DonorHistory';



function App() {
  return (
    <Router>
      

<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  ...


        {/* ✅ Protected routes WITH Navbar via Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
          <Route path="/request-blood" element={<PrivateRoute><RequestForm /></PrivateRoute>} />
          <Route path="/donors" element={<PrivateRoute><DonorList /></PrivateRoute>} />
          <Route path="/view-requests" element={<PrivateRoute><ViewBloodRequests /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={
  <PrivateRoute>
    <RoleProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </RoleProtectedRoute>
  </PrivateRoute>
} />

<Route path="/donor-dashboard" element={
  <PrivateRoute>
    <RoleProtectedRoute allowedRoles={['donor']}>
      <DonorDashboard />
    </RoleProtectedRoute>
  </PrivateRoute>
} />

<Route path="/receiver-dashboard" element={
  <PrivateRoute>
    <RoleProtectedRoute allowedRoles={['receiver']}>
      <ReceiverDashboard />
    </RoleProtectedRoute>
  </PrivateRoute>
} />

<Route path="/donation-history" element={
  <PrivateRoute>
    <RoleProtectedRoute allowedRoles={['donor']}>
      <DonorHistory />
    </RoleProtectedRoute>
  </PrivateRoute>
} />


        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
