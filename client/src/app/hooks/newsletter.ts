import { useCallback, useState } from "react";

export function useJoinNewsLetterForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  const join = useCallback(async () => {
    if (!email) return;

    // reset state
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // todo: move the server name to be a env var
      await fetch("https://server.ahmedibrahim.dev/api/v1/email/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccess(true);
    } catch (error) {
      setError("Unexpected error happend!");
    }
    setLoading(false);
  }, [email]);

  return {
    email,
    setEmail,
    join,
    loading,
    error,
    success,
  };
}
