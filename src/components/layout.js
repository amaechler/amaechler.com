import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const Layout = ({ location, title, children }) => {
    const data = useStaticQuery(graphql`
        query LayoutQuery {
            site {
                siteMetadata {
                    social {
                        github
                        linkedin
                    }
                }
            }
        }
    `);

    const social = data.site.siteMetadata?.social;

    const rootPath = `${__PATH_PREFIX__}/`;
    const isRootPath = location.pathname === rootPath;
    let header;

    if (isRootPath) {
        header = (
            <h1 className="main-heading">
                <Link to="/">{title}</Link>
            </h1>
        );
    } else {
        header = (
            <Link className="header-link-home" to="/">
                {title}
            </Link>
        );
    }

    return (
        <div className="global-wrapper" data-is-root-path={isRootPath}>
            <header className="global-header">{header}</header>
            <main>{children}</main>
            <footer>
                © {new Date().getFullYear()}
                {" | "}
                <a href={`https://linkedin.com/in/${social?.linkedin}`} target="_blank" rel="noreferrer">
                    Linkedin
                </a>
                {" | "}
                <a href={`https://github.com/${social?.github}`} target="_blank" rel="noreferrer">
                    GitHub
                </a>
            </footer>
        </div>
    );
};

export default Layout;
