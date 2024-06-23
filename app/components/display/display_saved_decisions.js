import * as url from "@/app/url/url";
import { useEffect, useState } from "react";

// DisplaySavedDecisions is a component that is nested in the DisplayContainer.
// this is used to display decisions that are saved to the DB.
export default function DisplaySavedDecisions({ selectedModel }) {
  // searchText stores the search query.
  const [searchText, setSearchText] = useState("");
  // decisions stores the decisions to display after a search is made.
  const [decisions, setDecisions] = useState(null);
  // search makes a request to find decisions from the DB.
  function search() {
    fetch(url.localApiEndpoint("load"), {
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
    <div className="w-full h-full mt-4">
      <div>
        Viewing decisions for model:{" "}
        <span className="text-primary">{selectedModel?.attributes?.name}</span>
      </div>
      <label className="form-control my-1">
        <div className="label pb-0">
          <span className="label-text">Filter decisions</span>
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
              Filter
            </button>
          </label>
        </form>
      </label>
      <ItemsContainer
        decisions={decisions}
        selectedModel={selectedModel}
        search={search}
      ></ItemsContainer>
    </div>
  );
}

function ItemsContainer({ decisions, selectedModel, search }) {
  if (!decisions || decisions.length === 0) {
    return (
      <div className="mt-4">
        Nothing found for model: {selectedModel.attributes.name}
      </div>
    );
  }
  return (
    <div>
      {decisions?.map((decision) => {
        return (
          <Item key={decision._id} decision={decision} search={search}></Item>
        );
      })}
    </div>
  );
}

function Item({ decision, search }) {
  function deleteSelf() {
    fetch(url.localApiEndpoint("delete"), {
      method: "POST",
      body: JSON.stringify({ _id: decision._id }),
    })
      .then((res) => res.json())
      .then((payload) => {
        search();
      });
  }
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl mt-4 p-0">
      <div className="card-body">
        <h2 className="card-title">{decision["save-name"]}</h2>
        <div>Decision: {decision.attributes.decision}</div>
        <div>Confidence: {decision.attributes.confidence}</div>
        <div>Timestamp: {decision.attributes.timestamp}</div>
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-error" onClick={deleteSelf}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
