import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Document from "../views/Document";
import addPromo from "../views/addPromo";
import addEvent from "../views/addEvent"
import List from '@material-ui/core/List';
import Home from "../views/Home";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { adminListItems, franchiseListItems, cdgListItems, grCompteListItems } from '../listItems';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import NotificationsIcon from '@material-ui/icons/Notifications';
import addAccount from "../views/addAccount";
import Users from "../views/Users";
import Logo from '../assets/logo_points.png';
import UserInfo from '../UserInfo';
import Profile from '../views/Profile';
import Actualite from "../views/Actualite";
import Promotions from "../views/Promotions";
import AddOrders from '../AddOrder';
import Calendar from '../calendar';
import AddRequete from '../Requete/addRequete';
import ListRequete from '../Requete/listRequete';
import Ticket from '../Requete/listTicket';



function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Point S Created by SETTAI, ZOUAID Copyright ©2019 All Rights Reserved. '}
    </Typography>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function MainListItems(props){
  switch(props.currentUser.role){
    case "ROLE_GR_COMPTE":
      return (grCompteListItems);
    case "ROLE_ADMIN":
      return (adminListItems);
    case "ROLE_CDG":
      return (cdgListItems);
    case "ROLE_FRANCHISE":
      return (franchiseListItems);
    default :
      return (grCompteListItems);
  }
}

export default function MainApp(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbarIcon}>
          <UserInfo currentUser={props.currentUser} handleLogout={props.handleLogout} />
        </div>
        <Divider />
        <List> 
          <MainListItems currentUser={props.currentUser}/>
        </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <div noWrap className={classes.title}>
            <img src={Logo} width="100"/>
          </div>

          <IconButton edge="end" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg" className={classes.container}>
            <Switch> 
              <Route exact path="/requetes" component={ListRequete}/>
              <Route path="/requetes/add" component={AddRequete}/>
              <Route path="/requetes/:id" 
                render={(rest) => <Ticket currentUser={props.currentUser} {...rest}  />}>
              </Route>
              <Route path="/orders/add" component={AddOrders}/>
              <Route path="/orders/" component={AddOrders}/>
              <Route path="/home" component={Home}></Route>
              <Route path="/calendar" component={Calendar}></Route>
              <Route path="/addEvent" component={addEvent}></Route>
              <Route path="/addPromo" component={addPromo}></Route>
              <Route path="/documentation" component={Document}></Route>
              <Route path="/addAccount" component={addAccount}></Route>
              <Route path="/usersTable" component={Users}></Route>
              <Route path="/actualiteTable" component={Actualite}></Route>
              <Route path="/promoTable" component={Promotions}></Route>

              <Route path="/users/:username" 
                render={(rest) => <Profile currentUser={props.currentUser} {...rest}  />}>
              </Route>
            </Switch>
        </Container>
        <Footer />
      </main>
      </div>
         
  );
}
