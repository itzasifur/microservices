import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

const handleDate = (req, res) => {
  const input = req.params.date;
  let date;

  if (!input) {
    date = new Date();
  } else if (/^-?\d+$/.test(input)) {
    date = new Date(parseInt(input, 10));
  } else {
    date = new Date(input);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
};

app.get("/api", handleDate);
app.get("/api/:date", handleDate);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

if (port != 8000) {
  app.listen(8000, () => {
    console.log("Also listening on port 8000");
  });
}
