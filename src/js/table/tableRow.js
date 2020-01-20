import React, { Component } from "react";

export default class TableRow extends Component {
  render() {
    return (
      <tr className="table__table-row">
        <td className="table__table-cell">{this.props.data.id}</td>
        <td className="table__table-cell">{this.props.data.firstName}</td>
        <td className="table__table-cell">{this.props.data.lastName}</td>
        <td className="table__table-cell">{this.props.data.email}</td>
        <td className="table__table-cell">{this.props.data.phone}</td>
      </tr>
    );
  }
}
