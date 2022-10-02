import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Col, Layout, Menu, Row, Typography } from "antd";
import { LoginOutlined, HomeOutlined } from "@ant-design/icons";

const { Header } = Layout;

const items = [{ label: "Login", key: "/login", icon: <LoginOutlined /> }];

const { Title } = Typography;

const PageHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currrent, setCurrent] = useState(location?.pathname || "");

  useEffect(() => {
    setCurrent(location?.pathname || "");
  }, [location]);

  const handleClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <Row>
        <Col span={8}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <HomeOutlined
              style={{ fontSize: "30px", color: "#fff" }}
              onClick={() => navigate("/")}
            />

            <Title
              style={{ color: "#fff", marginTop: "15px", marginLeft: "10px" }}
              level={3}
            >
              City Lister
            </Title>
          </span>
        </Col>
        <Col offset={8} span={8}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[]}
            items={items}
            selectedKeys={[currrent]}
            onClick={handleClick}
            style={{ justifyContent: "flex-end" }}
          />
        </Col>
      </Row>
    </Header>
  );
};

export default PageHeader;
