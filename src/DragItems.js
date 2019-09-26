import React, { Component } from "react";
import styled from "styled-components";
import { objects } from "./initialData";
import Items from "./Items";

const Container = styled.div`
  display: flex;
  height: 150px;
  margin: 0px auto 40px;
  background: url("https://res.cloudinary.com/rajatvijay/image/upload/c_scale,h_900,w_4500/v1569442353/children_dream_game/19.png");
  background-size: cover;
  background-repeat: no-repeat;
  align-items: center;
  margin-top: 10px;
  max-width: 800px;
  justify-content: center;
`;

class DragItems extends Component {
  render() {
    return (
      <Container>
        {objects.map(object => (
          <Items object={object} />
        ))}
      </Container>
    );
  }
}

export default DragItems;
