import React, { Component } from "react";

export default class TableRow extends Component {
  state = {
    dummy: false
  };

  render() {
    return (
      <tr className="table__table-row">
        <td className="table__table-cell">{this.props.rowData.id}</td>
        <td className="table__table-cell">{this.props.rowData.firstName}</td>
        <td className="table__table-cell">{this.props.rowData.lastName}</td>
        <td className="table__table-cell">{this.props.rowData.email}</td>
        <td className="table__table-cell">{this.props.rowData.phone}</td>
      </tr>
    );
  }
}
