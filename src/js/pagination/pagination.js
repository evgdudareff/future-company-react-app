import React, { Component } from "react";
import "./pagination.scss";

export default class Pagination extends Component {
  render() {
    return (
      <ul className="pagination">
        <li className="pagination__prev">
          <a
            href="#"
            className="pagination__link"
            onClick={this.props.onPrevPageClick}
          >
            Пред.
          </a>
        </li>
        <li className="pagination__next">
          <a
            href="#"
            className="pagination__link"
            onClick={this.props.onNextPageClick}
          >
            След.
          </a>
        </li>
      </ul>
    );
  }
}
