"use client";
import { useRouter } from "next/navigation";
import { Shield, User, Lock, LogOut } from "lucide-react";

export default function SettingsPage() {
    const router = useRouter();
    const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
        method: "POST",
    });

    if (!response.ok) {
        alert("Logout failed");
        return;
    }

    router.replace("/auth");
    };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          Manage your administrator account and security settings.
        </p>
      </div>

      <div className="space-y-8">

        {/* Account */}

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <User className="h-6 w-6 text-[#303F9F]" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Account Information
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="text-sm font-medium text-gray-500">
                Username
              </label>

              <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900">
                admin
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Role
              </label>

              <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900">
                Super Admin
              </div>
            </div>

          </div>

        </div>

        {/* Password */}

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <Lock className="h-6 w-6 text-[#303F9F]" />

            <h2 className="text-2xl font-semibold text-gray-900">
              Change Password
            </h2>
          </div>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Current Password
              </label>

              <input
                type="password"
                placeholder="Enter current password"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <button
              className="
                rounded-xl
                bg-[#303F9F]
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#283593]
              "
            >
              Update Password
            </button>

          </div>

        </div>

        {/* Security */}

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-6 w-6 text-[#303F9F]" />

            <h2 className="text-2xl font-semibold text-gray-900">
              Security
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="text-sm font-medium text-gray-500">
                Current Session
              </label>

              <div className="mt-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-medium text-green-700">
                Active
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Last Login
              </label>

              <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900">
                Today
              </div>
            </div>

          </div>

        </div>

        {/* Danger Zone */}

        <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <LogOut className="h-6 w-6 text-red-600" />

            <h2 className="text-2xl font-semibold text-red-600">
              Danger Zone
            </h2>
          </div>

          <p className="mb-6 text-gray-600">
            Logout from the current administrator session.
          </p>

         <button
        onClick={handleLogout}
        className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
        Logout
        </button>

        </div>

      </div>

    </div>
  );
}