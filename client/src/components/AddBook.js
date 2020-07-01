import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const displayAuthors = (props) => {
  const data = props.getAuthorsQuery;
  if (data.loading) {
    return (<option disabled>Loading Authors...</option>);
  } else {
    return data.authors.map(author => {
      return (
        <option key={author.id} value={author.id}>{author.name}</option>
      );
    });
  }
};

function AddBook(props) {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  };

  return (
    <form id="add-book" onSubmit={submitForm.bind(this)}>

      <div className="field">
        <label>Book Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          {displayAuthors(props)}
        </select>
      </div>

      <button>+</button>

    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);