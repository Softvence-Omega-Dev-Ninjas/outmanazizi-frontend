const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;
export const api = {
  get: async (endpoint: string, token?: string) => {
      if(!API_BASE_URL) {
          return new Promise((resolve, reject) => {
              reject("BACKEND_URL not found");
          })
      }
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!res.ok) throw new Error("API request failed");
    return res.json();
  },

  post: async (endpoint: string, data: any, token?: string) => {
      if(!API_BASE_URL) {
          return new Promise((resolve, reject) => {
              reject("BACKEND_URL not found");
          })
      }
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("API request failed");
    return res.json();
  },

  patch: async (endpoint: string, data?: any, token?: string) => {
      if(!API_BASE_URL) {
          return new Promise((resolve, reject) => {
              reject("BACKEND_URL not found");
          })
      }
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(data && { body: JSON.stringify(data) }),
    });
    if (!res.ok) throw new Error("API request failed");
    return res.json();
  },

  delete: async (endpoint: string, token?: string) => {
      if(!API_BASE_URL) {
          return new Promise((resolve, reject) => {
              reject("BACKEND_URL not found");
          })
      }
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!res.ok) throw new Error("API request failed");
    return res.json();
  },
};
