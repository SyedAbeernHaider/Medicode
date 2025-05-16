import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Activity } from 'lucide-react';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/adminlogin');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100';
  };

  return (
    <nav className="bg-white shadow-sm mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex
          ">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => navigate('/dashboard')}
                className={`${isActive('/dashboard')} inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium rounded-md`}
              >
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => navigate('/health')}
                className={`${isActive('/health')} inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium rounded-md`}
              >
                <Activity className="h-5 w-5 mr-2" />
                Human Health Statistics
              </button>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <button
            onClick={() => navigate('/dashboard')}
            className={`${isActive('/dashboard')} w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium`}
          >
            <LayoutDashboard className="inline-block h-5 w-5 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => navigate('/health')}
            className={`${isActive('/health')} w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium`}
          >
            <Activity className="inline-block h-5 w-5 mr-2" />
            Human Health Statistics
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="inline-block h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
