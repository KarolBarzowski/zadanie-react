import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 15px;
  padding: 15px;
  height: 100%;
  width: 100%;
`;

const BookWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
  width: 100%;
  max-width: 1000px;
  padding: 15px;
  background-color: white;
  box-shadow: 0 2px 25px 0 rgb(0 0 0 / 25%);
  border-radius: 15px;
`;

const BookCover = styled.img`
  height: auto;
  width: 144px;
  border-radius: 5px;
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

const Button = styled(NavLink)`
  padding: 12px 16px;
  background-color: rgb(0, 122, 255);
  border: none;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.87);
  text-decoration: none;

  :hover {
    background-color: rgb(10, 132, 255);
  }
`;

function Cart({ cart, books }) {
  const [cartSorted, setCartSorted] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (!books.length) return;

    const arr = [];
    let sum = 0;

    cart.forEach(({ id, quantity }) => {
      const book = books.find((book) => parseInt(book.id) === parseInt(id));

      arr.push({
        ...book,
        quantity,
      });

      sum += (book.price / 100) * quantity;
    });

    setCartSorted(arr);
    setSum(sum.toFixed(2));
  }, [cart, books]);

  return (
    <StyledWrapper>
      <h1>Koszyk</h1>
      {cartSorted.length ? (
        <>
          {cartSorted.map(({ id, cover_url, title, author, pages, price, currency, quantity }) => (
            <BookWrapper key={id}>
              <BookCover src={cover_url} alt="" />
              <div>
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
                <BookPrice>
                  <Secondary>Sztuk: </Secondary>
                  {quantity}
                </BookPrice>
                <BookPrice>
                  <Secondary>Razem: </Secondary>
                  {((price / 100) * quantity).toFixed(2)} {currency}
                </BookPrice>
              </div>
            </BookWrapper>
          ))}
          <BookTitle>Suma: {sum} PLN</BookTitle>
          <Button to="/zamowienie">Przejdź do płatności</Button>
        </>
      ) : (
        <p>Koszyk jest pusty!</p>
      )}
    </StyledWrapper>
  );
}

const mapStateToProps = ({ cart, books }) => ({ cart, books });

export default connect(mapStateToProps)(Cart);
