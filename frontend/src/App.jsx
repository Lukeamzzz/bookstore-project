import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './firebase/AuthContext';

function App() {
  return (
    <>
      {/* Provides authentication context to all components inside */}
      <AuthProvider> 
        {/* Navbar is always visible across all pages */}
        <Navbar /> 

        {/* Main content area with responsive styling */}
        <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-textFont'>
          {/* Placeholder for rendering child routes */}
          <Outlet /> 
        </main>

        {/* Footer is always visible across all pages */}
        <Footer /> 
      </AuthProvider>
    </>
  );
}


export default App;