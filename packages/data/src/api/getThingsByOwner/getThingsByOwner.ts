import { fetchEverything, GraphqlFetchingError } from '../../graphql/fetch';
import { thingsByOwnerQuery } from './getThingsByOwner.query';
import { ThingsByOwnerResults } from './getThingsByOwner.types';


interface ThingsByOwnerData {
  data?: ThingsByOwnerResults | null;
  error: undefined | GraphqlFetchingError;
}

/**
 * Makes a request to mesh api for all things by owner data
 * @returns all things with matching ownerId {@link ThingsByOwnerData}
 */
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
    }

    return { data, error };
  };

  return fetchData();
};