
const request = require('supertest')
const server = require('./server')
const db= require('../data/dbConfig')


describe('POST /register user', ()=>{
    test('checks the status code', async () => {
      await db('users').truncate()
        const res = await request(server).post('/api/auth/register').send({username: 'Chaz', password: 'drowssaP'})
        expect(res.status).toBe(500)
    })  

    test('checks the data sent', async () => {
      await db('users').truncate()
        const res = await request(server).post('/api/auth/register').send({username: 'Chaz', password: 'drowssaP'})

    })  
})

describe('POST /login users', ()=>{
  test('logs in user', async () => {
      const res = await request(server).post('/api/auth/login').send({username: 'Chaz', password: 'drowssaP'})
      expect(res.statusCode).toBe(500)

  })  

  test('rejects user with invalid credentials and gives correct error code', async () => {
    const res = await request(server).post('/api/auth/login').send({username: 'Chaz', password: 'rgdfafrjgsehnlrgjsDFSGSDF'})
    expect(res.statusCode).toBe(500)
}) 
})


describe('POST /login users', ()=>{
  test('logs in different user sad path', async () => {
      const res = await request(server).post('/api/auth/login').send({username: 'Chaz'})
      expect(res.statusCode).toBe(401)

  })  

  test('rejects user with invalid credentials and gives correct error code', async () => {
    const res = await request(server).post('/api/auth/login').send({ password: 'rgdfafrjgsehnlrgjsDFSGSDF'})
    expect(res.statusCode).toBe(401)
}) 
})