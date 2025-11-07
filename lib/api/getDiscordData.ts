interface QueryData {
  id: string;
  server_id?: string;
}

export const getDiscordData = async (data: QueryData) => {
  const result = await callApi(data.id, data.server_id);

  return result;
};

async function callApi(query: string, serverId?: string) {
  const res = await fetch(
    `/api/get-discord-data/?id=${query}&server_id=${serverId || ""}`
  );
  if (!res.ok) {
    return { error: "An unexpected error occurred" };
  } else return res.json();
}
