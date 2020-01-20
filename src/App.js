import React, { Component } from "react";

import DataTable from "./js/table/dataTable";

class App extends Component {
  state = {
    data: [
      {
        id: 101,
        firstName: "Sue",
        lastName: "Corson",
        email: "DWhalley@in.gov",
        phone: "(612)211-6296",
        address: {
          streetAddress: "9792 Mattis Ct",
          city: "Waukesha",
          state: "WI",
          zip: "22178"
        },
        description: "et lacus magna dolor..."
      }
    ]
  };

  render() {
    return <DataTable data={this.state.data[0]} />;
  }
}

export default App;
