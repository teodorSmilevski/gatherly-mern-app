import { useState } from "react";
import "../styles/CreateEvent.css";
import { validateEvent } from "../utils/validations";

const defaultEvent = {
  title: "",
  description: "",
  date: "",
  location: "",
  image: "",
  category: "",
};

const CreateEvent = () => {
  const [formData, setFormData] = useState(defaultEvent);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateEvent(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Event Created:", formData);
    setFormData(defaultEvent);
    setErrors({});
  };

  const categories = [
    "culture",
    "concert",
    "workshop",
    "sports",
    "business",
    "community",
  ];

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <h1>Create New Event</h1>
        <form className="event-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </label>

          <label>
            Description
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </label>

          <label>
            Date & Time
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </label>

          <label>
            Location
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            {errors.location && (
              <span className="error">{errors.location}</span>
            )}
          </label>

          <label>
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="error">{errors.category}</span>
            )}
          </label>

          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
