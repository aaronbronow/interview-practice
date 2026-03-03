const { fetchData } = require('./index');
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
});
