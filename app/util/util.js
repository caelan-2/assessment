// addAuth adds the Authorization header to a request.
export function addAuth(req) {
  return {
    ...req,
    headers: {
      ...req.headers,
      Authorization: "Token " + process.env.NEXT_PUBLIC_ASSESSMENT_API_TOKEN,
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
