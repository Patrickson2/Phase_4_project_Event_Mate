import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/api';

const MyEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', location: '', datetime: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data.filter(e => e.organizer_id === user.id));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEvent(editingId, formData);
        setEditingId(null);
      } else {
        await createEvent(formData);
      }
      setFormData({ title: '', description: '', location: '', datetime: '' });
      loadEvents();
    } catch (err) {
      alert('Failed to save event');
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      datetime: event.datetime.slice(0, 16)
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this event?')) {
      try {
        await deleteEvent(id);
        loadEvents();
      } catch (err) {
        alert('Failed to delete event');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="my-events">
      <h1>My Events</h1>
      
      <div className="event-form-container">
        <h2>{editingId ? 'Edit Event' : 'Create New Event'}</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <input
            type="text"
            placeholder="Event Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <input
            type="datetime-local"
            value={formData.datetime}
            onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
            required
          />
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Create'} Event
            </button>
            {editingId && (
              <button type="button" onClick={() => {
                setEditingId(null);
                setFormData({ title: '', description: '', location: '', datetime: '' });
              }} className="btn btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="events-list">
        <h2>Your Events</h2>
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>📍 {event.location}</p>
              <p>📅 {new Date(event.datetime).toLocaleString()}</p>
              <p>👥 {event.participants?.filter(p => p.status === 'confirmed').length || 0} participants</p>
              <div className="event-actions">
                <Link to={`/events/${event.id}`} className="btn btn-primary">View</Link>
                <button onClick={() => handleEdit(event)} className="btn btn-secondary">Edit</button>
                <button onClick={() => handleDelete(event.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
