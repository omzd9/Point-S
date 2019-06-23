import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Home from '@material-ui/icons/Home';
import Description from '@material-ui/icons/Description';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Account from '@material-ui/icons/HowToReg';
import History from '@material-ui/icons/History';

import Event from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import Create from '@material-ui/icons/Create';
import Money from '@material-ui/icons/MonetizationOn';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


function OrdersListItems() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List>      
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
        <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Mes commandes"/>
        {open ? <ExpandMore /> : <ExpandLess />}
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink href="/orders" button className={classes.nested}>
          <ListItemIcon>
              <Create />
          </ListItemIcon>
            <ListItemText primary="Passer une commande" />
          </ListItemLink>
          <ListItemLink href="/orders" button className={classes.nested}>
          <ListItemIcon>
              <History />
          </ListItemIcon>
            <ListItemText primary="Historique des commandes" />
          </ListItemLink>
        </List>
      </Collapse>
    </List>
  );
}
function AddContenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  function handleClick() {
    setOpen(!open);
  }
  return (
    <List>      
    <ListItem button onClick={handleClick}>
      <ListItemIcon>
        <NoteAdd />
      </ListItemIcon>
      <ListItemText primary="Add"/>
      {open ? <ExpandMore /> : <ExpandLess />}
    </ListItem>
    <Collapse in={!open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemLink href="/addEvent" button className={classes.nested}>
        <ListItemIcon>
            <Event />
        </ListItemIcon>
          <ListItemText primary="Ajouter un event" />
        </ListItemLink>
        <ListItemLink href="/addPromo" button className={classes.nested}>
        <ListItemIcon>
            <Money />
        </ListItemIcon>
          <ListItemText primary="Ajouter une promo"/>
        </ListItemLink>
        <ListItemLink href="/addAccount" button className={classes.nested}>
        <ListItemIcon>
            <Account />
        </ListItemIcon>
          <ListItemText primary="Ajouter un compte" />
        </ListItemLink>
      </List>
    </Collapse>
  </List>
  );
}

function DocumentationListItems() {

  return (
    <List>      
      <ListItemLink href="/documentation" button >
        <ListItemIcon>
        <Description />
        </ListItemIcon>
        <ListItemText primary="Documentation"/>
      </ListItemLink>
    </List>
  );
}
function HomeListItems() {

  return (
    <List>      
      <ListItemLink href="/Home" button >
        <ListItemIcon>
        <Home />
        </ListItemIcon>
        <ListItemText primary="Home"/>
      </ListItemLink>
    </List>
  );
}
  
export const mainListItems = (
  
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <HomeListItems></HomeListItems>
    <AddContenu/>

    <OrdersListItems/>
    <DocumentationListItems></DocumentationListItems>
    
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
  
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);