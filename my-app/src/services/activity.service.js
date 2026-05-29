import axios from 'axios';

export const getActivityData = async () => {
  const response = await axios.get(
    'http://localhost:4000/api/activity-check'
  );

  return response.data;
};