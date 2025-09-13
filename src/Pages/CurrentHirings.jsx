import React, { useState } from "react";
import {
  Briefcase,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  DollarSign,
  Clock,
} from "lucide-react";
import "./CurrentHirings.css";

const CurrentHirings = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    location: "",
    resume: null,
  });

  const [applyData, setApplyData] = useState({
    name: "",
    contact: "",
    email: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    location: "",
    resume: null,
  });

  const [selectedJobIndex, setSelectedJobIndex] = useState(null);

  // flip state for process cards
  const [flippedProcess, setFlippedProcess] = useState([false, false, false]);

  const toggleProcess = (i) => {
    setFlippedProcess((s) => {
      const next = [...s];
      next[i] = !next[i];
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Enrollment submitted! ✅");
    console.log("Enrollment Data:", formData);
    setFormData({
      name: "",
      contact: "",
      email: "",
      location: "",
      resume: null,
    });
  };

  const handleApplyChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setApplyData({ ...applyData, resume: files[0] });
    } else {
      setApplyData({ ...applyData, [name]: value });
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    const job = jobPositions[selectedJobIndex];
    alert(`Application submitted for ${job.role} ✅`);
    console.log("Application Data:", applyData, "appliedFor:", job.role);
    setApplyData({
      name: "",
      contact: "",
      email: "",
      experience: "",
      currentSalary: "",
      expectedSalary: "",
      location: "",
      resume: null,
    });
    setSelectedJobIndex(null);
  };

  // Utility to show "X days ago"
  const daysAgo = (dateString) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Posted today";
    if (diffDays === 1) return "Posted 1 day ago";
    return `Posted ${diffDays} days ago`;
  };

  // Job list with postedDate field
  const jobPositions = [
    {
      postedDate: "2025-09-09",
      role: "Frontend Developer",
      exp: "0-2 yrs",
      skills: "React, JS, HTML, CSS",
      salary: "3-4 LPA",
      location: "Hyderabad",
    },
    {
      postedDate: "2025-09-08",
      role: "Backend Developer",
      exp: "1-3 yrs",
      skills: "Node.js, Express, MongoDB",
      salary: "4-6 LPA",
      location: "Hyderabad",
    },
    {
      postedDate: "2025-09-07",
      role: "Full Stack Developer",
      exp: "0-2 yrs",
      skills: "MERN Stack",
      salary: "3.5-5 LPA",
      location: "Bangalore",
    },
    {
      postedDate: "2025-09-06",
      role: "Java Developer",
      exp: "1-2 yrs",
      skills: "Core Java, Spring Boot",
      salary: "4-6 LPA",
      location: "Pune",
    },
    {
      postedDate: "2025-09-06",
      role: "Python Developer",
      exp: "0-2 yrs",
      skills: "Django, Flask, APIs",
      salary: "3-5 LPA",
      location: "Chennai",
    },
    {
      postedDate: "2025-09-05",
      role: "Mobile App Developer",
      exp: "0-2 yrs",
      skills: "React Native, Flutter",
      salary: "3-4.5 LPA",
      location: "Remote",
    },
    {
      postedDate: "2025-09-04",
      role: "UI/UX Designer",
      exp: "0-2 yrs",
      skills: "Figma, Adobe XD",
      salary: "3-4 LPA",
      location: "Hyderabad",
    },
    {
      postedDate: "2025-09-03",
      role: "Cloud Engineer",
      exp: "1-2 yrs",
      skills: "AWS, Azure",
      salary: "5-7 LPA",
      location: "Bangalore",
    },
    {
      postedDate: "2025-09-02",
      role: "Data Analyst",
      exp: "0-2 yrs",
      skills: "SQL, Excel, Power BI",
      salary: "3-4.5 LPA",
      location: "Hyderabad",
    },
    {
      postedDate: "2025-09-01",
      role: "QA Tester",
      exp: "0-2 yrs",
      skills: "Manual, Automation",
      salary: "3-4 LPA",
      location: "Pune",
    },
  ];

  // latest job (last in array)
  const latestJob = jobPositions[jobPositions.length - 1];
  const processSteps = [
    {
  title: "Step 1: Application",
  content:
    "Fill out the online application form with your personal details, qualifications, and upload your resume.",
  icon: "📝",
},
    {
      title: "Step 2: Screening",
      content:
        "Our recruiters screen and shortlist candidates based on skills, experience and role fit. Shortlisted candidates get a call.",
      icon: "🔍",
    },
    {
      title: "Step 3: Interviews & Placement",
      content:
        "Attend technical & HR interviews. We support scheduling, feedback and final placement formalities.",
      icon: "🎯",
    },
  ];

  return (
    <div className="current-hirings-page">

    {/* Offer/Ticker Bar */}
      <div className="ticker-bar">
        🆕 A new job is posted: <strong>{latestJob.role}</strong>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <img src="/current hiring.jpg" alt="Hiring Banner" className="hero-image" />
      </section>

      {/* Offer bar / ticker for new jobs */}
      <div className="job-offer-ticker">
        <div className="ticker-content">
          {jobPositions.slice(0, 5).map((job, idx) => (
            <span key={idx} className="ticker-item">
              🔔 New: {job.role} – {daysAgo(job.postedDate)}
            </span>
          ))}
        </div>
      </div>

      {/* Intro */}
      <section className="intro-section">
        <h2>We are Hiring!</h2>
        <p>
          At Zero7 Technologies, we connect freshers and experienced
          professionals with top companies. Fill out the form below to enroll and
          be a part of our hiring program.
        </p>
      </section>

      

      {/* Hiring Process */}
      <section className="process-section">
        <h2>Our Hiring Process</h2>

        <div className="process-cards" role="list">
          {processSteps.map((step, i) => (
            <div
              key={i}
              className={`process-card ${flippedProcess[i] ? "is-flipped" : ""}`}
              onClick={() => toggleProcess(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleProcess(i);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={flippedProcess[i]}
              aria-label={step.title}
            >
              <div className="process-inner">
                <div className="process-front">
                  <div className="process-front-content">
                    <div className="process-icon" aria-hidden>
                      {step.icon}
                    </div>
                    <h3>{step.title}</h3>
                  </div>
                </div>

                <div className="process-back">
                  <div className="process-back-content">
                    <p>{step.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section className="jobs-section">
        <h2>Available Job Positions</h2>

        <div className="jobs-table-wrap">
          <table className="jobs-table" role="table">
            <thead>
              <tr>
                <th>Posted</th>
                <th>Role</th>
                <th>Experience</th>
                <th>Skills</th>
                <th>Salary</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobPositions.map((job, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{daysAgo(job.postedDate)}</td>
                    <td>{job.role}</td>
                    <td>{job.exp}</td>
                    <td>{job.skills}</td>
                    <td>{job.salary}</td>
                    <td>{job.location}</td>
                    <td>
                      <button
                        className="apply-btn"
                        onClick={() =>
                          setSelectedJobIndex(
                            index === selectedJobIndex ? null : index
                          )
                        }
                      >
                        {selectedJobIndex === index ? "Close" : "Apply"}
                      </button>
                    </td>
                  </tr>

                  {selectedJobIndex === index && (
                    <tr className="apply-form-row">
                      <td colSpan="7" className="apply-form-td">
                        <div className="apply-form-container">
                          <h3>
                            <Briefcase size={18} /> Apply for {job.role}
                          </h3>
                          <form
                            onSubmit={handleApplySubmit}
                            className="apply-form"
                          >
                            <div className="input-group">
                              <User size={16} />
                              <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={applyData.name}
                                onChange={handleApplyChange}
                                required
                              />
                            </div>
                            <div className="input-group">
                              <Phone size={16} />
                              <input
                                type="tel"
                                name="contact"
                                placeholder="Contact Number"
                                value={applyData.contact}
                                onChange={handleApplyChange}
                                required
                              />
                            </div>
                            <div className="input-group">
                              <Mail size={16} />
                              <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={applyData.email}
                                onChange={handleApplyChange}
                                required
                              />
                            </div>
                            <div className="input-group">
                              <Clock size={16} />
                              <input
                                type="text"
                                name="experience"
                                placeholder="Experience (in years)"
                                value={applyData.experience}
                                onChange={handleApplyChange}
                                required
                              />
                            </div>
                            <div className="input-group">
                              <DollarSign size={16} />
                              <input
                                type="text"
                                name="currentSalary"
                                placeholder="Current Salary"
                                value={applyData.currentSalary}
                                onChange={handleApplyChange}
                              />
                            </div>
                            <div className="input-group">
                              <DollarSign size={16} />
                              <input
                                type="text"
                                name="expectedSalary"
                                placeholder="Expected Salary"
                                value={applyData.expectedSalary}
                                onChange={handleApplyChange}
                              />
                            </div>
                            <div className="input-group">
                              <MapPin size={16} />
                              <input
                                type="text"
                                name="location"
                                placeholder="Your Location"
                                value={applyData.location}
                                onChange={handleApplyChange}
                                required
                              />
                            </div>
                            <div className="input-group file-input">
                              <FileText size={16} />
                              <input
                                type="file"
                                name="resume"
                                accept=".pdf,.doc,.docx"
                                onChange={handleApplyChange}
                                required
                              />
                            </div>

                            <div className="form-buttons">
                              <button type="submit" className="submit-apply">
                                Submit Application
                              </button>
                              <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setSelectedJobIndex(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CurrentHirings;
