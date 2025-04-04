import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define type for department subjects
type DepartmentSubjects = {
  [key: string]: { name: string; code: string }[];
};

// KTU 2019 Scheme Subjects for all departments
const departmentSubjects: DepartmentSubjects = {
  CSE: [
    // Semester 3
    { name: 'Data Structures', code: 'CST201' },
    { name: 'OOP', code: 'CST205' },
    { name: 'Discrete Mathematics', code: 'MAT203' },
    { name: 'Logic System Design', code: 'EST200' },
    // Semester 4
    { name: 'COA', code: 'CST202' },
    { name: 'Graph Theory', code: 'MAT206' },
    { name: 'DBMS', code: 'CST204' },
    { name: 'Operating Systems', code: 'CST206' },
    // Semester 5
    { name: 'FLAT', code: 'CST301' },
    { name: 'Computer Networks', code: 'CST303' },
    { name: 'System Software', code: 'CST305' },
    { name: 'Microprocessors&Microcontrollers', code: 'CST307' },
    // Semester 6
    { name: 'AAD', code: 'CST306' },
    { name: 'Compiler Design', code: 'CST302' },
    { name: 'CGIP', code: 'CST304' },
    { name: 'IEFT', code: 'HUT300' }
  ],
  IT: [
    // Semester 3
    { name: 'Data Structures', code: 'ITT201' },
    { name: 'Computer Organization', code: 'ITT202' },
    { name: 'Discrete Mathematics', code: 'MAT203' },
    { name: 'Logic System Design', code: 'EST200' },
    // Semester 4
    { name: 'Algorithm Analysis', code: 'ITT205' },
    { name: 'Microprocessors', code: 'ITT206' },
    { name: 'Probability & Statistics', code: 'MAT206' },
    { name: 'Object Oriented Programming', code: 'ITT207' },
    // Continue for semesters 5-6...
     // Semester 5
     { name: 'Algorithm Analysis', code: 'ITT205' },
     { name: 'Microprocessors', code: 'ITT206' },
     { name: 'Probability & Statistics', code: 'MAT206' },
     { name: 'Object Oriented Programming', code: 'ITT207' },
      // Semester 6
    { name: 'Algorithm Analysis', code: 'ITT205' },
    { name: 'Microprocessors', code: 'ITT206' },
    { name: 'Probability & Statistics', code: 'MAT206' },
    { name: 'Object Oriented Programming', code: 'ITT207' },
  ],
  ECE: [
    // Semester 3
    { name: 'Electronic Circuits', code: 'ECT201' },
    { name: 'Signals & Systems', code: 'ECT202' },
    { name: 'Electromagnetic Theory', code: 'ECT203' },
    { name: 'Digital Electronics', code: 'ECT204' },
    // Semester 4
    { name: 'Analog Communication', code: 'ECT205' },
    { name: 'Linear Integrated Circuits', code: 'ECT206' },
    { name: 'Control Systems', code: 'ECT207' },
    { name: 'Microprocessors', code: 'ECT208' },
    // Continue for semesters 5-6...
     // Semester 4
     { name: 'Algorithm Analysis', code: 'ITT205' },
     { name: 'Microprocessors', code: 'ITT206' },
     { name: 'Probability & Statistics', code: 'MAT206' },
     { name: 'Object Oriented Programming', code: 'ITT207' },
      // Semester 4
    { name: 'Algorithm Analysis', code: 'ITT205' },
    { name: 'Microprocessors', code: 'ITT206' },
    { name: 'Probability & Statistics', code: 'MAT206' },
    { name: 'Object Oriented Programming', code: 'ITT207' },
  ],
  EEE: [
    // Semester 3
    { name: 'Electrical Machines I', code: 'EET201' },
    { name: 'Power Systems I', code: 'EET202' },
    { name: 'Measurements & Instrumentation', code: 'EET203' },
    { name: 'Digital Electronics', code: 'EET204' },
    // Semester 4
    { name: 'Electrical Machines II', code: 'EET205' },
    { name: 'Power Systems II', code: 'EET206' },
    { name: 'Control Systems', code: 'EET207' },
    { name: 'Microprocessors', code: 'EET208' },
    // Continue for semesters 5-6...
     // Semester 4
     { name: 'Algorithm Analysis', code: 'ITT205' },
     { name: 'Microprocessors', code: 'ITT206' },
     { name: 'Probability & Statistics', code: 'MAT206' },
     { name: 'Object Oriented Programming', code: 'ITT207' },
      // Semester 4
    { name: 'Algorithm Analysis', code: 'ITT205' },
    { name: 'Microprocessors', code: 'ITT206' },
    { name: 'Probability & Statistics', code: 'MAT206' },
    { name: 'Object Oriented Programming', code: 'ITT207' },
  ],
  MECH: [
    // Semester 3
    { name: 'Thermodynamics', code: 'MET201' },
    { name: 'Mechanics of Solids', code: 'MET202' },
    { name: 'Manufacturing Technology', code: 'MET203' },
    { name: 'Fluid Mechanics', code: 'MET204' },
    // Semester 4
    { name: 'Kinematics of Machinery', code: 'MET205' },
    { name: 'Machine Drawing', code: 'MET206' },
    { name: 'Heat Transfer', code: 'MET207' },
    { name: 'Industrial Engineering', code: 'MET208' },
    // Continue for semesters 5-6...
     // Semester 4
     { name: 'Algorithm Analysis', code: 'ITT205' },
     { name: 'Microprocessors', code: 'ITT206' },
     { name: 'Probability & Statistics', code: 'MAT206' },
     { name: 'Object Oriented Programming', code: 'ITT207' },
      // Semester 4
    { name: 'Algorithm Analysis', code: 'ITT205' },
    { name: 'Microprocessors', code: 'ITT206' },
    { name: 'Probability & Statistics', code: 'MAT206' },
    { name: 'Object Oriented Programming', code: 'ITT207' },
  ],
  CIVIL: [
    // Semester 3
    { name: 'Surveying', code: 'CVT201' },
    { name: 'Mechanics of Solids', code: 'CVT202' },
    { name: 'Fluid Mechanics', code: 'CVT203' },
    { name: 'Building Technology', code: 'CVT204' },
    // Semester 4
    { name: 'Structural Analysis I', code: 'CVT205' },
    { name: 'Geotechnical Engineering I', code: 'CVT206' },
    { name: 'Hydraulics', code: 'CVT207' },
    { name: 'Concrete Technology', code: 'CVT208' },
    // Continue for semesters 5-6...
     // Semester 4
     { name: 'Algorithm Analysis', code: 'ITT205' },
     { name: 'Microprocessors', code: 'ITT206' },
     { name: 'Probability & Statistics', code: 'MAT206' },
     { name: 'Object Oriented Programming', code: 'ITT207' },
      // Semester 4
    { name: 'Algorithm Analysis', code: 'ITT205' },
    { name: 'Microprocessors', code: 'ITT206' },
    { name: 'Probability & Statistics', code: 'MAT206' },
    { name: 'Object Oriented Programming', code: 'ITT207' },
  ]
};

