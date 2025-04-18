import { BACKEND_BASE_URL } from "../constant";

// Function to get headers including Authorization token
const getHeaders = (): HeadersInit => {
  const token = localStorage.getItem("Authorization");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: token } : {}),
  };
};

// Function to make a fetch request
const fetchInstance = async <T>(url: string, options: any): Promise<T> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api${url}`, {
      ...options,
      headers: { ...getHeaders(), ...options.headers },
    });

    return response.json() as Promise<T>;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Function to set or remove auth token
export const setAuthToken = (token?: string): void => {
  if (token) {
    localStorage.setItem("Authorization", token);
  } else {
    localStorage.removeItem("Authorization");
  }
};

export default fetchInstance;
