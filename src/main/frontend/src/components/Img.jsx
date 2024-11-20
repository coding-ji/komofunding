import styled from "styled-components";
import '../index.css'; 

const StyledImg = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  `;

function Img({ src }) {
  return <StyledImg src={src}></StyledImg>;
}

export default Img;
