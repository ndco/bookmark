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


  async updateBookmarks() {
    const bookmarkList = await this.retrieveUserBookmark();
    const currentList = this.props.results;

    const updatedList = currentList.map(item => {
      for(let i in bookmarkList) {
        if(bookmarkList[i].product_id === item.id) {
          item.isBookmarked = bookmarkList[i].isBookmarked
          if (bookmarkList[i].isBookmarked == true) {
            item.bsStyle = 'warning'
          }
        }
      }
      let rObj = {...item};
      return rObj;
    })
    console.log(updatedList)
    this.setState({
      results: updatedList
    })
  }


  // componentWillUpdate() {
  //   this.updateBookmarks();
  // }

  retrieveUserBookmark() {
    return new Promise(function(resolve, reject) {
      const userId = 1;
      axios.get(`/bookmarks/${userId}`)
        .then(({ data }) => {
         resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }

 addBookmark = (e) => {
   let newbsStyle = this.state.bsStyle
   if (newbsStyle === 'default') {
     newbsStyle = 'warning'
   } else {
     newbsStyle = 'default'
   }
    this.setState({
      isBookmarked: !this.state.isBookmarked,
      bsStyle: newbsStyle
    })
  }

  render() {
    // console.log(this.state.results)
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