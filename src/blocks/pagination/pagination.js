import React, { Component } from "react";
import "./pagination.scss";

export class Pagination extends Component {
  render() {
    let prevBtnClass = "pagination__button pagination__button_prev";
    let nextBtnClass = "pagination__button pagination__button_next";

    if (this.props.currPage === 1) {
      prevBtnClass += " pagination__button_disabled";
    } else if (this.props.currPage === this.props.maxPages) {
      nextBtnClass += " pagination__button_disabled";
    }

    return (
      <div className="pagination">
        <button className={prevBtnClass} onClick={this.props.onPrevPageClick}>
          Пред.
        </button>
        <div className="pagination__curr-page">
          {this.props.currPage} из {this.props.maxPages}
        </div>
        <button className={nextBtnClass} onClick={this.props.onNextPageClick}>
          След.
        </button>
      </div>
    );
  }
}

//Функция перелистывания страниц
export function showPage(dir) {
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
