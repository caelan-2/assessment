import * as constants from "@/app/constants/constants";
// DisplayNewBatch is a component that is nested in the DisplayContainer.
// this is used to display the result from a request for a batch upload to the TOM API.
export default function DisplayNewBatch({ batchResult }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-xl m-2">File Uploaded</div>
      <div className="mb-4">
        Go to tab{" "}
        <span className="text-primary">
          {constants.MAIN_TABS.ACTIVE_BATCHES.label}
        </span>{" "}
        to view batches.
      </div>
      {batchResult?.data?.jobs?.map((job) => {
        return (
          <div
            key={job.id}
            className="card card-compact w-full bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">
                <span className="text-gray-400">Filename:</span> {job.filename}
              </h2>
              <div>
                <span className="text-gray-400">Size:</span> {job.size}
              </div>
              <div>
                <span className="text-gray-400">Progress:</span> {job.progress}
              </div>
              <div>
                <span className="text-gray-400">Timestamp:</span> {job.uploaded}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
