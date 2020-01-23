import React, { Component } from "react";
import { Table } from "./blocks/table/table";
import getDataAsync from "./blocks/common/getDataAsync";
import "./app.scss";

const dataLinkSmall =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
const dataLinkLarge =
  "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

class App extends Component {
  state = {
    dataFromServer: [], //данные, полученные с сервера
    visible: false
  };

  componentDidMount() {
    //Получить данные и сохранить их в компоненте
    getDataAsync(dataLinkSmall).then(data => {
      this.setState({ dataFromServer: data, visible: true });
    });
  }

  render() {
    //по умолчанию приложение visible = false
    let wrapperClassName = "content__wrapper";
    if (this.state.visible) {
      wrapperClassName += "content__wrapper_ready";
      return (
        <div className="app__content">
          <div className={wrapperClassName}>
            <Table data={this.state.dataFromServer} itemsPerPage={25} />
          </div>
        </div>
      );
    } else return <div className="app__loader"></div>;
  }
}

export default App;
