import { useQuery } from "@tanstack/react-query";
import animationService from "../services/animation-service";

export const useFetchAnimations = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["animations"],
    queryFn: animationService.fetchAnimations,
  });
  return { data, isLoading, error };
};
