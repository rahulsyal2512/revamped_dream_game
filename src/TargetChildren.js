import React, { Component } from "react";
import styled from "styled-components";
import { DropTarget } from "react-dnd";

const ChildrenContainer = styled.div`
  width: 49%;
  padding: 10px 5px;

  div.description {
    padding: 10px 20px;
    text-align: center;
    background: orange;
    word-break: break-word;
    height: 40px;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  img.image {
    width: 32%;
    height: 70%;
    margin-top: 10px;
  }

  img.wish {
    width: 50%;
    justify-content: center;
    display: flex;
    margin: -20px auto 30px;
  }
  img.dream {
    width: 100%;

    margin-top: 10px;
    margin-left: -7px;
    margin-bottom: 20px;
  }
  div.target-boxes {
    width: 32%;
    margin-top: 20px;
  }
  @media (max-width: 1024px) {
    width: 47%;
  }
`;

const TargetImages = styled.div`
  width: 100%;
  height: 10vh;
  background: url("${props => props.image}");
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  @media (max-height: 400px){
    height: 9vh;
  }
  @media (max-height: 600px){
    height: 8vh;
  }
`;

const Flex = styled.div`
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: ${props => props.direction};
`;

const DreamImage = styled.div`
  width: 35%;
  margin-top: 10px;
  height: 70%;
  background: url("${props => props.image}");
  background-size: contain;
  background-repeat: no-repeat;
`;

const WishesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  margin-left: 17px;
`;

const itemTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();

    if (monitor.didDrop()) {
      return;
    }

    props.addDreams(props.content, item.object);
  }
  // hover(props, monitor, component) {
  //   component.setState({ background: "red" });
  // }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
}

class WishesGame extends Component {
  handleDroppedWished = () => {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div>
        <WishesContainer>{this.renderDreams()}</WishesContainer>
      </div>
    );
  };
  renderDreams = () => {
    const { content, hovered } = this.props;
    // const background = hovered ? "lightgreen" : "white";
    let images = [];
    for (let i = 0; i < 3; i++) {
      images.push(
        <TargetImages image={content.targetBoxes}>
          <img
            src={content.dreams[i] ? content.dreams[i].imageUrl : null}
            className="wish"
            backgroundImage={content.dreamImgUrl}
          ></img>
        </TargetImages>
      );
    }
    return images;
  };
  render() {
    const { content } = this.props;
    return (
      <ChildrenContainer key={content.id}>
        <Flex direction={content.direction}>
          <img src={content.imageUrl} className="image"></img>
          <DreamImage image={content.dreamUrlBackground}>
            <img src={content.dreamImgUrl} className="dream"></img>
          </DreamImage>
          <div className="target-boxes">{this.handleDroppedWished()}</div>
        </Flex>
      </ChildrenContainer>
    );
  }
}

export default DropTarget("item", itemTarget, collect)(WishesGame);
