
import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets";
import { format } from "date-fns";

const AttendanceHistory = ({ history }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 capitalize">
          Recent Activity
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-500">
                Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-500">
                Check In
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-500">
                Check Out
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-500">
                Working Hours
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-500">
                Day Type
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record);

                return (
                  <tr
                    key={record._id || record.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-5 text-gray-700 font-medium">
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </td>

                    <td className="px-6 py-5 text-gray-700">
                      {record.checkIn
                        ? format(new Date(record.checkIn), "hh:mm a")
                        : "-"}
                    </td>

                    <td className="px-6 py-5 text-gray-700">
                      {record.checkOut
                        ? format(new Date(record.checkOut), "hh:mm a")
                        : "-"}
                    </td>

                    <td className="px-6 py-5 text-gray-700">
                      {getWorkingHoursDisplay(record)}
                    </td>

                    <td className="px-6 py-5">
                      {dayType.label !== "-" ? (
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-medium ${dayType.className}`}
                        >
                          {dayType.label}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          record.status === "PRESENT"
                            ? "bg-green-100 text-green-700"
                            : record.status === "LATE"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;
