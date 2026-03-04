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

async function getCommentsAnalysis() {
  const comments = await fetchData(API_URLS.COMMENTS);
  if (!Array.isArray(comments) || comments.length === 0) {
    return null;
  }

  // Sorting comments by id to ensure we find the correct ones
  // Smallest id = oldest, Largest id = youngest
  const sortedComments = [...comments].sort((a, b) => a.id - b.id);

  const oldest = sortedComments[0];
  const youngest = sortedComments[sortedComments.length - 1];
  const middleIndex = Math.floor(sortedComments.length / 2);
  const middle = sortedComments[middleIndex];

  return {
    oldest,
    youngest,
    middle
  };
}

async function getRecentCommentsPerUser() {
  // Fetch users, posts, and comments in parallel
  const [users, posts, comments] = await Promise.all([
    fetchData(API_URLS.USERS),
    fetchData(API_URLS.POSTS),
    fetchData(API_URLS.COMMENTS)
  ]);

  if (!Array.isArray(users) || !Array.isArray(posts) || !Array.isArray(comments)) {
    return null;
  }

  // Create mapping of postId to userId
  const postToUserMap = posts.reduce((acc, post) => {
    acc[post.id] = post.userId;
    return acc;
  }, {});

  // Group comments by userId
  const commentsByUserId = comments.reduce((acc, comment) => {
    const userId = postToUserMap[comment.postId];
    if (userId) {
      if (!acc[userId]) acc[userId] = [];
      acc[userId].push(comment);
    }
    return acc;
  }, {});

  // Get the 5 most recent (highest ID) comments per user
  const recentCommentsPerUser = {};
  for (const userId in commentsByUserId) {
    recentCommentsPerUser[userId] = commentsByUserId[userId]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
  }

  return recentCommentsPerUser;
}

module.exports = { fetchData, getCommentsAnalysis, getRecentCommentsPerUser };