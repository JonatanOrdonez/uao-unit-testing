import axios from 'axios';

export const divide = (a, b) => {
  if (b === 0) {
    throw new Error('Error dividing by zero');
  }

  return a / b;
};

export const getPosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

  if (response.status !== 200) {
    throw new Error('Error fetching posts');
  }

  const { data } = response;

  if (!Array.isArray(data)) {
    throw new Error('Data is not an array');
  }

  if (data.length === 0) {
    throw new Error('No posts found');
  }

  if (data.length > 10) {
    throw new Error('Too many posts');
  }

  return data;
};
