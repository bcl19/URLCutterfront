import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Loading } from "@/components/atoms/loading/loading";

type LoadingContextValue = {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  setIsLoading: (value: boolean) => void;
  runWithLoading: <T>(fn: () => Promise<T>) => Promise<T>;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoadingState] = useState(false);
  const loadingCount = useRef(0);

  const showLoading = useCallback(() => {
    loadingCount.current += 1;
    setIsLoadingState(true);
  }, []);

  const hideLoading = useCallback(() => {
    loadingCount.current = Math.max(0, loadingCount.current - 1);
    if (loadingCount.current === 0) {
      setIsLoadingState(false);
    }
  }, []);

  const setIsLoading = useCallback((value: boolean) => {
    loadingCount.current = value ? 1 : 0;
    setIsLoadingState(value);
  }, []);

  const runWithLoading = useCallback(
    async <T,>(fn: () => Promise<T>) => {
      showLoading();
      try {
        return await fn();
      } finally {
        hideLoading();
      }
    },
    [hideLoading, showLoading],
  );

  const value = useMemo(
    () => ({
      isLoading,
      showLoading,
      hideLoading,
      setIsLoading,
      runWithLoading,
    }),
    [hideLoading, isLoading, runWithLoading, setIsLoading, showLoading],
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <Loading />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }

  return context;
};
