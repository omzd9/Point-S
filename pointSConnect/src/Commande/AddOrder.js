import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddOrderStepper from './AddOrderStepper'


import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  }
}));

export default function AddOrders() {
  const classes = useStyles();

  return (
    <div>
        <h2>Passer une commande</h2>

      <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <AddOrderStepper />
        </Content>
    
    </div>
  );
}