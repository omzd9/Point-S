import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "antd/dist/antd.css";
import { Comment, Tooltip, List } from "antd";
import moment from "moment";
import { Statistic, Row, Col } from 'antd';
import { API_BASE_URL } from '../constants'

const { Countdown } = Statistic;

class ListRequete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
      ]
    };
  }

  componentDidMount() {
    fetch(API_BASE_URL + "/requetes")
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
                  deadline: moment(result.delai).format("YYYY-MM-DD HH:mm:ss")
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
        className="comment-list"
        itemLayout="horizontal"
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item> 
            <List.Item.Meta
              title={
                <Link to={"/requetes/"+item.id} style={{textDecoration: 'none'}}>
                <Comment
                    author={item.author}
                    content={item.content}
                    datetime={item.datetime}
                  />
              </Link>
              }
            />

            <div><Countdown value={item.deadline} onFinish={this.onFinish} /></div>
            
          </List.Item>
        )}
      />
    );
    }
  }
  
  export default ListRequete;