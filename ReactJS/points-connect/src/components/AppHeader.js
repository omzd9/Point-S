import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import '../assets/css/AppHeader.css';
import { Avatar, Layout, Menu, Dropdown } from 'antd';
import { getAvatarColor } from '../util/Colors';
const Header = Layout.Header;
const SubMenu = Menu.SubMenu;

    
class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
        let menuItems;
        if(this.props.currentUser) {
          menuItems = [
            <SubMenu title="Mes commandes">
                <Menu.Item key="commande:1">
                  <Link to="/commande">Passer une commandes</Link>
                </Menu.Item>
                <Menu.Item key="commande:2">
                  Historique des commandes
                </Menu.Item>
            </SubMenu>,
            <Menu.Item >
              Documentation
            </Menu.Item>,
            <Menu.Item className="myaccount-menu">
                  <MyAccountDropdownMenu 
                    currentUser={this.props.currentUser} 
                    handleMenuClick={this.handleMenuClick}/>
            </Menu.Item>
          ]; 
        } else {
          menuItems = [
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>,
           <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>                  
          ];
        }

        return (
          <Header className="app-header">
            <div className="container">
              <div className="app-title" >
                <Link to="/"> <img src={require("../images/logo.jpg")} alt="Logo" /> </Link>
              </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                  {menuItems}
              </Menu>
            </div>
          </Header>
        );
    }
}

function MyAccountDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.ItemGroup title={props.currentUser.name}>   
        <Menu.Item className="dropdown-item">
          Tickets
        </Menu.Item>     
        <Menu.Item className="dropdown-item">
          <Link to={`/users/${props.currentUser.username}`}>Espace Personnel</Link>
        </Menu.Item>
        <Menu.Item className="dropdown-item">
          Agenda
        </Menu.Item>
        <Menu.Item className="dropdown-item">
          Réclamation
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" className="dropdown-item">
          Logout
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('myaccount-menu')[0]}>
      <a className="ant-dropdown-link" href="#">
        <Avatar style={{ backgroundColor: getAvatarColor(props.currentUser.name)}}>
            {props.currentUser.name[0].toUpperCase()}
        </Avatar>
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);