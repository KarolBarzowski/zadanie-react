import styled from 'styled-components';

const StyledBookWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 300px;
  padding: 15px;
  background-color: white;
  box-shadow: 0 2px 25px 0 rgb(0 0 0 / 25%);
  border-radius: 15px;
`;

const BookCover = styled.img`
  height: auto;
  width: 144px;
  border-radius: 5px;
  margin: 0 auto;
`;

const BookTitle = styled.h3`
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
`;

const BookAuthor = styled.p`
  color: rgba(0, 0, 0, 0.6);
`;

const Secondary = styled.span`
  color: rgba(0, 0, 0, 0.6);
`;

const BookPages = styled.p`
  color: rgba(0, 0, 0, 0.87);
  margin-top: auto;
`;

const BookPrice = styled.p`
  color: rgba(0, 0, 0, 0.87);
`;

const BookButton = styled.button`
  padding: 12px 16px;
  background-color: rgb(48, 209, 88);
  border: none;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.87);
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;

  :hover {
    background-color: rgb(52, 199, 89);
  }
`;

function Book({ id, cover_url, title, author, pages, price, currency }) {
  return (
    <StyledBookWrapper>
      <BookCover src={cover_url} alt="" />
      <BookTitle>{title}</BookTitle>
      <BookAuthor>{author}</BookAuthor>
      <BookPages>
        <Secondary>Stron: </Secondary>
        {pages}
      </BookPages>
      <BookPrice>
        <Secondary>Cena: </Secondary>
        {(price / 100).toFixed(2)} {currency}
      </BookPrice>
      <BookButton type="button">Dodaj do koszyka</BookButton>
    </StyledBookWrapper>
  );
}

export default Book;
