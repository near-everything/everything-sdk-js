import { fetchEverything, GraphqlFetchingError } from '../../graphql/fetch';
import { thingsQuery } from './things.query';
import { ThingsResults } from './things.types';

interface ThingsData {
  data?: ThingsResults | null;
  error: undefined | GraphqlFetchingError;
}

/**
 * Makes a request to mesh api for all thing data
 * @returns tokens publically available on blockchain and any data exposed to user {@link ThingsData}
 */
export const things = async (): Promise<ThingsData> => {
  const fetchData = async (): Promise<ThingsData> => {
    const { data, error } = await fetchEverything<ThingsResults>({
      query: thingsQuery
    });

    if (error) {
      console.error('Error fetching things', error.message);
    }

    return { data, error };
  };

  return fetchData();
};