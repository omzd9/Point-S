import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Comment, Avatar, Form, Button, List, Input, Tooltip, notification } from 'antd';
import moment from 'moment';
import { API_BASE_URL } from '../constants'
import { createReply } from '../util/APIUtils'

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header="Objet : Le titre du requete"
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, body }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={body} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class Ticket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      reply: {
        body : ''
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    fetch(API_BASE_URL + "/requetes/"+id)
      .then(res => res.json())
      .then(
        (results) => {
          this.setState({
            id: id,
            comments: [
              {
                id: results.id,
                author: results.author.name,
                avatar: <Avatar style={{ backgroundColor: '#4834d4'}}> {results.author.name [0].toUpperCase()}</Avatar>,
                content: <bold>{results.body}</bold>,
                datetime: (
                  <Tooltip
                    title={moment(results.createdAt)
                      .format("YYYY-MM-DD HH:mm:ss")}
                  >
                    <span>
                      {moment(results.createdAt)
                        .fromNow()}
                    </span>
                  </Tooltip>
                )
              }
            ]});

          results.replies.map(
            reply =>
            this.setState({
              comments: [
                ...this.state.comments,
                {
                  id: reply.id,
                  author: reply.author.name,
                  avatar: <Avatar style={{ backgroundColor: '#4834d4'}}> {reply.author.name [0].toUpperCase()}</Avatar>,
                  content: <bold>{reply.body}</bold>,
                  datetime: (
                    <Tooltip
                      title={moment(reply.createdAt)
                        .format("YYYY-MM-DD HH:mm:ss")}
                    >
                      <span>
                        {moment(reply.createdAt)
                          .fromNow()}
                      </span>
                    </Tooltip>
                  )
              }, 
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

  handleSubmit(event) {
    event.preventDefault();

  createReply(this.state.id, this.state.reply)
    .then(response => {
        notification.success({
            message: 'Polling App',
            description: "Event successfully has been added !",
        });
        this.setState({ 
          comments: [
            ...this.state.comments,
            {
              author: this.props.currentUser.name,
              avatar: <Avatar style={{ backgroundColor: '#4834d4'}}>{this.props.currentUser.name  [0].toUpperCase()}</Avatar>,
              content: <p>{this.state.reply.body}</p>,
              datetime: moment().fromNow(),
            },
          ],
        });    
        
    }).catch(error => {
        notification.error({
            message: 'Polling App',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
    });
    
}

  handleChange = e => {
    this.setState({
      reply:{
        body : e.target.value
      },
    });
  };

  render() {
    const { comments, reply } = this.state;

    return (
      <div>
        <CommentList comments={comments} />
        <Comment
          avatar={
            <Avatar style={{ backgroundColor: '#4834d4'}}>{this.props.currentUser.name  [0].toUpperCase()}</Avatar>
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              body={reply.body}
            />
          }
        />
      </div>
    );
    }
}

export default Ticket;