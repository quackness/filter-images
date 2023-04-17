import React, { Component } from 'react';
import Items from './Items'; // load up the information of Items
import ItemInfo from './components/ItemInfo'
import Search from './components/Search'
import Checkbox from './components/Checkbox'
import './accordion.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton
} from 'react-accessible-accordion';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      filter: [],
      search: '' // keyword
    };

    this.onSearch = this.onSearch.bind(this)
    this.findItem = this.findItem.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.findFilter = this.findFilter.bind(this);
    this.alreadyIn = this.alreadyIn.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  componentDidMount() {
    this.onSearch("");
  }

  onSearch(keyword) {
    const list = []
    for (const item in Items) {
      if (Items[item].name.toLowerCase().includes(keyword.toLowerCase())) {
        list.push(Items[item])
      }
    }
    this.setState({ items: list })
  }

  onFilter(filter, include) {
    // do we include the search results too?
    // add filter to the list of things to filter
    var currentFilters = this.state.filter;
    var newCurrentFilters = [];

    // find out if the filter is adding or removing
    if (include) {
      // add to filter
      if (!this.findFilter(currentFilters, filter)) {
        newCurrentFilters.push(filter);
      }
    }
    else {
      // remove from filter
      if (this.findFilter(currentFilters, filter)) {
        var index = currentFilters.indexOf(filter);
        currentFilters.splice(index, 1);
      }
    }

    for (var c = 0; c < currentFilters.length; c++) {
      newCurrentFilters.push(currentFilters[c]);
    }

    var newItems = [];
    for (var i = 0; i < Items.length; i++) {
      var item = Items[i];
      for (var f = 0; f < newCurrentFilters.length; f++) {
        if (item.category.includes(newCurrentFilters[f])) {
          if (!this.findItem(newItems, item.key)) {
            if (!this.alreadyIn(newItems, item)) {
              newItems.push(item);
            }
          }
        }
        if (newCurrentFilters[f] === "Over 2 Stars" && item.rating > 2) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (newCurrentFilters[f] === "Over 3 Stars" && item.rating > 3) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (newCurrentFilters[f] === "Over 4 Stars" && item.rating > 4) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (newCurrentFilters[f] === "Over $500" && item.price > 500) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (newCurrentFilters[f] === "$100-$500" && item.price < 500 && item.price > 100) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (newCurrentFilters[f] === "$50-$100" && item.price < 100 && item.price > 50) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (newCurrentFilters[f] === "$10-$50" && item.price < 50 && item.price > 10) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        if (newCurrentFilters[f] === "Less than $10" && item.price < 10 && item.price > 0) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
        // if the amount of people enrolled is less than the class size, we have room
        if (newCurrentFilters[f] === "In Stock" && item.itemsLeft > 0) {
          if (!this.alreadyIn(newItems, item)) {
            newItems.push(item);
          }
        }
      }
    }

    // this return all even when our filter has none, maybe take care of this case?
    if (newItems.length === 0) {
      // default to all
      newItems = Items;
    }

    this.setState({ items: newItems, filter: newCurrentFilters });
  }

  findItem(items, key) {
    var myitem = null;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.key === key) {
        myitem = item;
      }
    }
    return myitem;
  }

  findFilter(filters, value) {
    var myFilter = null;
    for (var i = 0; i < filters.length; i++) {
      var filter = filters[i];
      if (filter === value) {
        myFilter = filter;
      }
    }
    return myFilter;
  }

  alreadyIn(items, item) {
    for (var i = 0; i < items.length; i++) {
      if (item === items[i]) {
        return true;
      }
    }
    return false;
  }

  clearAll() {
    // TODO figure out how to uncheck all checkboxes
  }

  render() {
    const list = this.state.items.map((item) =>
      <ItemInfo key={item.key} item={item} />
    );

    return (
      <div className="background-white">
        <div className="background-blue white-text">
          <Search onSearch={this.onSearch} />
        </div>

        <div className="grid-page">
          <div className="grid-page-column">
            <p className="header-text black-text font">Filter</p>
            <input className="button background-gray medium-text" type="button" value="Clear All" onClick={this.clearAll} />
            <div><br /></div>
            <div className="font">
              <Accordion allowZeroExpanded="true">
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span className="medium-text">Category</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <Checkbox label="Electronics" onFilter={this.onFilter} />
                    <Checkbox label="Books" onFilter={this.onFilter} />
                    <Checkbox label="Toys" onFilter={this.onFilter} />
                    <Checkbox label="School" onFilter={this.onFilter} />
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span className="medium-text">Availabity</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <Checkbox label="In Stock" onFilter={this.onFilter} />
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span className="medium-text">Price</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <Checkbox label="Over $500" onFilter={this.onFilter} />
                    <Checkbox label="$100-$500" onFilter={this.onFilter} />
                    <Checkbox label="$50-$100" onFilter={this.onFilter} />
                    <Checkbox label="$10-$50" onFilter={this.onFilter} />
                    <Checkbox label="Less than $10" onFilter={this.onFilter} />
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span className="medium-text">Rating</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <Checkbox label="Over 4 Stars" onFilter={this.onFilter} />
                    <Checkbox label="Over 3 Stars" onFilter={this.onFilter} />
                    <Checkbox label="Over 2 Stars" onFilter={this.onFilter} />
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="grid-page-column">
            <div className="horizontal-bar"></div>
          </div>

          <div className="grid-page-column">
            <div className="grid-result-header">
              <div className="grid-result-header-column">
                <p className="header-text black-text font">Results</p>
              </div>
              <div className="grid-result-header-column">
                <p className="small-text gray-text font">
                  Returned {this.state.items.length} results
                </p>
              </div>
            </div>
            {list}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
