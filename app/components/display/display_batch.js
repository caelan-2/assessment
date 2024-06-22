import { useState, useEffect } from "react";
import SaveForm from "./save_form";
import * as url from "@/app/url/url";

export default function DisplayBatch({ batchResult }) {
  const [saveName, setSaveName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [batchFails, setBatchFails] = useState([]);
  function save() {
    let obj = {
      ...batchResult,
      data: { ...batchResult.data, "save-name": saveName },
    };
    fetch(url.localApiEndpoint("batch/save"), {
      method: "POST",
      body: JSON.stringify(obj),
    }).then(() => {
      setIsSaved(true);
    });
  }
  useEffect(() => {
    setIsSaved(false);
    setSaveName("");
    setBatchFails([]);
    batchResult?.data?.jobs?.forEach((job) => {
      if (!job.size || job.size === 0) {
        setBatchFails([...batchFails, job.filename]);
      }
    });
  }, [batchResult]);
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl m-2">Jobs for Batch</div>
      {batchResult?.data?.jobs?.map((job) => {
        return (
          <div key={job.id} className="card w-96 bg-base-100 shadow-xl">
            <div
              className="card-body"
              style={job.size === 0 ? { color: "#ee4343" } : {}}
            >
              <h2 className="card-title">{job.filename}</h2>
              <div>Filename: {job.filename}</div>
              <div>Size: {job.size}</div>
              <div>Progress: {job.progress}</div>
              <div>Upload Date: {job.uploaded}</div>
            </div>
          </div>
        );
      })}
      {batchFails.length === 0 ? (
        <SaveForm
          handleSubmit={(e) => {
            e.preventDefault();
            save();
          }}
          setSaveName={setSaveName}
          isSaved={isSaved}
        ></SaveForm>
      ) : null}
    </div>
  );
}
