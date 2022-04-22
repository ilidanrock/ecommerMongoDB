import styled from 'styled-components';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index:3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
    
`
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

    &:hover ${Info}{
        opacity: 1;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    top: calc(50% - 100px);
    left: calc(50% - 100px);
    

`
const Image = styled.img`
    height: 75%;
    z-index: 2;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease-in;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
        cursor: pointer;
    }
`

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