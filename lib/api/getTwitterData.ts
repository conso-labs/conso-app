interface QueryData {
  username: string;
}

export const getTwitterData = async (data: QueryData) => {
  const result = await callApi(data.username);

  return result;
};

async function callApi(query: string) {
  const res = await fetch(`/api/get-twitter-data/?username=${query}`);
  if (!res.ok) {
    return { error: "An unexpected error occurred" };
  } else return res.json();
}
