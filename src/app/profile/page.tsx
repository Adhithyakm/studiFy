"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
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

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userProfileStr = localStorage.getItem("userProfile");
    if (!userProfileStr) {
      router.push("/login");
      return;
    }
    
    try {
      const userProfile = JSON.parse(userProfileStr);
      setProfile(userProfile);
    } catch (error) {
      console.error("Error parsing user profile:", error);
      router.push("/login");
    }
  }, [router]);

  const handleInputChange = (field: keyof UserProfile['academic'], value: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      academic: {
        ...profile.academic,
        [field]: value
      }
    });
  };

  const handleAchievementsChange = (value: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      achievements: value.split('\n').filter(ach => ach.trim() !== '')
    });
  };

  const handleSubmit = () => {
    if (!profile) return;
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEditing(false);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">User Profile</h1>
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Personal Information (Read-only) */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <p className="mt-1 text-lg">{profile.personal.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <p className="mt-1 text-lg">{profile.personal.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Phone Number</label>
              <p className="mt-1 text-lg">{profile.personal.phone}</p>
            </div>
          </div>
        </div>

        {/* Academic Information (Editable) */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Department</label>
              <p className="mt-1 text-lg">{profile.personal.department || "Not provided"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Semester</label>
              <p className="mt-1 text-lg">{profile.personal.semester || "Not provided"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Skills</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.academic.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg"
                  placeholder="Enter skills separated by commas"
                />
              ) : (
                <p className="mt-1 text-lg">{profile.academic.skills || "Not provided"}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Score</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.academic.score}
                  onChange={(e) => handleInputChange('score', e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg"
                  placeholder="Enter your score"
                />
              ) : (
                <p className="mt-1 text-lg">{profile.academic.score || "Not provided"}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Year of Passout</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.academic.passoutYear}
                  onChange={(e) => handleInputChange('passoutYear', e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg"
                  placeholder="Enter passout year"
                />
              ) : (
                <p className="mt-1 text-lg">{profile.academic.passoutYear || "Not provided"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Achievements (Editable) */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          {isEditing ? (
            <textarea
              value={profile.achievements.join('\n')}
              onChange={(e) => handleAchievementsChange(e.target.value)}
              className="w-full p-2 border rounded-lg h-32"
              placeholder="Enter achievements (one per line)"
            />
          ) : (
            <ul className="list-disc pl-5 space-y-2">
              {profile.achievements.length > 0 ? (
                profile.achievements.map((achievement, index) => (
                  <li key={index} className="text-lg">{achievement}</li>
                ))
              ) : (
                <p className="text-gray-500">No achievements added</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}