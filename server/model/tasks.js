const lodash = require('lodash');
const joi = require('joi');
const uuidGenerator = require('uuid');
const _tasks = {};

const schema = {
  create: joi.object({
    title: joi.string().min(1).required(),
    description: joi.string(),
  }),
};

//
schema.update = schema.create.optionalKeys('title');

/**
 *
 * Get task
 *
 * @param id
 * @returns {*|{}}
 */
const findTask = (id) => {
  if (!_tasks.hasOwnProperty(id)) {
    return false;
  }
  return _tasks[id];
};

/**
 * Return list of tasks
 *
 * @returns {Array}
 */
const listTasks = () => {
  const tasks = [];
  lodash.each(_tasks, (task) => {
    tasks.push(task);
  });
  return tasks;
};

/**
 * Create task
 *
 * @param data
 */
const createTask = (data) => {
  const uuid = uuidGenerator.v4();
  const task = lodash.assign({ id: uuid }, data);
  _tasks[uuid] = task;
  return task;
};

/**
 * Update task
 *
 * @param id
 * @param data
 */
const updateTask = (id, data) => {
  if (!_tasks.hasOwnProperty(id)) {
    return false;
  }
  const updatedTask = lodash.assign({}, _tasks[id], data);
  _tasks[id] = updatedTask;
  return updatedTask;
};

/**
 * Delete a task
 *
 * @param id
 */
const removeTask = (id) => {
  if (_tasks.hasOwnProperty(id)) {
    delete _tasks[id];
    return true;
  }
  return false;
};

module.exports = {
  actions: {
    find: findTask,
    list: listTasks,
    create: createTask,
    update: updateTask,
    remove: removeTask,
  },
  schema: schema,
};
