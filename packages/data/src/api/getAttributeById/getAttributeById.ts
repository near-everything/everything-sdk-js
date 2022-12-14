import { fetchEverything, GraphqlFetchingError } from '../../graphql/fetch';
import { attributeByIdQuery } from './getAttributeById.query';
import { AttributeByIdResults } from './getAttributeById.types';


interface AttributeByIdData {
  data?: AttributeByIdResults | null;
  error: undefined | GraphqlFetchingError;
}

/**
 * Makes a request to mesh api for attribute by id data
 * @returns data available from provided attribute id  {@link AttributeByIdData}
 */
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
    }

    return { data, error };
  };

  return fetchData();
};