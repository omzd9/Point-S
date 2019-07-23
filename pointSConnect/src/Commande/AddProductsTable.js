import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Button, Table, notification, message, Input, InputNumber, Popconfirm, Form } from "antd";
import { createOrder } from 'util/APIUtils';
import { Select } from "antd";
import { API_BASE_URL } from '../constants';

const { Option } = Select;

const dataSource = [];

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        products:[]
      }
  }
  
  componentDidMount() {
    fetch(API_BASE_URL + "/products")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            products: result
          });
        },

        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  getInput = () => {
    switch(this.props.dataIndex){
      case "product":
        const product = 
           <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a product"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {   this.state.products.map((product)=>
                            {
                                return (
                                    <Option value={product}>{product.name}</Option>
                                )
                            })
                  }
                  </Select>;
          return product;
      
      case "quantity":
          return <InputNumber  min={1} max={30} defaultValue={1}
          parser={value => value.replace('.', ',')} onChange={this.onChange}/>;

      case "price":
        return <p>{this.state.pu}</p>;
    }
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          title=="price"?
        (<p>price</p>):(children)
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class AddProductsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [], count: 0, editingKey: ""};
    this.columns = [
      {
        title: "Produit",
        dataIndex: "product",
        width: "40%",
        editable: true,
        render: (text, record) => {
          const product = this.state.dataSource[record.key].product
          if(product)
            return product.name;
        }
      },
      {
        title: "Quantité",
        dataIndex: "quantity",
        width: "20%",
        editable: true
      },
      {
        title: "price",
        dataIndex: "price",
        width: "20%",
        render: (text, record) => {
          const product = this.state.dataSource[record.key].product
          if(product)
            return this.state.dataSource[record.key].quantity * product.price;
        }
      },
      {
        title: "Operation",
        dataIndex: "operation",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);

          const operation = editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    href="javascript:;"
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <div>
              <a
                disabled={editingKey !== ""}
                onClick={() => this.edit(record.key)}
              >
                Edit
              </a>{" "}
              |{" "}
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            </div>
          );

          return this.state.dataSource.length >= 1 ? (
            <div>{operation}</div>
          ) : null;
        }
      }
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ dataSource: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ dataSource: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count
    };
    this.setState({
      dataSource: [...dataSource, newData],
      editingKey: count,
      count: count + 1
    });
  };

  handleSubmit = e => {
    const requete = {
      orderProducts: [...this.state.dataSource]
    };
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
              createOrder(requete)
                .then(response => {
                  message.success("requete envoyer");
                  this.setState({
                                  products:[]
                                });
                }).catch(error => {
                  notification.error({
                      message: 'Polling App',
                      description: JSON.stringify(requete)
                  });                                            
                });
            }
    });
  };

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "quantity" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          bordered
          dataSource={this.state.dataSource}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel
          }}
        />
        <Button
          onClick={this.handleSubmit}
          type="primary"
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          Submit
        </Button>
      </EditableContext.Provider>
    );
  }
}

const AddProductsForm = Form.create()(AddProductsTable);

export default AddProductsForm;          