import * as url from "@/app/url/url";
import { useEffect, useState } from "react";

export default function DisplaySaved({ selectedModel }) {
  const [searchText, setSearchText] = useState("");
  const [collection, setCollection] = useState("single");
  const [decisions, setDecisions] = useState(null);
  const [batches, setBatches] = useState(null);
  function search() {
    let body = { "save-name": searchText };
    if (collection === "single") {
      body["model"] = selectedModel.id;
    }
    fetch(url.localApiEndpoint(`${collection}/load`), {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((payload) => {
        switch (collection) {
          case "single":
            setDecisions(payload.data);
            break;
          case "batch":
            setBatches(payload.data);
            break;
          default:
            console.error("Unknown collection: " + collection);
            return;
        }
      });
  }
  useEffect(() => {
    search();
  }, [collection, selectedModel]);
  return (
    <div className="w-full h-full">
      {collection === "single" ? (
        <div>
          Use the 'Model' select on the left to choose a model to search from.
        </div>
      ) : (
        <div>
          'Model' on the left does not have an impact on 'Batch' search.
        </div>
      )}
      <div role="tablist" className="tabs tabs-boxed mt-2">
        <a
          role="tab"
          className={collection === "single" ? "tab tab-active" : "tab"}
          onClick={() => setCollection("single")}
        >
          Single
        </a>
        <a
          role="tab"
          className={collection === "batch" ? "tab tab-active" : "tab"}
          onClick={() => setCollection("batch")}
        >
          Batch
        </a>
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
        batches={batches}
        collection={collection}
        decisions={decisions}
        selectedModel={selectedModel}
      ></ItemsComponent>
    </div>
  );
}

function ItemsComponent({ decisions, batches, collection, selectedModel }) {
  switch (collection) {
    case "single":
      if (!decisions || decisions.length === 0) {
        return (
          <div>Nothing found for model: {selectedModel.attributes.name}</div>
        );
      }
      return (
        <div>
          {decisions?.map((decision) => {
            return (
              <SingleItem key={decision._id} decision={decision}></SingleItem>
            );
          })}
        </div>
      );
    case "batch":
      if (!batches || batches.length === 0) {
        return <div>Nothing found</div>;
      }
      return (
        <div>
          {batches?.map((batchInfo) => {
            return (
              <BatchItem key={batchInfo._id} batchInfo={batchInfo}></BatchItem>
            );
          })}
        </div>
      );
    default:
      return <div>Unknown collection: {collection}</div>;
  }
}

function SingleItem({ decision }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl mt-4 p-0">
      <div className="card-body">
        <h2 className="card-title">{decision["save-name"]}</h2>
        <div>Decision: {decision.attributes.decision}</div>
        <div>Confidence: {decision.attributes.confidence}</div>
        <div>Timestamp: {decision.attributes.timestamp}</div>
      </div>
    </div>
  );
}

function BatchItem({ batchInfo }) {
  console.log("batchInfo:", batchInfo);
  return (
    <div className="card w-full bg-base-100 shadow-xl mt-4 p-0">
      <div className="card-body">
        <h2 className="card-title">{batchInfo["save-name"]}</h2>
        {batchInfo.jobs.map((job) => {
          return (
            <div
              key={job._id}
              className="card w-full bg-base-200 shadow-xl my-2 p-0"
            >
              <div className="card-body">
                <h2 className="card-title">{job.filename}</h2>
                <div>ID: {job.id}</div>
                <div>Size: {job.size}</div>
                <div>Progress: {job.progress}</div>
                <div>Upload Date: {job.uploaded}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
