const express = require("express");
const router = express.Router();
const fs = require('fs');
// Đọc tệp JSON
const data = JSON.parse(fs.readFileSync('./data/dataTongTheNhaMay.json', 'utf8'));

router.get("/dataTongTheNhaMay", async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data
  });
});

router.post('/dataTongTheNhaMay/hour', (req, res) => {
  const { datetime } = req.query;
  console.log('timeQuery', datetime);
  const filteredData = data.filter(item => {
    const time = new Date(item.Time);
    const timeQuery = new Date(datetime);
    return time.getTime() === timeQuery.getTime();
  });

  return res.status(200).json({
    success: true,
    data: filteredData
  });
});

module.exports = router;
