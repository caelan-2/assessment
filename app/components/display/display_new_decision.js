import { useEffect, useState } from "react";
import * as url from "@/app/url/url";

// DisplayNewDecision is a component that is nested in the DisplayContainer.
// this is used to display the result of a decision request made to the TOM API.
// it also allows saving the result to the DB.
export default function DisplayNewDecision({
  decision,
  prevSavedDecisionID,
  setPrevSavedDecisionID,
}) {
  // saveName stores the name entered by the user which is used to look up saved decisions in the DB.
  const [saveName, setSaveName] = useState("");
  // hideSaveBtn is used to prevent saving the same decision twice.
  const [hideSaveBtn, setHideSaveBtn] = useState(false);
  // save makes the request to save the decision to the DB.
  function save() {
    let obj = {
      ...decision,
      data: {
        ...decision.data,
        "save-name": saveName,
      },
    };
    fetch(url.localApiEndpoint("save"), {
      method: "POST",
      body: JSON.stringify(obj),
    }).then(() => {
      setPrevSavedDecisionID(decision.data.id);
    });
  }
  useEffect(() => {
    if (prevSavedDecisionID === decision.data.id) {
      setHideSaveBtn(true);
      return;
    }
    setSaveName("");
    setHideSaveBtn(false);
  }, [prevSavedDecisionID, decision]);
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl my-2 p-0">
      <div className="card-body">
        <h2 className="card-title">Decision Made</h2>
        <div>Decision: {decision?.data?.attributes?.decision}</div>
        <div>Confidence: {decision?.data?.attributes?.confidence}</div>
        <div>Timestamp: {decision?.data?.attributes?.timestamp}</div>
        <SaveForm
          handleSubmit={(e) => {
            e.preventDefault();
            save();
          }}
          setSaveName={setSaveName}
          hideSaveBtn={hideSaveBtn}
        ></SaveForm>
      </div>
    </div>
  );
}

// SaveForm is a form used to allow the user to save the decision results to the DB.
function SaveForm({ handleSubmit, setSaveName, hideSaveBtn }) {
  if (hideSaveBtn) {
    return <div className="text-green-500 text-xl ml-2">Saved!</div>;
  }
  return (
    <form id="display-new-decision-form" onSubmit={handleSubmit}>
      <label className="form-control my-1">
        <div className="label pb-0">
          <span className="label-text">
            <div>Save result as...</div>
            <div>This name will be used for retrieving this decision later</div>
          </span>
        </div>
        <input
          onChange={(e) => setSaveName(e.target.value)}
          type="text"
          className="input input-bordered input-sm"
          placeholder="Save as..."
          required
        />
      </label>
      <div className="flex flex-row items-center">
        <button type="submit" className="btn">
          Save
        </button>
      </div>
    </form>
  );
}