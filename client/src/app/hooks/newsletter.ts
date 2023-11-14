import { useCallback, useState } from "react";
import text from "src/data/text.json";

export function useJoinNewsLetterForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  const join = useCallback(async () => {
    // todo: add validation
    if (!email) return;

    // reset state
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // todo: move the server name to be a env var
      const res = await fetch("https://server.ahmedibrahim.dev/api/v1/email/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.status === 200 || res.status === 201) {
        setSuccess(true);
        setEmail("");
      } else setError(text.general.unexpectedError);
    } catch (error) {
      setError(text.general.unexpectedError);
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
