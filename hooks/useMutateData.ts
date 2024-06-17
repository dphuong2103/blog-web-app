import { useCallback, useState } from "react";

export default function useMutateData<T, Y>({
  requestHandler,
  mutate,
  onSuccess,
  onError,
}: {
  requestHandler: (request: Y) => Promise<T>;
  mutate?: () => void;
  onSuccess?: (data?: T) => void;
  onError?: (error?: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  const sendRequest = useCallback(
    async (request: Y) => {
      setIsLoading(true);
      try {
        var data = await requestHandler(request);
        setData(data);
        mutate?.();
        onSuccess?.(data);
      } catch (e) {
        console.error(e);
        setError(e);
        onError?.(e);
      } finally {
        setIsLoading(false);
      }
    },
    [requestHandler, setData, mutate, setError, setIsLoading],
  );

  return { data, sendRequest, isLoading, error };
}
