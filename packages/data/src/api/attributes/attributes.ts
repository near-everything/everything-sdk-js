import { fetchEverything, GraphqlFetchingError } from '../../graphql/fetch';
import { attributesQuery } from './attributes.query';
import { AttributesResults } from './attributes.types';


interface AttributesData {
  data?: AttributesResults | null;
  error: undefined | GraphqlFetchingError;
}

export const getAttributes = async (): Promise<AttributesData> => {
  const fetchData = async (): Promise<AttributesData> => {
    const { data, error } = await fetchEverything<AttributesResults>({
      query: attributesQuery
    });

    if (error) {
      console.error('Error fetching attributes', error.message);
      throw error;
    }

    return { data, error };
  };

  const res = await fetchData();

  return { data: res.data, error: res.error };
};