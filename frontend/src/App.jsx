import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/indexpage'
import LoginPage from './pages/loginpage'
import RegisterPage from './pages/registerpage'
import Layout from './layout'
import axios from 'axios'
import { UserContextProvider } from './usercontext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/placespage'
import PlacesForumPage from './pages/PlacesForumpage'
import PlacePage from './pages/placepage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'

axios.defaults.baseURL ='http://localhost:4000'
axios.defaults.withCredentials= true;

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/places" element={<PlacesPage/>} />
        <Route path="/account/places/new" element={<PlacesForumPage/>} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
      </Route>

    </Routes>
    </UserContextProvider> 
  )
}

export default App
