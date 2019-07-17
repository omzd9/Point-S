import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Home from '@material-ui/icons/Home';
import Calendar from '@material-ui/icons/Today';
import Description from '@material-ui/icons/Description';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Account from '@material-ui/icons/HowToReg';
import History from '@material-ui/icons/History';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ParametreIcon from '@material-ui/icons/PermDataSetting';
import Event from '@material-ui/icons/Event';
import Create from '@material-ui/icons/Create';
import Money from '@material-ui/icons/MonetizationOn';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";


function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
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

function RequeteListItems() {
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
        <ListItemText primary="Mes Requetes"/>
        {open ? <ExpandMore /> : <ExpandLess />}
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink to="/requetes/add" button className={classes.nested}>
          <ListItemIcon>
              <Create />
          </ListItemIcon>
            <ListItemText primary="Ajouter une requete" />
          </ListItemLink>
          <ListItemLink to="/requetes" button className={classes.nested}>
          <ListItemIcon>
              <History />
          </ListItemIcon>
            <ListItemText primary="Historique des requetes" />
          </ListItemLink>
        </List>
      </Collapse>
    </List>
  );
}

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
          <ListItemLink to="/orders" button className={classes.nested}>
          <ListItemIcon>
              <Create />
          </ListItemIcon>
            <ListItemText primary="Passer une commande" />
          </ListItemLink>
          <ListItemLink to="/orders" button className={classes.nested}>
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
        <ListItemLink to="/addEvent" button className={classes.nested}>
        <ListItemIcon>
            <Event />
        </ListItemIcon>
          <ListItemText primary="Ajouter un event" />
        </ListItemLink>
        <ListItemLink to="/addPromo" button className={classes.nested}>
        <ListItemIcon>
            <Money />
        </ListItemIcon>
          <ListItemText primary="Ajouter une promo"/>
        </ListItemLink>
        <ListItemLink to="/addAccount" button className={classes.nested}>
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

function ParameterDataListeItems(){
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  function handleClick() {
    setOpen(!open);
  }
  return (
    <List>      
    <ListItem button onClick={handleClick}>
      <ListItemIcon>
        <ParametreIcon />
      </ListItemIcon>
      <ListItemText primary="Paramètres"/>
      {open ? <ExpandMore /> : <ExpandLess />}
    </ListItem>
    <Collapse in={!open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemLink to="/usersTable" button className={classes.nested}>
        <ListItemIcon>
            <AccountBoxIcon/>
        </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemLink>
        <ListItemLink to="/addPromo" button className={classes.nested}>
        <ListItemIcon>
            <Money />
        </ListItemIcon>
          <ListItemText primary="Ajouter une promo"/>
        </ListItemLink>
        <ListItemLink to="/addAccount" button className={classes.nested}>
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
      <ListItemLink to="/documentation" button >
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
      <ListItemLink to="/home" button >
        <ListItemIcon>
        <Home />
        </ListItemIcon>
        <ListItemText primary="Home"/>
      </ListItemLink>
    </List>
  );
}

function CalendarListItems() {

  return (
    <List>      
      <ListItemLink to="/calendar" button >
        <ListItemIcon>
        <Calendar />
        </ListItemIcon>
        <ListItemText primary="Calendar"/>
      </ListItemLink>
    </List>
  );
}
  
export const adminListItems = (
  <div>

    <HomeListItems/>
    <AddContenu/>
    <ParameterDataListeItems/>
    <DocumentationListItems/>
    
  </div>
);

export const grCompteListItems = (
  <div>
    
  </div>
);

export const cdgListItems = (
  <div>
    
  </div>
);

export const franchiseListItems = (
  <div>
    <HomeListItems/>
    <CalendarListItems/>
    <RequeteListItems/>
    <OrdersListItems/>
    <DocumentationListItems/>
  </div>
);