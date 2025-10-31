interface QueryData {
  handle: string;
}

export const getYoutubeData = async (data: QueryData) => {
  const result = await callApi(data.handle);

  return result;
};

async function callApi(query: string) {
  const res = await fetch(`/api/get-youtube-data/?handle=${query}`);
  if (!res.ok) {
    return { error: "An unexpected error occurred" };
  } else return res.json();
}
