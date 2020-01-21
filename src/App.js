import React, { Component } from "react";
import Table from "./js/table/table";
import Pagination from "./js/pagination/pagination";
import getDataAsync from "./js/common/getDataAsync";

const dataLinkSmall =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
const dataLinkLarge =
  "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

class App extends Component {
  state = {
    data: [],
    shownData: [],
    currPage: 1,
    maxPages: 1,
    firstItemIndex: 0,
    itemsPerPage: 25
  };

  showNextPage() {
    const from = this.state.firstItemIndex + this.state.itemsPerPage;
    const to = from + this.state.itemsPerPage;

    if (this.state.currPage < this.state.maxPages) {
      this.setState({
        currPage: this.state.currPage + 1,
        firstItemIndex: from,
        shownData: this.state.data.slice(from, to)
      });
    }
  }

  showPrevPage() {
    const from = this.state.firstItemIndex - this.state.itemsPerPage;
    const to = this.state.firstItemIndex;

    if (this.state.currPage !== 1) {
      this.setState({
        currPage: this.state.currPage - 1,
        firstItemIndex: from,
        shownData: this.state.data.slice(from, to)
      });
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
    });
  }

  render() {
    console.log(this.state.currPage, this.state.maxPages);
    return (
      <div>
        <Table data={this.state.shownData} />
        <Pagination
          onNextPageClick={this.showNextPage.bind(this)}
          onPrevPageClick={this.showPrevPage.bind(this)}
        />
      </div>
    );
  }
}

export default App;
