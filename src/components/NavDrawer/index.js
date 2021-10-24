import React, { useEffect } from "react";
import clsx from "clsx";
import { Drawer, AppBar } from "@material-ui/core";
import NavContent from "./NavContent";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import SmallNavHeader from "./SmallNavHeader";
import styles from "./styles";
import { APP } from "../../routes/constants";
import MyProfile from "../../routes/patient/my-profile";
import Frgpass from '../../routes/pharmacist/password-recovery';

const NavDrawer = ({
  menu,
  role,
  notifications,
  logout,
  onLogout,
  badgeContent,
}) => {
  useEffect(() => {
    window.addEventListener("resize", resizeDevice);
  }, []);
  const resizeDevice = () => {
    if (window.innerWidth < 800) setOpen(false);
    else setOpen(true);
  };
  const {
    root,
    drawer,
    drawerClose,
    drawerOpen,
    navContent,
    topDrawer,
    color,
  } = styles({
    role,
  });

  const [isOpen, setOpen] = React.useState(!(window.innerWidth < 800));
  function toggleDrawer() {
    setOpen(!isOpen);
  }

  return (
    <Router>
      <div className={root}>
        <AppBar position="fixed" className={topDrawer}>
          <SmallNavHeader
            toggleDrawer={toggleDrawer}
            notifications={notifications}
            logout={logout}
            onLogout={onLogout}
            badgeContent={badgeContent}
            role={role}
          />
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(drawer, {
            [drawerOpen]: isOpen,
            [drawerClose]: !isOpen,
          })}
          classes={{
            paper: clsx({
              [drawerOpen]: isOpen,
              [drawerClose]: !isOpen,
            }),
          }}
        >
          <NavContent menu={menu} isOpen={isOpen} toggleDrawer={toggleDrawer} />
        </Drawer>
        <div className={navContent}>
          <Switch>
            {menu.map((route) =>
              route.children ? (
                route.children.map((child) => (
                  <Route exact path={child.to} component={child.component} />
                ))
              ) : (
                <Route exact path={route.to} component={route.component} />
              )
            )}
            <Route exact path="/my-profile" component={MyProfile}/>
            <Route exact path="/change-password" component={Frgpass}/>
            <Redirect from="*" to={APP} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default React.memo(NavDrawer);
