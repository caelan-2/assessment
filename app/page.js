"use client";
import { useEffect, useState } from "react";
import * as util from "@/app/util/util.js";

import DisplayContainer from "./components/display/display.js";
import InputContainer from "./components/input/input.js";
import * as constants from "./constants.js";
import * as url from "./url/url.js";

export default function Page() {
  // tab
  // -----------------------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState(constants.TAB_SINGLE);

  // models
  // -----------------------------------------------------------------------------------------------
  // availableModels is used to store a list of available models.
  const [availableModels, setAvailableModels] = useState([]);
  // selectedModel is used to store the currently selected model.
  const [selectedModel, setSelectedModel] = useState({});

  // results
  // -----------------------------------------------------------------------------------------------
  const [batchResult, setBatchResult] = useState(null);
  const [decision, setDecision] = useState(null);

  // initialization
  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    // fetch all models
    fetch(url.remoteApiEndpoint("models"), util.addAuth("GET"))
      .then((res) => res.json())
      .then((payload) => {
        setAvailableModels(payload.data);
        updateModelCache(payload.data);
        // select default model
        handleSelectModel("58d3bcf97c6b1644db73ad12", setSelectedModel);
      });
  }, []);

  // component
  // -----------------------------------------------------------------------------------------------
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/2 p-4 pb-0">
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}></Tabs>
        <div className="card w-full bg-base-100 shadow-xl px-4">
          <label className="form-control my-1">
            <div className="label pb-0">
              <span className="label-text">Model</span>
            </div>
            <select
              className="select select-bordered select-md"
              onChange={(e) =>
                handleSelectModel(e.target.value, setSelectedModel)
              }
            >
              {availableModels.map((model) => {
                return (
                  <option key={model?.id} value={model?.id}>
                    {model?.attributes?.name} |{" "}
                    {selectedModel?.attributes?.publisher}
                  </option>
                );
              })}
            </select>
          </label>
          <div className="card-body p-2 pb-4">
            {selectedModel?.attributes?.description}
          </div>
        </div>
        <div>
          <InputContainer
            selectedTab={selectedTab}
            selectedModel={selectedModel}
            setDecision={setDecision}
            setBatchResult={setBatchResult}
          ></InputContainer>
        </div>
      </div>
      <div className="flex w-1/2 p-4 bg-base-300 justify-center">
        <DisplayContainer
          selectedModel={selectedModel}
          selectedTab={selectedTab}
          decision={decision}
          batchResult={batchResult}
        ></DisplayContainer>
      </div>
    </div>
  );
}

const modelCache = {};
function updateModelCache(models) {
  for (var id in modelCache) {
    delete modelCache[id];
  }
  models.forEach((model) => {
    modelCache[model.id] = model;
  });
}
function handleSelectModel(modelID, setSelectedModelFn) {
  if (modelCache[modelID]) {
    setSelectedModelFn(modelCache[modelID]);
    return;
  }
  fetch(
    url.remoteApiEndpoint(`models/${modelID}`),
    util.addAuth({
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
      },
    })
  )
    .then((res) => res.json())
    .then((payload) => {
      setSelectedModelFn(payload.data);
    });
}

function Tabs({ selectedTab, setSelectedTab }) {
  return (
    <div role="tablist" className="tabs tabs-boxed">
      <a
        role="tab"
        className={
          selectedTab === constants.TAB_SINGLE ? "tab tab-active" : "tab"
        }
        onClick={() => setSelectedTab(constants.TAB_SINGLE)}
      >
        Single
      </a>
      <a
        role="tab"
        className={
          selectedTab === constants.TAB_BATCH ? "tab tab-active" : "tab"
        }
        onClick={() => setSelectedTab(constants.TAB_BATCH)}
      >
        Batch
      </a>
      <a
        role="tab"
        className={
          selectedTab === constants.TAB_SAVED ? "tab tab-active" : "tab"
        }
        onClick={() => setSelectedTab(constants.TAB_SAVED)}
      >
        Saved
      </a>
      <a
        role="tab"
        className={
          selectedTab === constants.TAB_REMOTE ? "tab tab-active" : "tab"
        }
        onClick={() => setSelectedTab(constants.TAB_REMOTE)}
      >
        Remote
      </a>
    </div>
  );
}
