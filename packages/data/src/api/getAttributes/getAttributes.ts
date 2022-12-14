import { fetchEverything, GraphqlFetchingError } from '../../graphql/fetch';
import { attributesQuery } from './getAttributes.query';
import { AttributesResults } from './getAttributes.types';


interface AttributesData {
  data?: AttributesResults | null;
  error: undefined | GraphqlFetchingError;
}

/**
 * Makes a request to mesh api for all attribute data
 * @returns available attributes for describing things  {@link AttributesData}
 */
export const getAttributes = async (): Promise<AttributesData> => {
  const fetchData = async (): Promise<AttributesData> => {
    const { data, error } = await fetchEverything<AttributesResults>({
      query: attributesQuery
    });

    if (error) {
      console.error('Error fetching attributes', error.message);
    }

    return { data, error };
  };

  const res = await fetchData();

  return { data: res.data, error: res.error };
};