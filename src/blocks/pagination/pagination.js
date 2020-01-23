import React, { Component } from "react";
import "./pagination.scss";

//Компонент Pagination: перелистывание страниц таблицы
//Принимает предоставляемый контекст таблицы (ссылка на this)
export default class Pagination extends Component {
  //Метод: отобразить страницу таблицы (след/пред)
  showPage(dir, tableState, tableContext) {
    //логика в зависимости от направления
    if (dir === "next") {
      const from = tableState.firstItemIndex + tableState.itemsPerPage;

      if (tableState.currPage < tableState.maxPages) {
        tableContext.setState({
          currPage: tableState.currPage + 1,
          firstItemIndex: from
        });
      }
    } else if (dir === "prev") {
      const from = tableState.firstItemIndex - tableState.itemsPerPage;

      if (tableState.currPage !== 1) {
        tableContext.setState({
          currPage: tableState.currPage - 1,
          firstItemIndex: from
        });
      }
    } else {
      return;
    }
  }

  render() {
    if (!this.props.useContext) return;

    const tableContext = this.props.useContext; //контекст таблицы, с которой работаем
    const tableState = tableContext.state; //и свойство state таблицы с данными

    //инициализация кнопок След/Пред стилями
    let prevBtnClass = "pagination__button pagination__button_prev";
    let nextBtnClass = "pagination__button pagination__button_next";

    if (tableState.currPage === 1) {
      prevBtnClass += " pagination__button_disabled";
    } else if (tableState.currPage === tableState.maxPages) {
      nextBtnClass += " pagination__button_disabled";
    }

    return (
      <div className="pagination">
        <button
          className={prevBtnClass}
          onClick={() => this.showPage("prev", tableState, tableContext)}
        >
          Пред.
        </button>
        <div className="pagination__curr-page">
          {tableState.currPage} из {tableState.maxPages}
        </div>
        <button
          className={nextBtnClass}
          onClick={() => this.showPage("next", tableState, tableContext)}
        >
          След.
        </button>
      </div>
    );
  }
}
