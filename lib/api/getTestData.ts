interface TestData {
  testParam: string;
}

export const getTestData = async (data: TestData) => {
  const result = await callApi(data.testParam);

  return result;
};

async function callApi(query: string) {
  const res = await fetch(`/api/get-test-data/?username=${query}`);
  if (!res.ok) {
    return { error: "An unexpected error occurred" };
  } else return res.json();
}
