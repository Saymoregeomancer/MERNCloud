export const convertToGb = (bytes) => {
  if (bytes === 0) {
    return 0;
  }

  const gigabytes = bytes / (1024 * 1024 * 1024);
  const roundedGigabytes = gigabytes.toFixed(2);
  return +roundedGigabytes;
};
