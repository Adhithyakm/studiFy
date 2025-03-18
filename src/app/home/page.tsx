"use client";
import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-grow justify-around">
            <Link
              href="/home"
              className="flex flex-col items-center px-2 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              <HomeIcon className="h-6 w-6" />
              <span className="mt-1">Home</span>
            </Link>
            <Link
              href="/resources"
              className="flex flex-col items-center px-2 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              <BookOpenIcon className="h-6 w-6" />
              <span className="mt-1">Resources</span>
            </Link>
            <Link
              href="/quiz"
              className="flex flex-col items-center px-2 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              <AcademicCapIcon className="h-6 w-6" />
              <span className="mt-1">Quiz</span>
            </Link>
            <Link
              href="/chatbot"
              className="flex flex-col items-center px-2 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              <QuestionMarkCircleIcon className="h-6 w-6" />
              <span className="mt-1">Chatbot</span>
            </Link>
            <Link
              href="/profile"
              className="flex flex-col items-center px-2 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              <UserCircleIcon className="h-6 w-6" />
              <span className="mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      {" "}
      {/* Added pb-20 for navbar spacing */}
      <Navbar />
      {/* Header - Keep original structure */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome to Your Dashboard
      </h1>
      {/* Ongoing Classes Section - Original content */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Ongoing Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Advanced Mathematics */}
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

          {/* Web Development */}
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

          {/* Data Structures */}
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
      {/* AI Learning Assistant Section - Original content */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          AI Learning Assistant
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">Ask anything about your courses...</p>
          <input
            type="text"
            placeholder="Type your question here..."
            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {/* Upcoming Classes Section - Original content */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Upcoming Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Machine Learning */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Machine Learning
            </h3>
            <p className="text-gray-600 mb-2">1:00 PM</p>
            <p className="text-gray-600 mb-2">Instructor: Dr. Brown</p>
            <p className="text-gray-600 mb-4">Date: 2024-02-28</p>
            <button className="text-blue-600 hover:text-blue-500">
              View Details
            </button>
          </div>

          {/* Database Systems */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Database Systems
            </h3>
            <p className="text-gray-600 mb-2">3:00 PM</p>
            <p className="text-gray-600 mb-2">Instructor: Prof. Davis</p>
            <p className="text-gray-600 mb-4">Date: 2024-03-01</p>
            <button className="text-blue-600 hover:text-blue-500">
              View Details
            </button>
          </div>

          {/* Network Security */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Network Security
            </h3>
            <p className="text-gray-600 mb-2">11:00 AM</p>
            <p className="text-gray-600 mb-2">Instructor: Dr. Wilson</p>
            <p className="text-gray-600 mb-4">Date: 2024-03-02</p>
            <button className="text-blue-600 hover:text-blue-500">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;