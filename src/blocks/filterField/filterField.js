import React, { Component } from "react";
import "./filterField.scss";

export default class FilterField extends Component {
  state = {
    defaultValue: "Чё надо?", //значение placeholder
    inputValue: "" //Значение поля фильтра
  };

  //Метод: отслеживает, что вводит пользователь
  inputHandler(e) {
    this.setState({ inputValue: e.target.value });
  }

  //Метод: применяет фильтр к передаваевому контексту таблицы
  searchButtonHandler() {
    if (!this.props.useContext || !this.state.inputValue) return;
    const tableContext = this.props.useContext;
    const searchPhrase = this.state.inputValue;

    //отфильтровать массив дынных по искомой фразе
    const data = [...tableContext.state.data];
    const filteredData = data.filter(dataItem => {
      const allValues = Object.values(dataItem).toString();
      return allValues.includes(searchPhrase);
    });

    const maxPages = Math.ceil(
      filteredData.length / tableContext.state.itemsPerPage
    );

    tableContext.setState({
      filteredData,
      currPage: 1,
      firstItemIndex: 0,
      maxPages
    });
  }

  //Метод: сбрасывает фильтр к передаваевомого контекста таблицы
  resetButtonHandler() {
    if (!this.props.useContext || !this.state.inputValue) return;
    const tableContext = this.props.useContext;

    const maxPages = Math.ceil(
      tableContext.state.data.length / tableContext.state.itemsPerPage
    );

    //Очистить поле фильтра
    document.querySelector(".filter-field-block__search-field").value = "";

    tableContext.setState({
      filteredData: null,
      currPage: 1,
      firstItemIndex: 0,
      maxPages
    });
  }

  render() {
    return (
      <div className="filter-field-block">
        <input
          className="filter-field-block__search-field"
          type="text"
          placeholder={this.state.defaultValue}
          onChange={this.inputHandler.bind(this)}
        ></input>
        <button
          className="filter-field-block__search-button"
          onClick={this.searchButtonHandler.bind(this)}
        >
          Найти
        </button>
        <button
          className="filter-field-block__reset-button"
          onClick={this.resetButtonHandler.bind(this)}
        >
          Сбросить фильтр
        </button>
      </div>
    );
  }
}
