import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
   
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include'
      });
  
      if (!dataResponse.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await dataResponse.json();
      console.log('User data:', data);
  
      if (data.success) {
        dispatch(setUserDetails(data.data));
      } else {
        throw new Error('Failed to fetch user details: ' + data.message);
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };
 
  useEffect(() => {
    fetchUserDetails();
  }, [dispatch]);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-120px)]'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;