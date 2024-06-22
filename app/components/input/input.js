import * as constants from "@/app/constants";
import Single from "./input_single";
import Batch from "./input_batch";
export default function InputContainer({
  selectedTab,
  selectedModel,
  setDecision,
  setBatchResult,
}) {
  switch (selectedTab) {
    case constants.TAB_SINGLE:
      return (
        <Single
          setDecision={setDecision}
          selectedModel={selectedModel}
        ></Single>
      );

    case constants.TAB_BATCH:
      return (
        <Batch
          setBatchResult={setBatchResult}
          selectedModel={selectedModel}
        ></Batch>
      );

    case constants.TAB_SAVED:
      return null;

    case constants.TAB_REMOTE:
      return null;

    default:
      return <div>unknown mode...</div>;
  }
}
