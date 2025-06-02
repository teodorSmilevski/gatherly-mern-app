import { useState } from "react";
import { useGet } from "../hooks/api/useGet";
import "../styles/CreateEvent.css";
import { validateEvent } from "../utils/validations";
import { formatForInput, localDateFormat } from "../utils/localDateFormat";
import { usePost } from "../hooks/api/usePost";
import { useNavigate } from "react-router-dom";

const defaultEvent = {
  title: "",
  description: "",
  date: "",
  location: "",
  maxCapacity: 100,
  categoryId: "",
};

const CreateEvent = () => {
  const navigate = useNavigate();

  const { data } = useGet("/api/categories");
  const { postData } = usePost();

  const [formData, setFormData] = useState(defaultEvent);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "date") {
      const dataValue = localDateFormat(e.target.value);
      setFormData({ ...formData, [e.target.name]: dataValue });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateEvent(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const res = await postData("/api/events/new", formData);

    if (res.event) {
      setTimeout(() => {
        setFormData(defaultEvent);
        setErrors({});
        navigate(`/events/${res.event._id}`);
      }, 1500);
    }
  };

  const categories = data?.categories || [];

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
              maxLength="500"
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </label>

          <div className="form-horizontal-inputs">
            <label>
              Date & Time
              <input
                type="datetime-local"
                name="date"
                value={formatForInput(formData.date)}
                onChange={handleChange}
                required
              />
              {errors.date && <span className="error">{errors.date}</span>}
            </label>
            <label>
              Max Capacity
              <input
                type="number"
                name="maxCapacity"
                min={1}
                max={300}
                value={formData.maxCapacity}
                onChange={handleChange}
                required
              />
              {errors.maxCapacity && (
                <span className="error">{errors.maxCapacity}</span>
              )}
            </label>
          </div>

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
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className="error">{errors.categoryId}</span>
            )}
          </label>

          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
