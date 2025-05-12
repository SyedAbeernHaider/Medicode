"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"

// Gemini API configuration
const GEMINI_API_KEY = "AIzaSyDG4QaIsSjpwSwJRVyt4RBC70ZpOukeKqA";
// Using the Gemini 2.0 Flash model with v1beta API
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Fallback to local responses if API fails
const USE_FALLBACK = true;

function ChatbotPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm MediBot, your virtual healthcare assistant. How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [stream, setStream] = useState(null)

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  // Helper function to call Gemini API directly
  // Function to convert image to base64
  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Only take the base64 part after the comma
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => {
        console.error('Error reading file:', error);
        reject(error);
      };
    });
  };

  // Function to format message text with HTML
  const formatMessage = (text) => {
    if (!text) return '';
    
    // Convert markdown-style formatting to HTML
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/`(.*?)`/g, '<code>$1</code>') // Code
      .replace(/\n\s*\n/g, '</p><p>') // Paragraphs
      .replace(/\n/g, '<br>'); // Line breaks

    // Convert numbered lists
    formattedText = formattedText.replace(/(\d+)\.\s+(.*?)(?=\n\d+\.|$)/gs, (match, num, item) => {
      return `<li>${item}</li>`;
    });

    // Convert bullet points
    formattedText = formattedText.replace(/\*\s+(.*?)(?=\n\*\s|$)/gs, (match, item) => {
      return `<li>${item}</li>`;
    });

    // Wrap lists in <ul> or <ol> tags
    if (formattedText.includes('<li>')) {
      // Check if it's likely an ordered list (starts with 1.)
      const isOrderedList = /^\s*\d+\./.test(text);
      const listTag = isOrderedList ? 'ol' : 'ul';
      formattedText = formattedText.replace(/(<li>.*<\/li>)/gs, 
        `<${listTag} style="margin: 8px 0 8px 20px;">$1</${listTag}>`);
    }

    // Add proper spacing after headings
    formattedText = formattedText.replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, 
      '<div style="margin: 16px 0 8px 0; font-weight: bold; font-size: 1.2em;">$1</div>');

    // Add proper spacing for paragraphs
    formattedText = formattedText.replace(/<p>(.*?)<\/p>/g, 
      '<div style="margin: 8px 0;">$1</div>');

    // Style code blocks
    formattedText = formattedText.replace(/<code>(.*?)<\/code>/g, 
      '<code style="background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>');

    return formattedText;
  };

  const callGeminiAPI = async (prompt, conversationHistory = [], imageBase64 = null) => {
    try {
      // Format the conversation for the API
      const contents = [];

      // Add conversation history if any
      conversationHistory.forEach(msg => {
        const parts = [{ text: msg.text || '' }];
        if (msg.image) {
          parts.push({
            inlineData: {
              mimeType: 'image/jpeg',
              data: msg.image
            }
          });
        }
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: parts
        });
      });

      // Prepare the current message parts
      const currentMessageParts = [{ text: prompt }];
      
      // Add image data if provided
      if (imageBase64) {
        currentMessageParts.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64
          }
        });
      }

      // Add the current user message with image if any
      contents.push({
        role: 'user',
        parts: currentMessageParts
      });

      const requestData = {
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048, // Increased for image analysis
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      };

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 60000 // Increased timeout for image processing
        }
      );

      const responseData = response.data;

      if (!responseData.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error('Unexpected API response format:', responseData);
        throw new Error("Unexpected API response format");
      }

      return responseData.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API error:", error);
      if (error.response) {
        const { status, data } = error.response;
        console.error('Response data:', data);
        console.error('Response status:', status);

        if (status === 429) {
          // Rate limit exceeded
          const message = data?.error?.message || 'API rate limit exceeded';
          const helpText = 'You have exceeded your current quota. ' +
            'Please check your Google Cloud billing and quota settings. ' +
            'The chatbot will use fallback responses for now.';
          console.warn('API Rate Limit Exceeded:', message);
          throw new Error(`API rate limit exceeded. ${helpText}`);
        } else if (status >= 500) {
          // Server error
          throw new Error('The API server is currently unavailable. Please try again later.');
        } else if (status === 403) {
          // Authentication/Authorization error
          throw new Error('Authentication failed. Please check your API key and permissions.');
        } else {
          // Other 4xx errors
          throw new Error(`API error: ${status} - ${data?.error?.message || 'Unknown error'}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response from the API server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
        throw new Error(`Request setup error: ${error.message}`);
      }
    }
  };

  const handleSend = async () => {
    if (input.trim() === "" && !imagePreview) return;

    const messageId = Date.now();
    let userMessage = { 
      id: messageId, 
      sender: "user",
      text: input.trim() || "Please analyze this image.",
      image: imagePreview // Store the preview URL for display
    };

    let imageBase64 = null;

    // Process image if present
    if (imagePreview) {
      try {
        // If it's a data URL from the file input
        if (imagePreview.startsWith('data:')) {
          imageBase64 = imagePreview.split(',')[1];
        } else {
          // If it's a blob URL from the camera
          const response = await fetch(imagePreview);
          const blob = await response.blob();
          imageBase64 = await imageToBase64(blob);
        }
      } catch (error) {
        console.error("Error processing image:", error);
        setError("Failed to process the image. Please try again.");
        setIsLoading(false);
        return;
      }
    }

    // Add user message to chat
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setImagePreview(null);
    setIsLoading(true);
    setError(null);

    try {
      // Get relevant conversation history (skip the first bot greeting)
      const relevantHistory = messages.slice(1);

      // Call the Gemini API with the message and optional image
      const botResponse = await callGeminiAPI(
        userMessage.text,
        relevantHistory,
        imageBase64
      );

      // Add the bot response to messages
      setMessages([
        ...newMessages,
        {
          id: Date.now(),
          text: botResponse,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("API Error:", error);

      // Set error message for UI
      setError(`Connection error: ${error.message}. Using fallback responses.`);

      // Use fallback system if API fails
      if (USE_FALLBACK) {
        console.log("Using fallback response system");

        // Generate a contextual response based on the user's message
        const userQuery = userMessage.text.toLowerCase();
        let fallbackResponse = "";

        if (userQuery.includes("headache") || userQuery.includes("head pain") || userQuery.includes("migraine")) {
          fallbackResponse = "Headaches can have many causes including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If you're experiencing severe, persistent, or unusual headaches, please consult with a healthcare professional.";
        }
        else if (userQuery.includes("fever") || userQuery.includes("temperature")) {
          fallbackResponse = "A fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and take acetaminophen or ibuprofen to reduce fever. If your temperature exceeds 103°F (39.4°C), persists for more than three days, or is accompanied by severe symptoms, please seek medical attention.";
        }
        else if (userQuery.includes("cold") || userQuery.includes("flu") || userQuery.includes("cough") || userQuery.includes("sneez") || userQuery.includes("runny nose")) {
          fallbackResponse = "For cold and flu symptoms, rest, stay hydrated, and consider over-the-counter medications for symptom relief. If symptoms are severe or persist beyond a week, consult a healthcare provider. Remember that antibiotics don't work against viruses that cause colds and flu.";
        }
        else if (userQuery.includes("blood pressure") || userQuery.includes("hypertension")) {
          fallbackResponse = "Maintaining healthy blood pressure is important for overall health. Regular exercise, a balanced diet low in sodium, limited alcohol, not smoking, and stress management can help. If you have concerns about your blood pressure, regular monitoring and consultation with a healthcare provider is recommended.";
        }
        else if (userQuery.includes("diet") || userQuery.includes("nutrition") || userQuery.includes("food") || userQuery.includes("eat")) {
          fallbackResponse = "A balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats is essential for good health. Limit processed foods, added sugars, and excessive salt. Stay hydrated and consider your individual nutritional needs based on age, sex, and activity level.";
        }
        else if (userQuery.includes("exercise") || userQuery.includes("workout") || userQuery.includes("fitness")) {
          fallbackResponse = "Regular physical activity is essential for good health. Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly, plus muscle-strengthening activities twice a week. Start slowly if you're new to exercise and consult a healthcare provider if you have underlying health conditions.";
        }
        else if (userQuery.includes("sleep") || userQuery.includes("insomnia") || userQuery.includes("tired")) {
          fallbackResponse = "Quality sleep is crucial for health. Adults should aim for 7-9 hours nightly. Establish a regular sleep schedule, create a relaxing bedtime routine, ensure your bedroom is dark and cool, limit screen time before bed, and avoid caffeine and large meals close to bedtime. If sleep problems persist, consult a healthcare provider.";
        }
        else if (userQuery.includes("stress") || userQuery.includes("anxiety") || userQuery.includes("depress")) {
          fallbackResponse = "Managing stress and mental health is important. Try relaxation techniques like deep breathing, meditation, or yoga. Regular exercise, adequate sleep, and social connections can help. If you're experiencing persistent anxiety, depression, or other mental health concerns, please reach out to a healthcare provider or mental health professional.";
        }
        else if (userQuery.includes("hi") || userQuery.includes("hello") || userQuery.includes("hey") || userQuery === "hi" || userQuery === "hello") {
          fallbackResponse = "Hello! I'm your medical assistant. How can I help with your health questions today?";
        }
        else if (userMessage.image) {
          fallbackResponse = "I've analyzed the image you've shared. While I can see the visual content, for accurate medical analysis of images, I recommend consulting with a healthcare professional who can provide a proper diagnosis. They have the training and expertise to interpret medical images correctly.";
        }
        else {
          fallbackResponse = "Thank you for your question. As a medical assistant, I aim to provide helpful health information. For personalized medical advice, diagnosis, or treatment, please consult with a qualified healthcare professional who can evaluate your specific situation.";
        }

        setMessages([
          ...newMessages,
          {
            id: Date.now(),
            text: fallbackResponse,
            sender: "bot"
          }
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            id: Date.now(),
            text: "Sorry, I encountered a problem connecting to the AI service. Please try again later.",
            sender: "bot",
            isError: true
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      setError(null);
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      setError('Failed to load the image. Please try another file.');
      setImagePreview(null);
    };
    reader.readAsDataURL(file);
  }

  const openCamera = async () => {
    try {
      setIsCameraOpen(true);
      setError(null);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
      setIsCameraOpen(false);
    }
  }

  const takePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setImagePreview(imageDataUrl);

    closeCamera();
  }

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Medical Assistant</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Get instant answers to your health questions from our advanced AI-powered medical assistant.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-blue-600 text-white flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">MediBot</h2>
                <p className="text-sm text-blue-100">Online and ready to help</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                    style={{
                      maxWidth: '80%',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {message.sender === 'bot' ? (
                      <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                      />
                    ) : (
                      <div>{message.text}</div>
                    )}
                    {message.image && (
                      <div className="mt-2">
                        <img 
                          src={message.image} 
                          alt="User uploaded" 
                          className="max-w-full h-auto rounded border border-gray-200" 
                          style={{ maxHeight: '300px' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border-t border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {isCameraOpen && (
              <div className="p-4 border-t border-gray-200">
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg"
                  ></video>
                  <canvas ref={canvasRef} className="hidden"></canvas>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                    <button
                      onClick={takePhoto}
                      className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      onClick={closeCamera}
                      className="bg-red-500 text-white p-3 rounded-full shadow-lg"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {imagePreview && !isCameraOpen && (
              <div className="p-4 border-t border-gray-200">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-60 object-contain rounded-lg"
                  />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your health question..."
                  className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleFileUpload}
                  className="p-3 bg-gray-100 border-t border-b border-gray-300 text-gray-600 hover:bg-gray-200"
                  disabled={isLoading || isCameraOpen}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={openCamera}
                  className="p-3 bg-gray-100 border-t border-b border-gray-300 text-gray-600 hover:bg-gray-200"
                  disabled={isLoading || isCameraOpen}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={handleSend}
                  className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="w-6 h-6 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/webp, image/heic"
                className="hidden"
                capture="environment"
              />
              <p className="text-xs text-gray-500 mt-2">
                Ask any health-related question or upload an image for analysis.
                <br />
                <span className="text-red-500">
                  Note: This is an AI assistant and not a substitute for professional medical advice.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChatbotPage