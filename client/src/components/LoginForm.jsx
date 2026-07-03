import LoginLeftSide from "./LoginLeftSide";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, EyeOffIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password, role)
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.error || error.message || "login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <LoginLeftSide />

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-10"
          >
            <ArrowLeftIcon size={16} />
            Back to portals
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-slate-900 mb-2">
              {title}
            </h1>

            <p className="text-slate-500 text-lg">{subtitle}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john@example.com"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="******"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />

                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading && <Loader2Icon className="animate-spin" size={18} />}
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
