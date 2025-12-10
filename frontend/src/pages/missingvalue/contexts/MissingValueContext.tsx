import { createContext, useContext, useState, ReactNode } from "react";

interface MissingValueContextType {
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number | null) => void;
  imputationJobId: string | null;
  setImputationJobId: (id: string | null) => void;
  imputationStatus: string | null;
  setImputationStatus: (status: string | null) => void;
}

const MissingValueContext = createContext<MissingValueContextType | undefined>(undefined);

export const useMissingValue = () => {
  const context = useContext(MissingValueContext);
  if (!context) {
    throw new Error("useMissingValue must be used within MissingValueProvider");
  }
  return context;
};

interface MissingValueProviderProps {
  children: ReactNode;
}

export const MissingValueProvider = ({ children }: MissingValueProviderProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [imputationJobId, setImputationJobId] = useState<string | null>(null);
  const [imputationStatus, setImputationStatus] = useState<string | null>(null);

  return (
    <MissingValueContext.Provider
      value={{
        selectedProjectId,
        setSelectedProjectId,
        imputationJobId,
        setImputationJobId,
        imputationStatus,
        setImputationStatus,
      }}
    >
      {children}
    </MissingValueContext.Provider>
  );
};
