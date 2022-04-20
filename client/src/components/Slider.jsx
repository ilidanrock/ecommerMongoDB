import styled from "styled-components";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
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
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
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
  return (
    <Container>
      <Arrow direction={"left"}>
        <ArrowBackRoundedIcon />
      </Arrow>
      <Wrapper>
        <Slide bg="fbf0f4">
          <ImgContainer>
            <Image src="https://i.ibb.co/vZvMr70/EZ24gW.jpg" />
          </ImgContainer>
          <InfoContainer>
            <Title>SUMMER SALE</Title>
            <Description>
              DON'T BE STUPID PLEASE! JUST YOU HAVE TO STUDY ALL DAY
            </Description>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="f5fafd">
          <ImgContainer>
            <Image src="https://i.ibb.co/vZvMr70/EZ24gW.jpg" />
          </ImgContainer>
          <InfoContainer>
            <Title>WINTER SALE</Title>
            <Description>
              DON'T BE STUPID PLEASE! JUST YOU HAVE TO STUDY ALL DAY
            </Description>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="fcf1ed" >
          <ImgContainer>
            <Image src="https://i.ibb.co/vZvMr70/EZ24gW.jpg" />
          </ImgContainer>
          <InfoContainer>
            <Title>AUTUMN SALE</Title>
            <Description>
              DON'T BE STUPID PLEASE! JUST YOU HAVE TO STUDY ALL DAY
            </Description>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
      </Wrapper>
      <Arrow direction={"right"}>
        <ArrowForwardRoundedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
