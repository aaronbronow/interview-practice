# Node API Client - Interview Practice

This repository is set up for practicing a **Back End Pairing** interview (60 minutes).

## Interview Overview
- **Goal:** Write code that makes calls to an HTTP endpoint on a server and processes the JSON response.
- **Duration:** 60 minutes.
- **Language:** Node.js (JavaScript/TypeScript).
- **Format:** Collaborative coding exercise with an interviewer.

## Preparation Checklist
- [x] Zoom installed and screen sharing working.
- [ ] Local development environment set up for Node.js.
- [ ] Ability to install third-party libraries (e.g., `npm install axios`).
- [ ] Boilerplate project ready to make HTTP requests.

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
