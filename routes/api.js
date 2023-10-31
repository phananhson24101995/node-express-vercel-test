const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
// Đọc tệp JSON
const dataPath = path.join(process.cwd(), 'data', 'dataTongTheNhaMay.json');
// Đọc nội dung tệp JSON
const jsonData = fs.readFileSync(dataPath, 'utf-8');
const data = JSON.parse(jsonData)
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
