const API_URL = "";

const fetchData = async (endpoint, body = {}, useParams = false) => {
   const url = useParams ? `${API_URL}${endpoint}?${new URLSearchParams(body)}` : `${API_URL}${endpoint}`;
   
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: useParams ? null : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return { data: result, error: null };
  } catch (error) {
    console.error("Fetch error: ", error);
    return { data: null, error: error.toString() };
  }
};

export default fetchData;
