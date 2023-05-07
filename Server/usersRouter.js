const express = require('express')
//létrehozunk egy példányt a Router objektumból, melyre felkonfigurálhatjuk a különböző HTTP műveletekkel elérhető route-okat
const router = express.Router();
const mongoose = require('mongoose');
const userModel = mongoose.model('user');

const passport = require('passport');
const { deleteOne } = require('./db/userSchema');

// #3 Login implementálása
router.route('/login').post((req, res, next) => {
  if (req.body.username, req.body.password) {
    // Felhasználónév és jelszó ellenőrzése
    passport.authenticate('local', function (err, user) {
      if (err) {
          res.status(500).send('Internal server error.');
      } else {
          req.login(user, (error) => {
              console.log(user);
              if (error) {
                  console.log(error);
                  res.status(500).send('Incorrect username or password.');
              } else {
                  res.status(200).send('Bejelentkezes sikeres');
              }
          });
      }
  })(req, res, next);
  } else {
    // Hibakezelés, ha hiányzik a felhasználónév vagy a jelszó
    return res.status(400).send('Hibas keres, username es password kell');
  }
});

router.route('/logout').post((req, res, next) => {
  if (req.isAuthenticated()) { //Ha sikerült sessionbe beléptetni a usert, ez mindig ellenőrzi, hogy bejelentkezett-e vagy sem
    req.logout((err) => {
      console.log('logout');
      if(err) {
        console.log('Hiba a kijelentkezés során');
        return res.status(500).send(err)
      }
      // Sikeres kijelentkezés
      return res.status(200).send('Kijelentkezes sikeres');
    });
  } else {
    // Hiba, ha nem volt bejelentkezve
    return res.status(403).send('Nem is volt bejelentkezve');
  }
})

router.route('/status').get((req, res, next) => {
  if (req.isAuthenticated()) {
    // Felhasználói státusz lekérése
    return res.status(200).send(req.user);
  } else {
    // Hiba, ha nem volt bejelentkezve
    return res.status(403).send('Nem is volt bejelentkezve');
  }
})


// #2 a users fájl tartalmát kicsit átírtam

// Middleware a felhasználók lekérdezése előtt az id alapján - nem minden route-ra kell meghívnunk
// NodeJS-ben async jelöli az aszinkron műveleteket, amelyeknek a lefutási ideje nem determinisztikus, és
// az await várakozási parancsot akarjuk bennük használni
async function getUser(req, res, next) {
  try {
    user = await userModel.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'A felhasználó nem található' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user; // ettől kezdve a response-ban benne van a db-ből lekért user objektum
  next();
}


// GET /users - összes felhasználó lekérdezése
router.get('/', async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userModel.findOne({username: req.params.id});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /users - új felhasználó létrehozása
router.post('/', async (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    country: req.body.country,
    accessLevel: req.body.accessLevel,
  });

  try {
    const data = await userModel.findOne({username: req.body.username});
    if (!data) {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } else {
      return res.status(400).send('Hiba, mar letetik ilyen felhasznalonév, kérem adjon meg másikat.');
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.patch('/:id', async (req, res) => {
  const userfound = await userModel.findOne({username: req.params.id});
  if (req.body.username != null) {
    userfound.username = req.body.username;
  }
  if (req.body.password != null) {
    userfound.password = req.body.password;
  }
  if (req.body.email != null) {
    userfound.email = req.body.email;
  }
  if (req.body.country != null) {
    userfound.country = req.body.country;
  }
  if (req.body.accessLevel != null) {
    userfound.accessLevel = req.body.accessLevel;
  }

  try {
    const updatedUser = await userfound.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {


    console.log("delete: " + req.params.id);
    await userModel.deleteOne({username: req.params.id}), function(err) {
      if (err) return handleError(err);
    };
    res.json({ message: 'A felhasználó sikeresen törölve!' });
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* Ha egy fájl require-el behivatkozza ezt a fájlt, akkor a hivatkozás helyére a module.exports-ban megadott objektum, funkció 
vagy változó fog bekerülni */
module.exports = router