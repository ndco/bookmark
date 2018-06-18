import React, { Component } from 'react';
import AdminListItem from './adminListItem';
import socketIOClient from "socket.io-client";

import { DropdownButton, MenuItem, Table, Button,  } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import axios from 'axios';

const socket = socketIOClient("http://localhost:3001");

const cellEditProp = {
    mode: 'dbclick',
    beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
    afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

function onAfterSaveCell(row, cellName, cellValue) {
    alert(`Save cell ${cellName} with value ${cellValue}`);
    axios.get(`/products/admin/${row.id}/${cellValue}`)
        .then(({ data }) => {
            socket.emit('update price', data)
        }).then(() => {
            axios.post(`/bookmarks/test/admin/${row.id}/${cellValue}`)
                .then(({ data }) => {
                    console.log(data)
                })
            
        })


}

function onBeforeSaveCell(row, cellName, cellValue) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    return true;
}

 class List extends Component {
     constructor(props) {
         super(props);
         this.state = {
             lists: [],
             title: 'from'
         }

         this.options = {
             defaultSortName: 'name',  // default sort column name
             defaultSortOrder: 'desc'  // default sort order
         };
     }

     componentDidMount() {
         axios.get('/products/admin/all')
             .then(({ data }) => {
                 this.setState({
                     lists: data
                 })
             })
     }

     getInfo = () => {
         axios.get(`/products/${this.state.query}/${this.state.title}`)
             .then(({ data }) => {
                 console.log(data)
                 this.setState({
                     lists: data
                 })
             })
     }


     handleInputSubmit = (e) => {
         e.preventDefault();
         if (this.state.query && this.state.query.length > 1) {
             this.getInfo();
         }
     }

     handleInputChange = (e) => {
         this.setState({
             query: e.target.value
         })
     }

     handleDropdownChange = (eventKey, event) => {
         this.setState({ title: event.target.text });  
     }


    render() {   
        const socket = socketIOClient('http://localhost:3001');
        return <div>
            <form onSubmit={this.handleInputSubmit}>
              <input type="text" value={this.state.value} placeholder="Add product..." onChange={this.handleInputChange} />
              <DropdownButton bsStyle="primary" title={this.state.title} onSelect={this.handleDropdownChange}>
                <MenuItem eventKey="1">ebay</MenuItem>
                <MenuItem eventKey="2">google-shopping</MenuItem>
              </DropdownButton>
              <input type="submit" value="Add" />
            </form>
            <h1>List Items:</h1>

            <BootstrapTable data={this.state.lists} cellEdit={cellEditProp} options={this.options}>
              <TableHeaderColumn dataField="id" isKey width="40" dataSort>
                #
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" width="40%">
                Product Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="shop_name" width="40%">
                Shop Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="price" width="150" editable={{ type: "textarea" }}>
                Product Price
              </TableHeaderColumn>
            </BootstrapTable>
          </div>;
    }
}


export default List;