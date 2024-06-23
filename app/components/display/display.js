import DisplayNewDecision from "./display_new_decision";
import DisplaySavedDecisions from "./display_saved_decisions";
import DisplayNewBatch from "./display_new_batch";
import DisplayActiveBatches from "./display_active_batches";
import * as constants from "@/app/constants/constants";

// DisplayContainer is the container that wraps all "Display" components.
// This is the right side of the main content.
export default function DisplayContainer({
  selectedTab,
  selectedModel,
  decision,
  batchResult,
  prevSavedDecisionID,
  setPrevSavedDecisionID,
}) {
  switch (selectedTab) {
    case constants.MAIN_TABS.NEW_DECISION.id:
      return (
        <Display data={decision}>
          <DisplayNewDecision
            prevSavedDecisionID={prevSavedDecisionID}
            setPrevSavedDecisionID={setPrevSavedDecisionID}
            decision={decision}
          ></DisplayNewDecision>
        </Display>
      );

    case constants.MAIN_TABS.SAVED_DECISIONS.id:
      return (
        <Display data={{}}>
          <DisplaySavedDecisions
            selectedModel={selectedModel}
          ></DisplaySavedDecisions>
        </Display>
      );

    case constants.MAIN_TABS.NEW_BATCH.id:
      return (
        <Display data={batchResult}>
          <DisplayNewBatch batchResult={batchResult}></DisplayNewBatch>
        </Display>
      );

    case constants.MAIN_TABS.ACTIVE_BATCHES.id:
      return (
        <Display data={{}}>
          <DisplayActiveBatches
            selectedModel={selectedModel}
          ></DisplayActiveBatches>
        </Display>
      );

    default:
      return <div>Unknown mode: {selectedTab}</div>;
  }
}

// Display is a wrapper container that generically handles displaying "no data" placeholder and errors.
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
