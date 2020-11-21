import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Entry = ({ content, onDelete, id }) => {
  const since = moment(content.data.timestamp).fromNow();
  return (
    <tr>
      <td className="border border-green-500 px-4 py-2 text-green-600 font-medium">
        {content.data.activity}
      </td>
      <td className="border border-green-500 px-4 py-2 text-green-600 font-medium">
        {content.data.anxiety}
      </td>
      <td className="border border-green-500 px-4 py-2 text-green-600 font-medium">
        {content.data.depression}
      </td>
      <td className="border border-green-500 px-4 py-2 text-green-600 font-medium">
        {since}
      </td>
      <td className="border border-green-500 px-4 py-2 text-red-300 hover:text-red-500 font-medium text-center">
        <button
          type="button"
          className=""
          onClick={() => {
            onDelete(id);
          }}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

Entry.propTypes = {
  content: PropTypes.shape(
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
  id: PropTypes.number.isRequired,
};

export default Entry;
