import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function useUsers() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!token) throw new Error("No token");
      const response = await userService.getAllUsers(token);
      // Filter out deleted users
      const users = response.data || [];
      return users.filter((user: any) => !user.isDeleted);
    },
    enabled: !!token,
  });
}

export function useBlockUser() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) throw new Error("No token");
      return userService.blockUser(userId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update user status");
    },
  });
}

export function useDeleteUser() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) throw new Error("No token");
      return userService.deleteUser(userId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });
}
