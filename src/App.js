import React, { useState, useEffect } from "react";

function retrieveObjectFromLocalStorage(item) {
  return JSON.parse(localStorage.getItem(item));
}

function saveObjectToLocalStorage(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

function App() {
  const [ratings, setRatings] = useState(
    retrieveObjectFromLocalStorage("ratings") || [
      {
        activity: "activity 1",
        anxiety: 0,
        depression: 0,
        timestamp: Date(),
      },
      {
        activity: "activity 2",
        anxiety: 35,
        depression: 50,
        timestamp: Date(),
      },
      {
        activity: "activity 3",
        anxiety: 20,
        depression: 80,
        timestamp: Date(),
      },
    ]
  );

  useEffect(() => {
    saveObjectToLocalStorage("ratings", ratings);
  }, [ratings]);

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
      timestamp: Date(),
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

const Header = ({ numEntries }) => (
  <div>
    <h1>You have {numEntries} entries. </h1>
  </div>
);

const EntriesList = ({ entries, onDelete }) => {
  const entryItems = entries.map((rating, index) => (
    <Entry content={rating} key={index} id={index} onDelete={onDelete} />
  ));
  return <div>{entryItems}</div>;
};

const Entry = ({ content, onDelete, id }) => {
  return (
    <div>
      {content.activity}
      {" - Anxiety - "}
      {content.anxiety}
      {" - Depression - "}
      {content.depression}
      {" - recorded at - "}
      {content.timestamp.toString()}
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
