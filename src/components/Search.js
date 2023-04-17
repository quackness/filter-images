import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this)
    this.input = React.createRef();
  }

  onSearch() {
    // console.log(this.input)
    // console.log("value" + this.input.current.value)
    const value = this.input.current.value;
    this.props.onSearch(value)//sends the info from the search bar to app.js

  }


  render() {
    return (
      <div className="grid-header">
        <div className="grid-header-column">
          <p className="title-text white-text font">Store Page</p>
        </div>
        <div className="grid-header-column">
          <input className="input-bar" ref={this.input} type="text" />
        </div>
        <div className="grid-header-column">
          <button className="button gray-background" onClick={this.onSearch}>Search</button>
        </div>
      </div>
    )
  }
}

export default Search;
