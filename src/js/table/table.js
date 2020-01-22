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
            <th className="table__table-cell table__table-cell_header">id</th>
            <th className="table__table-cell table__table-cell_header">
              firstName
            </th>
            <th className="table__table-cell table__table-cell_header">
              lastName
            </th>
            <th className="table__table-cell table__table-cell_header">
              email
            </th>
            <th className="table__table-cell table__table-cell_header">
              phone
            </th>
          </tr>
        </thead>
        <tbody className="table__body">{tableRows}</tbody>
      </table>
    );
  }
}
