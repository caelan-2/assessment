import { useState } from "react";
import * as util from "@/app/util/util";
import * as url from "@/app/url/url";

// InputNewBatch is a component that is nested in the InputContainer.
// this is used to provide user input for making a request to the TOM API
// for a batch upload.
export default function InputNewBatch({ selectedModel, setBatchResult }) {
  // batchFile stores the selected file to be uploaded.
  const [batchFile, setBatchFile] = useState(null);
  // delimiter stores the user-entered CSV delimiter.
  const [delimiter, setDelimiter] = useState(",");
  // requestBatch makes the request via the proxy route.
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
