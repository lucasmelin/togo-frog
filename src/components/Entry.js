import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Entry = ({ content, onDelete, id }) => {
  const since = moment(content.data.timestamp).fromNow();
  return (
    <tr>
      <td className="pv3 pr3 bb b--black-20 sans-serif">
        {content.data.activity}
      </td>
      <td className="pv3 pr3 bb b--black-20 sans-serif tc">
        {content.data.anxiety}
      </td>
      <td className="pv3 pr3 bb b--black-20 sans-serif tc">
        {content.data.depression}
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
