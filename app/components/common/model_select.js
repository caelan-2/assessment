export default function ModelSelect({
  availableModels,
  selectedModel,
  setSelectedModel,
}) {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl px-4">
      <label className="form-control my-1">
        <div className="label pb-0">
          <span className="label-text">Select a Model</span>
        </div>
        <select
          className="select select-primary select-bordered select-md"
          onChange={(e) => setSelectedModel(e)}
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
  );
}