async function main() {
  // Create departments
  await prisma.department.createMany({
    data: [
      { name: 'Computer Science (CSE)' },
      { name: 'Information Technology (IT)' },
      { name: 'Electronics & Communication (ECE)' },
      { name: 'Electrical & Electronics (EEE)' },
      { name: 'Mechanical (MECH)' },
      { name: 'Civil (CIVIL)' }
    ],
    skipDuplicates: true
  });

  // Get all departments
  const allDepartments = await prisma.department.findMany();

  // Create semesters and subjects for each department
  for (const dept of allDepartments) {
    // Extract department code (CSE, IT, etc.)
    const deptCodeMatch = dept.name.match(/\((.*?)\)/);
    const deptCode = deptCodeMatch ? deptCodeMatch[1] : 'CSE';
    const subjects = departmentSubjects[deptCode] || [];

    // Create semesters 3-6
    for (let semNumber = 3; semNumber <= 6; semNumber++) {
      // Find or create semester
      const semester = await prisma.semester.upsert({
        where: {
          number_departmentId: {
            number: semNumber,
            departmentId: dept.id
          }
        },
        update: {},
        create: {
          number: semNumber,
          departmentId: dept.id
        }
      });

      // Get subjects for this semester (4 per semester)
      const semSubjects = subjects.slice(
        (semNumber - 3) * 4,
        (semNumber - 3) * 4 + 4
      );

      // Create subjects
      for (const sub of semSubjects) {
        await prisma.subject.upsert({
          where: {
            code_semester:{
              code: sub.code,
              semesterId: semester.id
            }
          },
          update: {},
          create: {
            name: sub.name,
            code: sub.code,
            semesterId: semester.id,
            departmentId: dept.id
          }
        });
      }
    }
  }

  console.log('Database seeded successfully with KTU 2019 scheme!');
}

main()
  .catch(e => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });