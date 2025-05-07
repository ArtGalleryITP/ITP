const express = require("express");
const router = express.Router();
const {
  createAuction,
  getAllAuctions,
  getAuctionById,
  updateAuction,
  deleteAuction,
} = require("../Controller/auctionController");

router.post("/", createAuction);
router.get("/", getAllAuctions);
router.get("/:id", getAuctionById);
router.put("/:id", updateAuction);
router.delete("/:id", deleteAuction);


module.exports = router;

