import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyPayslipData } from "../assets/assets";
import { format } from "date-fns";
import Loading from "../components/Loading";


const PrintPayslip = () => {
  const { id } = useParams();
  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPayslip(dummyPayslipData.find((slip) => slip._id == id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <Loading />;

  if (!payslip) return <p className="">Payslip not found</p>;

return (
  <div className="bg-white min-h-screen py-8">
    <div className="bg-white w-full max-w-3xl rounded-lg shadow-md p-8">
      
      {/* Header */}
      <div className="text-center border-b pb-5">
        <h1 className="text-3xl font-bold text-gray-800">PAYSLIP</h1>
        <p className="text-gray-500 mt-1">
          {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
        </p>
      </div>

      {/* Employee Details */}
      <div className="grid grid-cols-2 gap-8 py-8">
        <div>
          <p className="text-xs uppercase text-gray-400 mb-1">
            Employee Name
          </p>
          <p className="font-semibold">
            {payslip.employee?.firstName} {payslip.employee?.lastName}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-400 mb-1">Position</p>
          <p className="font-semibold">{payslip.employee?.position}</p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-400 mb-1">Email</p>
          <p className="font-semibold">{payslip.employee?.email}</p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-400 mb-1">Period</p>
          <p className="font-semibold">
            {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
          </p>
        </div>
      </div>

      {/* Salary Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-xs uppercase text-gray-500">
                Description
              </th>
              <th className="text-right px-4 py-3 text-xs uppercase text-gray-500">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="px-4 py-3">Basic Salary</td>
              <td className="px-4 py-3 text-right">
                ${payslip.basicSalary?.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3">Allowances</td>
              <td className="px-4 py-3 text-right text-green-600">
                +${payslip.allowances?.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3">Deductions</td>
              <td className="px-4 py-3 text-right text-red-600">
                -${payslip.deductions?.toLocaleString()}
              </td>
            </tr>

            <tr className="bg-gray-50 border-t font-bold">
              <td className="px-4 py-4">Net Salary</td>
              <td className="px-4 py-4 text-right text-xl">
                ${payslip.netSalary?.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <div className="flex justify-center mt-8 print:hidden">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
        >
          Print Payslip
        </button>
      </div>
    </div>
  </div>
);
};

export default PrintPayslip;
