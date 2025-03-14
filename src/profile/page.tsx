"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar"; // Import the Navbar

interface UserData {
  personal: {
    name: string;
    email: string;
    phone: string;
    department: string;
    semester: string;
  };
  academic: {
    skills: string;
    score: string;
    passoutYear: string;
  };
  achievements: string[];
}

const ProfilePage: React.FC = () => {
  // ... [keep all existing state and methods]

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      {" "}
      {/* Add pb-20 */}
      <Navbar /> {/* Add Navbar here */}
      {/* Rest of your existing profile page content */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h1>
      {/* Personal Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        {/* ... existing personal info content ... */}
      </div>
      {/* Academic Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        {/* ... existing academic info content ... */}
      </div>
      {/* Achievements Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* ... existing achievements content ... */}
      </div>
      {/* Edit/Save Button */}
      <div className="mt-6">{/* ... existing button logic ... */}</div>
    </div>
  );
};

export default ProfilePage;
