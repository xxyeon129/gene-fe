import { createContext, useContext, useState, ReactNode } from "react";
import { apiClient } from "@/shared/api/client";

interface ValidationResult {
  files: Array<{
    filename: string;
    total_values: number;
    nan_count: number;
    nan_percentage: number;
    shape: number[];
    max_row_nan_percentage: number;
    max_col_nan_percentage: number;
    passed: boolean;
  }>;
  total_files: number;
  passed_files: number;
  all_passed: boolean;
}

interface VerificationContextType {
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number | null) => void;
  isValidating: boolean;
  validationResult: ValidationResult | null;
  validationError: string | null;
  executeValidation: () => Promise<void>;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error("useVerification must be used within VerificationProvider");
  }
  return context;
};

interface VerificationProviderProps {
  children: ReactNode;
}

export const VerificationProvider = ({ children }: VerificationProviderProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const executeValidation = async () => {
    if (!selectedProjectId) {
      setValidationError("프로젝트를 선택해주세요.");
      return;
    }

    setIsValidating(true);
    setValidationError(null);
    setValidationResult(null);

    try {
      // Start validation
      const response: any = await apiClient.executeValidation(selectedProjectId);
      const jobId = response.jobId;

      // Poll for status
      let attempts = 0;
      const maxAttempts = 30; // 30초 타임아웃

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기

        const status: any = await apiClient.getValidationStatus(jobId);

        if (status.status === "completed") {
          setValidationResult(status.results);
          setIsValidating(false);
          return;
        } else if (status.status === "failed") {
          setValidationError(status.error || "검증 실패");
          setIsValidating(false);
          return;
        }

        attempts++;
      }

      // Timeout
      setValidationError("검증 시간이 초과되었습니다.");
      setIsValidating(false);
    } catch (error) {
      console.error("Validation error:", error);
      setValidationError(error instanceof Error ? error.message : "검증 중 오류가 발생했습니다.");
      setIsValidating(false);
    }
  };

  return (
    <VerificationContext.Provider
      value={{
        selectedProjectId,
        setSelectedProjectId,
        isValidating,
        validationResult,
        validationError,
        executeValidation,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};
