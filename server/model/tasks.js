const lodash = require('lodash');
const joi = require('joi');
const uuidGenerator = require('uuid');
const extend = require('extend');
const _tasks = {};

const schema = joi.object({
  title: joi.string(),
  description: joi.string()
});


/**
 *
 * Get task
 *
 * @param id
 * @returns {*|{}}
 */
function find(id) {
  if (!_tasks.hasOwnProperty(id)) {
    return false;
  }
  return _tasks[id];
}

/**
 * Return list of tasks
 *
 * @returns {Array}
 */
function list() {
  const tasks = [];
  lodash.each(_tasks, function(task) {
    tasks.push(task);
  });
  return tasks;
}

/**
 * Create task
 *
 * @param data
 */
function create(data) {
  const uuid = uuidGenerator.v4();
  const task = extend({}, { id: uuid }, data);
  _tasks[uuid] = task;
  return task;
}

/**
 * Update task
 *
 * @param id
 * @param data
 */
function update(id, data) {
  if (!_tasks.hasOwnProperty(id)) {
    return false;
  }
  const updatedTask = extend({}, _tasks[id], data);
  _tasks[id] = updatedTask;
  return updatedTask;
}

/**
 * Delete a task
 *
 * @param id
 */
function remove(id) {
  if (!_tasks.hasOwnProperty(id)) {
    return false;
  }
  delete _tasks[id];
}

module.exports = {
  actions: {
    find: find,
    list: list,
    create: create,
    update: update,
    remove: remove
  },
  schema: schema
};
