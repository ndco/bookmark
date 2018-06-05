import React, { Component } from 'react'
import ListItem from './listItem';

import axios from 'axios';

import { Table, Button } from 'react-bootstrap'


class ListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
  }


  render() {
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Shop Name</th>
              <th>Price</th>
              <th>Bookmark</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.results.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    shopName={item.shop_name}
                    shopUrl={item.shop_url}
                    price={item.price}
                    bsStyle={item.bsStyle}
                    isBookmarked={item.isBookmarked}
                  />
                )
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

export default ListView;