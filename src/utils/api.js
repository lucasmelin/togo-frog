/* Api methods to call /functions */

const create = (data) => {
  return fetch("/.netlify/functions/ratings-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/ratings-read-all").then((response) => {
    return response.json();
  });
};

const update = (ratingId, data) => {
  return fetch(`/.netlify/functions/ratings-update/${ratingId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const deleteRating = (ratingId) => {
  return fetch(`/.netlify/functions/ratings-delete/${ratingId}`, {
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const batchDeleteRating = (ratingIds) => {
  return fetch(`/.netlify/functions/ratings-delete-batch`, {
    body: JSON.stringify({
      ids: ratingIds,
    }),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

export default {
  create,
  readAll,
  update,
  delete: deleteRating,
  batchDelete: batchDeleteRating,
};
