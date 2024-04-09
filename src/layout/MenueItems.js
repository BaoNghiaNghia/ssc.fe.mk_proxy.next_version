import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { NavTitle } from './style';

function MenuItems({ darkMode, toggleCollapsed, topMenu }) {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-icon" to={`${path}/tong-quan`}>
              <FiHome fontSize={16} color="gray" />
            </NavLink>
          )
        }
        key="tong-quan"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/tong-quan`}>
          Proxies
        </NavLink>
      </Menu.Item>

      {!topMenu && <NavTitle className="sidebar-nav-title">PACKAGE</NavTitle>}
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-icon" to={`${path}/business`}>
              <FiHome fontSize={16} color="gray" />
            </NavLink>
          )
        }
        key="business"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/business`}>
          Payment
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-icon" to={`${path}/ecommerce/orders`}>
              <FiHome fontSize={16} color="gray" />
            </NavLink>
          )
        }
        key="ecommerce/orders"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/orders`}>
          Packages
        </NavLink>
      </Menu.Item>
      {!topMenu && <NavTitle className="sidebar-nav-title">SUPPORT</NavTitle>}
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-icon" to={`${path}/contact/grid`}>
              <FeatherIcon icon="message-square" />
            </NavLink>
          )
        }
        key="Contact Support"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/contact/grid`}>
          Support
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
