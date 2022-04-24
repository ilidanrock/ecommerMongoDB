import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

const Container = styled.div`
    
`
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`
const ImageContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width:100%;
    height: 90vh;
`
const InfoContainer = styled.div`
    flex: 1;
`
const Title = styled.h1``
const Des = styled.p``
const Price =styled.span``

const Product = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImageContainer>
                <Image src='https://img.abercrombie.com/is/image/anf/KIC_155-1116-2660-278_prod1?policy=product-medium&wid=350&hei=438' />
            </ImageContainer>
            <InfoContainer>
                <Title>Jacket</Title>
                <Des></Des>
                <Price> $ 1000000 </Price>
            </InfoContainer>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Product