import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import {Grid} from "@material-ui/core"

interface FooterLink {
  path: string,
  text: string
}

interface Props {
    leftLinks?:FooterLink[];
    rightLinks?:FooterLink[];
    className?: string;
}

const Footer: React.FC<Props> = ({
    leftLinks,
    rightLinks,
    className
}) => {

    const renderLink =(link:FooterLink) =>(
        <Link to = {link.path} key={link.text}>
            <div><span>{link.text}</span></div>
        </Link>
    )

  return (
    <Grid container className={`footer ${className}`}>
        <Grid item sm={6} xs={12} className="footer-links">{leftLinks?.map(renderLink)}</Grid>
        <div className="border"></div>
        <Grid item sm={6} xs={12} className="footer-links footer-right">{rightLinks?.map(renderLink)}</Grid>
    </Grid>
  );
};

export default Footer;
