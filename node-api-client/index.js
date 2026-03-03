const axios = require('axios');
const VERSION = process.env.VERSION;

async function fetchData(url) {
  console.log(`Version: ${VERSION}`);
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
// const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';
// fetchData(API_URL);

module.exports = { fetchData };