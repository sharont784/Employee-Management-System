import { PencilIcon, Trash2Icon } from "lucide-react";
import React from "react";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    onDelete(employee);
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <span className="px-3 py-1 text-xs rounded-md bg-slate-100 text-slate-700">
          {employee.department || "Remote"}
        </span>

        {employee.isDeleted && (
          <span className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-600">
            DELETED
          </span>
        )}
      </div>

      <div className="h-52 bg-slate-50 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center">
          <span className="text-4xl font-semibold text-indigo-700">
            {employee.firstName?.[0]}
            {employee.lastName?.[0]}
          </span>
        </div>
      </div>

      {!employee.isDeleted && (
        <div className="absolute bottom-20 right-4 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => onEdit(employee)}
            className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center hover:bg-slate-50"
          >
            <PencilIcon className="w-4 h-4" />
          </button>

          <button
            onClick={handleDelete}
            className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center hover:bg-red-50 text-red-600"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900">
          {employee.firstName} {employee.lastName}
        </h3>

        <p className="text-slate-500 mt-1">
          {employee.position}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;