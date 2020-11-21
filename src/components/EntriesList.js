import React from "react";
import PropTypes from "prop-types";
import Entry from "./Entry";

const EntriesList = ({ entries, onDelete }) => {
  const entryItems = entries.map((rating, index) => (
    <Entry content={rating} key={index} id={index} onDelete={onDelete} />
  ));
  return (
    <div className="relative overflow-hidden mb-8">
      <div className="overflow-hidden bg-gradient-to-r from-green-50 to-purple-100 p-10">
        <table className="table-auto" cellSpacing="0">
          <thead>
            <tr>
              <th className="px-4 py-2 text-green-600">Activity</th>
              <th className="px-4 py-2 text-green-600">A</th>
              <th className="px-4 py-2 text-green-600">D</th>
              <th className="px-4 py-2 text-green-600">When</th>
              <th className="px-2 py-2 text-green-600">Delete</th>
            </tr>
          </thead>
          <tbody className="lh-copy">{entryItems}</tbody>
        </table>
      </div>
    </div>
  );
};

EntriesList.propTypes = {
  entries: PropTypes.shape(
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

export default EntriesList;
