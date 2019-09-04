
const expect = require('chai').expect;
const Sequelize = require('sequelize');
const Config = require('../../config/config.js');
//----------------------------------------------------
// Include SQL Tables here:
const SQLTable1 = require('../../database/postgres/models/table1.js');
//----------------------------------------------------
// TESTS:

// Test Suite 1:
describe('test suite title', () => {
  let sequelize;

  beforeEach(() => {
    sequelize = new Sequelize(`${Config.db.database}`, `${Config.db.username}`, `${Config.db.password}`, {
      host: `${Config.db.host}`,
      dialect: `${Config.db.dialect}`,
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });
  });

  afterEach(() => {
    // sequelize.close();
  });

  // Test 1:
  it('Should _____ ', (done) => {
    expect(true).to.equal(true);
    done();
  });
});
//-----------------------------------
