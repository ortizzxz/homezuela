import { useState } from "react";

interface User {
    id: string;
    email: string;
}

interface ProtectedGateProps {
    user: User | null;        // pass your auth user here
    onLogin: (email: string, password: string) => Promise<void> | void;
    onRegister?: () => void;
    children: React.ReactNode;
}

export function ProtectedGate({ user, onLogin, onRegister, children }: ProtectedGateProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<"login" | "info">("login");

    if (user) {
        return <>{children}</>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await onLogin(email, password);
        } catch (err: any) {
            setError(err?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center py-8 px-4 bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="w-full max-w-md relative">
                {/* Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 blur-2xl opacity-60 rounded-3xl pointer-events-none" />
                
                {/* Card */}
                <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/70 px-6 py-7 sm:px-8 sm:py-9">
                    {/* Header */}
                    <div className="mb-6">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                            Restricted area
                        </span>
                        <h1 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-900">
                            Sign in to continue
                        </h1>
                        <p className="mt-1.5 text-sm text-slate-500">
                            This section is only available to registered users. Log in to access saved searches and personalized recommendations.
                        </p>
                    </div>

                    {/* Tabs (optional info vs login) */}
                    <div className="mb-5 inline-flex rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-600">
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className={`px-3.5 py-1.5 rounded-full transition-all ${
                                mode === "login"
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("info")}
                            className={`px-3.5 py-1.5 rounded-full transition-all ${
                                mode === "info"
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            Why create an account?
                        </button>
                    </div>

                    {mode === "info" ? (
                        <div className="mb-4 space-y-3 text-sm text-slate-600">
                            <p className="font-medium text-slate-800">With an account you can:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Save your favorite properties.</li>
                                <li>Receive alerts when new listings match your filters.</li>
                                <li>Access your history across devices.</li>
                            </ul>
                        </div>
                    ) : null}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/60 transition"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/60 transition"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.75 text-sm font-semibold text-white shadow-sm hover:bg-black disabled:cursor-not-allowed disabled:opacity-70 transition"
                        >
                            {isLoading ? "Signing in..." : "Log in"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
                        <p>
                            Not registered yet?{" "}
                            <button
                                type="button"
                                onClick={onRegister}
                                className="font-semibold text-slate-900 hover:underline"
                            >
                                Create an account
                            </button>
                        </p>
                        <button
                            type="button"
                            className="text-xs text-slate-400 hover:text-slate-700 underline decoration-dotted underline-offset-2"
                        >
                            Forgot your password?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
