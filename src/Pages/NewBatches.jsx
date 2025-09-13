import React, { useState } from 'react';
import './NewBatches.css';

const NewBatches = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const coursesData = [
    { name: "UIUX Designing", date: "20 - August - 2025", timings: "04:00 PM - 05:00 PM", duration: "4 Months" },
    { name: "Python with Django", date: "20 - August - 2025", timings: "05:00 PM - 06:00 PM", duration: "3 Months" },
    { name: "React JS", date: "21 - August - 2025", timings: "11:00 AM - 12:00 PM", duration: "1 Months" },
    { name: "Node JS", date: "18 - August - 2025", timings: "04:00 PM - 05:00 PM", duration: "1 Months" },
    { name: "Web Designing", date: "20 - August - 2025", timings: "05:00 PM - 06:00 PM", duration: "2 Months" },
    { name: "SEO", date: "20 - August - 2025", timings: "05:00 PM - 06:00 PM", duration: "2 Months" },
    { name: "PHP with MySQL", date: "20 - August - 2025", timings: "05:00 PM - 06:00 PM", duration: "3 Months" },
    { name: "Google Adwords", date: "20 - August - 2025", timings: "05:00 PM - 06:00 PM", duration: "1 Months" },
    { name: "Python Full Stack Development", date: "11 - August - 2025", timings: "11:00 AM - 12:00 PM", duration: "5 Months" },
    { name: "Full Stack Development", date: "11 - August - 2025", timings: "04:00 PM - 05:00 PM", duration: "5 Months" },
    { name: "Python with Django", date: "11 - August - 2025", timings: "11:00 AM - 12:00 PM", duration: "3 Months" },
    { name: "UI Development", date: "11 - August - 2025", timings: "04:00 PM - 05:00 PM", duration: "3 Months" }
  ];

  const courses = coursesData.map(course => course.name);

  const filteredCourses = coursesData.filter(course => {
    const searchLower = searchTerm.toLowerCase();
    return (
      course.name.toLowerCase().includes(searchLower) ||
      course.date.toLowerCase().includes(searchLower) ||
      course.timings.toLowerCase().includes(searchLower) ||
      course.duration.toLowerCase().includes(searchLower)
    );
  });

  const handleRegister = (course) => {
    setSelectedCourse(course);
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const RegistrationModal = ({ isOpen, onClose, initialCourse }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      selectedCourse: initialCourse || '',
      programType: '',
      otherProgram: '',
      message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!formData.programType) {
        alert("Please select a Type of option before submitting.");
        return;
      }

      // build payload
      const selectedCourseObj = coursesData.find(c => c.name === formData.selectedCourse);

      const payload = {
        ...formData,
        date: selectedCourseObj?.date || "",
        timings: selectedCourseObj?.timings || "",
        duration: selectedCourseObj?.duration || ""
      };

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzXzDo0cVEMDIXaU3j-fxrW5Fqi7LggylggenCQHltP300R2PgK6H11YAdeYnpVfhVb/exec", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();
        if (result.result === "success") {
          setSubmitted(true);
        } else {
          alert("Error: " + result.message);
        }
      } catch (err) {
        alert("Something went wrong. Try again.");
      }
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>×</button>

          {submitted ? (
            <div className="success-message">
              <h2>Thank You!</h2>
              <p>
                Your registration for the demo of{" "}
                <strong>{formData.selectedCourse}</strong> has been received.
              </p>
              <p>We will contact you shortly at {formData.email}.</p>
            </div>
          ) : (
            <>
              <h2>Register for a Free Demo</h2>
              <p>Fill in your details to register for a demo class</p>

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="selectedCourse">Select Course *</label>
                  <select
                    id="selectedCourse"
                    name="selectedCourse"
                    value={formData.selectedCourse}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select a Course --</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.selectedCourse && (
                  <div className="form-group">
                    <label htmlFor="programType">Enrollment Type *</label>
                    <select
                      id="programType"
                      name="programType"
                      value={formData.programType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Select Type --</option>
                      <option value="Training">Training</option>
                      <option value="Internship">Internship</option>
                      <option value="Resume Marketing">Resume Marketing</option>
                      <option value="All of the above">All of the above</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                )}

                {/* Only show if Others selected */}
                {formData.programType === 'Others' && (
                  <div className="form-group">
                    <label htmlFor="otherProgram">Please specify *</label>
                    <input
                      type="text"
                      id="otherProgram"
                      name="otherProgram"
                      value={formData.otherProgram}
                      onChange={handleInputChange}
                      placeholder="Enter your program type"
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Register for Demo
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="batches-container">
        <h2 className="batches-title">New Batches</h2>

        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search courses by name, date, timings or duration..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={clearSearch}>
                ×
              </button>
            )}
          </div>
          <div className="search-results-count">
            {filteredCourses.length} of {coursesData.length} courses found
          </div>
        </div>

        <div className="table-wrapper">
          <table className="batches-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Date</th>
                <th>Timings</th>
                <th>Duration</th>
                <th>Register for Demo</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.name}</td>
                    <td>{course.date}</td>
                    <td>{course.timings}</td>
                    <td>{course.duration}</td>
                    <td>
                      <button
                        className="register-btn"
                        onClick={() => handleRegister(course.name)}
                      >
                        Register Now
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-results">
                    No courses found matching your search. Try different keywords.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RegistrationModal
        isOpen={showRegistration}
        onClose={handleCloseRegistration}
        initialCourse={selectedCourse}
      />
    </>
  );
};

export default NewBatches;
