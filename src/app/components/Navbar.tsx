"use client";
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
            <Link href="/home" className="nav-link">
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

export default Navbar; // Export the Navbar
