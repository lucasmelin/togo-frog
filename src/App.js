import React, { useState, useEffect } from "react";
import moment from "moment";

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
        timestamp: moment(),
      },
      {
        activity: "activity 2",
        anxiety: 35,
        depression: 50,
        timestamp: moment(),
      },
      {
        activity: "activity 3",
        anxiety: 20,
        depression: 80,
        timestamp: moment(),
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
      <Header />
      <div className="mw9 center pa4 pt5-ns ph6-l">
        <div>
          <SubmitForm onFormSubmit={handleSubmit} />
          <EntriesHeader numEntries={ratings.length} />
          <EntriesList entries={ratings} onDelete={handleDelete} />
        </div>
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
      timestamp: moment(),
    });
    setTerm("");
    setAnxiety(0);
    setDepression(0);
  };

  return (
    <form className="bb" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          className="input input-reset ba b--black-20 pa2 mb2 db w-100 br3 i sans-serif"
          placeholder="What are you up to?"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <div className="flex pa1">
        <label htmlFor="anxiety" className="w-50 mt3 purple sans-serif b tl">
          Anxiety
        </label>
        <input
          type="range"
          className="input mt3 tl w-50"
          id="anxiety"
          min="0"
          max="100"
          step="5"
          value={anxiety}
          onChange={(e) => setAnxiety(e.target.value)}
        />
      </div>
      <div className="flex pa1">
        <label htmlFor="depression" className="w-50 mt3 purple sans-serif b tl">
          Depression
        </label>
        <input
          type="range"
          className="input mt3 tl w-50"
          min="0"
          max="100"
          step="5"
          value={depression}
          onChange={(e) => setDepression(e.target.value)}
        />
      </div>
      <div className="flex pt4 pb3">
        <div className="w-33" />
        <div className="w-33">
          <input
            className="w-100 f5 dim bn ph3 pv2 mb2 white b bg-purple sans-serif br-pill"
            type="submit"
            value="Submit"
          />
        </div>
      </div>
      <div className="w-33" />
    </form>
  );
};

const Header = () => (
  <header className="bg-dark-green flex w-100 ph3 pv3 pv1-ns ph1-m ph5-l">
    <div className="mt1 white sans-serif b tl f3">Togo</div>
  </header>
);

const EntriesHeader = ({ numEntries }) => (
  <div>
    <h1 className="f3 sans-serif">You have {numEntries} previous entries. </h1>
  </div>
);

const EntriesList = ({ entries, onDelete }) => {
  const entryItems = entries.map((rating, index) => (
    <Entry content={rating} key={index} id={index} onDelete={onDelete} />
  ));
  return <div>{entryItems}</div>;
};

const Entry = ({ content, onDelete, id }) => {
  const since = moment.duration(moment(content.timestamp).diff(moment()));
  return (
    <div className="sans-serif flex">
      <div className="w-40 pa3 mr2">{content.activity}</div>
      <div className="w-25 pa3 mr2 tc">A{content.anxiety}</div>
      <div className="w-25 pa3 mr2 tc">D{content.depression}</div>
      <div className="w-25 pa3 mr2">{since.humanize()} ago</div>
      <div className="w-10 pa3 mr2">
        <button
          className="fa-times"
          onClick={() => {
            onDelete(id);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default App;
