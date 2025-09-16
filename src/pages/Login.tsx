import React, { useState } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { authState, signInWithGoogle, signInWithGithub } = useAuth();
  const { signInWithX } = useAuth();
  const location = useLocation();

  // If user is already authenticated, redirect to the page they were trying to access
  if (authState.user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  // GitHub and Google OAuth only

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await signInWithGithub();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleXSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await signInWithX();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // no local form state or mode switching — OAuth only

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              TradeLens
            </span>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Access your financial dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* OAuth Buttons */}

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          {message && (
            <div className="text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              {message}
            </div>
          )}

          <div className="space-y-3 mt-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={handleGithubSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-gray-900 dark:bg-gray-700 border border-gray-900 dark:border-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.72 0-1.26.45-2.28 1.2-3.09-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.98.13 2.92.39 2.22-1.5 3.2-1.18 3.2-1.18.63 1.58.23 2.75.11 3.04.75.81 1.2 1.83 1.2 3.09 0 4.45-2.7 5.43-5.27 5.72.42.36.8 1.08.8 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>

            <button
              onClick={handleXSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-blue-500 dark:bg-blue-600 border border-blue-500 dark:border-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9A12.14 12.14 0 0 1 3.15 4.6a4.28 4.28 0 0 0 1.32 5.71c-.66-.02-1.28-.2-1.82-.5v.05c0 2.13 1.52 3.9 3.54 4.31-.37.1-.76.15-1.16.15-.28 0-.56-.03-.82-.08.56 1.76 2.17 3.05 4.08 3.09A8.59 8.59 0 0 1 2 19.54 12.12 12.12 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.37-.01-.55A8.18 8.18 0 0 0 22.46 6z" />
              </svg>
              <span>Continue with X</span>
            </button>
          </div>

          {/* Informational block under OAuth options */}
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
            <p className="font-medium text-gray-900 dark:text-white">
              Why sign in?
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>
                Securely save your watchlists, preferences, and alerts to your
                account.
              </li>
              <li>
                Quickly access personalized news and portfolio insights across
                devices.
              </li>
              <li>
                We only request the minimum account info from GitHub, Google, or
                X — we do not store your social passwords; authentication is
                handled by the provider.
              </li>
            </ul>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              By continuing you agree to our{" "}
              <Link to="/terms" className="underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline">
                Privacy Policy
              </Link>
              . You can disconnect your account at any time from your profile
              settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
