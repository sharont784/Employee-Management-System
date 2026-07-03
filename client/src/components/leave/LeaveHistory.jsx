import { Check, Loader2, X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import api from "../../api/axios";
import toast from "react-hot-toast";

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);

    try {
      await api.patch(`/leave/${id}`, { status });
      onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.error || err?.message);
    } finally {
      setProcessing(null)
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {isAdmin && (
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-gray-500">
                  Employee
                </th>
              )}

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-gray-500">
                Type
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-gray-500">
                Dates
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-gray-500">
                Reason
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-gray-500">
                Status
              </th>

              {isAdmin && (
                <th className="px-6 py-4 text-center text-sm font-semibold uppercase text-gray-500">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 4}
                  className="py-12 text-center text-gray-500"
                >
                  No leave applications found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr
                  key={leave._id || leave.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {isAdmin && (
                    <td className="px-6 py-5 text-gray-900 font-medium">
                      {leave.employee?.firstName} {leave.employee?.lastName}
                    </td>
                  )}

                  <td className="px-6 py-5">
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">
                      {leave.type}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {format(new Date(leave.startDate), "MMM dd")} -{" "}
                    {format(new Date(leave.endDate), "MMM dd, yyyy")}
                  </td>

                  <td
                    title={leave.reason}
                    className="px-6 py-5 max-w-xs truncate text-gray-600"
                  >
                    {leave.reason}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        leave.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  {isAdmin && (
                    <td className="px-6 py-5">
                      {leave.status === "PENDING" && (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                leave._id || leave.id,
                                "APPROVED",
                              )
                            }
                            disabled={!!processing}
                            className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            {processing === (leave._id || leave.id) ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                leave._id || leave.id,
                                "REJECTED",
                              )
                            }
                            disabled={!!processing}
                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                          >
                            {processing === (leave._id || leave.id) ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
