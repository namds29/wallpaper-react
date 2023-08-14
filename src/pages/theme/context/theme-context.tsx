import { createContext, useState, useEffect } from "react";
import { useFetchTheme } from "../../../hooks/useThemes";
import { Theme } from "../../../shared/types/themes-types";



interface Props {
  themes: Theme[];
  searchByName: string,
  setThemes: React.Dispatch<React.SetStateAction<any[]>>;
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;
}
export const ThemeContext = createContext<Props>({
  themes: [],
  searchByName: '',
  setThemes: () => {},
  setSearchByName: () => ''
});

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, data } = useFetchTheme();
  const [searchByName, setSearchByName] = useState<string>('');
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    if (!isLoading) setThemes(data?.data.data);
  }, [isLoading, data]);
  useEffect(() => {}, [themes]);
  return (
    <ThemeContext.Provider value={{ themes, setThemes, searchByName, setSearchByName }}>
      {children}
    </ThemeContext.Provider>
  );
};
