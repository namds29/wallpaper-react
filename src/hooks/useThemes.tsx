import { useQuery } from "@tanstack/react-query";
import themeService from "../services/theme-service";

export const useFetchTheme = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["themes"],
    queryFn: themeService.fetchThemes,
  });
  return { data, isLoading, error };
};
