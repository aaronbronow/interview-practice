/**
 * Constants and Configuration for the API Client
 */

const API_URLS = Object.freeze({
  COMMENTS: 'https://jsonplaceholder.typicode.com/comments',
  USERS: 'https://jsonplaceholder.typicode.com/users',
  ERROR_500: 'https://httpbin.org/status/500',
  AUTH_TEST: 'https://reqbin.com'
});

const APP_CONFIG = Object.freeze({
  VERSION: process.env.VERSION || '1.0.0',
  ENV: process.env.ENVIRONMENT || 'dev'
});

module.exports = {
  API_URLS,
  APP_CONFIG
};
