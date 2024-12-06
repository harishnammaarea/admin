import { Sidebar, Sidenav, Nav } from "rsuite";
import nammaAreaLogo from "assets/icons/low-prices.png";
import CreativeIcon from "@rsuite/icons/Creative";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UseIsMobile from "core/hooks/IsMobile";
import BookIcon from "shared/icons/BookIcon";
import UseIsTab from "core/hooks/isTab";

export default function SideBar() {
  const [expand, setExpand] = useState(true);
  const isMobile = UseIsMobile();
  const isTab = UseIsTab();

  useEffect(() => {
    if (isMobile) {
      setExpand(false);
    } else if (isTab) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  }, [isMobile, isTab]);

  return (
    <Sidebar width={expand ? 220 : 56} collapsible className="sidebar-main">
      <Sidenav.Header>
        {expand ? (
          <div className="sidebar-header-logo" >
            <img
              src={nammaAreaLogo}
              alt=""
              className="namma-area-logo"
              width={150}
              height={120}
            />
          </div>
        ) : null}
      </Sidenav.Header>
      <Sidenav expanded={expand} appearance="subtle">
        <Sidenav.Body>
          <Nav>
            <Nav.Item
              icon={<BookIcon fontSize="1.6rem" color="#ffffff" />}
              eventKey="1"
              as={NavLink}
              to="/overview"
            >
              Overview
            </Nav.Item>
            <Nav.Item
              icon={<CreativeIcon />}
              eventKey="2"
              as={NavLink}
              to="/restaurants"
            >
              Restaurants
            </Nav.Item>
            <Nav.Item
              icon={<CreativeIcon />}
              eventKey="3"
              as={NavLink}
              to="/menu"
            >
              Menu
            </Nav.Item>
            {/* <Nav.Item icon={<PageIcon />} eventKey="3" as={NavLink} to="/area-admin/add-area-admin">
              Area Admin
            </Nav.Item> */}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
}
