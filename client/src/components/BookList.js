import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

function BookList(props) {
  const [selected, setSelected] = useState(null);
  const displayBooks = () => {
    const data = props.data;
    if (data.loading) {
      return (<div>Loading books...</div>);
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id} onClick={(e) => { setSelected(book.id) }}>{book.name}</li>
        );
      });
    }
  };

  return (
    <div>
      <ul id="book-list">
        {displayBooks(props)}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
