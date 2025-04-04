"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "../../types/user";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          router.push("/login");
          return;
        }
        if (response.status === 404) {
          // Profile doesn't exist yet
          router.push("/profile/create"); // Or show create profile UI
          return;
        }
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
//              ↑ Backticks added (` `` `)
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  if (loading)
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 p-8 text-center">
        Error: {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
        >
          Try Again
        </button>
      </div>
    );

  if (!profile)
    return (
      <div className="p-8 text-center text-gray-600">
        No profile data available
      </div>
    );

  // ... (keep all the imports and state declarations the same)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {profile.name}
                </h1>
                <p className="text-blue-100">{profile.email}</p>
                {profile.phoneNumber && (
                  <p className="text-blue-100 mt-1">{profile.phoneNumber}</p>
                )}
              </div>
              <button
                onClick={() => router.push("/profile/edit")}
                className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-1">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Academic Details
              </h2>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-500">Department</label>
                  <p className="font-bold text-gray-600">
                    {profile.profile?.department || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Semester</label>
                  <p className="font-bold text-gray-600">
                    {profile.profile?.semester || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Passout Year</label>
                  <p className="font-bold text-gray-600">
                    {profile.profile?.yearOfPassout || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-black">
                    Skills
                  </h2>
                  {profile.profile?.skills?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No skills added yet</p>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4 text-black">
                    Achievements
                  </h2>
                  {profile.profile?.achievements?.length ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {profile.profile.achievements.map(
                        (achievement, index) => (
                          <li key={index} className="font-bold text-gray-600">
                            {achievement}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No achievements added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Performance
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Current Score</label>
                <p className="text-2xl font-bold text-gray-600">
                  {profile.profile?.score || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}