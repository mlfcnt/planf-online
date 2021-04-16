export const defaultFetch = async (query, variables = {}) => {
  const res = await fetch("/admin/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      variables,
      query,
    }),
  });
  return res.json();
};
