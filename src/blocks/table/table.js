import React, { Component } from "react";
import Pagination from "../pagination/pagination";
import FilterField from "../filterField/filterField";
import AddTableRow from "./addTableRow";
import getTableRowInfo from "./getTableRowInfo";

import "./table.scss";

//Храним текущий порядок сортировки (доступен из замыкания)
let headerFields = [
  { fieldName: "id", sortType: "ascending" },
  { fieldName: "firstName", sortType: "ascending" },
  { fieldName: "lastName", sortType: "ascending" },
  { fieldName: "email", sortType: "ascending" },
  { fieldName: "phone", sortType: "ascending" }
];

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data, //данные, полученные с сервера
      filteredData: null, //данные, прошедшие фильтрацию и готовые к отображению
      currPage: 1, //текущая страница
      itemsPerPage: props.itemsPerPage, //количество элементов на странице: задаётся или можно принимать из App.js
      maxPages: Math.ceil(props.data.length / props.itemsPerPage), //максимальное число страниц
      firstItemIndex: 0, //начальный индекс показываемых данных (массив),
      InfoBlockId: null // Id выбранной строки таблицы для более подробного отображения
    };
  }

  //Метод: получить строку заголовка таблицы (для header body)
  getHeaderTableRow(headerFields, trClassName, thClassName, onThClickHandler) {
    let headerTableRow = headerFields.map((field, index) => {
      let thClassNameResult =
        thClassName + ` table__table-cell_${field.sortType}`;

      return (
        <th
          key={index}
          className={thClassNameResult}
          onClick={onThClickHandler}
        >
          {field.fieldName}
        </th>
      );
    });
    return <tr className={trClassName}>{headerTableRow}</tr>;
  }

  //Метод: получить строку таблицы (для tbody)
  getTableRow(dataItem, trClassName, tdClassName, index, onThClickHandler) {
    let tdIdClassName = `${tdClassName} " js-id-cell`;
    return (
      <tr key={index} className={trClassName}>
        <td className={tdIdClassName} onClick={onThClickHandler}>
          {dataItem.id}
        </td>
        <td className={tdClassName} onClick={onThClickHandler}>
          {dataItem.firstName}
        </td>
        <td className={tdClassName} onClick={onThClickHandler}>
          {dataItem.lastName}
        </td>
        <td className={tdClassName} onClick={onThClickHandler}>
          {dataItem.email}
        </td>
        <td className={tdClassName} onClick={onThClickHandler}>
          {dataItem.phone}
        </td>
      </tr>
    );
  }

  //Метод: сортировка таблицы по полю в thead (по клику)
  sortByField(e) {
    // получить заголовок поля, по которому кликнули
    let target = e.target;
    if (!target.classList.contains("table__table-cell_header")) {
      return;
    }

    //получить имя поля, по которому будем сортировать
    const fieldName = target.innerHTML;

    //есть отфильтрованные данные? работать с ними : иначе с изначальными
    let data = this.state.filteredData
      ? [...this.state.filteredData]
      : [...this.state.data];

    //получить требуемый (на текущий момент) тип сортировки для поля
    let field = headerFields.find(field => field.fieldName === fieldName);
    let sortType = field.sortType;

    //сортируем в зависимости от требуемого типа и переключаем сортировку
    if (sortType === "ascending") {
      data.sort(ascendingSort);
      sortType = "descending";
    } else if (sortType === "descending") {
      data.sort(descendingSort);
      sortType = "ascending";
    }

    //переключить тип сортировки для поля
    field.sortType = sortType;

    //есть отфильтрованные данные? показать таблицу с ними : иначе с изначальными
    if (this.state.filteredData) {
      this.setState({ filteredData: data });
    } else {
      this.setState({ data });
    }

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

  //Метод: получить index строки, по которой был клик
  getTrIndexByClick(e) {
    let target = e.target;
    //поднять на уровень ноды tr
    while (!target.classList.contains("table__table-row")) {
      target = target.parentNode;
    }
    //взять информацию об Id из дочернего td с js-классом js-id-cell
    let dataItemId = [].find.call(target.children, cell =>
      cell.classList.contains("js-id-cell")
    );
    if (!dataItemId) return;

    dataItemId = Number(dataItemId.innerHTML);

    //передать новые данные в компонент
    this.setState({ InfoBlockId: dataItemId });
  }

  render() {
    //есть отфильтрованные данные? работать с ними : иначе с изначальными
    const data = this.state.filteredData
      ? [...this.state.filteredData]
      : [...this.state.data];

    //Получить требуемое количество данных на страницу
    const currPageData = data.slice(
      this.state.firstItemIndex,
      this.state.itemsPerPage * this.state.currPage
    );

    //Получить строку для заголовка таблицы (thead)
    const headerTableRow = this.getHeaderTableRow(
      headerFields,
      "table__table-row",
      "table__table-cell_header",
      this.sortByField.bind(this)
    );

    //Получить строки таблицы (tbody)
    let tableRows = currPageData.map((dataItem, index) =>
      this.getTableRow(
        dataItem,
        "table__table-row",
        "table__table-cell",
        index,
        this.getTrIndexByClick.bind(this)
      )
    );

    //Получить блок информации при клике при необходимости
    let infoBlock = null;
    if (this.state.InfoBlockId !== null) {
      //получить объект с данными
      const dataItem = this.state.data.find(
        dataItem => Number(dataItem.id) === this.state.InfoBlockId
      );

      //передать контекст таблицы
      const tableContext = this;
      infoBlock = getTableRowInfo(dataItem, tableContext);
    }

    return (
      <div>
        <FilterField useContext={this} />
        <AddTableRow useContext={this} />
        <table className="table">
          <thead className="table__header">{headerTableRow}</thead>
          <tbody className="table__body">{tableRows}</tbody>
        </table>
        {infoBlock}
        <Pagination useContext={this} />
      </div>
    );
  }
}
