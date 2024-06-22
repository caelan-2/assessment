export default function SaveForm({ handleSubmit, setSaveName, isSaved }) {
  if (isSaved) {
    return <div className="text-green-500 text-xl ml-2">Saved!</div>;
  }
  return (
    <form id="save-single-form" onSubmit={handleSubmit}>
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
