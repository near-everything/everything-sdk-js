import { fetchEverything, GraphqlFetchingError } from '../../graphql/fetch';
import { thingsQuery } from './things.query';
import { ThingsResults } from './things.types';


interface ThingsData {
  data?: ThingsResults | null;
  error: undefined | GraphqlFetchingError;
}

export const things = async (): Promise<ThingsData> => {
  const fetchData = async (): Promise<ThingsData> => {
    const { data, error } = await fetchEverything<ThingsResults>({
      query: thingsQuery
    });

    if (error) {
      console.error('Error fetching things', error.message);
      throw error;
    }

    return { data, error };
  };

  return fetchData();
};