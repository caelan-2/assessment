// addAuth adds the Authorization header to a request.
export function addAuth(req) {
  return {
    ...req,
    headers: {
      ...req.headers,
      Authorization: "Token 9307bfd5fa011428ff198bb37547f979",
    },
  };
}

// buildDecisionParams returns the skeleton structure for a decision request.
export function buildDecisionParams(fieldValues) {
  return {
    data: {
      type: "scenario",
      attributes: {
        input: fieldValues,
      },
    },
  };
}

export function resetForm(formID) {
  document.getElementById(formID).reset();
}
