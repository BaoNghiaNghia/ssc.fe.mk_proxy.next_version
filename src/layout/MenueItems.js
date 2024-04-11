import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { NavTitle } from './style';
import { useSelector } from 'react-redux';
import { ROLE_GENERAL } from '../variables/index';

function MenuItems({ darkMode, toggleCollapsed, topMenu }) {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const { userInfo } = useSelector((state) => {
    return {
      userInfo: state?.auth?.userInfo,
    };
  });

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  console.log('---- sadosdiaso ', userInfo?.group?.role);

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
      {[ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.SUPER_ADMIN, ROLE_GENERAL.ADMIN].includes(userInfo?.group?.role) ? (
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
      ) : null}
      {[ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.SUPER_ADMIN].includes(userInfo?.group?.role) ? (
        <>{!topMenu && <NavTitle className="sidebar-nav-title">PACKAGE</NavTitle>}</>
      ) : null}
      {[ROLE_GENERAL.USER_DEFAULT].includes(userInfo?.group?.role) ? (
        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-icon" to={`${path}/package/plans`}>
                <FiHome fontSize={16} color="gray" />
              </NavLink>
            )
          }
          key="business"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/package/plans`}>
            Payment
          </NavLink>
        </Menu.Item>
      ) : null}
      {[ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.SUPER_ADMIN].includes(userInfo?.group?.role) ? (
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
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/packages`}>
            Packages
          </NavLink>
        </Menu.Item>
      ) : null}
      {[ROLE_GENERAL.USER_DEFAULT].includes(userInfo?.group?.role) ? (
        <>{!topMenu && <NavTitle className="sidebar-nav-title">SUPPORT</NavTitle>}</>
      ) : null}
      {[ROLE_GENERAL.USER_DEFAULT].includes(userInfo?.group?.role) ? (
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
      ) : null}
    </Menu>
  );
}

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
