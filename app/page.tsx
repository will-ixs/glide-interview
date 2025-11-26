import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-(color:--color-bg) to-(color:--color-mg)">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold color(--color-text-primary) mb-6">Welcome to SecureBank</h1>
          <p className="text-xl color(--color-text-secondary) mb-8">
            Open your account today and experience modern banking at its finest. Simple, secure, and designed with you
            in mind.
          </p>

          <div className="bg-(--color-fg) rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold color(--color-text-primary) mb-4">Why Choose SecureBank?</h2>
            <ul className="space-y-3 color(--color-text-secondary)">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                No monthly fees on checking accounts
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Competitive savings rates
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                24/7 customer support
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                State-of-the-art security
              </li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Open an Account
            </Link>
            <Link
              href="/login"
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
