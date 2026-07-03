import { useState } from "react";
import { Loader2, Save, User } from "lucide-react";
import api from "../api/axios";


const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError("") 
    setMessage("")

    const formData = new FormData(e.currentTarget)
      try {
        await api.post("/profile, formData")
        setMessage("Profile updated successfull")
        onSuccess?.()
      } catch (error) {
        setError(error?.response?.data?.error || error?.message);
      
      }finally{
        setLoading(false)
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-8 border border-gray-200 rounded-xl bg-white"
    >
      <h2 className="flex items-center gap-3 text-2xl font-semibold mb-8">
        <User className="h-6 w-6 text-gray-600" />
        Public Profile
      </h2>

      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          {error}
        </div>
      )}

      {message && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-600">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          {message}
        </div>
      )}

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              disabled
              value={`${initialData.firstName} ${initialData.lastName}`}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              disabled
              value={initialData.email}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Position
            </label>
            <input
              disabled
              value={initialData.position}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Bio
          </label>

          <textarea
            disabled={initialData.isDeleted}
            name="bio"
            defaultValue={initialData.bio || ""}
            placeholder="Write a brief bio..."
            className={`w-full rounded-lg border border-gray-200 px-4 py-3 min-h-[120px] resize-none ${
              initialData.isDeleted
                ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                : "bg-white"
            }`}
          />

          <p className="mt-2 text-sm text-gray-500">
            This will be displayed on your profile.
          </p>
        </div>

        {initialData.isDeleted ? (
          <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div>
              <p className="font-medium text-yellow-800">
                Account Deactivated
              </p>
              <p className="text-sm text-yellow-700">
                You can no longer update your profile.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              Save Changes
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;