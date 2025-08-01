import React from "react";

const CardTemp = ({ title, value, icon, color }) => {
  return (
    <div
      className={`p-5 rounded-xl shadow-md ${color} flex items-center gap-4`}
    >
      <div className="p-3 bg-white rounded-full shadow">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default CardTemp;
