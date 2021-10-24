import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Collapse from "@material-ui/core/Collapse";
import { Link } from "react-router-dom";
import {
  Person,
  PersonAdd,
  PlayArrow,
  Shop,
  ClearAll,
  BarChart,
  CreditCard,
  ViewList,
  ContactPhone,
  LocalHospital,
  Assignment,
  Search,
  History,
  Description,
} from "@material-ui/icons";

const styles = (theme) => ({
  textItem: {
    color: "hsla(0,0%,100%,.8)",
    fontSize: 12,
    textTransform: "uppercase",
    whiteSpace: "normal",
    "&:hover": {
      color: "#ffffff",
    },
    marginLeft: "3px",
  },
  selected: {
    color: "#ffffff !important",
  },
  list: {
    paddingBottom: 0,
    marginTop: 20,
  },
  icon_class_container: {
    margin: "0px 20px",
    height: 50,
    display: "flex",
    alignItems: "center",
    marginBottom: 14,
  },
  drop_down_icon_open: {
    webkitTransform: "rotate(90deg)",
    transform: "rotate(90deg)",
  },
  drop_down_icon_close: {
    webkitTransform: "rotate(0deg)",
    transform: "rotate(0deg)",
  },
  headerIcons: {
    minWidth: 40,
    marginRight: 10,
    position: "relative",
  },
  displayFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemChildren: {
    background: "none",
    position: "relative",
    marginLeft: "80px",
    "&:hover": {
      color: "#ffffff",
      textDecoration: "none",
    },
    color: "hsla(0,0%,100%,.8)",
  },
  subTitle: {
    fontSize: 14,
    height: 50,
    position: "relative",
    color: "hsla(0,0%,100%,.8)",
    "&:hover": {
      color: "#ffffff",
      textDecoration: "none",
    },
    textTransform: "uppercase",
  },
  icon: {
    fontSize: 14,
    color: "hsla(0,0%,100%,.8)",
    marginLeft: 45,
    "&:hover": {
      color: "#ffffff",
    },
  },
  iconClose: {
    display: "none",
  },
  color: {
    color: "#ffffff",
  },
  dot: {
    color: "#ffffff",
    position: "absolute",
    top: -2,
    left: 18,
    fontSize: 9,
  },
  dotInner: {
    color: "#ffffff",
    position: "absolute",
    top: 0,
    left: 68,
    fontSize: 8,
  },
  listHeading: {
    "&:hover": {
      color: "Black",
      textDecoration: "none",
    },
  },
});

const NavListWithCollapse = ({
  classes: {
    icon_class_container,
    textItem,
    selected,
    list,
    listHeading,
    drop_down_icon_open,
    drop_down_icon_close,
    displayFlex,
    headerIcons,
    listItemChildren,
    subTitle,
    icon,
    color,
    iconClose,
    dot,
    dotInner,
  },
  menu,
  isOpen,
  toggleDrawer,
}) => {
  const [data_open, set_data] = React.useState({});
  const [isSelected, setSelected] = React.useState();
  const is_parent = (children) => Boolean(children) && Boolean(children.length);
  const open_data = (property) =>
    set_data({ ...data_open, [property]: !data_open[property] });
  const handleClick = (title) => {
    setSelected(title);
  };
  const getIcon = (icon_type) => {
    switch (icon_type) {
      case "BarChart":
        return <BarChart className={color} />;
      case "CreditCard":
        return <CreditCard className={color} />;
      case "ViewList":
        return <ViewList className={color} />;
      case "ContactPhone":
        return <ContactPhone className={color} />;
      case "LocalHospital":
        return <LocalHospital className={color} />;
      case "Assignment":
        return <Assignment className={color} />;
      case "Person":
        return <Person className={color} />;
      case "PersonAdd":
        return <PersonAdd className={color} />;
      case "Shop":
        return <Shop className={color} />;
      case "SearchIcon":
        return <Search className={color} />;
      case "PersonAdd":
        return <PersonAdd className={color} />;
      case "History":
        return <History className={color} />;
      case "Description":
        return <Description className={color} />;
      default:
        return <ClearAll className={color} />;
    }
  };

  const onClick = (title) => {
    if (toggleDrawer && window.innerWidth < 800) toggleDrawer();
    open_data(title);
  };

  return (
    <div className={list}>
      {Boolean(menu && menu.length)
        ? menu.map(({ to, component, icon_type, title, children }, index) => {
            return (
              <React.Fragment key={title + index}>
                <Link
                  to={to}
                  onClick={() => onClick(title)}
                  className={listHeading}
                >
                  <div className={icon_class_container}>
                    <div className={`${displayFlex} ${headerIcons}`}>
                      {getIcon(icon_type)}
                    </div>
                    <div
                      className={`${textItem} ${
                        data_open[title] ? selected : ""
                      } ${!isOpen && "hide"}`}
                    >
                      {title || "No title"}
                    </div>
                    {is_parent(children) && (
                      <PlayArrow
                        className={`${isOpen ? icon : iconClose}
                            ${
                              data_open[title]
                                ? drop_down_icon_open
                                : drop_down_icon_close
                            }`}
                      />
                    )}
                  </div>
                </Link>
                {is_parent(children) && (
                  <Collapse in={data_open[title]} timeout="auto" unmountOnExit>
                    <div>
                      {children.map(({ to, title }, index) => {
                        return (
                          <Link
                            to={to}
                            onClick={() => handleClick(title)}
                            className={`${displayFlex} ${listItemChildren}`}
                          >
                            <div
                              className={`${subTitle} ${
                                isSelected === title ? selected : ""
                              }`}
                            >
                              {title}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })
        : null}
    </div>
  );
};

export default withStyles(styles)(NavListWithCollapse);
