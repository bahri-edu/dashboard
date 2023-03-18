import React from "react";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/* Replace with your content */}
        <div className="px-4 py-6 sm:px-0">{children}</div>
        {/* /End replace */}
      </div>
    </main>
  );
}

export default Main;
