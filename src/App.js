import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "./utils/api";
import EntriesHeader from "./components/EntriesHeader";
import TopFiveEntriesList from "./components/TopFiveEntriesList";
import Header from "./components/Header";
import Chart from "./components/Chart";
import SubmitForm from "./components/SubmitForm";
// import LoginForm from "./components/LoginForm";
import "./css/main.css";

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

  /* const handleLogin = async (creds) => {
    // const creds =
  }; */

  // const authToken = localStorage.getItem("auth-token");
  return (
    <div>
      {/* {authToken ? (
        <div>
          <Header />
          <div className="place-self-center">
            <LoginForm onFormSubmit={handleLogin} />
          </div>
        </div>
      ) :  */}
      <div>
        <Header />
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div>
            <SubmitForm onFormSubmit={handleSubmit} />
            <EntriesHeader numEntries={ratings.length} />
            <TopFiveEntriesList entries={ratings} onDelete={handleDelete} />
          </div>
          <div className="max-w-md bg-white shadow">
            <Chart data={ratings} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
