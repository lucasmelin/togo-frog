import React from "react";
import PropTypes from "prop-types";
import EntriesList from "./EntriesList";

const TopFiveEntriesList = ({ entries, onDelete }) => {
  const start = Math.max(entries.length - 5, 0);
  const filteredEntries = entries.slice(start, entries.length);
  return <EntriesList entries={filteredEntries} onDelete={onDelete} />;
};

TopFiveEntriesList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        activity: PropTypes.string,
        anxiety: PropTypes.number,
        depression: PropTypes.number,
        timestamp: PropTypes.moment,
      }),
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TopFiveEntriesList;
