import {
  Internship,
  InternshipType,
  Role,
  SalaryType,
  Student,
  WorkMode,
} from "@/types/types";

export const mockInternships: Internship[] = Array.from(
  { length: 10 },
  (_, i) => [
    {
      ...{
        id: `${i * 2 + 1}`,
        title: "Frontend Developer",
        company: {
          id: "1",
          name: "TechCorp",
          profilePicture: "/user.png",
          location: {
            address: "123 Main St",
            city: "San Francisco",
            country: "USA",
          },
          applicationDate: new Date("2025-01-01"),
          description:
            "<p>A leading tech company specializing in innovative software solutions. We focus on creating cutting-edge applications that transform businesses. With over 10 years of experience in the industry, we've helped numerous Fortune 500 companies achieve their digital transformation goals.</p><ul><li>Award-winning workplace culture</li><li>Comprehensive mentorship program</li><li>Regular team building activities</li></ul>",
          ice: "123456",
          rc: "78910",
          phone: "123-456-7890",
          size: "100-500",
          createdAt: new Date("2025-01-01"),
          updatedAt: new Date("2025-01-01"),
          email: "info@techcorp.com",
          role: Role.COMPANY,
          internships: [],
        },
        createdAt: new Date("2025-04-01"),
        updatedAt: new Date("2025-04-01"),
        description:
          "<div><h3>Role Overview:</h3><p>We're seeking a passionate Frontend Developer intern to join our dynamic team. You'll work on real-world projects using modern technologies and best practices.</p><h4>What you'll do:</h4><ul><li>Develop responsive web applications</li><li>Collaborate with UI/UX designers</li><li>Participate in code reviews</li><li>Learn from experienced developers</li></ul><p>This internship offers hands-on experience with our core products and the opportunity to work with cutting-edge frontend technologies in a supportive environment.</p></div>",
        duration: 6,
        salary: 5000,
        salaryType: SalaryType.MONTH,
        domain: "Web Development",
        workMode: WorkMode.REMOTE,
        tags: [
          InternshipType.PFE,
          InternshipType.PFA,
          InternshipType.INITIATION,
        ],
        skills: ["React", "JavaScript", "CSS"],
        negotiable: true,
        paid: true,
        likes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        applicants: [{ id: "1" }, { id: "2" }] as Student[],
        location: {
          address: "123 Main St",
          city: "San Francisco",
          country: "USA",
        },
      },
    },
    {
      ...{
        id: `${i * 2 + 2}`,
        title: "Backend Developer",
        company: {
          id: "2",
          name: "CodeBase",
          profilePicture: "/user.png",
          location: {
            address: "456 Elm St",
            city: "New York",
            country: "USA",
          },
          applicationDate: new Date("2025-02-01"),
          description:
            "<div><p>CodeBase is an innovative software development company at the forefront of technology. We specialize in creating scalable, enterprise-level applications that power businesses worldwide.</p><h4>Our Culture:</h4><ul><li>Collaborative work environment</li><li>Continuous learning opportunities</li><li>Work-life balance focused</li></ul><p>Join our team of passionate developers working on next-generation solutions!</p></div>",
          ice: "654321",
          rc: "10987",
          phone: "987-654-3210",
          size: "50-200",
          createdAt: new Date("2025-02-01"),
          updatedAt: new Date("2025-02-01"),
          email: "contact@codebase.com",
          role: Role.COMPANY,
          internships: [],
        },
        createdAt: new Date("2025-03-28"),
        updatedAt: new Date("2025-03-28"),
        description:
          "<div><h3>Backend Development Opportunity:</h3><p>Join our server-side development team and gain hands-on experience with modern backend technologies. This role offers extensive learning opportunities in building scalable systems.</p><h4>Key Responsibilities:</h4><ul><li>Design and implement API endpoints</li><li>Work with databases and caching systems</li><li>Optimize application performance</li><li>Write clean, maintainable code</li></ul><p>You'll be mentored by senior developers and participate in all phases of the development lifecycle, from planning to deployment.</p></div>",
        duration: 6,
        salary: 6000,
        salaryType: SalaryType.MONTH,
        domain: "Backend Development",
        workMode: WorkMode.ON_SITE,
        tags: [InternshipType.PFA],
        skills: ["Node.js", "Express", "MongoDB"],
        negotiable: false,
        paid: true,
        likes: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
        applicants: [],
        location: {
          address: "123 Main St",
          city: "San Francisco",
          country: "USA",
        },
      },
    },
  ]
).flat();
