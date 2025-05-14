import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsultFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    age: '',
    concern: '',
    hasMedicalCard: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 1 || formData.age > 120) newErrors.age = 'Please enter a valid age';
    if (!formData.concern.trim()) newErrors.concern = 'Please describe your concern';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Get existing consultations from localStorage or initialize empty array
      const existingConsultations = JSON.parse(localStorage.getItem('consultations') || '[]');
      
      // Create new consultation with additional data
      const newConsultation = {
        ...formData,
        id: Date.now(), // Simple unique ID
        status: 'pending',
        date: new Date().toISOString(),
        service: 'General Consultation' // Default service, can be updated based on where the form was submitted from
      };

      // Add new consultation to the array
      const updatedConsultations = [...existingConsultations, newConsultation];
      
      // Save back to localStorage
      localStorage.setItem('consultations', JSON.stringify(updatedConsultations));
      
      // Show success message and redirect
      alert('Consultation request submitted successfully!');
      navigate('/services');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Book a Consultation
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Fill in your details and we'll get back to you shortly.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 rounded-md border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 rounded-md border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 rounded-md border ${errors.age ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="30"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                  )}
                </div>
              </div>

              {/* Concern/Symptoms */}
              <div>
                <label htmlFor="concern" className="block text-sm font-medium text-gray-700">
                  Concern/Symptoms <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="concern"
                    name="concern"
                    rows={4}
                    value={formData.concern}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 rounded-md border ${errors.concern ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Please describe your concern or symptoms in detail..."
                  />
                  {errors.concern && (
                    <p className="mt-1 text-sm text-red-600">{errors.concern}</p>
                  )}
                </div>
              </div>

              {/* Medical Card Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="hasMedicalCard"
                    name="hasMedicalCard"
                    type="checkbox"
                    checked={formData.hasMedicalCard}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="hasMedicalCard" className="font-medium text-gray-700">
                    I have a medical card
                  </label>
                  <p className="text-gray-500">Check this if you have an existing medical card or insurance.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Book Consultation
                </button>
              </div>
            </form>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <button
              onClick={() => navigate(-1)}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              ← Back to services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultFormPage;