const apiUrl = process.env.REACT_APP_BASE_URL; // Базова URL адреса сервера

export const request = async (
  endpoint,
  method = "GET",
  params = null,
  body = null
) => {
  const token = JSON.parse(localStorage.getItem("UserData")).token || null;

  let url = `${apiUrl}/${endpoint}`;

  if (params) {
    const queryParams = new URLSearchParams(params);
    url += `?${queryParams.toString()}`;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  let reqBody;

  if (body && body instanceof FormData) {
    reqBody = body;
  } else if (body) {
    headers["Content-Type"] = "application/json";
    reqBody = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: reqBody,
    });

    
    
    
    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed");
    }
    
    const contentType = response.headers.get("Content-Type");
    if(endpoint === 'files/download') {
      console.log(contentType)
    }

    let data;

    if (contentType.includes("image") || contentType.includes("audio")) {
      data = await response.blob();
      // console.log(data)
    } else if (contentType.includes("video/mp4")) {
      if (params.resize) {
        const testResponse = await response.clone().json();
        function bufferToBlob(buffer) {
          const uint8Array = new Uint8Array(buffer.data);
          return new Blob([uint8Array]);
        }
        const blobArray = testResponse.map((bufferObj) =>
          bufferToBlob(bufferObj)
        );
        data = { type: contentType, array: blobArray };
      } else {
        data = await response.blob();
      }
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
