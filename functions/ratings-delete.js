/* Import faunaDB sdk */
const faunadb = require("faunadb");
const getId = require("./utils/getId");

const q = faunadb.query;

exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
  });
  const id = event.path.match(/([^\/]*)\/*$/)[0];
  console.log(`Function 'rating-delete' invoked. delete id: ${id}`);
  return client
    .query(q.Delete(q.Ref(q.Collection("ratings"), id)))
    .then((response) => {
      console.log("success", response);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
