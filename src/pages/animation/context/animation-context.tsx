import { createContext, useState, useEffect } from "react";
import { useFetchAnimations } from "../../../hooks/useAnimations";
import { Animations } from "../../../shared/types/animation-types";

interface Props {
  animations: Animations[];
  searchByName: string,
  setAnimations: React.Dispatch<React.SetStateAction<Animations[]>>;
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;
}
export const AnimationContext = createContext<Props>({
  animations: [],
  searchByName: '',
  setAnimations: () => {},
  setSearchByName: () => ''
});

export const AnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, data } = useFetchAnimations();
  const [searchByName, setSearchByName] = useState<string>('');
  const [animations, setAnimations] = useState<Animations[]>([]);

  useEffect(() => {
    if (!isLoading) setAnimations(data?.data.data);
  }, [isLoading, data]);
  useEffect(() => {}, [animations]);
  return (
    <AnimationContext.Provider value={{ animations, setAnimations, searchByName, setSearchByName }}>
      {children}
    </AnimationContext.Provider>
  );
};
