import InputNewDecision from "./input_new_decision";
import InputNewBatch from "./input_new_batch";
import * as constants from "@/app/constants/constants";

// InputContainer is the container that wraps all "Input" components.
// This is the left side of the main content.
export default function InputContainer({
  selectedTab,
  selectedModel,
  setDecision,
  setBatchResult,
}) {
  switch (selectedTab) {
    case constants.MAIN_TABS.NEW_DECISION.id:
      return (
        <InputNewDecision
          setDecision={setDecision}
          selectedModel={selectedModel}
        ></InputNewDecision>
      );

    case constants.MAIN_TABS.NEW_BATCH.id:
      return (
        <InputNewBatch
          setBatchResult={setBatchResult}
          selectedModel={selectedModel}
        ></InputNewBatch>
      );

    default:
      return null;
  }
}
