const getProductionOrDevBaseUrl = (): string => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // In production or when hosted on any non-local domain, default to production Render backend
  if (
    import.meta.env.PROD ||
    (typeof window !== "undefined" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1" &&
      window.location.hostname !== "")
  ) {
    return "https://my-portfolio1-pmn0.onrender.com";
  }
  return "http://127.0.0.1:8000";
};

export const API_BASE_URL = getProductionOrDevBaseUrl().replace(/\/$/, "");

