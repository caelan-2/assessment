// DisplayNewBatch is a component that is nested in the DisplayContainer.
// this is used to display the result from a request for a batch upload to the TOM API.
export default function DisplayNewBatch({ batchResult }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl m-2">Jobs for Batch</div>
      {batchResult?.data?.jobs?.map((job) => {
        return (
          <div
            key={job.id}
            className="card card-compact w-96 bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">{job.filename}</h2>
              <div>Filename: {job.filename}</div>
              <div>Size: {job.size}</div>
              <div>Progress: {job.progress}</div>
              <div>Upload Date: {job.uploaded}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
