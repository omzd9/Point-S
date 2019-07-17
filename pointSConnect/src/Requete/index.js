
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import ListRequest from './listRequete';
import ListTicket from './listTicket';
import AddRequest from './addRequete';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;


class Request extends Component {
  render() {
    return (
        <div>
            <AddRequest/>
      </div>
    );
    }
}

export default Request;