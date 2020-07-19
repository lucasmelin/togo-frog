import React from "react";

const EntriesHeader = ({ numEntries }) => (
  <div>
    <h1 className="f4 sans-serif">You have {numEntries} previous entries. </h1>
  </div>
);

export default EntriesHeader;
