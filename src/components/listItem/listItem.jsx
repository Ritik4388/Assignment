import React from "react";
import "./listItem.css";
const ListItem = ({ employee }) => {
  return (
    <div className="employee-container">
      <div className="employee-id">{employee.id}</div>
      <div className="employee-img">
        <img src={employee.avatar} alt="avatar" />
      </div>
      <div className="employee-name">{employee.first_name}</div>
    </div>
  );
};

export default ListItem;
