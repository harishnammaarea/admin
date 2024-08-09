import { Sidebar, Sidenav, Nav } from "rsuite";
import nammaAreaLogo from "assets/icons/low-prices.png";
import CreativeIcon from "@rsuite/icons/Creative";
import PageIcon from "@rsuite/icons/Page";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UseIsMobile from "core/hooks/IsMobile";
import BookIcon from "shared/icons/BookIcon";
import UseIsTab from "core/hooks/isTab";
import MessageIcon from '@rsuite/icons/Message';

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
          <div className="sidebar-header-logo">
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
              to="/onboarding"
              activeClassName="active"
            >
              Onboarding
            </Nav.Item>
            <Nav.Item
              icon={<BookIcon fontSize="1.6rem" color="#ffffff" />}
              eventKey="1"
              as={NavLink}
              to="/overview"
              activeClassName="active"
            >
              Overview
            </Nav.Item>
            <Nav.Item
              icon={<CreativeIcon />}
              eventKey="2"
              as={NavLink}
              to="/admin/restaurants"
            >
              Restaurants
            </Nav.Item>
            <Nav.Item icon={<PageIcon />} eventKey="3" as={NavLink} to="/Orders">
              Orders
            </Nav.Item>
            <Nav.Item icon={<BookIcon fontSize="1.6rem" color="#ffffff" />}>
              Offers
            </Nav.Item>
            <Nav.Item icon={<BookIcon fontSize="1.6rem" color="#ffffff" />}>
              Customers
            </Nav.Item>
            <Nav.Item icon={<MessageIcon color="#ffffff" />}>
              Chat
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
}
