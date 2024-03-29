"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <div className="flex flex-row justify-center mt-4 gap-x-3">
        <button
          className="rounded-md bg-gray-200 px-4 py-2 text-sm transition-colors hover:bg-gray-300"
          onClick={() => {
            router.push("/");
          }}
        >
          Home
        </button>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </main>
  );
}
