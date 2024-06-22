import * as url from "@/app/url/url";
import { useEffect, useState } from "react";

export default function DisplaySaved({ selectedModel }) {
  const [searchText, setSearchText] = useState("");
  const [decisions, setDecisions] = useState(null);
  function search() {
    fetch(url.localApiEndpoint(`single/load`), {
      method: "POST",
      body: JSON.stringify({
        "save-name": searchText,
        model: selectedModel.id,
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        setDecisions(payload.data);
      });
  }
  useEffect(() => {
    search();
  }, [selectedModel]);
  return (
    <div className="w-full h-full">
      <div>
        Use the 'Model' select on the left to choose a model to search from.
      </div>
      <label className="form-control my-1">
        <div className="label pb-0">
          <span className="label-text">What would you like to find?</span>
        </div>
        <form
          id="search-database-form"
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
        >
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              className="grow"
              placeholder="Enter name or regular expression here..."
            />
            <button type="submit" className="btn btn-sm">
              Search
            </button>
          </label>
        </form>
      </label>
      <ItemsComponent
        decisions={decisions}
        selectedModel={selectedModel}
      ></ItemsComponent>
    </div>
  );
}

function ItemsComponent({ decisions, selectedModel }) {
  if (!decisions || decisions.length === 0) {
    return <div>Nothing found for model: {selectedModel.attributes.name}</div>;
  }
  return (
    <div>
      {decisions?.map((decision) => {
        return <SingleItem key={decision._id} decision={decision}></SingleItem>;
      })}
    </div>
  );
}

function SingleItem({ decision }) {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl mt-4 p-0">
      <div className="card-body">
        <h2 className="card-title">{decision["save-name"]}</h2>
        <div>Decision: {decision.attributes.decision}</div>
        <div>Confidence: {decision.attributes.confidence}</div>
        <div>Timestamp: {decision.attributes.timestamp}</div>
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-error">Delete</button>
        </div>
      </div>
    </div>
  );
}
