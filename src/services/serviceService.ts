import { api } from "@/lib/api";

export const serviceService = {
  getAllServices: async (token: string): Promise<any> => {
    return api.get("/admin/all-area-and-services", token);
  },

  createService: async (data: { name: string }, token: string) => {
    return api.post("/admin/create-service", { services: data.name }, token);
  },

  deleteService: async (serviceId: string, token: string) => {
    return api.delete(`/admin/service/${serviceId}`, token);
  },

  updateService: async (
    serviceId: string,
    data: { name: string },
    token: string
  ) => {
    return api.patch(
      `/admin/update-service/${serviceId}`,
      { services: data.name },
      token
    );
  },

  createSubService: async (
    data: { serviceId: string; name: string },
    token: string
  ) => {
    return api.post(
      "/admin/create-sub-service",
      { serviceId: data.serviceId, name: data.name },
      token
    );
  },

  deleteSubService: async (subServiceId: string, token: string) => {
    return api.delete(`/admin/delete-sub-service/${subServiceId}`, token);
  },
};
