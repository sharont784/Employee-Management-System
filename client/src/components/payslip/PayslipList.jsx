import { format } from "date-fns";
import { Download } from "lucide-react";


const PayslipList = ({ payslips, isAdmin }) => {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead className="bg-gray-50">
            <tr>
              {isAdmin && (
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-gray-500">
                  Employee
                </th>
              )}

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-gray-500">
                Period
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-gray-500">
                Basic Salary
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-gray-500">
                Net Salary
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {payslips.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="py-12 text-center text-gray-500"
                >
                  No payslips found
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => (
                <tr
                  key={payslip._id || payslip.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {isAdmin && (
                    <td className="px-6 py-5 text-gray-900 font-medium">
                      {payslip.employee?.firstName} {payslip.employee?.lastName}
                    </td>
                  )}

                  <td className="px-6 py-5 text-slate-500">
                    {format(
                      new Date(payslip.year, payslip.month - 1),
                      "MMMM yyyy",
                    )}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    ${payslip.basicSalary?.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-800">
                    ${payslip.netSalary?.toLocaleString()}
                  </td>

                  <td className="px-6 py-5 max-w-xs truncate text-gray-600 text-center">
                    <button onClick={()=>window.open(`/print/payslips/${payslip._id || payslip.id}`)}
                    className="">
                      <Download className=""/>Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipList;
