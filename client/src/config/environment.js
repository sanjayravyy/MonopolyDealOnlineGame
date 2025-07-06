// Environment configuration for the frontend
const config = {
  development: {
    SERVER_URL: 'http://localhost:5000'
  },
  production: {
    // Update this with your deployed backend URL from Render.com
    SERVER_URL: process.env.REACT_APP_SERVER_URL || 'https://your-backend-url.onrender.com'
  }
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment]; 