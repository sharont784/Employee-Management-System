import { Loader2, Lock, X } from "lucide-react";
import React, { useState } from "react";
import api from "../api/axios";

const ChangePasswordModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    const formData = new FormData(e.currentTarget);
    const currentPassword = FormData.get("currentPassword");
    const newPassword = FormData("newPassword");

    try {
      const { data } = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      if (!data.success) throw new Error(data.error || "failed");
      setMessage({type:"success", text: "Password updated successfully"})
      e.target.reset();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false)
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Lock className="h-5 w-5" />
            Change Password
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {message.text && (
            <div
              className={`mb-4 rounded-lg p-3 text-sm text-white ${
                message.type === "success" ? "bg-emerald-500" : "bg-rose-500"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-200 py-3 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
