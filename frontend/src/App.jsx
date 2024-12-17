import React, { useState } from "react";
import "./index.css";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "",
    joiningDate: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const departments = ["HR", "Engineering", "Marketing"];

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required.";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email.";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "10-digit phone required.";
    if (!formData.department) newErrors.department = "Select a department.";
    if (!formData.joiningDate) newErrors.joiningDate = "Select a valid date.";
    if (!formData.role.trim()) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) alert("Form submitted successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      employeeId: "",
      email: "",
      phone: "",
      department: "",
      joiningDate: "",
      role: "",
    });
    setErrors({});
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Employee Management</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
            />
            {errors.employeeId && <p className="error">{errors.employeeId}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && <p className="error">{errors.department}</p>}
          </div>
          <div className="form-group">
            <label>Date of Joining</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
            />
            {errors.joiningDate && <p className="error">{errors.joiningDate}</p>}
          </div>
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            />
            {errors.role && <p className="error">{errors.role}</p>}
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="reset-btn" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;