// BloodDonationForm.jsx
import React, { useState } from "react";
import "./CSS/BloodDonationForm.css";

const BloodDonationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    phoneNumber: "",
    email: "",
    address: "",
    lastDonationDate: "",
    donatedBefore: "",
    weight: "",
    healthIssues: {
      fever: false,
      surgery: false,
      weightLoss: false,
      travel: false,
    },
    medications: "",
    chronicConditions: "",
    vaccinations: "",
    bloodConditions: "",
    hivOrHepatitis: "",
    pregnant: "",
    consent: false,
    shareInfo: false,
    preferredTime: "",
    receiveUpdates: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name.includes("healthIssues")) {
      setFormData((prevData) => ({
        ...prevData,
        healthIssues: {
          ...prevData.healthIssues,
          [name.split(".")[1]]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // For testing
    // Backend call to submit form data would go here.
  };

  return (
    <form className="blood-donation-form" onSubmit={handleSubmit}>
      <h2>Blood Donation Registration Form</h2>

      {/* Personal Information */}
      <div className="form-section">
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Blood Type:
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Donation Information */}
      <div className="form-section">
        <label>
          Have you donated before?
          <select
            name="donatedBefore"
            value={formData.donatedBefore}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        {/* Conditional Last Donation Date */}
        {formData.donatedBefore === "yes" && (
          <label>
            Date of Last Donation:
            <input
              type="date"
              name="lastDonationDate"
              value={formData.lastDonationDate}
              onChange={handleChange}
              required
            />
          </label>
        )}
      </div>

      {/* Eligibility (Health) */}
      <div className="form-section">
        <h3>Health Information</h3>
        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Have you experienced any of the following in the last few weeks?
        </label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="healthIssues.fever"
              checked={formData.healthIssues.fever}
              onChange={handleChange}
            />
            Fever or illness
          </label>

          <label>
            <input
              type="checkbox"
              name="healthIssues.surgery"
              checked={formData.healthIssues.surgery}
              onChange={handleChange}
            />
            Recent surgery
          </label>

          <label>
            <input
              type="checkbox"
              name="healthIssues.weightLoss"
              checked={formData.healthIssues.weightLoss}
              onChange={handleChange}
            />
            Unexplained weight loss
          </label>

          <label>
            <input
              type="checkbox"
              name="healthIssues.travel"
              checked={formData.healthIssues.travel}
              onChange={handleChange}
            />
            Recent travel to disease-prone regions
          </label>
        </div>

        <label>
          Are you taking any medications?
          <input
            type="text"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
          />
        </label>

        <label>
          Do you have any chronic conditions?
          <input
            type="text"
            name="chronicConditions"
            value={formData.chronicConditions}
            onChange={handleChange}
          />
        </label>

        <label>
          Have you had any vaccinations in the past 4 weeks?
          <select
            name="vaccinations"
            value={formData.vaccinations}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          Have you been diagnosed with any blood-related conditions (anemia,
          etc.)?
          <input
            type="text"
            name="bloodConditions"
            value={formData.bloodConditions}
            onChange={handleChange}
          />
        </label>

        <label>
          Have you ever tested positive for HIV or Hepatitis?
          <select
            name="hivOrHepatitis"
            value={formData.hivOrHepatitis}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          Are you pregnant or have you recently given birth?
          <select
            name="pregnant"
            value={formData.pregnant}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="na">Not Applicable</option>
          </select>
        </label>
      </div>

      {/* Consent */}
      <div className="form-section">
        <label>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          I agree to the terms and conditions.
        </label>

        <label>
          <input
            type="checkbox"
            name="shareInfo"
            checked={formData.shareInfo}
            onChange={handleChange}
          />
          I agree to share my information with health organizations.
        </label>

        <label>
          Preferred time for donation:
          <input
            type="text"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
          />
        </label>

        <label>
          <input
            type="checkbox"
            name="receiveUpdates"
            checked={formData.receiveUpdates}
            onChange={handleChange}
          />
          Receive updates on future blood donation drives.
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BloodDonationForm;
