import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

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
    <form
      className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="What are you up to?"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <div className="space-x-3 my-8 flex">
        <div className="inline-block text-green-700 font-semibold">Anxiety</div>
        <input
          type="range"
          className="appearance-none inline-block focus:outline-none rounded-full overflow-hidden bg-gray-300 text-red-400 red-400 h-6 w-4/6"
          id="anxiety"
          min="0"
          max="100"
          step="5"
          value={anxiety}
          onChange={(e) => setAnxiety(e.target.value)}
        />
        <div className="inline-block justify-self-end text-green-700 font-semibold">
          {anxiety}
        </div>
      </div>
      <div className="space-x-3 my-8 flex">
        <div className="inline text-green-700 font-semibold">Depression</div>
        <input
          type="range"
          className="appearance-none inline-block focus:outline-none rounded-full overflow-hidden bg-gray-300 text-red-400 red-400 h-6 w-3/5"
          min="0"
          max="100"
          step="5"
          value={depression}
          onChange={(e) => setDepression(e.target.value)}
        />
        <div className="inline align-self-right text-green-700 font-semibold">
          {depression}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <input
          className="px-4 py-2 rounded text-white inline-block shadow-lg bg-purple-700 hover:bg-purple-800 focus:bg-purple-900"
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
};

SubmitForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SubmitForm;
