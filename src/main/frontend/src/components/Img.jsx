import styled from "styled-components";
import '../index.css'; 

const StyledImg = styled.div`
  background-image: url(${(props) => props.src || "https://via.placeholder.com/293x358"});
  background-size: cover;
  background-position: center;
  width: var(--main-img-width);
  height: var(--main-img-height);
`;

function Img({ src }) {
  return <StyledImg src={src}></StyledImg>;
}

export default Img;
