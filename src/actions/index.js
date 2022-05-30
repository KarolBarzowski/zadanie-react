async function fetchAllBooksPages() {
  const allData = [];
  let morePagesAvailable = true;
  let currentPage = 0;

  while (morePagesAvailable) {
    currentPage++;
    const response = await fetch(`http://localhost:3001/api/books?page=${currentPage}`);
    const {
      data,
      metadata: { total_records, records_per_page },
    } = await response.json();
    data.forEach((e) => allData.unshift(e));
    morePagesAvailable = total_records > currentPage * records_per_page;
  }

  return allData;
}

export function fetchBooks() {
  return async (dispatch) => {
    dispatch(fetchBooksBegin());
    try {
      const books = await fetchAllBooksPages();
      dispatch(fetchBooksSuccess(books));
      return books;
    } catch (error) {
      return dispatch(fetchBooksFailure(error));
    }
  };
}

export const FETCH_BOOKS_BEGIN = 'FETCH_BOOKS_BEGIN';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const ADD_TO_CART = 'ADD_TO_CART';

export const fetchBooksBegin = () => ({
  type: FETCH_BOOKS_BEGIN,
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books },
});

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: { error },
});

export const addItem = (id) => {
  return {
    type: ADD_TO_CART,
    payload: { id },
  };
};
