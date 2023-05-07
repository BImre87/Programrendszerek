const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();

mongoose.connect('mongodb://localhost:27017/beadando', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB successfully!');
});

 const User = require('./db/userSchema');
 const userModel = mongoose.model('user');
 const Suti = require('./db/sutiSchema');


require('./db/bootstrapper')();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const cors = require('cors');

app.use(cors({origin: function(origin, callback) {
  callback(null, true);
}, credentials: true, methods:"GET,PUT,POST,DELETE,OPTIONS, PATCH"}));


// #3. definiáljuk a saját login stratégiánkat
passport.use('local', new localStrategy(async function (username, password, done) {
  // 'local' stratégiának nevezzük el
  const data = await userModel.findOne({username: username});
  if (data) {
    data.comparePasswords(password, function (error, isMatch) {
      // Felhasználó által megadott jelszó ellenőrzése
      if (error) return done(error, false);
      // Hiba kezelése, ha nem sikerült összehasonlítani a jelszavakat
      if (!isMatch) return done('Hibas jelszo', false);
      // Sikeres belépés esetén felhasználó visszaadása
      return done(null, data);
  })
  }
}));

passport.serializeUser(function (user, done) {
  if (!user) return done('nincs megadva beléptethető felhasználó', null);
  // Felhasználó bejelentkezését követően a felhasználó azonosítójának eltárolása sessionben
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("nincs user akit kiléptethetnénk", null);
  // Felhasználó kiléptetése után a felhasználó azonosítójának eltávolítása
  return done(null, user);
});

// #3 Felfűzzük a passportot a middleware láncra
app.use(expressSession({ secret: 'prf2021lassananodejsvegereerunk', resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'));


// Az app.use() metódusban található függvény egy middleware, amely fut, amikor az alkalmazáshoz érkezik egy HTTP kérés.
// A middleware-ek mindig az app.use-ok sorrendjének megfelelően futnak le, így végezhetünk majd a beérkező HTTP kérésen előfeldolgozást vagy autentikációt
app.use((req, res, next) => {
    // a req objektumon keresztül a kapott HTTP kérés paramétereit érhetjük el, a res-en keresztül a visszaküldendő választ konfigurálhatjuk
    // ezt a két paramétert elnevezhetjük másképp is, de a middleware-ek paraméterlistája mindig ugyanez: kérés, válasz, next függvény
    console.log('A middleware futott!')
    /* A next() függvény itt azt jelzi az ExpressJS-nek, hogy ez a middleware még nem válaszolt a kliensnek, 
    továbbadja a végrehajtást a middleware lánc következő elemének */
    next()
  })

/* Bevonjuk és felcsatoljuk a usersRouter.js által exportált Router objektumot, az abban definiált route-ok a /api/users prefix után lesznek
elérhetőek, tehát pl. /api/users/:id a teljes út, amin a fájlban definiált /:id elérhető lesz */
app.use('/api/users', require('./usersRouter'))
app.use('/api/sutik', require('./sutiRouter'))

/* Az express.static() metódusban meg kell adnunk azt a mappát, amelyből a statikus fájlokat kiszolgáljuk. */ 
app.use('', express.static('public'))

/* Az app.listen metódus elindítja a szervert a 3000 porton, és kiírja az üzenetet a konzolra egy callback függvénnyel. 
Paraméterként várja a portszámot és a callback függvényt, amely akkor hívódik meg, amikor a szervert elindítjuk.
Érdemes ezt a parancsot megtenni mindig az utolsónak, és mindenképp a middleware-ek bevonása után */
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

