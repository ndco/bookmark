import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";

import { Button } from 'react-bootstrap';

const socket = socketIOClient("http://localhost:3001");

class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props
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

    updatePrice = () => {
        const socket = socketIOClient("http://localhost:3001");

        socket.on("update price", data => {
            console.log(data)
            if (data.id === this.state.id && this.state.isBookmarked == true) {

            }
        })
    }

    render() {
        socket.on("update price", data => {
            console.log(data)
            if (data.id === this.state.id && this.state.isBookmarked == true) {
                this.setState({
                    bsStyle: 'danger'
                })
            }
        })
        
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
