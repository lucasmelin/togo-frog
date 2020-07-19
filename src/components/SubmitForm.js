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

SubmitForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SubmitForm;
