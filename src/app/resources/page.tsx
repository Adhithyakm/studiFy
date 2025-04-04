"use client";

import { useState, useEffect } from 'react';

interface Department {
  id: number;
  name: string;
}

interface Semester {
  id: number;
  number: number;
}

interface Subject {
  id: number;
  name: string;
  code: string;
}

interface StudyMaterial {
  id: number;
  title: string;
  description: string;
  file_url: string;
  resource_type: string;
  module_number: number | null;
}

export default function ResourcesPage() {
  // State for dropdown selections
  const [selectedDept, setSelectedDept] = useState<number | null>(null);
  const [selectedSem, setSelectedSem] = useState<number | null>(null);
  const [selectedSub, setSelectedSub] = useState<number | null>(null);
  
  // State for data
  const [departments, setDepartments] = useState<Department[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState({
    dept: false,
    sem: false,
    sub: false,
    materials: false
  });

  // Fetch departments with duplicate removal
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(prev => ({...prev, dept: true}));
      try {
        const res = await fetch('/api/departments');
        const data = await res.json();
        
        // Remove duplicates and sort departments
        const uniqueDepartments = data.filter((dept: Department, index: number, self: Department[]) =>
          index === self.findIndex(d => d.name === dept.name)
        ).sort((a: Department, b: Department) => a.name.localeCompare(b.name));
        
        setDepartments(uniqueDepartments);
        setSelectedDept(null); // Ensure no auto-selection
      } catch (error) {
        console.error("Department fetch error:", error);
      } finally {
        setLoading(prev => ({...prev, dept: false}));
      }
    };
    fetchDepartments();
  }, []);

  // Fetch semesters 3-6 when department is selected
  useEffect(() => {
    if (!selectedDept) {
      setSemesters([]);
      setSelectedSem(null);
      return;
    }
    
    const fetchSemesters = async () => {
      setLoading(prev => ({...prev, sem: true}));
      try {
        const res = await fetch(`/api/semesters?departmentId=${selectedDept}`);
        if (!res.ok) throw new Error('Semester fetch failed');
        const data = await res.json();
        
        // Filter semesters 3-6 and ensure valid data
        const validSemesters = Array.isArray(data) 
          ? data
              .filter((sem: Semester) => sem.number >= 3 && sem.number <= 6)
              .filter((sem: Semester) => sem.id && sem.number)
              .sort((a, b) => a.number - b.number)
          : [];
        
        setSemesters(validSemesters);
      } catch (error) {
        console.error("Semester fetch error:", error);
      } finally {
        setLoading(prev => ({...prev, sem: false}));
      }
    };
    fetchSemesters();
  }, [selectedDept]);

  // Fetch subjects when semester is selected (with department context)
  useEffect(() => {
    if (!selectedSem || !selectedDept) {
      setSubjects([]);
      setSelectedSub(null);
      return;
    }
    
    const fetchSubjects = async () => {
      setLoading(prev => ({...prev, sub: true}));
      try {
        const res = await fetch(
          `/api/subjects?semesterId=${selectedSem}&departmentId=${selectedDept}`
        );
        const data = await res.json();
        setSubjects(data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      } finally {
        setLoading(prev => ({...prev, sub: false}));
      }
    };
    fetchSubjects();
  }, [selectedSem, selectedDept]);

  // Fetch materials when subject is selected
  useEffect(() => {
    
    
    const fetchMaterials = async () => {

      if (!selectedSub) {
        setMaterials([]);
        return;
      }
      setLoading(prev => ({...prev, materials: true}));
      try {
        const response = await fetch(`/api/materials?subjectId=${selectedSub}`);
        if (!response.ok) {
          throw new Error('Failed to fetch materials');
        }
        
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      } finally {
        setLoading(prev => ({...prev, materials: false}));
      }
    };
    fetchMaterials();
  }, [selectedSub]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Study Resources</h1>
        
        {/* Dropdown Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
          {/* Department Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Department {loading.dept && '(Loading...)'}
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
              value={selectedDept || ''}
              onChange={(e) => setSelectedDept(e.target.value ? Number(e.target.value) : null)}
              disabled={loading.dept}
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Semester Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Semester {loading.sem && '(Loading...)'}
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
              value={selectedSem || ''}
              onChange={(e) => setSelectedSem(e.target.value ? Number(e.target.value) : null)}
              disabled={!selectedDept || loading.sem}
            >
              <option value="">Select Semester</option>
              {semesters.length > 0 ? (
                semesters.map(sem => (
                  <option key={sem.id} value={sem.id}>
                    Semester {sem.number}
                  </option>
                ))
              ) : (
                selectedDept && <option disabled>No semesters available</option>
              )}
            </select>
          </div>
          
          {/* Subject Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Subject {loading.sub && '(Loading...)'}
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
              value={selectedSub || ''}
              onChange={(e) => setSelectedSub(e.target.value ? Number(e.target.value) : null)}
              disabled={!selectedSem || loading.sub}
            >
              <option value="">Select Subject</option>
              {subjects.length > 0 ? (
                subjects.map(sub => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} ({sub.code})
                  </option>
                ))
              ) : (
                selectedSem && <option disabled>No subjects available</option>
              )}
            </select>
          </div>
        </div>
        
        {/* Materials Section - Only shown when subject is selected */}
        {selectedSub && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {subjects.find(s => s.id === selectedSub)?.name} Study Materials
            </h2>
            
            {loading.materials ? (
              <div className="text-center py-8 text-gray-600">Loading materials...</div>
            ) : materials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {materials.map(material => (
                  <div key={material.id} className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{material.title}</h3>
                    <p className="text-gray-600 mb-2">
                      {material.resource_type}
                      {material.module_number ? ` - Module ${material.module_number}` : ''}
                    </p>
                    {material.description && (
                      <p className="text-gray-600 mb-4">{material.description}</p>
                    )}
                    <a 
                      href={material.file_url} 
                      download
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No study materials available for this subject yet
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}