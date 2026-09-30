import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser } from "../../api/authApi";
import type { LoginRequest } from "../../types/LoginRequest";
import type { RegisterRequest } from "../../types/RegisterRequest";
import { userKeys } from "./userKeys";
import { userStore } from "../../store/userStore";

export const useLogin = () => {
    const login = userStore((state) => state.login);

    return useMutation({
        mutationFn: (data: LoginRequest) => loginUser(data),

        onSuccess: (user) => {
            login(user);
        },
    });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
  });
};
