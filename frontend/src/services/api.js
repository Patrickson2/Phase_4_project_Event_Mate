// Base API URL for backend communication
const API_URL = 'http://localhost:8000';

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// User registration API call
export const register = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// User login API call
export const login = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Get current authenticated user
export const getCurrentUser = async () => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Fetch all events
export const getEvents = async () => {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getEvent = async (id) => {
  const res = await fetch(`${API_URL}/events/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const createEvent = async (data) => {
  const res = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateEvent = async (id, data) => {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteEvent = async (id) => {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error(await res.text());
};

export const joinEvent = async (eventId) => {
  const res = await fetch(`${API_URL}/participation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ event_id: eventId })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const leaveEvent = async (participationId) => {
  const res = await fetch(`${API_URL}/participation/${participationId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ status: 'cancelled' })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getReviews = async (eventId) => {
  const res = await fetch(`${API_URL}/reviews/${eventId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const createReview = async (data) => {
  const res = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteReview = async (id) => {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error(await res.text());
};
