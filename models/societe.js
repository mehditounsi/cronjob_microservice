const genericModel = require('./model');
let configuration = require('../config/config');

const name = 'Societe';
const tableName = 'societe';
const selectableProps = [
  'id',
  'mf',
  'rc',
  'nom_fr',
  'adresse_fr',
  'nom_ar',
  'adresse_ar',
  'type',
  'gerant',
  'to_update',
  'date_maj'
];

module.exports = (knex) => {
  const model = genericModel({
    knex,
    name,
    tableName,
    selectableProps,
  });

  return {
    ...model,
  };
};
