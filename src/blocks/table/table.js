import React, { Component } from "react";
import TableRow from "./tableRow";
import "./table.scss";

export class Table extends Component {
  render() {
    let tableRows = this.props.shownData;
    tableRows = tableRows.map((item, index) => {
      return <TableRow key={index} data={item} />;
    });

    return (
      <table className="table">
        <thead className="table__header">
          <tr className="table__table-row">
            <th
              className="table__table-cell table__table-cell_header"
              onClick={this.props.onHeaderClick}
            >
              id
            </th>
            <th
              className="table__table-cell table__table-cell_header"
              onClick={this.props.onHeaderClick}
            >
              firstName
            </th>
            <th
              className="table__table-cell table__table-cell_header"
              onClick={this.props.onHeaderClick}
            >
              lastName
            </th>
            <th
              className="table__table-cell table__table-cell_header"
              onClick={this.props.onHeaderClick}
            >
              email
            </th>
            <th
              className="table__table-cell table__table-cell_header"
              onClick={this.props.onHeaderClick}
            >
              phone
            </th>
          </tr>
        </thead>
        <tbody className="table__body">{tableRows}</tbody>
      </table>
    );
  }
}

//Храним текущий порядок сортировки (доступен из замыкания)
let sortDirStore = {
  id: "ascending",
  firstName: "ascending",
  lastName: "ascending",
  email: "ascending",
  phone: "ascending"
};

//функция сортировки по полю
export function sortByField(e) {
  // получить поле, по которому кликнули
  let target = e.target;
  if (!target.classList.contains("table__table-cell_header")) {
    return;
  }

  //получить поле, по которому будем сортировать
  const fieldName = target.innerHTML;

  //отсортировать массив по полю
  let data = this.state.data;
  if (sortDirStore[fieldName] === "ascending") {
    data.sort(ascendingSort);
    sortDirStore[fieldName] = "descending";
  } else if (sortDirStore[fieldName] === "descending") {
    data.sort(descendingSort);
    sortDirStore[fieldName] = "ascending";
  }

  //перерисовать с новым порядком
  const from = this.state.firstItemIndex;
  const to = from + this.state.itemsPerPage;
  const shownData = data.slice(from, to);
  this.setState({ data, shownData });

  //функция сортировки по возрастанию
  function ascendingSort(cell1, cell2) {
    if (cell1[fieldName] >= cell2[fieldName]) {
      return 1;
    } else {
      return -1;
    }
  }

  //функция сортировки по убыванию
  function descendingSort(cell1, cell2) {
    if (cell1[fieldName] >= cell2[fieldName]) {
      return -1;
    } else {
      return 1;
    }
  }
}
