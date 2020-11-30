import React from "react";

import Table from "./table";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: "",
      state: "",
      currentPage: 1,
      recordsperPage: 10,
      enablegenerFilter:true,
      enableStateFilter:true
    };
  }

  componentDidMount() {
    fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        result.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

        this.setState({ restaurantData: result, filterData: result });
      });
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  enableState = (value) => {
    this.setState({enableStateFilter:value},()=>{
      let { genre, state,enableStateFilter } = this.state;
      let restaurantData = [...this.state.restaurantData];
      if(!enableStateFilter){
        state=""
      }
      let data = restaurantData.filter((restaurant) => {
        return (
          restaurant.state.toUpperCase().includes(state) &&
          restaurant.genre.toUpperCase().includes(genre)
        );
      });
      this.setState({ filterData: data ,currentPage:1});

    })
  }
  enableGener =(value) =>{
    this.setState({enablegenerFilter:value},()=>{
      let { genre, state,enablegenerFilter } = this.state;
      let restaurantData = [...this.state.restaurantData];
      if(!enablegenerFilter){
        genre=""
      }
      let data = restaurantData.filter((restaurant) => {
        return (
          restaurant.state.toUpperCase().includes(state) &&
          restaurant.genre.toUpperCase().includes(genre)
        );
      });
      this.setState({ filterData: data ,currentPage:1});

    })
  }

  filterRestaurent = (e, type) => {
    this.setState({ [type]: e.target.value.toUpperCase() }, () => {
      let { genre, state } = this.state;
      let restaurantData = [...this.state.restaurantData];

      let data = restaurantData.filter((restaurant) => {
        return (
          restaurant.state.toUpperCase().includes(state) &&
          restaurant.genre.toUpperCase().includes(genre)
        );
      });
      this.setState({ filterData: data ,currentPage:1});
    });
  };

  render() {
    const { filterData = [], recordsperPage, currentPage } = this.state;
    const indexOfLastRecord = currentPage * recordsperPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsperPage;
    const currentTodos = filterData.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filterData.length / recordsperPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <Table
        data={currentTodos || []}
        pagination={pageNumbers}
        filter={this.filterRestaurent}
        pageClick={this.handleClick}
        enableStateFilter={this.state.enableStateFilter}
        enableState={this.enableState}
        enablegenerFilter= {this.state.enablegenerFilter}
        enableGener={this.enableGener}
        currentpage={this.state.currentPage}
        />
    );
  }
}

export default App;
