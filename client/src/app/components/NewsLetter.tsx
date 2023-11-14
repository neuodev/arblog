import React from "react";
import text from "src/data/text.json";
import { useJoinNewsLetterForm } from "../hooks/newsletter";

const NewsLetter: React.FC<{}> = () => {
  const { email, setEmail, loading, success, error, join } =
    useJoinNewsLetterForm();
  return (
    <div className="flex flex-col gap-4">
      <p>{text.newsletter.main}</p>

      <div>
        <div className="flex items-stretch gap-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
            className="border h-auto w-full rounded-md px-4 placeholder:text-right"
            placeholder={text.newsletter.inputPlaceholder}
          />
          <button disabled={loading} className="btn w-56" onClick={join}>
            {loading ? text.newsletter.subscribing : text.newsletter.subscribe}
          </button>
        </div>
        <div className="h-7">
          {error ? (
            <p className="text-sm mt-1 text-red-500">{error}</p>
          ) : (
            success && (
              <p className="text-sm mt-1 text-gray-500">
                {text.newsletter.successMsg}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
