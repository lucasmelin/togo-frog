import React, { useState } from 'react';

function App() {
  const [ratings, setRatings] = useState([['rating a', 0], ['rating b', 2], ['rating c', 4]]);

  const handleSubmit = (rating) => {
    setRatings([...ratings, rating]);
  };

  const handleDelete = (index) => {
    const newArr = [...ratings];
    newArr.splice(index, 1);
    setRatings(newArr);
  };

  return (
    <div>
      <div>
        <Header numEntries={ratings.length} />
        <EntriesList entries={ratings} onDelete={handleDelete} />
        <SubmitForm onFormSubmit={handleSubmit} />
      </div>
    </div>
  );
}

const SubmitForm = (props) => {
  const [term, setTerm] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term === '') return;
    props.onFormSubmit([term, Number(rating)]);
    setTerm('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Enter Item"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <input
        type="range"
        className="input"
        min="0"
        max="100"
        step="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button className="button">Submit</button>
    </form>
  );
};

const Header = (props) => (
  <div>
    <h1>
      You have
      {' '}
      {props.numEntries}
      {' '}
      entries.
    </h1>
  </div>
);

const EntriesList = (props) => {
  const entries = props.entries.map((rating, index) => <Entry content={rating} key={index} id={index} onDelete={props.onDelete} />);
  return (
    <div>
      {entries}
    </div>
  );
};

const Entry = (props) => {
  console.log(props.content);
  return (
    <div>
      {props.content[0]}
      {' - '}
      {props.content[1]}
      <button className="fa-times" onClick={() => { props.onDelete(props.id); }}>X</button>
    </div>
  );
};

export default App;
