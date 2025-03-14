import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to My Project
        </h1>
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-500 text-lg"
        >
          Go to Login Page
        </Link>
      </div>
    </div>
  );
}
