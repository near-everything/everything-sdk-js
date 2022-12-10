import { fetchEverything, GraphqlFetchingError } from '../../graphql/fetch';
import { thingByIdQuery } from './thingById.query';
import { ThingByIdResults } from './thingById.types';


interface ThingByIdData {
  data?: ThingByIdResults | null;
  error: undefined | GraphqlFetchingError;
}

export const thingById = async (
  thingId: string | number
): Promise<ThingByIdData> => {
  const fetchData = async (): Promise<ThingByIdData> => {
    const { data, error } = await fetchEverything<ThingByIdResults>({
      query: thingByIdQuery,
      variables: {
        thingId
      },
    });

    if (error) {
      console.error('Error fetching thing', error.message);
      throw error;
    }

    return { data, error };
  };

  const res = await fetchData();

  return { data: res.data, error: res.error };
};