const controller = require('../controllers/task');
const model = require('../model');
const joi = require('joi');
const routeParamsValidation = joi.object({
  uuid: joi.string().guid()
});

module.exports = [
  {
    method: 'POST',
    path: '/v1/tasks',
    handler: controller.handlers.create,
    config: {
      description: 'Create task',
      tags: ['task', 'create'],
      validate: {
        payload: model.tasks.schema
      }
    }
  },
  {
    method: 'PUT',
    path: '/v1/tasks/{uuid}',
    handler: controller.handlers.update,
    config: {
      description: 'Update task by uuid',
      tags: ['task', 'update'],
      validate: {
        params: routeParamsValidation,
        payload: model.tasks.schema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/v1/tasks/{uuid}',
    handler: controller.handlers.remove,
    config: {
      description: 'Delete task by uuid',
      tags: ['task', 'delete'],
      validate: {
        params: routeParamsValidation
      }
    }
  },
  {
    method: 'GET',
    path: '/v1/tasks',
    handler: controller.handlers.list,
    config: {
      description: 'List all tasks',
      tags: ['task', 'list']
    }
  },
  {
    method: 'GET',
    path: '/v1/tasks/{uuid}',
    handler: controller.handlers.get,
    config: {
      description: 'Get task by uuid',
      tags: ['task', 'get'],
      validate: {
        params: routeParamsValidation
      }
    }
  }
];
