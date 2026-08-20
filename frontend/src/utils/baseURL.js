const getBaseURL = () => {
  return import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";
};

export default getBaseURL;
