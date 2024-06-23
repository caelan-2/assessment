import { useState } from "react";
import * as util from "@/app/util/util";
import * as url from "@/app/url/url";

// InputNewDecision is a component that is nested in the InputContainer.
// this is used to provide user input for making a request to the TOM API
// for a single decision.
export default function InputNewDecision({ selectedModel, setDecision }) {
  // formState stores each field in the form.
  const [formState, setFormState] = useState({});
  // updateFormField updates a single field in the form.
  function updateFormField(fieldName, fieldValue) {
    const updated = formState;
    updated[fieldName] = fieldValue;
    setFormState(updated);
  }
  // requestDecision makes the requst to the TOM API.
  function requestDecision() {
    fetch(
      url.remoteApiEndpoint(`decision/${selectedModel.id}`),
      util.addAuth({
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
        },
        body: JSON.stringify(util.buildDecisionParams(formState)),
      })
    )
      .then((res) => {
        return res.json();
      })
      .then((payload) => {
        setDecision(payload);
      });
  }
  return (
    <form
      id="input-new-decision-form"
      className="flex flex-col p-4"
      onSubmit={(e) => {
        e.preventDefault();
        requestDecision();
      }}
    >
      <div className="flex flex-col flex-wrap">
        {selectedModel?.attributes?.metadata?.attributes?.map((inputVar) => {
          return (
            <FormInput
              key={inputVar.name}
              inputVar={inputVar}
              updateFormField={updateFormField}
            ></FormInput>
          );
        })}
      </div>
      <button type="submit" className="btn btn-primary self-end mt-8">
        Make Decision
      </button>
    </form>
  );
}

// These constants are used to prevent accidental typos.
const ATTR_TYPE_NOMINAL = "Nominal";
const ATTR_TYPE_ORDINAL = "Ordinal";
const ATTR_TYPE_CONTINUOUS = "Continuous";

// FormInput is a single input field in the form.
function FormInput({ inputVar, updateFormField }) {
  const ID = inputVar.name;
  const question = inputVar.question;
  const inputType = inputVar.type;
  const domain = inputVar?.domain;
  // inputEl returns the correct HTML input element according to the inputType.
  function inputEl() {
    switch (inputType) {
      case ATTR_TYPE_CONTINUOUS:
        return (
          <input
            onChange={(e) => updateFormField(ID, e.target.value)}
            type="number"
            min={domain.lower}
            max={domain.upper}
            step={domain.interval}
            className="input input-bordered input-sm"
          />
        );
      case ATTR_TYPE_NOMINAL:
      case ATTR_TYPE_ORDINAL:
        return (
          <select
            onChange={(e) => updateFormField(ID, e.target.value)}
            className="select select-bordered select-sm"
            defaultValue="none"
          >
            <option value="none" disabled>
              Please Select...
            </option>
            {domain?.values?.map((value) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        );
      default:
        return (
          <span>
            The input type defined in the model is unknown. The known types are
            'Continuous', 'Ordinal' and 'Nominal'
          </span>
        );
    }
  }
  return (
    <label key={ID} className="form-control my-1">
      <div className="label pb-0">
        <span className="label-text">{question}</span>
      </div>
      {inputEl(ID, inputType, domain, updateFormField)}
    </label>
  );
}
