import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import React, { useState } from "react";
import CreatableSelect from "../../CreatableSelect";

const AttributeField = React.forwardRef(function AttributeField(
  { attributeId, setAttributeOption, value },
  ref
) {
  const { data, isLoading, isError } = useQuery(
    ["attributeById", attributeId],
    async () => {
      const graphqlClient = new GraphQLClient("/api/graphql");
      const attribute = await graphqlClient.request(
        gql`
          query attributeById($attributeId: Int!) {
            attribute(id: $attributeId) {
              name
              relationships {
                edges {
                  node {
                    option {
                      id
                      value
                    }
                  }
                }
              }
            }
          }
        `,
        { attributeId }
      );
      return attribute;
    },
    {
      enabled: !!attributeId,
    }
  );
  const proposeOption = useMutation((newOption) => {
    const graphqlClient = new GraphQLClient("/api/graphql");
    return graphqlClient.request(
      gql`
        mutation proposeOption($value: String!, $attributeId: Int!) {
          proposeOption(input: { value: $value, attributeId: $attributeId }) {
            option {
              id
              value
            }
          }
        }
      `,
      {
        value: newOption.value,
        attributeId: newOption.attributeId,
      }
    );
  });
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const prepareOptions = () => {
    return data?.attribute?.relationships?.edges?.map((option) => ({
      value: option?.node?.option?.id,
      label: option?.node?.option?.value,
    }));
  };
  const handleOnChange = (value) => {
    if (!value) {
      value = {};
    }
    value.attributeId = attributeId;
    setAttributeOption(value);
  };

  const handleProposeOption = (value) => {
    proposeOption.mutate(
      { value: value, attributeId: attributeId },
      {
        onSuccess: async (response) => {
          setLoading(true);
          const {
            proposeOption: { option },
          } = response;
          setAttributeOption({
            value: option.id,
            label: option.value,
            attributeId: attributeId,
          });
          await queryClient.refetchQueries(["attributeById", attributeId]);
          setLoading(false);
        },
        onError: (error) => {
          console.log(error.message);
        },
      }
    );
  };

  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <CreatableSelect
          options={prepareOptions()}
          isDisabled={isLoading || isError}
          isLoading={isLoading}
          onChange={handleOnChange}
          onCreateOption={handleProposeOption}
          defaultValue={value}
          value={value}
          placeholder={`${data?.attribute?.name}`}
          ref={ref}
        />
      )}
    </>
  );
});

export default AttributeField;
