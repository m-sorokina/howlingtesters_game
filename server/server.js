const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Default page: localhost:3000 opens kreator
app.get("/", (req, res) => res.redirect("/kreator.html"));
app.get("/dragon-creator", (req, res) => res.redirect("/dragon-creator.html"));

// Serve files from serwer root so local copies are at http://localhost:3000/...
app.use(express.static(__dirname));
// Serve base-files so they can be opened at http://localhost:3000/base-files/...
app.use("/base-files", express.static(path.join(__dirname, "base-files")));

const FILE = "./dragons.json";

// --- Helpers ---
function getDragons() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function saveDragons(dragons) {
  fs.writeFileSync(FILE, JSON.stringify(dragons, null, 2));
}

function randomStat(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- GET all dragons ---
app.get("/baby-dragon-api/v1/dragons", (req, res) => {
  res.json(getDragons());
});

// --- POST new dragon ---
app.post("/baby-dragon-api/v1/dragons", (req, res) => {
  const dragons = getDragons();
  if (dragons.length >= 4)
    return res.status(400).json({ error: "Maximum 4 dragons allowed" });

  const body = req.body;
  const dragon = {
    id: "bd_" + Math.random().toString(36).substring(2, 10),
    name: body.name || "Baby Dragon",
    imageNumber: body.imageNumber || Math.floor(Math.random() * 4) + 1,
    stats: body.stats || {
      Strength: randomStat(20, 40),
      Agility: randomStat(20, 40),
      Energy: randomStat(20, 40),
      Health: randomStat(40, 80),
    },
  };

  dragons.push(dragon);
  saveDragons(dragons);
  res.json(dragon);
});

// --- PATCH dragon by ID ---
app.patch("/baby-dragon-api/v1/dragons/:id", (req, res) => {
  const dragons = getDragons();
  const idx = dragons.findIndex((d) => d.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Dragon not found" });

  const body = req.body;
  dragons[idx].name = body.name || dragons[idx].name;
  dragons[idx].imageNumber = body.imageNumber || dragons[idx].imageNumber;
  dragons[idx].stats = body.stats || dragons[idx].stats;

  saveDragons(dragons);
  res.json(dragons[idx]);
});

// --- DELETE dragon by ID ---
app.delete("/baby-dragon-api/v1/dragons/:id", (req, res) => {
  const dragons = getDragons();
  const idx = dragons.findIndex((d) => d.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Dragon not found" });

  const deleted = dragons.splice(idx, 1);
  saveDragons(dragons);
  res.json({ deleted: deleted[0].id });
});

// --- GET dragon stats (special endpoint) ---
app.get("/dragon-api/v1/stats", (req, res) => {
  const dragons = getDragons();
  let dragon = null;
  let stats = {};
  let imageNumber = 1;

  if (dragons.length > 0) {
    // choose random dragon
    dragon = dragons[Math.floor(Math.random() * dragons.length)];
    stats = { ...dragon.stats }; // copy stats
    imageNumber = dragon.imageNumber;

    // every dragon +20 to all stats
    stats.Strength += 20;
    stats.Agility += 20;
    stats.Energy += 20;
    stats.Health += 20;

    // extra bonus depending on image number
    switch (dragon.imageNumber) {
      case 4:
        stats.Strength += 5;
        break;
      case 3:
        stats.Energy += 5;
        break;
      case 2:
        stats.Agility += 5;
        break;
      case 1:
        stats.Health += 5;
        break;
    }
  } else {
    // if no dragons → random stats
    stats = {
      Strength: randomStat(25, 30),
      Agility: randomStat(20, 35),
      Energy: randomStat(25, 35),
      Health: randomStat(60, 70),
    };
    imageNumber = Math.floor(Math.random() * 4) + 1;
  }

  res.json({
    stats,
    image: `https://howlingtesters.pl/wp-content/uploads/2026/02/dragon${imageNumber}.jpg`,
  });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
