// The existing tests in this file should not be modified,
// but you can add more tests if needed.

const supertest = require('supertest')
const server = require('./server.js')

test('data-storage-api-node', async () => {
  // PUT
  const putResult = await supertest(server)
    .put('/data/cats')
    .send({ name: 'Copernicus' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)

  // GET
  const hash = putResult.body.oid
  await supertest(server)
    .get(`/data/cats/${hash}`)
    .expect(200)
    .then(response => {
      expect(response.body).toEqual({ name: 'Copernicus' })
    })

  // DELETE
  await supertest(server)
    .delete(`/data/cats/${hash}`)
    .expect(200)

  await supertest(server)
    .get(`/data/cats/${hash}`)
    .expect(404)
})

test('put-edge-cases', async () => {
  // PUT edge cases
  // no repo
  await supertest(server)
    .put('/data')
    .expect(404)
  
  // no data
  await supertest(server)
    .put('/data/dogs')
    .send({})
    .expect(404)

  // should work as expected
  await supertest(server)
    .put('/data/dogs')
    .send({ name: 'Galileo' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
})

test('get-edge-cases', async () => {
  // GET edge cases
  // no repo
  await supertest(server)
    .get(`/data/`)
    .expect(404)
  
  // no hash
  await supertest(server)
    .get(`/data/dogs/`)
    .expect(404)

  const putResult = await supertest(server)
    .put('/data/dogs')
    .send({ name: 'Galileo' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)

  // wrong repo
  await supertest(server)
    .get(`/data/monkeys/`)
    .expect(404)

  // wrong hash
  await supertest(server)
    .get(`/data/dogs/123`)
    .expect(404)

  // should work as expected
  await supertest(server)
    .get(`/data/dogs/${putResult.body.oid}`)
    .expect(200)
    .then(response => {
      expect(response.body).toEqual({ name: 'Galileo' })
    })
})

test('delete-edge-cases', async () => {
  // DELETE edge cases
  // no repo
  await supertest(server)
    .delete(`/data/`)
    .expect(404)
  // no hash
  await supertest(server)
    .delete(`/data/dogs/`)
    .expect(404)

  const putResult = await supertest(server)
    .put('/data/dogs')
    .send({ name: 'Galileo' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)

  // wrong repo
  await supertest(server)
    .delete(`/data/monkeys/`)
    .expect(404)

  // wrong oid
  await supertest(server)
    .delete(`/data/dogs/123`)
    .expect(404)

  // should work as expected
  await supertest(server)
    .delete(`/data/dogs/${putResult.body.oid}`)
    .expect(200)
})
