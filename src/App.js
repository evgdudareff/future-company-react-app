import React, { Component } from "react";
import Table from "./js/table/table";
import Pagination from "./js/pagination/pagination";
import getDataAsync from "./js/common/getDataAsync";
import "./app.scss";

const dataLinkSmall =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
const dataLinkLarge =
  "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

class App extends Component {
  state = {
    data: [], //данные, полученные с сервера
    shownData: [], //показываемые на данный момент данные
    currPage: 1, //текущая страница
    maxPages: 1, //максимальное число страниц
    firstItemIndex: 0, //начальный индекс показываемых данных (массив)
    itemsPerPage: 25, //количество элементов на странице
    visible: false //показывается приложение или нет (готово? : показывается)
  };

  //Метод: перелистывание страниц
  showPage(dir) {
    //логика в зависимости от направления
    if (dir === "next") {
      const from = this.state.firstItemIndex + this.state.itemsPerPage;
      const to = from + this.state.itemsPerPage;

      if (this.state.currPage < this.state.maxPages) {
        this.setState({
          currPage: this.state.currPage + 1,
          firstItemIndex: from,
          shownData: this.state.data.slice(from, to)
        });
      }
    } else if (dir === "prev") {
      const from = this.state.firstItemIndex - this.state.itemsPerPage;
      const to = this.state.firstItemIndex;

      if (this.state.currPage !== 1) {
        this.setState({
          currPage: this.state.currPage - 1,
          firstItemIndex: from,
          shownData: this.state.data.slice(from, to)
        });
      }
    } else {
      return;
    }
  }

  componentDidMount() {
    //Получить данные
    getDataAsync(dataLinkLarge).then(data => {
      const shownData = data.slice(
        this.firstItemIndex,
        this.state.itemsPerPage
      );
      const maxPages = data.length / this.state.itemsPerPage;
      this.setState({ data, shownData, maxPages });

      this.setState({ visible: true });
      document.querySelector(".app__loader").remove();
    });
  }

  render() {
    //по умолчанию приложение visible = false
    let wrapperClassName = "content__wrapper";
    if (this.state.visible) {
      wrapperClassName += "content__wrapper_ready";
    }

    return (
      <div className="app__content">
        <div className={wrapperClassName}>
          <Table data={this.state.shownData} />
          <Pagination
            currPage={this.state.currPage}
            maxPages={this.state.maxPages}
            onNextPageClick={this.showPage.bind(this, "next")}
            onPrevPageClick={this.showPage.bind(this, "prev")}
          />
        </div>
        <div className="app__loader"></div>
      </div>
    );
  }
}

export default App;
