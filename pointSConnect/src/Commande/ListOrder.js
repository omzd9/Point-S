import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "antd/dist/antd.css";
import { Comment, Tooltip, List } from "antd";
import moment from "moment";
import { API_BASE_URL } from '../constants'

class ListOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
      ]
    };
  }

  componentDidMount() {
    fetch(API_BASE_URL + "/orders")
      .then(res => res.json())
      .then(
        (results) => {
          results.map(
            result =>
            this.setState({
              data: [
                {
                  id: result.id,
                  author: result.author.name,
                  content: <bold>{result.object}</bold>,
                  datetime: (
                    <Tooltip
                      title={moment(result.createdAt)
                        .format("YYYY-MM-DD HH:mm:ss")}
                    >
                      <span>
                        {moment(result.createdAt)
                          .fromNow()}
                      </span>
                    </Tooltip>
                  ),
              }, ...this.state.data
            ]})
        );
      },
  
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  onFinish() {
    console.log('finished!');
  }

  render() {  
    return (
        <List
        itemLayout="horizontal"
        dataSource={this.state.data}
        renderItem={item => ( 
        <List.Item>
            <List.Item.Meta
            title={<Link to={"/orders/"+item.id} style={{textDecoration: 'none'}}> {"Commande N°: "+item.id} <span style={{fontWeight: 'lighter'}}>, {item.datetime}</span> </Link>}
            description={"Créer par : "+item.author}
            />
        </List.Item>
        )}
    />   
    );
    }
  }
  
  export default ListOrder;