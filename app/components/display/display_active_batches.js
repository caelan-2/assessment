import * as url from "@/app/url/url";
import * as util from "@/app/util/util";
import { useEffect, useState } from "react";
import Tabs from "../common/tabs";

// TAB_META is metadata for the selectable tabs on this page..
const TAB_META = Object.freeze({
  FILES: { id: "files", label: "Files" },
  JOBS: { id: "jobs", label: "Jobs" },
});

// DisplayActiveBatches is a component that is nested in the DisplayContainer.
// this is used to display active batches that are available at the TOM API batch endpoint.
export default function DisplayActiveBatches({ selectedModel }) {
  // selectedTab stores the selected display tab, either 'files' or 'jobs'
  const [selectedTab, setSelectedTab] = useState("files");
  // searchText stores the search query.
  const [searchText, setSearchText] = useState("");
  // files stores all available files at the TOM API batch endpoint.
  const [files, setFiles] = useState([]);
  // filteredFiles stores the files filtered according to the searchText.
  const [filteredFiles, setFilteredFiles] = useState([]);
  // files stores all available jobs at the TOM API batch endpoint.
  const [jobs, setJobs] = useState([]);
  // filteredFiles stores the files filtered according to the searchText.
  const [filteredJobs, setFilteredJobs] = useState([]);
  // cache is used to avoid unnecessary requests to the TOM API.
  const [cache, setCache] = useState({});
  // retrieve makes a request to get the batch items for the 'selectedModel'.
  // if refresh is false the cache will be checked first.
  // if refresh is true the cache will be updated.
  function retrieve(refresh = false) {
    if (!refresh && cache[selectedModel.id]) {
      setFiles(cache[selectedModel.id].files);
      setJobs(cache[selectedModel.id].jobs);
      return;
    }
    fetch(
      url.proxyEndpoint(`batch/${selectedModel.id}`),
      util.addAuth({
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.api+json",
        },
      })
    )
      .then((res) => res.json())
      .then((payload) => {
        if (payload.errors) {
          console.error(payload.errors);
          return;
        }
        const cacheUpdate = { ...cache };
        cacheUpdate[selectedModel.id] = {
          files: payload.data.files,
          jobs: payload.data.jobs,
        };
        setCache(cacheUpdate);
        setFiles(payload.data.files);
        setJobs(payload.data.jobs);
      });
  }
  // search filters the files according to the 'filename'.
  function search() {
    setFilteredFiles(
      files.filter((file) => new RegExp(searchText).test(file.filename))
    );
    setFilteredJobs(
      files.filter((job) => new RegExp(searchText).test(job.filename))
    );
  }
  // call 'search' every time 'files' or 'jobs' changes
  useEffect(() => {
    search();
  }, [files, jobs]);
  // call 'retrieve' every time 'selectedModel' changes
  useEffect(() => {
    retrieve();
  }, [selectedModel]);
  return (
    <div className="w-full">
      <Tabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={TAB_META}
      ></Tabs>
      <label className="form-control my-1">
        <div className="label pb-0">
          <span className="label-text">Filter results</span>
        </div>
        <form
          id="search-remote-form"
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
              placeholder="Enter filename or regular expression here..."
            />
            <button type="submit" className="btn btn-sm">
              Search
            </button>
          </label>
        </form>
      </label>
      <div className="flex flex-row mt-4 px-4 justify-between">
        <span>
          Viewing batches for model:{" "}
          <span className="text-primary">
            {selectedModel?.attributes?.name}
          </span>
        </span>
        <button className="btn btn-sm" onClick={() => retrieve(true)}>
          Refresh
        </button>
      </div>
      <Items
        selectedModel={selectedModel}
        selectedTab={selectedTab}
        files={filteredFiles}
        jobs={jobs}
        retrieve={retrieve}
      ></Items>
    </div>
  );
}

function Items({ selectedModel, selectedTab, files, jobs, retrieve }) {
  switch (selectedTab) {
    case "files":
      return (
        <div>
          {files?.map((file) => {
            return (
              <FileItem
                key={file.id}
                file={file}
                retrieve={retrieve}
                selectedModel={selectedModel}
              ></FileItem>
            );
          })}
        </div>
      );

    case "jobs":
      return (
        <div>
          {jobs?.map((jobInfo) => {
            return <JobItem key={jobInfo._id} jobInfo={jobInfo}></JobItem>;
          })}
        </div>
      );
  }
}

function FileItem({ selectedModel, file, retrieve }) {
  // deleteSelf makes a request to delete this file.
  function deleteSelf() {
    fetch(
      url.remoteApiEndpoint(`batch/${selectedModel.id}/${file.id}`),
      util.addAuth({
        method: "DELETE",
      })
    )
      .then((res) => res.status)
      .then((status) => {
        retrieve();
      });
  }
  // downloadFile makes a request to download this file.
  function downloadFile() {
    fetch(
      url.remoteApiEndpoint(`batch/${selectedModel.id}/${file.id}`),
      util.addAuth({
        method: "GET",
      })
    )
      .then((res) => res.blob())
      .then((payload) => {
        const a = document.createElement("a");
        const url = URL.createObjectURL(payload);
        a.href = url;
        a.download = file.filename;
        a.click();
        URL.revokeObjectURL(url);
      });
  }
  return (
    <div
      className="card card-compact w-full bg-base-100 shadow-xl mt-4 p-0"
      style={{ color: file.errors ? "#f56f6f" : "" }}
    >
      <div className="card-body">
        <h2 className="card-title">{file["save-name"]}</h2>
        <div
          key={file.id}
          className="card card-compact w-full bg-base-200 shadow-xl my-2 p-0"
        >
          <div className="card-body">
            <h2 className="card-title">{file.filename}</h2>
            <div>ID: {file.id}</div>
            <div>Size: {file.size}</div>
            <div>Timestamp: {file.timestamp}</div>
            {file.errors ? (
              <div>
                {file.errors.map((error, i) => {
                  return (
                    <div key={`file-error-${i}`}>
                      <div className="text-red-400">ERROR: {error.message}</div>
                      <div className="text-red-500">REASON: {error.value}</div>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <div className="card-actions justify-end">
              <button
                disabled={file?.errors ? true : null}
                onClick={downloadFile}
                className="btn btn-sm btn-success"
              >
                Download
              </button>
              <button onClick={deleteSelf} className="btn btn-sm btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobItem({ jobInfo }) {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl mt-4 p-0">
      <div className="card-body">
        <h2 className="card-title">{jobInfo["save-name"]}</h2>
        {jobInfo?.jobs?.map((job) => {
          return (
            <div
              key={job._id}
              className="card card-compact w-full bg-base-200 shadow-xl my-2 p-0"
            >
              <div className="card-body">
                <h2 className="card-title">{job.filename}</h2>
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
