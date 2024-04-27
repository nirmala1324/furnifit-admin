// auth.js

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Token does not exist
    return false;
  }

  // Decode the token
  const decodedToken = decodeToken(token);

  if (!decodedToken) {
    // Token could not be decoded
    return false;
  }

  // Check if the token is expired
  if (decodedToken.exp < Date.now() / 1000) {
    // Token is expired
    return false;
  }

  // Token exists and is not expired
  return true;
};

const decodeToken = (token) => {
  // Implement token decoding logic here (e.g., using JWT libraries)
  // This function should return the decoded token

  // Example implementation using jsonwebtoken library:
  const secret_key = process.env.VITE_CLOUD_SECRET_KEY;

  try {
    const decoded = jwt.verify(token, secret_key);
    return decoded;
  } catch (error) {
    // Token verification failed
    console.error('Token verification failed:', error);
    return null;
  }
};
