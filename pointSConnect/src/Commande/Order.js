import React, { Component } from "react";

import "antd/dist/antd.css";
import { Table, Tooltip } from "antd";
import moment from "moment";
import { API_BASE_URL } from '../constants'

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {}
    };
    this.columns = [
        {
          title: "Produit",
          dataIndex: "product",
          width: "50%"
        },
        {
          title: "Quantité",
          dataIndex: "quantity",
          width: "25%",
        },
        {
          title: "price",
          dataIndex: "price",
          width: "25%"
        }
      ];
  }

  componentDidMount() {
    const { id } = this.props.match.params
    fetch(API_BASE_URL + "/orders/"+id)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({
              data: 
                {
                  id: result.id,
                  author: result.author.name,
                  orderProducts:[],
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
              }
            });

            result.orderProducts.map(
                (orderProduct)=>{
                    this.setState({
                        data: {
                            ...this.state.data,
                            orderProducts : [
                                ...this.state.data.orderProducts,
                                {
                                    product: orderProduct.product.name,
                                    quantity:  orderProduct.quantity,
                                    price:   orderProduct.product.price * orderProduct.quantity,
                                }
                            ]
                        }
                    }
                    );
                }
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
      const data = this.state.data;
    return (
        
        <div>
            <span style={{fontWeight: 'bold'}}>Commande N°: {data.id}</span> <span style={{fontWeight: 'lighter'}}>, {data.datetime}</span> 
            <br/><br/>
            <span>Créer par : {data.author}</span>
            <br/><br/>
            <Table
            bordered
            dataSource={this.state.data.orderProducts}
            columns={this.columns}
            rowClassName="editable-row"
            pagination={{
                onChange: this.cancel
            }}
            />
        </div>   
    );
    }
  }
  
  export default Order;