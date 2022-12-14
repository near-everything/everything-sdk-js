import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import { useState } from "react";
import AttributeField from "./AttributeField";
import CreatableSelect from "../../CreatableSelect";
import { getAttributes } from "@everything-sdk-js/data";

function Characteristics({ attributes, setAttributes }) {
  const { data, isLoading, isError } = useQuery(["attributes"], async () => {
    const { data } = await getAttributes();
    const { attributes: {edges} } = data;
    return edges;
  });
  const proposeAttribute = useMutation((name) => {
    const graphqlClient = new GraphQLClient("/api/graphql");
    return graphqlClient.request(
      gql`
        mutation proposeAttribute($name: String!) {
          proposeAttribute(input: { name: $name }) {
            attribute {
              id
              name
            }
          }
        }
      `,
      {
        name,
      }
    );
  });
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const prepareOptions = () => {
    return data?.map((option) => ({
      value: option?.node?.id,
      label: option?.node?.name,
      // value: option?.node?.attribute?.name + option?.node?.option?.value,
      // label: `${option?.node?.attribute?.name}: ${option?.node?.option?.value}`,
    }));
  };

  const handleOnChange = (value) => {
    setAttributes(value);
  };

  const handleProposeAttribute = (value) => {
    proposeAttribute.mutate(value, {
      onSuccess: async (response) => {
        setLoading(true);
        const {
          proposeAttribute: { attribute },
        } = response;

        setAttributes([
          ...attributes,
          { value: attribute.id, label: attribute.name },
        ]);
        await queryClient.refetchQueries(["attributes"]);
        setLoading(false);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  const setAttributeOption = (value) => {
    setAttributes(
      attributes.map((attribute) =>
        attribute.value === value.attributeId
          ? { ...attribute, options: value }
          : attribute
      )
    );
  };

  const handleValue = (attributeId) => {
    const match = attributes.find((it) => it.value === attributeId);
    if (match.options?.value === undefined) {
      return null;
    } else {
      return match.options;
    }
  };

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="flex flex-col w-full">
          <p className="font-semibold mb-2">select attributes for template</p>
          <CreatableSelect
            id="attribute_select"
            instanceId="attribute_select"
            isMulti
            className="text-gray-800"
            options={prepareOptions()}
            isDisabled={isLoading || isError}
            isLoading={isLoading}
            onChange={handleOnChange}
            onCreateOption={handleProposeAttribute}
            defaultValue={attributes}
            value={attributes}
            placeholder={"type or create an attribute"}
            formatCreateLabel={() => "not showing up? create new option"}
          />
        </div>
      )}
      {attributes?.length > 0 ? (
        <div className="w-1/2">
          <div className="grid gap-4 mt-4" id="thing-form">
            {attributes.map((attr) => (
              <AttributeField
                key={attr.value}
                attributeId={attr.value}
                setAttributeOption={setAttributeOption}
                value={handleValue(attr.value)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Characteristics;
