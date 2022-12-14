import { thingById, things, thingsByOwner, getAttributes, attributeById } from "@everything-sdk-js/data";

export const options = [
  { label: "things", fn: things },
  { label: "thingById", fn: thingById },
  { label: "thingsByOwner", fn: thingsByOwner },
  { label: "getAttributes", fn: getAttributes },
  { label: "attributeById", fn: attributeById },
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
      {options[query].label !== "things" && options[query].label !== "getAttributes" ? (
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
