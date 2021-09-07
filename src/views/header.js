import React from "react";
import { Button, Row, Col, Space, Anchor, Drawer } from "antd";
import { HeartTwoTone } from '@ant-design/icons';
import logo from '../img/logo.svg'

const { Link } = Anchor;

export default function AppHeader() {
  return (
    <div>
      <div className="header">
        <Row align="middle" justify="space-between">
          <img src={logo} style={{ width: 50 }} alt="" />
          <Anchor className="anchor" targetOffset="70">
            <Link href="#reservar" title="Reservar"/>
          </Anchor>
        </Row>
      </div>
      

    </div>
  );
}
