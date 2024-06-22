import * as url from "@/app/url/url";
import * as util from "@/app/util/util";
import { useEffect, useState } from "react";

export default function DisplayRemote({ selectedModel }) {
  const [selectedTab, setSelectedTab] = useState("files");
  const [searchText, setSearchText] = useState("");
  const [files, setFiles] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [cache, setCache] = useState({});
  function search() {
    console.log("TODO: search");
  }
  useEffect(() => {
    if (cache[selectedModel.id]) {
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
  }, [selectedModel]);
  return (
    <div className="w-full">
      <div role="tablist" className="tabs tabs-boxed">
        <a
          role="tab"
          className={selectedTab === "files" ? "tab tab-active" : "tab"}
          onClick={() => setSelectedTab("files")}
        >
          Files
        </a>
        <a
          role="tab"
          className={selectedTab === "jobs" ? "tab tab-active" : "tab"}
          onClick={() => setSelectedTab("jobs")}
        >
          Jobs
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
      <Items selectedTab={selectedTab} files={files} jobs={jobs}></Items>
    </div>
  );
}

function Items({ selectedTab, files, jobs }) {
  switch (selectedTab) {
    case "files":
      return (
        <div>
          {files?.map((file) => {
            return <FileItem key={file.id} file={file}></FileItem>;
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

function FileItem({ file }) {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl mt-4 p-0">
      <div className="card-body">
        <h2 className="card-title">{file["save-name"]}</h2>
        <div
          key={file.id}
          className="card card-compact w-full bg-base-200 shadow-xl my-2 p-0"
        >
          <div className="card-body">
            <h2 className="card-title">{file.filename}</h2>
            <div>Size: {file.size}</div>
            <div>Upload Date: {file.uploaded}</div>
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
              <button className="btn btn-sm btn-error">Delete</button>
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
