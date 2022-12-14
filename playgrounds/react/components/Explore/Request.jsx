import { getThingById, getThings, getThingsByOwner, getAttributes, getAttributeById } from "@everything-sdk-js/data";

export const options = [
  { label: "getThings", fn: getThings },
  { label: "getThingById", fn: getThingById },
  { label: "getThingsByOwner", fn: getThingsByOwner },
  { label: "getAttributes", fn: getAttributes },
  { label: "getAttributeById", fn: getAttributeById },
];

function Request({ query, setQuery, param, setParam, runQuery }) {

  return (
    <div className="flex w-full justify-between">
      <div>
        <select
          className="select w-full max-w-xs"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setParam("");
          }}
        >
          {options.map((it, index) => (
            <option key={index} value={index}>
              {it.label}
            </option>
          ))}
        </select>
      </div>
      {options[query].label !== "getThings" && options[query].label !== "getAttributes" ? (
        <div>
          <input
            type="text"
            placeholder={"enter parameter"}
            value={param}
            onChange={(e) => setParam(e.target.value)}
            className="input w-full max-w-xs"
          />
        </div>
      ) : null}
      <button className={"btn normal-case"} onClick={runQuery}>
        run query
      </button>
    </div>
  );
}

export default Request;
