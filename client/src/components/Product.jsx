import styled from 'styled-components';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5fbfd;
    position: relative;
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
`
const Image = styled.img`
    height: 75%;
    z-index: 2;
`
const Info = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;

`
const Icon = styled.div``

function Product({item}) {
  return (
    <Container >
        <Circle/>
        <Image src={item.img} />
        <Info>
            <Icon>
                <ShoppingCartCheckoutRoundedIcon/>
            </Icon>
            <Icon>
                <SearchRoundedIcon/>
            </Icon>
            <Icon>
                <FavoriteBorderRoundedIcon/>
            </Icon>
        </Info>
    </Container>
  )
}

export default Product