import DisplayBatch from "./display_batch";
import DisplaySingle from "./display_single";
import DisplaySaved from "./display_saved";
import DisplayRemote from "./display_remote";

export default function DisplayContainer({
  selectedTab,
  selectedModel,
  decision,
  batchResult,
  prevSavedDecisionID,
  setPrevSavedDecisionID,
}) {
  switch (selectedTab) {
    case "single":
      return (
        <Display data={decision}>
          <DisplaySingle
            prevSavedDecisionID={prevSavedDecisionID}
            setPrevSavedDecisionID={setPrevSavedDecisionID}
            decision={decision}
          ></DisplaySingle>
        </Display>
      );

    case "batch":
      return (
        <Display data={batchResult}>
          <DisplayBatch batchResult={batchResult}></DisplayBatch>
        </Display>
      );

    case "saved":
      return (
        <Display data={{}}>
          <DisplaySaved selectedModel={selectedModel}></DisplaySaved>
        </Display>
      );

    case "remote":
      return (
        <Display data={{}}>
          <DisplayRemote selectedModel={selectedModel}></DisplayRemote>
        </Display>
      );

    default:
      return <div>Unknown mode: {selectedTab}</div>;
  }
}

function Display({ data, children }) {
  if (!data) {
    return <div>Nothing to display yet.</div>;
  }
  if (data.errors) {
    return data.errors.map((error) => {
      console.error(error);
      return (
        <div key={error.title}>
          <div className="text-red-500 text-2xl">ERROR: {error.title}</div>
          <div className="text-red-400">{error.detail}</div>
        </div>
      );
    });
  }
  return children;
}
