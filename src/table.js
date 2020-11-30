import React from "react";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  getKeys = function () {
    if (this.props.data !== undefined) {
      return ["name", "city", "state", "telephone", "genre"];
    }
  };

  getHeader = function () {
    var keys = this.getKeys() || [];
    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th>;
    });
  };

  getRowsData = function () {
    let items = this.props.data;

    let keys = this.getKeys() || [];
    return items.map((row, index) => {
      return (
        <tr key={index}>
          <RenderRow key={index} data={row} keys={keys} />
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="filter by state"
          className="textboxes"
          onChange={(e) => {
            this.props.filter(e, "state");
          }}
        />
        <input
          type="checkbox"
          checked={this.props.enableStateFilter}
          onChange={() => this.props.enableState(!this.props.enableStateFilter)}
        />
        Enable state Search
        <input
          type="text"
          placeholder="filter by genre"
          className="textboxes"
          style={{ marginLeft: "30px" }}
          onChange={(e) => {
            this.props.filter(e, "genre");
          }}
        />
        <input
          type="checkbox"
          checked={this.props.enablegenerFilter}
          onChange={() => this.props.enableGener(!this.props.enablegenerFilter)}
        />
        Enable genre Search
        <table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          {this.props.data.length > 0 ? (
            <tbody>{this.getRowsData()}</tbody>
          ) : (
            <tbody>
              <td colSpan={5}>No Data</td>
            </tbody>
          )}
          <td colSpan={5}>
            <ul id="page-numbers">
              {this.props.pagination.map((number) => {
                return (
                  <li style={{color:number===this.props.currentpage?"red":null}} key={number} id={number} onClick={this.props.pageClick}>
                    {number}
                  </li>
                );
              })}
            </ul>
          </td>
        </table>
      </div>
    );
  }
}

const RenderRow = (props) => {
  return props.keys.map((key, index) => {
    return <td key={props.data[key]}>{props.data[key]}</td>;
  });
};
