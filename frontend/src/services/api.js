const API_BASE = 'http://localhost:3001/api';

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `${response.status} ${response.statusText}`);
  }
  return data;
};

export const registerUserApi = async (payload) => {
  const response = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

export const loginUserApi = async (payload) => {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

export const fetchRidesApi = async () => {
  const response = await fetch(`${API_BASE}/rides`);
  return handleResponse(response);
};

export const fetchRideDetailsApi = async (rideId) => {
  const response = await fetch(`${API_BASE}/rides/${rideId}`);
  return handleResponse(response);
};

export const postRideApi = async (rideData, token) => {
  const response = await fetch(`${API_BASE}/rides/postRide`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(rideData),
  });
  return handleResponse(response);
};

export const bookSeatApi = async (rideId, token) => {
  const response = await fetch(`${API_BASE}/rides/book/${rideId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const fetchMyBookingsApi = async (token) => {
  const response = await fetch(`${API_BASE}/rides/myBookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const fetchAllUsersApi = async (token) => {
  const response = await fetch(`${API_BASE}/users/all`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(response);
};

export const approveCaptainApi = async (userId, token) => {
  const response = await fetch(`${API_BASE}/users/approve/${userId}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(response);
};