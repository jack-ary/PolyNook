import request from 'supertest'
import app from '../server/backend.js'

describe('GET /', () => {
    it('responds with "Hello World!"', (done) => {
        request(app.app)
            .get('/')
            .expect(200)
            .expect('Hello World!')
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    })
})

afterAll(() => {
    app.server.close()
})
