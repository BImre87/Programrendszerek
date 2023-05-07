const express = require('express')
//létrehozunk egy példányt a Router objektumból, melyre felkonfigurálhatjuk a különböző HTTP műveletekkel elérhető route-okat
const router = express.Router();
const mongoose = require('mongoose');
const sutiModel = mongoose.model('suti');

const { deleteOne } = require('./db/sutiSchema');


// GET /sutemenyek - összes süteény lekérdezése
router.get('/', async (req, res) => {
  try {
    const sutik = await sutiModel.find();
    res.status(200).json(sutik);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//süti lekérdezése
router.get('/:id', async (req, res) => {
  try {
    const suti = await sutiModel.findOne({megnevezes: req.params.id});
    res.status(200).json(suti);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST /sutemenyek - új sütemény létrehozása
router.post('/', async (req, res) => {
  const suti = new sutiModel({
    megnevezes: req.body.megnevezes,
    suly: req.body.suly,
    cukortartalom: req.body.cukortartalom,
    ar: req.body.ar,
  });

  try {
    const data = await sutiModel.findOne({megnevezes: req.body.megnevezes});
    if (!data) {
      const newSuti = await suti.save();
      res.status(201).json(newSuti);
    } else {
      return res.status(400).send('Hiba, mar letetik ilyen sütemény, kérem adjon meg másikat.');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//sütemény módosítása
router.patch('/:id', async (req, res) => {
  const sutifound = await sutiModel.findOne({megnevezes: req.params.id});
  if (req.body.megnevezes != null) {
    sutifound.megnevezes = req.body.megnevezes;
  }
  if (req.body.suly != null) {
    sutifound.suly = req.body.suly;
  }
  if (req.body.cukortartalom != null) {
    sutifound.cukortartalom = req.body.cukortartalom;
  }
  if (req.body.ar != null) {
    sutifound.ar = req.body.ar;
  }

  try {
    const updatedSuti = await sutifound.save();
    res.json(updatedSuti);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//sütemény törlés
router.delete('/:id', async (req, res) => {
  try {
    await sutiModel.deleteOne({megnevezes: req.params.id}), function(err) {
      if (err) return handleError(err);
    };
    res.json({ message: 'A sütemény sikeresen törölve!' });
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Ha egy fájl require-el behivatkozza ezt a fájlt, akkor a hivatkozás helyére a module.exports-ban megadott objektum, funkció 
vagy változó fog bekerülni */
module.exports = router