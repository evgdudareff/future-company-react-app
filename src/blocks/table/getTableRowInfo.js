import React from "react";
import "./getTableRowInfo.scss";

//Функция возвращает блок с данными выбранной строки (использует контекст таблицы)
export default function getTableRowInfo(dataItem, tableContext) {
  //вспомогательный функция: скрывает текущий инфо-блок
  function hideInfoBlock() {
    tableContext.setState({ InfoBlockId: null });
  }

  if (!dataItem.address) {
    dataItem.address = {
      streetAddress: "not provided",
      city: "not provided",
      state: "not provided",
      zip: "not provided"
    };
  }

  if (!dataItem.description) {
    dataItem.description = "not provided";
  }

  return (
    <div className="get-table-row-info-block">
      <button
        className="get-table-row-info-block__close-button"
        onClick={hideInfoBlock}
      >
        +
      </button>
      <div className="get-table-row-info-block__info-item">
        Выбран пользователь
        <b>
          &#160;{dataItem.firstName}&#160;{dataItem.lastName}
        </b>
      </div>
      <div className="get-table-row-info-block__info-item">
        Описание:&#160;
        <textarea
          className="info-item_textarea"
          value={dataItem.description}
          readOnly
        ></textarea>
      </div>
      <div className="get-table-row-info-block__info-item">
        Адрес проживания:&#160;<b>{dataItem.address.streetAddress}</b>
      </div>
      <div className="get-table-row-info-block__info-item">
        Город:&#160;<b>{dataItem.address.city}</b>
      </div>
      <div className="get-table-row-info-block__info-item">
        Провинция/штат:&#160;<b>{dataItem.address.state}</b>
      </div>
      <div className="get-table-row-info-block__info-item">
        Индекс:&#160;<b>{dataItem.address.zip}</b>
      </div>
    </div>
  );
}
