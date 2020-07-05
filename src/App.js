import React, { useState } from "react";

function App() {
  const [ratings, setRatings] = useState([
    { activity: "activity 1", anxiety: 0, depression: 0 },
    { activity: "activity 2", anxiety: 35, depression: 50 },
    { activity: "activity 3", anxiety: 20, depression: 80 },
  ]);

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
  const [term, setTerm] = useState("");
  const [anxiety, setAnxiety] = useState(0);
  const [depression, setDepression] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term === "") return;
    props.onFormSubmit({
      activity: term,
      anxiety: Number(anxiety),
      depression: Number(depression),
    });
    setTerm("");
    setAnxiety(0);
    setDepression(0);
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
        value={anxiety}
        onChange={(e) => setAnxiety(e.target.value)}
      />
      <input
        type="range"
        className="input"
        min="0"
        max="100"
        step="5"
        value={depression}
        onChange={(e) => setDepression(e.target.value)}
      />
      <button className="button">Submit</button>
    </form>
  );
};

const Header = (props) => (
  <div>
    <h1>You have{props.numEntries} entries. </h1>
  </div>
);

const EntriesList = (props) => {
  const entries = props.entries.map((rating, index) => (
    <Entry content={rating} key={index} id={index} onDelete={props.onDelete} />
  ));
  return <div>{entries}</div>;
};

const Entry = ({ content, onDelete, id }) => {
  console.log(content);
  return (
    <div>
      {content.activity}
      {" - Anxiety - "}
      {content.anxiety}
      {" - Depression - "}
      {content.depression}
      <button
        className="fa-times"
        onClick={() => {
          onDelete(id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default App;
