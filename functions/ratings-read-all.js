/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;

exports.handler = (event, context) => {
  console.log("Function `rating-read-all` invoked");
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
  });
  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_ratings"))))
    .then((response) => {
      const ratingRefs = response.data;
      console.log("Rating refs", ratingRefs);
      console.log(`${ratingRefs.length} ratings found`);
      // create new query out of rating refs. http://bit.ly/2LG3MLg
      const getAllRatingDataQuery = ratingRefs.map((ref) => {
        return q.Get(ref);
      });
      // then query the refs
      return client.query(getAllRatingDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret),
        };
      });
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
