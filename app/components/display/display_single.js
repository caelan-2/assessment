import { useEffect, useState } from "react";
import SaveForm from "./save_form";
import * as url from "@/app/url/url";

export default function DisplaySingle({ decision }) {
  const [saveName, setSaveName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  function save() {
    let obj = {
      ...decision,
      data: {
        ...decision.data,
        "save-name": saveName,
      },
    };
    fetch(url.localApiEndpoint("single/save"), {
      method: "POST",
      body: JSON.stringify(obj),
    }).then(() => {
      setIsSaved(true);
    });
  }
  useEffect(() => {
    setIsSaved(false);
    setSaveName("");
  }, [decision]);
  return (
    <div className="card w-full bg-base-100 shadow-xl my-2 p-0">
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
          isSaved={isSaved}
        ></SaveForm>
      </div>
    </div>
  );
}
