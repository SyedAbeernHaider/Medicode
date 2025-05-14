import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiCalendar, FiPhone, FiUser, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';

const Dashboard = () => {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [tabs, setTabs] = useState([
    { name: 'All', value: 'all', count: 0 },
    { name: 'Pending', value: 'pending', count: 0 },
    { name: 'In Progress', value: 'in_progress', count: 0 },
    { name: 'Completed', value: 'completed', count: 0 },
    { name: 'Cancelled', value: 'cancelled', count: 0 }
  ]);

  useEffect(() => {
    const fetchConsultations = () => {
      try {
        // Get consultations from localStorage
        const storedConsultations = JSON.parse(localStorage.getItem('consultations') || '[]');
        setConsultations(storedConsultations);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
    
    // Set up storage event listener to update when data changes in other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'consultations') {
        const updatedConsultations = JSON.parse(e.newValue || '[]');
        setConsultations(updatedConsultations);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/adminlogin');
  };

  // Filter consultations based on active tab
  const filteredConsultations = React.useMemo(() => {
    return activeTab === 'all' 
      ? consultations 
      : consultations.filter(consult => consult.status === activeTab);
  }, [activeTab, consultations]);

  // Update tab counts whenever consultations change
  useEffect(() => {
    const updatedTabs = [
      { name: 'All', value: 'all', count: consultations.length },
      { name: 'Pending', value: 'pending', count: consultations.filter(c => c.status === 'pending').length },
      { name: 'In Progress', value: 'in_progress', count: consultations.filter(c => c.status === 'in_progress').length },
      { name: 'Completed', value: 'completed', count: consultations.filter(c => c.status === 'completed').length },
      { name: 'Cancelled', value: 'cancelled', count: consultations.filter(c => c.status === 'cancelled').length },
    ];
    setTabs(updatedTabs);
  }, [consultations]);

  const updateConsultationStatus = (id, newStatus) => {
    try {
      const updatedConsultations = consultations.map(consult => 
        consult.id === id ? { ...consult, status: newStatus } : consult
      );
      
      // Update state
      setConsultations(updatedConsultations);
      
      // Update localStorage
      localStorage.setItem('consultations', JSON.stringify(updatedConsultations));
      
      // In a real app, you would also update the backend here
      // await updateConsultationStatusInBackend(id, newStatus);
      
    } catch (error) {
      console.error('Error updating consultation status:', error);
      // Optionally, show an error message to the user
    }
  };

  const getStatusBadge = (consult) => {
    const { id, status } = consult;
    
    const handleStatusChange = (e) => {
      e.stopPropagation();
      const newStatus = e.target.value;
      updateConsultationStatus(id, newStatus);
    };
    
    const statusOptions = [
      { value: 'pending', label: 'Pending', icon: <FiClock className="mr-1" />, color: 'yellow' },
      { value: 'in_progress', label: 'In Progress', icon: <FiClock className="mr-1" />, color: 'blue' },
      { value: 'completed', label: 'Completed', icon: <FiCheckCircle className="mr-1" />, color: 'green' },
      { value: 'cancelled', label: 'Cancelled', icon: <FiAlertCircle className="mr-1" />, color: 'red' }
    ];
    
    const currentStatus = statusOptions.find(opt => opt.value === status) || 
      { value: 'unknown', label: 'Unknown', icon: <FiAlertCircle className="mr-1" />, color: 'gray' };
    
    return (
      <select
        value={status}
        onChange={handleStatusChange}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          currentStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
          currentStatus.color === 'blue' ? 'bg-blue-100 text-blue-800' :
          currentStatus.color === 'green' ? 'bg-green-100 text-green-800' :
          currentStatus.color === 'red' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        } border-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer`}
        onClick={(e) => e.stopPropagation()}
      >
        {statusOptions.map(option => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-white text-gray-900"
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto inline-flex justify-center items-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiLogOut className="mr-1.5" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Total Consultations */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 sm:px-4 py-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-2 sm:p-3">
                  <FiCalendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Total</dt>
                  <dd className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {consultations.length}
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 sm:px-4 py-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-2 sm:p-3">
                  <FiCheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Completed</dt>
                  <dd className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {consultations.filter(c => c.status === 'completed').length}
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 sm:px-4 py-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-2 sm:p-3">
                  <FiClock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {consultations.filter(c => c.status === 'pending').length}
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-3 sm:px-4 py-4 sm:py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-2 sm:p-3">
                  <FiCalendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Today</dt>
                  <dd className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {consultations.filter(c => {
                      const today = new Date().toDateString();
                      const consultDate = new Date(c.date).toDateString();
                      return today === consultDate;
                    }).length}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 sm:mb-6">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select a tab</label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.value} value={tab.value}>
                  {tab.name} ({tab.count})
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto pb-0.5" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`${activeTab === tab.value
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-xs sm:text-sm`}
                    aria-current={activeTab === tab.value ? 'page' : undefined}
                  >
                    {tab.name}
                    {tab.count > 0 && (
                      <span
                        className={`${activeTab === tab.value ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900'
                          } hidden sm:inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-xs font-medium`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Consultations List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {loading ? (
              <li className="px-4 py-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </li>
            ) : filteredConsultations.length === 0 ? (
              <li className="px-4 py-8 text-center text-gray-500">
                No consultations found
              </li>
            ) : (
              filteredConsultations.map((consult) => (
                <li key={consult.id} className="px-3 sm:px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FiUser className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="flex flex-col sm:flex-row sm:items-baseline">
                            <p className="text-sm sm:text-base font-medium text-indigo-600 truncate">
                              {consult.fullName}
                            </p>
                            <span className="hidden sm:inline-block mx-2 text-gray-400">•</span>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                              {consult.service}
                            </p>
                          </div>
                          <div className="mt-1 space-y-1 sm:space-y-0 sm:space-x-3">
                            <div className="flex items-center text-xs text-gray-500">
                              <FiPhone className="flex-shrink-0 mr-1 h-3 w-3 text-gray-400" />
                              <span className="truncate">{consult.phoneNumber}</span>
                            </div>
                            <div className="hidden sm:inline-block text-gray-300">•</div>
                            <div className="flex items-center text-xs text-gray-500">
                              <span>Age: {consult.age}</span>
                            </div>
                            <div className="hidden sm:inline-block text-gray-300">•</div>
                            <div className="flex items-center text-xs text-gray-500">
                              <FiCalendar className="flex-shrink-0 mr-1 h-3 w-3 text-gray-400" />
                              <span className="truncate">
                                {new Date(consult.date).toLocaleString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-2 flex-shrink-0">
                      {getStatusBadge(consult)}
                    </div>
                  </div>
                  <div className="mt-2 sm:ml-12">
                    <p className="text-xs sm:text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Concern:</span> {consult.concern}
                    </p>
                    {consult.hasMedicalCard && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                        Has Medical Card
                      </span>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;