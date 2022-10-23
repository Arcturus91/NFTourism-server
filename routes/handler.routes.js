const express = require("express");
const router = express.Router();

/* const index = async (request, response) => {
    // We set up our handler to only respond to `GET` and `POST` requests.
    if (request.method === 'GET') return get(request, response);
    if (request.method === 'POST') return post(request, response);

    throw new Error(`Unexpected method ${request.method}`);
}; */

//solana:https://example.solanapay.com

router.get("/get", (req, res, next) => {
  const label = "Exiled Apes Academy";
  const icon =
    "https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png";

  res.status(200).send({
    label,
    icon,
  });
});

////////

////

module.exports = router;
