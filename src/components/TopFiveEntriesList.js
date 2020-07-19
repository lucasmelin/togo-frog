import React from "react";
import EntriesList from "./EntriesList";

const TopFiveEntriesList = ({ entries, onDelete }) => {
  console.log(`Current entries: ${entries.length}`);
  const start = Math.max(entries.length - 5, 0);
  const filteredEntries = entries.slice(start, entries.length);
  return <EntriesList entries={filteredEntries} onDelete={onDelete} />;
};

export default TopFiveEntriesList;
