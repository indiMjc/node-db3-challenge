const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findSteps,
  add
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id });
}

function findSteps(id) {
  return db('schemes')
    .join('steps', 'schemes.id', '=', 'steps.scheme_id')
    .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .where({ 'schemes.id': id })
    .orderBy(['scheme_name', { column: 'step_number', order: 'asc' }]);
}

function add(scheme) {
  return db('schemes')
    .insert(scheme, 'id')
    .then(id => {
      return db('schemes')
        .select('*')
        .where({ id: id[0] });
    });
}
