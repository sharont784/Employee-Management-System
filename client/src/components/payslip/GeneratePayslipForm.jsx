import React, { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const GeneratePayslipForm = ({ employees = [], onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

    if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700"
      >
        <Plus size={18} />
        Generate Payslip
      </button>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries())

    try {
      // API CALL HERE
      await axios.post("/payslips", data);
      setIsOpen(false)
      onSuccess()
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">
            Generate Monthly Payslip
          </h3>

          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Employee
            </label>

            <select
              name="employeeId"
              required
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Employee</option>

              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstname} {employee.lastname} (
                  {employee.position})
                </option>
              ))}
            </select>
          </div>

          {/* Month and Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Month
              </label>

              <select
                name="month"
                required
                className="w-full border rounded-md px-3 py-2"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(
                  (month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Year
              </label>

              <input
                type="number"
                name="year"
                defaultValue={new Date().getFullYear()}
                required
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Basic Salary */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Basic Salary
            </label>

            <input
              type="number"
              name="basicSalary"
              placeholder="5000"
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Allowance & Deductions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Allowances
              </label>

              <input
                type="number"
                name="allowance"
                defaultValue={0}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Deductions
              </label>

              <input
                type="number"
                name="deductions"
                defaultValue={0}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 disabled:opacity-50"
            >
              {loading && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslipForm;