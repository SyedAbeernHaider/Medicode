import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiActivity, FiMenu, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      
      // Only set default state on initial mount
      if (!isMobile && isMobileView) {
        setIsSidebarOpen(false);
      } else if (isMobile && !isMobileView) {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    console.log('Toggle sidebar clicked, current state:', isSidebarOpen);
    setIsSidebarOpen(prevState => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />
    },
    {
      path: '/health',
      name: 'Human Health Statistics',
      icon: <FiActivity className="w-5 h-5" />
    }
  ];

  return (
    <>
      {/* Menu button - only visible when sidebar is closed */}
      {!isSidebarOpen && (
        <div className="fixed top-20 left-4 z-50">
          <button
            onClick={toggleSidebar}
            className="p-2 sm:p-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none shadow-lg flex items-center justify-center"
            aria-label="Open menu"
          >
            <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}

      {/* Sidebar overlay - only on mobile */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - positioned below navbar */}
      <div 
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg z-40 transition-all duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0 w-64 md:w-72' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button header */}
          <div className="p-3 border-b flex justify-end">
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-500 hover:text-indigo-600 focus:outline-none"
              aria-label="Close menu"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={isMobile ? closeSidebar : undefined}
                    className={`flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors ${
                      isActive(item.path) ? 'bg-indigo-100 text-indigo-700 font-medium' : ''
                    }`}
                  >
                    <span className="mr-3 flex-shrink-0">{item.icon}</span>
                    <span className="text-sm md:text-base">{item.name}</span>
                    {isActive(item.path) && (
                      <span className="ml-auto w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-3 sm:p-4 border-t text-xs sm:text-sm text-gray-500">
            <p>© 2025 MediCode</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
