export const getCommonHeaders = () => {
    const token = JSON.parse(localStorage.getItem("UserData"));
    return {
      Authorization: `Bearer ${token}`,
    };
  };