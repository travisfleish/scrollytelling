import React from "react";
import { InternetHistoryPage } from "./pages/InternetHistoryPage";

function HomeFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 p-8 text-center text-neutral-200">
      <div>
        <h1 className="mb-3 text-3xl font-bold">Scrollytelling Demo</h1>
        <p className="text-neutral-400">
          Open <code>/internet-history</code> to view the experience.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  const path = typeof window !== "undefined" ? window.location.pathname : "/internet-history";

  if (path === "/internet-history") {
    return <InternetHistoryPage />;
  }

  return <HomeFallback />;
}
