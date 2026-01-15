import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getEvent, joinEvent, leaveEvent, getReviews, createReview, deleteReview } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [eventData, reviewsData] = await Promise.all([
        getEvent(id),
        getReviews(id)
      ]);
      setEvent(eventData);
      setReviews(reviewsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleJoin = async () => {
    try {
      await joinEvent(id);
      loadData();
    } catch (err) {
      alert('Failed to join event');
    }
  };

  const handleLeave = async () => {
    const participation = event.participants?.find(p => p.user_id === user.id);
    if (participation) {
      try {
        await leaveEvent(participation.id);
        loadData();
      } catch (err) {
        alert('Failed to leave event');
      }
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({ event_id: parseInt(id), ...reviewForm });
      setReviewForm({ rating: 5, comment: '' });
      loadData();
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      loadData();
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  const isParticipant = event.participants?.some(p => p.user_id === user?.id && p.status === 'confirmed');
  const isOrganizer = event.organizer_id === user?.id;

  return (
    <div className="event-detail">
      <div className="event-header">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p> {event.location}</p>
        <p> {new Date(event.datetime).toLocaleString()}</p>
        <p> Organizer: {event.organizer?.name}</p>
        <p> Participants: {event.participants?.filter(p => p.status === 'confirmed').length || 0}</p>
      </div>

      {!isOrganizer && (
        <div className="event-actions">
          {isParticipant ? (
            <button onClick={handleLeave} className="btn btn-secondary">Leave Event</button>
          ) : (
            <button onClick={handleJoin} className="btn btn-primary">Join Event</button>
          )}
        </div>
      )}

      <div className="reviews-section">
        <h2>Reviews</h2>
        {isParticipant && (
          <form onSubmit={handleReviewSubmit} className="review-form">
            <select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
            </select>
            <textarea
              placeholder="Write your review..."
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              required
            />
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        )}

        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <strong>{review.user?.name}</strong>
                <span>{''.repeat(review.rating)}</span>
              </div>
              <p>{review.comment}</p>
              {review.user_id === user?.id && (
                <button onClick={() => handleDeleteReview(review.id)} className="btn-delete">Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
