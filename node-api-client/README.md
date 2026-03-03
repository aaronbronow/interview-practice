# Node API Client - Interview Practice

This repository is set up for practicing a **Back End Pairing** interview (60 minutes).

## Interview Overview
- **Goal:** Write code that makes calls to an HTTP endpoint on a server and processes the JSON response.
- **Duration:** 60 minutes.
- **Language:** Node.js (JavaScript/TypeScript).
- **Format:** Collaborative coding exercise with an interviewer.

## Preparation Checklist
- [x] Zoom installed and screen sharing working.
- [x] Local development environment set up for Node.js.
- [x] Ability to install third-party libraries (e.g., `npm install axios`).
- [x] Boilerplate project ready to make HTTP requests.

## Getting Started

### 1. Initialize Project
```bash
npm init -y
```

### 2. Install Dependencies
Recommended libraries for HTTP requests and testing:
```bash
npm install axios
# Optional: for testing or utility
# npm install --save-dev jest
```

### 3. Basic Boilerplate (`index.js`)
A simple starting point for making a GET request to a JSON endpoint:

```javascript
const axios = require('axios');

async function fetchData(url) {
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
```

## Interview Tips
1. **Walk through the solution:** Discuss the approach before writing code.
2. **Collaborate:** Ask questions and seek clarifications from the interviewer.
3. **Google/LLM:** Use resources if you get stuck, but follow the interviewer's lead on AI assistant usage.
4. **Validation:** Ensure the JSON response is processed correctly.

## Plan
- [x] create a simple .env file with version and environment="dev" properties
- [x] make an Enum to store API URLs for quick access
- [x] add "https://jsonplaceholder.typicode.com/comments" as a quick access URL
- [x] write a jest test that takes one of the API URLs and passes it to fetchData
- [x] write a jest test that calls https://httpbin.org/status/500 to validate error status
- [x] write a jest test that calls https://reqbin.com with an auth header token
- [ ] write a driver function that uses fetchData to get comments and find the oldest, youngest, and middle comment
- [ ] write a driver function that uses fetchData to get comments and users, then return the most recent 5 comments per user