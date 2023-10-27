import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      //cos to nie dziala - mialo nie byc spinnera w LoginForm bo mial luzyc cache i dalej wysteouje bezposrednio po logowaniu
      //   toast.success("You are logged");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error("Provided email or password are incorrect");
      console.log("ERROR", error);
    },
  });

  return { login, isLoading };
}
