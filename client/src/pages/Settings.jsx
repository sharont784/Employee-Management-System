import { useState, useEffect } from "react";
import { dummyProfileData } from "../assets/assets";
import Loading from "../components/Loading";
import ProfileForm from "../components/ProfileForm";
import { Lock } from "lucide-react";
import ChangePasswordModal from "../components/ChangePasswordModal";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    setProfile(dummyProfileData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">
          Manage your account and preferences
        </p>
      </div>

      {profile && (
        <ProfileForm
          initialData={profile}
          onSuccess={fetchProfile}
        />
      )}

      {/* Change Password */}
      <div className="card mt-6 flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
            <Lock className="h-6 w-6 text-gray-600" />
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900">
              Password
            </p>
            <p className="text-sm text-gray-500">
              Update your account password
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="rounded-lg border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-50"
        >
          Change
        </button>
      </div>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default Settings;