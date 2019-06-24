import { Table, Input, Button, Popconfirm, Form } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';
import "../assets/css/tables.css"
import { API_BASE_URL} from '../constants';

class Users extends Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '30%',
        
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Username',
        dataIndex: 'username',
      },
      {
        title: 'Role',
        dataIndex: "roles[0].name", 
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.username,record.id)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: []
      };
 
      }
  componentDidMount(){
      fetch(API_BASE_URL + "/users")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                dataSource: result
              });
            },

            (error) => {
              this.setState({
                error
              });
            }
          );      
  }

handleDelete (username,id ) {
 
    axios.delete(API_BASE_URL + "/user/"+ username +"/delete");
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== id) }); 
  }
 

  render() {

    const columns = this.columns.map(col => {
        return col;
    });
    const {dataSource} = this.state; 
    return (
      <div>
      <h1 className="page-title">La liste des utilisateurs </h1>
        <Table
         
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}


export default Users;