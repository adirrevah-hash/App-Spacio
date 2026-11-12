import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-sm tracking-[0.14em] text-stone">SPACEVIEW</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">כניסת ניהול</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
