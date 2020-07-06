import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryAxis,
} from "victory";

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
          <Chart data={ratings} />
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
        <div className="w-50 mt3 purple sans-serif b tl f4">Anxiety</div>
        <input
          type="range"
          className="input mt3 tl w-40"
          id="anxiety"
          min="0"
          max="100"
          step="5"
          value={anxiety}
          onChange={(e) => setAnxiety(e.target.value)}
        />
        <div className="w-10 mt3 purple sans-serif b tc f4 ">{anxiety}</div>
      </div>
      <div className="flex pa1">
        <div className="w-50 mt3 purple sans-serif b tl f4">Depression</div>
        <input
          type="range"
          className="input mt3 tl w-40"
          min="0"
          max="100"
          step="5"
          value={depression}
          onChange={(e) => setDepression(e.target.value)}
        />
        <div className="w-10 mt3 purple sans-serif b tc f4 ">{depression}</div>
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
    <h1 className="f4 sans-serif">You have {numEntries} previous entries. </h1>
  </div>
);

const EntriesList = ({ entries, onDelete }) => {
  const entryItems = entries.map((rating, index) => (
    <Entry content={rating} key={index} id={index} onDelete={onDelete} />
  ));
  return (
    <div className="pt2">
      <div className="overflow-auto">
        <table className="f6 w-100 center" cellSpacing="0">
          <thead>
            <tr>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white sans-serif">
                Activity
              </th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc sans-serif">
                A
              </th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc sans-serif">
                D
              </th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white sans-serif">
                When
              </th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc sans-serif">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="lh-copy">{entryItems}</tbody>
        </table>
      </div>
    </div>
  );
};

const Entry = ({ content, onDelete, id }) => {
  const since = moment(content.timestamp).fromNow();
  return (
    <tr>
      <td className="pv3 pr3 bb b--black-20 sans-serif">{content.activity}</td>
      <td className="pv3 pr3 bb b--black-20 sans-serif tc">
        {content.anxiety}
      </td>
      <td className="pv3 pr3 bb b--black-20 sans-serif tc">
        {content.depression}
      </td>
      <td className="pv3 pr3 bb b--black-20 sans-serif">{since}</td>
      <td className="pv3 pr3 bb b--black-20 sans-serif tc">
        <button
          type="button"
          className="br-100 ba h2 w2 dib grow purple b"
          onClick={() => {
            onDelete(id);
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
};

function Chart({ data }) {
  const xAxisTicks = [...Array(data.length).keys()];
  const yAxisTicks = data.map((x) => moment(x.timestamp).fromNow());
  const anxietyData = data.map((x, index) => {
    return {
      x: index,
      y: x.anxiety,
    };
  });
  const depressionData = data.map((x, index) => {
    return {
      x: index,
      y: x.depression,
    };
  });
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={({ datum }) => `${datum.y}`}
          labelComponent={
            <VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />
          }
        />
      }
    >
      <VictoryLine
        style={{
          data: { stroke: "#5e2ca5" },
          parent: { border: "1px solid #ccc" },
        }}
        data={anxietyData}
      />
      <VictoryLine
        style={{
          data: { stroke: "#137752" },
          parent: { border: "1px solid #ccc" },
        }}
        data={depressionData}
      />
      <VictoryAxis
        tickValues={xAxisTicks}
        style={{ tickLabels: { angle: -20 } }}
        tickFormat={yAxisTicks}
      />
      <VictoryAxis dependentAxis />
    </VictoryChart>
  );
}

export default App;
