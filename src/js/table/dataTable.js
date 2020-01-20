import React, { Component } from "react";
import TableRow from "./tableRow";

import "./dataTable.less";

export default class DataTable extends Component {
  render() {
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
        <tbody className="table__body">
          <TableRow rowData={this.props.data} />
        </tbody>
      </table>
    );
  }
}
