import React from "react";
import PropTypes from "prop-types";
import Entry from "./Entry";

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
