// Example usage in a page/component

import { ProtectedGate } from "../components/ProtectedGate.tsx";

export default function SellPage() {
    const user = null; // or your auth user

    const handleLogin = async (email: string, password: string) => {
        // call your API / Supabase / NextAuth etc.
        // if success, set user in your global state
    };

    const handleRegister = () => {
        // route to /register or open modal, etc.
    };

    return (
        <ProtectedGate user={user} onLogin={handleLogin} onRegister={handleRegister}>
            {/* Everything inside here is only visible when user != null */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                    Your saved searches
                </h2>
                {/* ...rest of your protected content... */}
            </div>
        </ProtectedGate>
    );
}
