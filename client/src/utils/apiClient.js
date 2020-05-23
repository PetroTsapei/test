import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://vast-meadow-05705.herokuapp.com',
  timeout: 1000 * 60 * 10 // minutes
});

export default apiClient;
