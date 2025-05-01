"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center pb-24 min-h-screen text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      <p className="mt-4 text-gray-600">Loading page...</p>
    </div>
  );
}