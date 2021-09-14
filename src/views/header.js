import React from "react";
import { Button, Row, Col, Space, Anchor, Drawer } from "antd";
import { HeartTwoTone } from '@ant-design/icons';
import logo from '../img/logo.svg'

const { Link } = Anchor;

export default function AppHeader(info) {
  console.log(info)
  return (
    <div>
      <div className="header">
        <Row align="middle" justify="space-between">
          <img src={logo} style={{ width: 50 }} alt="" />
          <Anchor className="anchor" targetOffset="70">
            <Button type="link">
              <Link href="#reservar" title={info.info}/>
            </Button>
          </Anchor>
        </Row>
      </div>
      

    </div>
  );
}
