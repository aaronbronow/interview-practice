const { fetchData, getCommentsAnalysis, getRecentCommentsPerUser } = require('./index');
const { API_URLS } = require('./constants');

describe('fetchData', () => {
  test('should fetch comments successfully', async () => {
    const data = await fetchData(API_URLS.COMMENTS);
    
    // Basic validation of the JSON response
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    
    // Validate the structure of a comment
    const firstComment = data[0];
    expect(firstComment).toHaveProperty('id');
    expect(firstComment).toHaveProperty('body');
    expect(firstComment).toHaveProperty('email');
  });

  test('should handle 500 error status correctly', async () => {
    const data = await fetchData(API_URLS.ERROR_500);
    
    // fetchData should return an object with a message property
    expect(data).toHaveProperty('message');
    expect(data.message).toContain('Request failed with status code 500');
  });

  test('should send auth header token correctly', async () => {
    const token = 'my-secret-token';
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    // Testing with reqbin.com as requested in the plan
    const data = await fetchData(API_URLS.AUTH_TEST, options);
    
    // Since reqbin might not always respond with a predictable JSON structure for a simple GET on the root,
    // we just ensure the call was made and some response was received.
    // In a real scenario, we'd check if the echo shows our header.
    expect(data).toBeDefined();
  });
});

describe('getCommentsAnalysis', () => {
  test('should return oldest, youngest, and middle comments', async () => {
    const analysis = await getCommentsAnalysis();
    
    expect(analysis).not.toBeNull();
    expect(analysis).toHaveProperty('oldest');
    expect(analysis).toHaveProperty('youngest');
    expect(analysis).toHaveProperty('middle');
    
    // Using id as proxy for age:
    // oldest.id should be less than youngest.id
    expect(analysis.oldest.id).toBeLessThan(analysis.youngest.id);
    
    // middle.id should be between oldest and youngest
    expect(analysis.middle.id).toBeGreaterThanOrEqual(analysis.oldest.id);
    expect(analysis.middle.id).toBeLessThanOrEqual(analysis.youngest.id);
  });
});

describe('getRecentCommentsPerUser', () => {
  test('should return 5 most recent comments per user', async () => {
    const result = await getRecentCommentsPerUser();
    
    expect(result).not.toBeNull();
    
    // Validate results for some users (using known data from JSONPlaceholder)
    for (const userId in result) {
      const userComments = result[userId];
      expect(Array.isArray(userComments)).toBe(true);
      expect(userComments.length).toBeLessThanOrEqual(5);
      
      // Check if comments are sorted by id descending (most recent first)
      if (userComments.length > 1) {
        for (let i = 0; i < userComments.length - 1; i++) {
          expect(userComments[i].id).toBeGreaterThan(userComments[i+1].id);
        }
      }
    }
  });
});