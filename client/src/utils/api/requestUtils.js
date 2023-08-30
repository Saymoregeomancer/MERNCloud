export const getCommonHeaders = () => {
    const token = JSON.parse(localStorage.getItem("UserData")).token || null;
    return {
      Authorization: `Bearer ${token}`,
    };
  };