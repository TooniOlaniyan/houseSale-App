import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Navbar from './Component/Navbar';
import Explore from './pages/Explore';
import PrivateRoute from './Component/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/offers' element={<Offers/>}/>
        <Route path='/profile' element={<PrivateRoute/>}>
           <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/category/:categoryName' element={<Category/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>
        <Route path='/category/:categoryName/:listingId' element={<Listing/>}/>
      </Routes>
      <Navbar/>
      </Router>
      <ToastContainer/>
      
    </>
  );
}

export default App;
