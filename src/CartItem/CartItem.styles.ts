import styled from "styled-components"

export const Wrapper = styled.div`
   display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  
  /* .information, */
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  img {
    max-width: 100px;
    object-fit: cover;
    margin-left: 40px;
  }
  @media screen and (max-width: 768px){
    display: flex;
    flex-direction: column;
    
    .buttons {
    margin-right: 30px;
  }
  }
`