const mongoose = require('mongoose');
// #2 mivel már regisztráltuk, a sémánkat le tudjuk kérni a mongoose-on keresztül is a megfelelő kollekcióra történő hivatkozással
const User = mongoose.model('user');

async function ensureAdminExists() {
  try {
    // Ellenőrizzük, van-e már admin felhasználó az adatbázisban
    const admin = await User.findOne({ accessLevel: 3 }); //a findOne-nal jelezzük, hogy pontosan egy darab usert keresünk
    const user = await User.findOne({ accessLevel: 1 });
    if (admin) { //ha kaptunk vissza objektumot, akkor ez a feltétel igazra teljesül, ha üres/undefine, akkor hamisra
      console.log('Az admin felhasználó már megtalálható az adatbázisban!');
    } else {
      // Ha nincs, akkor létrehozunk egy újat
      const newAdmin = new User({
        username: 'admin',
        password: 'admin',
        email: 'admin@admin.hu',
        country: 'Magyarország',
        accessLevel: 3,
      });
      await newAdmin.save();
      console.log('Az admin felhasználó sikeresen létrehozva!');
    }
  } catch (error) {
    console.error('Hiba történt az admin ellenőrzése vagy létrehozása során: ', error);
  }
}

async function ensureUserExists() {
  try {
    // Ellenőrizzük, van-e már admin felhasználó az adatbázisban
    const user = await User.findOne({ accessLevel: 1 });
    if (user) { //ha kaptunk vissza objektumot, akkor ez a feltétel igazra teljesül, ha üres/undefine, akkor hamisra
      console.log('User felhaszálók már megtalálható az adatbázisban!');
    } else {
      // Ha nincs, akkor létrehozunk egy újat
      const newUser = new User({
        username: 'user',
        password: 'user',
        email: 'user@user.hu',
        country: 'Magyarország',
        accessLevel: 1,
      });
      await newUser.save();
      const newUser2 = new User({
        username: 'test',
        password: 'test',
        email: 'test@test.hu',
        country: 'Magyarország',
        accessLevel: 1,
      });
      await newUser.save();
      await newUser2.save();
      console.log('A user felhasználók sikeresen létrehozva!');
    }
  } catch (error) {
    console.error('Hiba történt az admin ellenőrzése vagy létrehozása során: ', error);
  }
}

function ensureUsers() {
  ensureAdminExists();
  ensureUserExists();
}

module.exports = ensureUsers;