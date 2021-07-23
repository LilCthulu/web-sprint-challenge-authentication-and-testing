
const request = require('supertest')
const server = require('./server')
const db= require('../data/dbConfig')


describe('POST /register user', ()=>{
    test('checks the status code', async () => {
      await db('users').truncate()
        const res = await request(server).post('/api/auth/register').send({username: 'Chaz', password: 'drowssaP'})
        expect(res.status).toBe(201)
        expect(res.type).toBe('application/json')
    })  

    test('checks the data sent', async () => {
      await db('users').truncate()
        const res = await request(server).post('/api/auth/register').send({username: 'Chaz', password: 'drowssaP'})
        expect(res.body.id).toBe(1)
        expect(res.body.username).toBe('Chaz')
    })  
})

describe('POST /login users', ()=>{
  test('logs in user', async () => {
      const res = await request(server).post('/api/auth/login').send({username: 'Chaz', password: 'drowssaP'})
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body.message).toBe('Welcome, Chaz!')
  })  

  test('rejects user with invalid credentials and gives correct error code', async () => {
    const res = await request(server).post('/api/auth/login').send({username: 'Chaz', password: 'rgdfafrjgsehnlrgjsDFSGSDF'})
    expect(res.statusCode).toBe(401)
    expect(res.body.message).toBe('invalid credentials')
}) 
})