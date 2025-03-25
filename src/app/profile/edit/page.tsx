"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/user";

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    department: "",
    semester: "",
    skills: "",
    achievements: "",
    score: "",
    yearOfPassout: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Properly initialized error state

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch profile data");

        const data: Profile = await response.json();

        setFormData({
          department: data.profile?.department || "",
          semester: data.profile?.semester?.toString() || "",
          skills: data.profile?.skills?.join(", ") || "",
          achievements: data.profile?.achievements?.join("\n") || "",
          score: data.profile?.score?.toString() || "",
          yearOfPassout: data.profile?.yearOfPassout?.toString() || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          department: formData.department || null,
          semester: formData.semester ? Number(formData.semester) : null,
          skills: formData.skills.split(",").map((s) => s.trim()),
          achievements: formData.achievements.split("\n").map((a) => a.trim()),
          score: formData.score ? Number(formData.score) : null,
          yearOfPassout: formData.yearOfPassout
            ? Number(formData.yearOfPassout)
            : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Update failed");
      }

      router.push("/profile?refresh=" + Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-blue-600">
            Edit Profile
          </h1>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-300 rounded-md font-bold text-gray-600"
                placeholder="Enter department"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Semester
              </label>
              <input
                type="number"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-300 rounded-md font-bold text-gray-600"
                min="1"
                max="10"
                placeholder="Enter current semester"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Skills (comma separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-300 rounded-md font-bold text-gray-600"
                placeholder="e.g., React, Node.js, Python"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Achievements (one per line)
              </label>
              <textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-300 rounded-md h-32 font-bold text-gray-600"
                placeholder="Enter each achievement on a new line"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Score
              </label>
              <input
                type="number"
                step="0.01"
                name="score"
                value={formData.score}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-300 rounded-md font-bold text-gray-600"
                placeholder="Enter current score"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Year of Passout
              </label>
              <input
                type="number"
                name="yearOfPassout"
                value={formData.yearOfPassout}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-300 rounded-md font-bold text-gray-600"
                min="2000"
                max="2030"
                placeholder="Enter expected passout year"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push("/profile")}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
