import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from 'actions';
import styled from 'styled-components';
import Book from 'components/Book';

const StyledWrapper = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 15px;
  padding: 15px;
  height: 100%;
  width: 100%;
`;

function Home({ books, loading, dispatch }) {
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <StyledWrapper>
      {loading ? <p>loading</p> : null}
      {books.map(({ id, cover_url, title, author, pages, price, currency }) => (
        <Book
          key={id}
          cover_url={cover_url}
          title={title}
          author={author}
          pages={pages}
          price={price}
          currency={currency}
        />
      ))}
    </StyledWrapper>
  );
}

const mapStateToProps = ({ books, loading, error }) => ({ books, loading, error });

export default connect(mapStateToProps)(Home);
