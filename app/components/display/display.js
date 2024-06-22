import * as constants from "@/app/constants";
import DisplayBatch from "./display_batch";
import DisplaySingle from "./display_single";
import DisplaySaved from "./display_saved";
import DisplayRemote from "./display_remote";

export default function DisplayContainer({
  selectedTab,
  selectedModel,
  decision,
  batchResult,
}) {
  switch (selectedTab) {
    case constants.TAB_SINGLE:
      return (
        <Display data={decision}>
          <DisplaySingle decision={decision}></DisplaySingle>
        </Display>
      );

    case constants.TAB_BATCH:
      return (
        <Display data={batchResult}>
          <DisplayBatch batchResult={batchResult}></DisplayBatch>
        </Display>
      );

    case constants.TAB_SAVED:
      return (
        <Display data={"hi"}>
          <DisplaySaved selectedModel={selectedModel}></DisplaySaved>
        </Display>
      );

    case constants.TAB_REMOTE:
      return (
        <Display data={"hi"}>
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
