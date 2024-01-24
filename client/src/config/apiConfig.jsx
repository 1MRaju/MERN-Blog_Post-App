const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://mernblogpost-app.onrender.com/api/v1'
  : 'http://localhost:8080/api/v1';

export default API_BASE_URL;