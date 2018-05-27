import React, { Component } from 'react';
import ListView from './listView';
import { Route, Redirect, Switch } from 'react-router-dom'

import axios from 'axios';

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: []
        }
    }

    getInfo = (data) => {
        return new Promise(function(resolve, reject) {
            console.log(data)
            axios.get(`/products/${data}`)
                .then(({ data }) => {
                        resolve(data);
                    }).then(data => {
                        const result = data.map(element => {
                            return {
                                ...element,
                                isBookmarked: false,
                                bsStyle: 'default'
                            }
                        })
                        return result
                    })
                        .catch((err) => {
                            reject(err);
                })
        })
    }


    retrieveUserBookmark() {
        return new Promise(function (resolve, reject) {
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

    async updateBookmarks(list) {
        const bookmarkList = await this.retrieveUserBookmark();
        const currentList = list;

        const updatedList = currentList.map(item => {
            for (let i in bookmarkList) {
                if (bookmarkList[i].product_id === item.id) {
                    item.isBookmarked = bookmarkList[i].isBookmarked
                    if (bookmarkList[i].isBookmarked == true) {
                        item.bsStyle = 'warning'
                    }
                }
            }
            let rObj = { ...item };
            return rObj;
        })
        console.log(updatedList)
        this.setState({
            results: updatedList
        })
    }

    handleInputSubmit = (e) => {
        e.preventDefault();
        if (this.state.query && this.state.query.length > 1) {
            this.getInfo(this.state.query)
            .then(result => {
                this.updateBookmarks(result)
            })
        }
    }

    handleInputChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleInputSubmit}>
                    <input
                        type="text" value={this.state.value}
                        placeholder="Search for..."
                        // ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />
                    <input type="submit" value="Submit" />
                </form>
                <ListView results={this.state.results} />
            </div>
        )
    }
}


export default SearchList;