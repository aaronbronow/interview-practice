const axios = require('axios');
const { API_URLS, APP_CONFIG } = require('./constants');

async function fetchData(url, options = {}) {
  console.log(`Version: ${APP_CONFIG.VERSION}`);
  try {
    const response = await axios.get(url, options);
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    return response.data;
  } catch (error) {
    console.log(`Error fetching data: ${error.message}`);
    return error;
  }
}

// Example usage:
// fetchData(API_URLS.COMMENTS);

module.exports = { fetchData };