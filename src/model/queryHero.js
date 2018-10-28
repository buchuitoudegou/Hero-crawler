import db from './index';

class Model {
  constructor() {}
  async addHero({ hid, attack, defense, magic, difficulty }) {
    const sql = `
  use hero;
  INSERT INTO 
    heros(hid, attack, defense, magic, difficulty)
  VALUES
    (?, ?, ?, ?, ?)
  ;`;
    const values = [hid, attack, defense, magic, difficulty];
    return new Promise((resolve, reject) => {
      db.query(sql, values, (error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve('add hero successfully.');
        }
      });
    });
  }
  async addHeroSkill({ hid, id, name, description }) {
    const sql = `
  use hero;
  INSERT INTO 
    heroskill(hid, skillid, skillname, description)
  VALUES
    (?, ?, ?, ?)
  ;`;
    const values = [hid, id, name, description];
    return new Promise((resolve, reject) => {
      db.query(sql, values, (error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(`add ${hid} skill ${id} successfully.`);
        }
      });
    });
  }
  async endConnection() {
    return new Promise((resolve, reject) => {
      db.end((error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('connection end.');
          resolve('connection end.')
        }
      });
    });
  }
}

const queryModel = new Model();

export default queryModel;
