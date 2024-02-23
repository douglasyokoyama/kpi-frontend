import { type PeopleAnalyticsResponse } from '@/lib/definitions';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const getPeopleAnalyticsData = async (
  email: string,
): Promise<PeopleAnalyticsResponse> => {
  console.log(API_URL, email);
  const response = await axios.get(API_URL, {
    params: {
      email,
    },
  });
  return response.data;
};
