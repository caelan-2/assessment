import Single from "./input_single";
import Batch from "./input_batch";
export default function InputContainer({
  selectedTab,
  selectedModel,
  setDecision,
  setBatchResult,
}) {
  switch (selectedTab) {
    case "single":
      return (
        <Single
          setDecision={setDecision}
          selectedModel={selectedModel}
        ></Single>
      );

    case "batch":
      return (
        <Batch
          setBatchResult={setBatchResult}
          selectedModel={selectedModel}
        ></Batch>
      );

    default:
      return null;
  }
}
