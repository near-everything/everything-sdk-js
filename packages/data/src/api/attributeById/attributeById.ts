import { fetchEverything, GraphqlFetchingError } from '../../graphql/fetch';
import { attributeByIdQuery } from './attributeById.query';
import { AttributeByIdResults } from './attributeById.types';


interface AttributeByIdData {
  data?: AttributeByIdResults | null;
  error: undefined | GraphqlFetchingError;
}

export const attributeById = async (
  attributeId: number
): Promise<AttributeByIdData> => {
  const fetchData = async (): Promise<AttributeByIdData> => {
    const { data, error } = await fetchEverything<AttributeByIdResults>({
      query: attributeByIdQuery,
      variables: {
        attributeId
      },
    });

    if (error) {
      console.error('Error fetching attribute', error.message);
      throw error;
    }

    return { data, error };
  };

  return fetchData();
};