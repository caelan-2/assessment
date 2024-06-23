"use client";
import { useEffect, useState } from "react";
import * as util from "./util/util.js";
import * as url from "./url/url.js";
import * as constants from "./constants/constants.js";

import DisplayContainer from "./components/display/display.js";
import InputContainer from "./components/input/input.js";
import Tabs from "./components/common/tabs.js";

export default function Page() {
  // state
  // -----------------------------------------------------------------------------------------------

  // selectedTab stores the active tab.
  const [selectedTab, setSelectedTab] = useState(
    constants.MAIN_TABS.NEW_DECISION.id
  );
  // availableModels stores the list of models that can be accessed for operations.
  const [availableModels, setAvailableModels] = useState([]);
  // selectedModel stores the currently active model.
  const [selectedModel, setSelectedModel] = useState({});
  // batchResult stores the most recent response from a batch request.
  const [batchResult, setBatchResult] = useState(null);
  // decision stores the most recent response from a decision request.
  const [decision, setDecision] = useState(null);
  // prevSavedDecisionID store the decision ID for the most recently saved decision (saved to DB).
  const [prevSavedDecisionID, setPrevSavedDecisionID] = useState("");

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
        <Tabs
          tabs={constants.MAIN_TABS}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        ></Tabs>
        <div className="card card-compact w-full bg-base-100 shadow-xl px-4">
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
          prevSavedDecisionID={prevSavedDecisionID}
          setPrevSavedDecisionID={setPrevSavedDecisionID}
        ></DisplayContainer>
      </div>
    </div>
  );
}

// modelCache is used to store model data locally to avoid unnecessary requests.
const modelCache = {};

// addModelToCache adds/replaces a single model in the cache.
function addModelToCache(model) {
  modelCache[model.id] = model;
}

// updateModelCache clears the cache, and populates it with the provided models.
function updateModelCache(models) {
  for (var id in modelCache) {
    delete modelCache[id];
  }
  models.forEach((model) => {
    modelCache[model.id] = model;
  });
}

// handleSelectModel attempts to get a model from the cache,
// if not in cache, makes a request to get the model data and adds it to the cache.
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
      addModelToCache(payload.data);
      setSelectedModelFn(payload.data);
    });
}
