export const getCommonHeaders = () => {
  const token = JSON.parse(localStorage.getItem("UserData"));
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const checkResponse = (response) => {
  console.log('response', response)
  if (response.status === 401) {
    window.location.href = '/login'
    throw new Error('Auth erorr')
  }
};
