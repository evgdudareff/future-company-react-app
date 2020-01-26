import React, { Component } from "react";
import "./addTableRow.scss";

let inputFields = [
  { fieldName: "id", isValid: false },
  { fieldName: "firstName", isValid: false },
  { fieldName: "lastName", isValid: false },
  { fieldName: "email", isValid: false },
  { fieldName: "phone", isValid: false }
];

export default class AddTableRow extends Component {
  state = {
    formIsReady: false //готова ли форма (если все поля не пустые - готова)
  };

  //Метод: показать/скрыть форму добавления строки
  showAddTableRowForm(e) {
    let target = e.target;
    //поменять текст кнопки
    const buttonContent =
      target.innerHTML === "Добавить" ? "Скрыть" : "Добавить";
    target.innerHTML = buttonContent;

    //Добавить/Скрыть
    document
      .querySelector(".add-table-row-block__form")
      .classList.toggle("add-table-row-block__form_hide");
  }

  //Метод: проверяет на валидность поле (для текущей задачи просто на пустой ввод)
  checkFiledValidity(e) {
    const target = e.target;
    const fieldName = target.name;

    const inputFieldIndex = inputFields.findIndex(
      inputField => inputField.fieldName === fieldName
    );
    //переключить состояние input validity
    if (!target.value) {
      inputFields[inputFieldIndex].isValid = false;
    } else inputFields[inputFieldIndex].isValid = true;

    //проверить, все ли поля заполнены
    this.checkFormValidity();
  }

  //Метод: проверяет, готова ли форма (если поля не пустые - готова)
  checkFormValidity() {
    const isFormValid = !inputFields.find(
      inputField => inputField.isValid === false
    );
    if (isFormValid) {
      this.setState({ formIsReady: true });
    } else {
      this.setState({ formIsReady: false });
    }
  }

  //Метод: добавляет новую строку в начало таблицы (принимает контекст таблицы)
  addNewTableRow() {
    //Инициализировать готовность формы
    this.setState({ formIsReady: false });

    //собрать данные введенных форм
    const inputs = document.querySelectorAll(
      ".add-table-row-block__input-field"
    );
    let newDataItem = {};
    [].forEach.call(inputs, input => {
      newDataItem[input.name] = input.value;
      input.value = "";
    });

    inputFields.forEach(inputField => {
      inputField.isValid = false;
    });

    const tableContext = this.props.useContext;
    const data = [...tableContext.state.data];
    data.unshift(newDataItem);

    const maxPages = Math.ceil(data.length / tableContext.state.itemsPerPage);

    tableContext.setState({
      data,
      currPage: 1,
      firstItemIndex: 0,
      maxPages,
      filteredData: null
    });
  }

  //Метод: получить поля для ввода данных новой строки
  getInputsForAdd(inputFields, onInputKeyUpHandler) {
    const inputs = inputFields.map((inputField, index) => {
      return (
        <input
          key={index}
          name={inputField.fieldName}
          className="add-table-row-block__input-field"
          type="text"
          placeholder={inputField.fieldName}
          onKeyUp={onInputKeyUpHandler}
        ></input>
      );
    });

    return inputs;
  }

  render() {
    let submitButtonClassName =
      "add-table-row-block__add-button add-table-row-block__add-button_submit";
    if (!this.state.formIsReady) {
      submitButtonClassName += " add-table-row-block__add-button_disabled";
    }

    //получить поля для ввода данных новой строки
    const inputsForAdd = this.getInputsForAdd(
      inputFields,
      this.checkFiledValidity.bind(this)
    );

    return (
      <div className="add-table-row-block">
        <button
          className="add-table-row-block__add-button"
          onClick={this.showAddTableRowForm}
        >
          Добавить
        </button>
        <div className="add-table-row-block__form add-table-row-block__form_hide">
          {inputsForAdd}
          <button
            className={submitButtonClassName}
            onClick={this.addNewTableRow.bind(this)}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
