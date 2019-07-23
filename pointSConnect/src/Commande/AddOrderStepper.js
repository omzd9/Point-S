import React from 'react';
import { Steps, Button } from 'antd';

import AddProductsTable from './AddProductsTable';

const { Step } = Steps;

const AddProductsForm = <AddProductsTable/>;

const steps = [
  {
    title: 'Ajouter les produits',
    content: <div>
               <br/>
                {AddProductsForm}
                <br/>
            </div>,
  },
  {
    title: 'Confirmer la commande',
    content: 'Second-content',
  },
  {
    title: 'Envoyer la commandes',
    content: 'Last-content',
  },
];

class AddOrderStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={this.handleSubmit}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default AddOrderStepper;