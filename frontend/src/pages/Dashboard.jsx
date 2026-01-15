import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getEvents } from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(data => {
        const myEvents = data.filter(e => 
          e.organizer_id === user.id || 
          e.participants?.some(p => p.user_id === user.id && p.status === 'confirmed')
        );
        setEvents(myEvents);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{events.filter(e => e.organizer_id === user.id).length}</h3>
          <p>Events Organized</p>
        </div>
        <div className="stat-card">
          <h3>{events.filter(e => e.participants?.some(p => p.user_id === user.id)).length}</h3>
          <p>Events Joined</p>
        </div>
        <div className="stat-card">
          <h3>{events.length}</h3>
          <p>Total Events</p>
        </div>
      </div>

      <div className="dashboard-events">
        <h2>Your Upcoming Events</h2>
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p> {event.location}</p>
              <p> {new Date(event.datetime).toLocaleString()}</p>
              <Link to={`/events/${event.id}`} className="btn btn-primary">View</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
