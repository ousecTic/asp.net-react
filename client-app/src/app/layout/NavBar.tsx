import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";


interface Props{
  openForm: () => void;
}

export default function Navbar({openForm} : Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item><img src="/assets/logo.png" style={{marginRight : '10px'}}/>CRUD APP</Menu.Item>
        <Menu.Item name="Activities"/>
        <Menu.Item>
          <Button onClick={openForm} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  )
}