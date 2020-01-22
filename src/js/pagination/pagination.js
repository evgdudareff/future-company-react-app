import React, { Component } from "react";
import "./pagination.scss";

export default class Pagination extends Component {
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
