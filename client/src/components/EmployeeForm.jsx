import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEPARTMENTS } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const isEditMode = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.currentTarget);
    if(isEditMode){
      const pwd = formData.get("password")
      if(!pwd) formData.delete("password")
    }

    try {
      const url = isEditMode ? `/employees/${initialData.id}` : "/employees";
      const method = isEditMode ? "put" : "post";
      await api[method](url, formData)
      onSuccess ? onSuccess() : navigate("/employees")
    } catch (err) {
      toast.error(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              First Name
            </label>

            <input
              name="firstName"
              required
              defaultValue={initialData?.firstName}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Last Name
            </label>

            <input
              name="lastName"
              required
              defaultValue={initialData?.lastName}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>

            <input
              name="phone"
              required
              defaultValue={initialData?.phone}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Join Date
            </label>

            <input
              type="date"
              name="joinDate"
              required
              defaultValue={
                initialData?.joinDate
                  ? new Date(initialData.joinDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bio (Optional)
            </label>

            <textarea
              name="bio"
              defaultValue={initialData?.bio}
              rows={3}
              placeholder="Brief Description"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Employee Details */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Employee Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Department
            </label>

            <select
              name="department"
              defaultValue={initialData?.department || ""}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Department</option>

              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Position
            </label>

            <input
              name="position"
              required
              defaultValue={initialData?.position}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Basic Salary
            </label>

            <input
              type="number"
              name="basicSalary"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.basicSalary || 0}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Allowances
            </label>

            <input
              type="number"
              name="allowances"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.allowances || 0}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Deductions
            </label>

            <input
              type="number"
              name="deductions"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.deductions || 0}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {isEditMode && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>

              <select
                name="employmentStatus"
                required
                defaultValue={initialData?.employmentStatus}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Account Setup */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Account Setup
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Work Email
            </label>

            <input
              type="email"
              name="email"
              required
              defaultValue={initialData?.email}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {!isEditMode && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Temporary Password
              </label>

              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {isEditMode && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Change Password (Optional)
              </label>

              <input
                type="password"
                name="password"
                placeholder="Optional"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              System Role
            </label>

            <select
              name="role"
              defaultValue={initialData?.user?.role || "EMPLOYEE"}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          className="px-5 py-3 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
          onClick={() =>
            onCancel ? onCancel() : navigate(-1)
          }
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-5 py-3 rounded-lg transition"
        >
          {loading && (
            <Loader2Icon className="w-4 h-4 animate-spin" />
          )}

          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;