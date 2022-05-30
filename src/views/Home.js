import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from 'actions';
import styledComponents from 'styled-components';

const BookCover = styledComponents.img`
  height: auto;
  width: 144px;
  border-radius: 5px;
`;

function Home({ books, loading, dispatch }) {
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div>
      {loading ? <p>loading</p> : null}
      {books.map((book) => (
        <div key={book.id}>
          <BookCover src={book.cover_url} alt="" />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.pages}</p>
          <button type="button">Dodaj do koszyka</button>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = ({ books, loading, error }) => ({ books, loading, error });

export default connect(mapStateToProps)(Home);
