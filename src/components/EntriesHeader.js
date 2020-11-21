import React from "react";
import PropTypes from "prop-types";

const EntriesHeader = ({ numEntries }) => (
  <div>
    <h1 className="font-medium text-purple-900">
      You have {numEntries} previous entries.{" "}
    </h1>
  </div>
);

EntriesHeader.propTypes = {
  numEntries: PropTypes.number.isRequired,
};

export default EntriesHeader;
