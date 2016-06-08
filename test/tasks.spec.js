const expect = require('chai').expect;
const server = require('../server');

// Helper Functions
// Retrieve tasks
const retrieveTasks = (serverObj) => {
  const request = {
    method: 'GET',
    url: '/v1/tasks',
  };
  return serverObj.inject(request);
};

// Get the first task's id from the response
const pickFirstTaskId = (response) => {
  const [{ id }] = response.result;
  return id;
};

// Retrieve a single task
const retrieveTask = (serverObj, id) => {
  const request = {
    method: 'GET',
    url: `/v1/tasks/${id}`,
  };
  return serverObj.inject(request);
};

describe('route: tasks', () => {
  it('GET /v1/tasks: return an empty array when no tasks exist',
    (done) => {
      const request = {
        method: 'GET',
        url: '/v1/tasks',
      };
      server.inject(request)
        .then(response => {
          expect(response.statusCode).to.be.equal(200, 'wrong response');
          expect(response.result).to.be.a('array');
          expect(response.result.length).to.be.equal(0);
        })
        .then(done)
        .catch((err) => done(err));
    }
  );

  it('GET /v1/tasks/{uuid}: return error for invalid uuid pattern',
    (done) => {
      const request = {
        method: 'GET',
        url: '/v1/tasks/1234',
      };
      server.inject(request)
        .then(response => {
          expect(response.statusCode).to.be.equal(400, 'wrong response');
        })
        .then(done)
        .catch((err) => done(err));
    }
  );

  it('GET /v1/tasks/{uuid}: return not found error non-existent task',
    (done) => {
      const request = {
        method: 'GET',
        url: '/v1/tasks/59e7e63c-6950-4864-874b-79615fdef347',
      };
      server.inject(request)
        .then(response => {
          expect(response.statusCode).to.be.equal(404, 'wrong response');
        })
        .then(done)
        .catch((err) => done(err));
    }
  );

  it('POST /v1/tasks: should return the created object',
    (done) => {
      const request = {
        method: 'POST',
        url: '/v1/tasks',
        payload: {
          title: 'Title',
          description: 'Description',
        },
      };
      server.inject(request)
        .then(response => {
          const { id, title, description } = response.result;
          expect(response.statusCode).to.be.equal(201, 'wrong response');
          expect(id).toBeTruthy;
          expect(title).to.be.equal('Title');
          expect(description).to.be.equal('Description');
        })
        .then(done)
        .catch(err => done(err));
    }
  );

  it('GET /v1/tasks: should contain a single task',
    (done) => {
      const request = {
        method: 'GET',
        url: '/v1/tasks',
      };
      server.inject(request)
        .then(response => {
          const [{ id, title, description }] = response.result;
          expect(response.statusCode).to.be.equal(200, 'wrong response');
          expect(response.result).to.be.a('array');
          expect(response.result.length).to.be.equal(1);
          expect(id).to.be.okay;
          expect(title).to.be.equal('Title');
          expect(description).to.be.equal('Description');
        })
        .then(done)
        .catch(err => done(err));
    }
  );

  it('PUT /v1/tasks/{uuid}: should update a task',
    (done) => {
      const updateTask = (id) => {
        const request = {
          method: 'PUT',
          url: `/v1/tasks/${id}`,
          payload: {
            title: 'New Title',
          },
        };
        return server.inject(request);
      };
      retrieveTasks(server)
        .then(response => {
          const [{ id }] = response.result;
          return updateTask(id);
        })
        .then(response => {
          expect(response.statusCode).to.be.equal(204, 'wrong response');
        })
        .then(done)
        .catch(err => done(err));
    }
  );

  it('GET /v1/tasks/{uuid}: should get a task by id',
    (done) => {
      retrieveTasks(server)
        .then(pickFirstTaskId)
        .then(id => {
          return retrieveTask(server, id);
        })
        .then(response => {
          expect(response.statusCode).to.be.equal(200, 'wrong response');
          expect(response.result.title).to.be.equal('New Title');
          expect(response.result.description).to.be.equal('Description');
        })
        .then(done)
        .catch(err => done(err));
    }
  );

  it('DELETE /v1/tasks/{uuid}: should delete a task',
    (done) => {
      const deleteTask = (id) => {
        const request = {
          method: 'DELETE',
          url: `/v1/tasks/${id}`,
        };
        return server.inject(request);
      };

      let deletedId;

      retrieveTasks(server)
        .then(pickFirstTaskId)
        .then(id => {
          deletedId = id;
          return deleteTask(id);
        })
        .then(response => {
          expect(response.statusCode).to.be.equal(204, 'wrong response');
          // Try to get it again to see a 400
          return retrieveTask(server, deletedId);
        })
        .then(response => {
          expect(response.statusCode).to.be.equal(404, 'wrong response');
        })
        .then(done)
        .catch(err => done(err));
    }
  );

  it('POST /v1/tasks: missing title returns error',
    (done) => {
      const request = {
        method: 'POST',
        url: '/v1/tasks',
        payload: {
          description: 'Description',
        },
      };
      server.inject(request)
        .then(response => {
          expect(response.statusCode).to.be.equal(400, 'wrong response');
          expect(response.result.error).to.be.equal('Bad Request');
          expect(response.result.validation).to.be.okay;
        })
        .then(done)
        .catch(err => done(err));
    }
  );
});
