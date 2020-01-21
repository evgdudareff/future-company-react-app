import React, { Component } from "react";
import TableRow from "./tableRow";
import "./table.scss";

export default class Table extends Component {
  render() {
    let tableRows = this.props.data;
    tableRows = tableRows.map((item, index) => {
      return <TableRow key={index} data={item} />;
    });

    return (
      <table className="table">
        <thead className="table__header">
          <tr className="table__table-row">
            <th className="table__table-cell">id</th>
            <th className="table__table-cell">firstName</th>
            <th className="table__table-cell">lastName</th>
            <th className="table__table-cell">email</th>
            <th className="table__table-cell">phone</th>
          </tr>
        </thead>
        <tbody className="table__body">{tableRows}</tbody>
      </table>
    );
  }
}
