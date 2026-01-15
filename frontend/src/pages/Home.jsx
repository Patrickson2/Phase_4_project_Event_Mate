import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to EventMate</h1>
        <p>Discover and join amazing events in your area</p>
        <div className="hero-buttons">
          <Link to="/events" className="btn btn-primary">Browse Events</Link>
          <Link to="/register" className="btn btn-secondary">Get Started</Link>
        </div>
      </div>
      <div className="features">
        <div className="feature">
          <h3>🎉 Discover Events</h3>
          <p>Find events that match your interests</p>
        </div>
        <div className="feature">
          <h3>Join Community</h3>
          <p>Connect with like-minded people</p>
        </div>
        <div className="feature">
          <h3> Leave Reviews</h3>
          <p>Share your experience with others</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
