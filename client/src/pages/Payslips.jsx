import { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = true;

  const fetchPayslips = useCallback(async () => {
    setPayslips(dummyPayslipData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData);
  }, [isAdmin]);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payslips</h1>

          <p className="text-sm text-gray-500 mt-1">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslip history"}
          </p>
        </div>

        {isAdmin && (
          <GeneratePayslipForm
            employees={employees}
            onSuccess={fetchPayslips}
          />
        )}
      </div>

      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslips;
