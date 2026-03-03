const axios = require('axios');
const { API_URLS, APP_CONFIG } = require('./constants');

async function fetchData(url) {
  console.log(`Version: ${APP_CONFIG.VERSION}`);
  try {
    const response = await axios.get(url);
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

// Example usage:
// fetchData(API_URLS.COMMENTS);

module.exports = { fetchData };