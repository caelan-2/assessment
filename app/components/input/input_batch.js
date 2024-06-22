import { useState } from "react";
import * as util from "@/app/util/util";
import * as url from "@/app/url/url";
export default function Batch({ selectedModel, setBatchResult }) {
  const [batchFile, setBatchFile] = useState(null);
  const [delimiter, setDelimiter] = useState(",");
  function requestBatch() {
    const form = new FormData();
    form.append("file", batchFile);
    form.append("delimiter", delimiter);
    fetch(
      url.proxyEndpoint(`batch/${selectedModel.id}`),
      util.addAuth({
        method: "POST",
        body: form,
        "Content-Type": "multipart/form-data",
      })
    )
      .then((res) => {
        return res.json();
      })
      .then((payload) => {
        console.log("Batch result payload: ", payload);
        setBatchResult(payload);
      });
  }

  return (
    <form
      id="input-batch-form"
      className="flex flex-col p-4"
      onSubmit={(e) => {
        e.preventDefault();
        requestBatch();
      }}
    >
      <div className="flex flex-col flex-wrap">
        <label className="form-control my-1">
          <div className="label pb-0">
            <span className="label-text">Batch File</span>
          </div>
          <input
            type="file"
            onChange={(e) => setBatchFile(e.target.files[0])}
            className="input input-bordered input-sm"
          ></input>
        </label>
        <label className="form-control my-1">
          <div className="label pb-0">
            <span className="label-text">Delimiter</span>
          </div>
          <input
            type="text"
            onChange={(e) => setDelimiter(e.target.value)}
            className="input input-bordered input-sm"
          ></input>
        </label>
      </div>
      <button type="submit" className="btn btn-primary self-end mt-8">
        Start Batch Job
      </button>
    </form>
  );
}
