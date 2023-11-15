import request from 'supertest'
import mongoose from 'mongoose'
import app from '../main'

const uri = `mongodb+srv://frantisekf:${process.env.DB_PASSWORD}@cluster0.zrvplni.mongodb.net/?retryWrites=true&w=majority`

beforeEach(async () => {
  await mongoose.connect(uri)
})

afterEach(async () => {
  await mongoose.connection.close()
})

describe('POST /api/convert', () => {
  it('should create a money conversion entry in the DB and return the result', async () => {
    const res = await request(app).post('/api/convert').send({
      amount: 500,
      from: 'USD',
      to: 'EUR'
    })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body?.data).toHaveProperty('originalAmount')
    expect(res.body?.data).toHaveProperty('destAmount')
    expect(res.body?.data).toHaveProperty('from')
    expect(res.body?.data).toHaveProperty('to')
  }, 30000)
})

describe('GET /api/get-all-converted-results', () => {
  it('should return all converted results', async () => {
    const res = await request(app).get('/api/get-all-converted-results')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body?.data[0]).toHaveProperty('originalAmount')
    expect(res.body?.data[0]).toHaveProperty('destAmount')
    expect(res.body?.data[0]).toHaveProperty('from')
    expect(res.body?.data[0]).toHaveProperty('to')
  })
})
