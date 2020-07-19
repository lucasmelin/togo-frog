import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "./utils/api";
import EntriesHeader from "./components/EntriesHeader";
import TopFiveEntriesList from "./components/TopFiveEntriesList";
import Header from "./components/Header";
import Chart from "./components/Chart";
import SubmitForm from "./components/SubmitForm";

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
        data: {
          activity: "activity 1",
          anxiety: 20,
          depression: 30,
          timestamp: moment(),
        },
        ref: { "@ref": { id: 0 } },
      },
      {
        data: {
          activity: "activity 2",
          anxiety: 50,
          depression: 70,
          timestamp: moment(),
        },
        ref: { "@ref": { id: 1 } },
      },
      {
        data: {
          activity: "activity 1",
          anxiety: 20,
          depression: 90,
          timestamp: moment(),
        },
        ref: { "@ref": { id: 2 } },
      },
    ]
  );

  useEffect(() => {
    saveObjectToLocalStorage("ratings", ratings);
  }, [ratings]);

  const handleSubmit = async (rating) => {
    // setRatings([...ratings, rating]);
    const result = await api.create(rating);
    setRatings([...ratings, result]);
  };

  const handleDelete = async (index) => {
    await api.delete(ratings[index].ref["@ref"].id);
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
          <TopFiveEntriesList entries={ratings} onDelete={handleDelete} />
          <Chart data={ratings} />
        </div>
      </div>
    </div>
  );
}

export default App;
