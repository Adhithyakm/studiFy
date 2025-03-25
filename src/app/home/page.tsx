"use client";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome to Your Dashboard
      </h1>

      {/* Ongoing Classes Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Ongoing Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Advanced Mathematics
            </h3>
            <p className="text-gray-600 mb-2">10:00 AM</p>
            <p className="text-gray-600 mb-4">Instructor: Dr. Smith</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">60% Complete</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Web Development
            </h3>
            <p className="text-gray-600 mb-2">2:00 PM</p>
            <p className="text-gray-600 mb-4">Instructor: Prof. Johnson</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">45% Complete</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Data Structures
            </h3>
            <p className="text-gray-600 mb-2">4:00 PM</p>
            <p className="text-gray-600 mb-4">Instructor: Dr. Williams</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">30% Complete</p>
          </div>
        </div>
      </div>

      {/* AI Learning Assistant Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          AI Learning Assistant
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Ask anything about your courses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Upcoming Classes Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Upcoming Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Machine Learning
            </h3>
            <p className="text-gray-600 mb-2">1:00 PM</p>
            <p className="text-gray-600 mb-4">Instructor: Dr. Brown</p>
            <button className="text-blue-600 hover:text-blue-500">
              View Details
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Database Systems
            </h3>
            <p className="text-gray-600 mb-2">3:00 PM</p>
            <p className="text-gray-600 mb-4">Instructor: Prof. Davis</p>
            <button className="text-blue-600 hover:text-blue-500">
              View Details
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Network Security
            </h3>
            <p className="text-gray-600 mb-2">11:00 AM</p>
            <p className="text-gray-600 mb-4">Instructor: Dr. Wilson</p>
            <button className="text-blue-600 hover:text-blue-500">
              View Details
            </button>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default HomePage;
