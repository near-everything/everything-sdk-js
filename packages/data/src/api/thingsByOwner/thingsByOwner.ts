import { fetchEverything, GraphqlFetchingError } from '../../graphql/fetch';
import { thingsByOwnerQuery } from './thingsByOwner.query';
import { ThingsByOwnerResults } from './thingsByOwner.types';


interface ThingsByOwnerData {
  data?: ThingsByOwnerResults | null;
  error: undefined | GraphqlFetchingError;
}

export const thingsByOwner = async (
  ownerId: string
): Promise<ThingsByOwnerData> => {
  const fetchData = async (): Promise<ThingsByOwnerData> => {
    const { data, error } = await fetchEverything<ThingsByOwnerResults>({
      query: thingsByOwnerQuery,
      variables: {
        ownerId
      },
    });

    if (error) {
      console.error('Error fetching things by owner', error.message);
      throw error;
    }

    return { data, error };
  };

  return fetchData();
};