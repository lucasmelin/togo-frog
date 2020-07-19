import React from "react";
import PropTypes from "prop-types";

const EntriesHeader = ({ numEntries }) => (
  <div>
    <h1 className="f4 sans-serif">You have {numEntries} previous entries. </h1>
  </div>
);

EntriesHeader.propTypes = {
  numEntries: PropTypes.number.isRequired,
};

export default EntriesHeader;
