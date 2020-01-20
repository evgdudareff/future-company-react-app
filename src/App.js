import React, { Component } from "react";
import Table from "./js/table/table";
import getDataAsync from "./js/common/getDataAsync";

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    //Получить данные
    getDataAsync(
      "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
    ).then(data => {
      this.setState({ data });
    });
  }

  render() {
    return <Table data={this.state.data} />;
  }
}

export default App;
