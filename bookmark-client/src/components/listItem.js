import React, { Component } from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';


class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props
        }
    }


    retrieveUserBookmark2 = () => {
        let newbsStyle = ''
        if (this.state.isBookmarked == true) {
            return 'warning'
        } else {
            return 'default'
        }
    }

    updateBookmark = () => {
        console.log(this.state.isBookmarked+' '+this.props.id)
        axios.post(`/bookmarks/${this.props.id}/${this.state.isBookmarked}`)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
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
        this.updateBookmark();
        
    }

    render() {
            return (
                <tr>
                    <td>{this.state.id} </td>
                    <td>{this.state.name}</td>
                    <td><a href={this.state.shopUrl} target="_blank">{this.state.shopName}</a></td>
                    <td>{this.state.price}</td>
                    <td><Button bsStyle={this.state.bsStyle} onClick={this.addBookmark}></Button></td>
                </tr>
            )
        }
    }

export default ListItem;
