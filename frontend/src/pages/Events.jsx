import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="events-page">
      <h1>All Events</h1>
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p> {event.location}</p>
            <p> {new Date(event.datetime).toLocaleString()}</p>
            <Link to={`/events/${event.id}`} className="btn btn-primary">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
