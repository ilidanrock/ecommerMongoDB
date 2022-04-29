import styled from "styled-components";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useState } from "react";
import { sliderItems } from "../data";
import {mobile, table} from '../responsive'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({display: "none"})}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props)=> props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${table({flex: "0", width: "60%"})}
`;
const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${table({flex: "0", width: "40%"})}
`;
const Title = styled.h1`
  font-size: 70px;
  ${table({ fontSize: "40px"})}
`;
const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {

    if (direction === 'left') {
        setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2 )
    }else{
        setSlideIndex(slideIndex<2 ? slideIndex +1 : 0)
    }
  };
  return (
    <Container>
      <Arrow direction={"left"} onClick={() => handleClick("left")}>
        <ArrowBackRoundedIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex} >
        {sliderItems?.map((item) => (
          <div key={item.id} >
            <Slide bg={item.bg}  >
              <ImgContainer>
                <Image src={item.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Description>{item.desc}</Description>
                <Button>SHOW NOW</Button>
              </InfoContainer>
            </Slide>
          </div>
        ))}
      </Wrapper>
      <Arrow direction={"right"} onClick={() => handleClick("right")}>
        <ArrowForwardRoundedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
