const routes = require('./../routes/routes');
const expect = require('expect');
const request = require('supertest');
var app = require('./../server').app;

describe('POST /signup', ()=>{
	it('should create new user', (done)=>{
		var userData = {
			email:"test@test.com",
			password:"test123"
		}
		request(app)
		.post('/signup')
		.send(userData)
		.expect(200)
		// .expect((res)=>{
		// 	expect(res.body.data).toBe(userData.email)
		// })
		.end((err, res)=>{
			if(err){
				return done(err);
			}else{
				return done();
			}
		})
	})
})

describe('POST /login', ()=>{
	it('should login successfully with correct email and password', (done)=>{
		var loginData = {
			email:"test@test.com",
			password:"test123"
		}
		request(app)
		.post('/login')
		.send(loginData)
		.expect(200)
		.expect((res)=>{
			expect(res.body.user.email).toBe(loginData.email)
		})
		.end((err, res)=>{
			if(err){
				return done(err);
			}else{
				return done();
			}
		})
	})

	it('user not found', (done)=>{
		var loginData = {
			email:"testerr@test.com",
			password:"test123"
		}
		request(app)
		.post('/login')
		.send(loginData)
		.expect(200)
		.expect((res)=>{
			expect(res.body.success).toBe(false)
			expect(res.body.message).toBe("user not found")
		})
		.end((err, res)=>{
			if(err){
				return done(err);
			}else{
				return done();
			}
		})
	})

	it('password went wrong for above entered user', (done)=>{
		var loginData = {
			email:"test@test.com",
			password:"err123"
		}
		request(app)
		.post('/login')
		.send(loginData)
		.expect(200)
		.expect((res)=>{
			expect(res.body.success).toBe(false)
			expect(res.body.message).toBe("password went wrong for above entered user")
		})
		.end((err, res)=>{
			if(err){
				return done(err);
			}else{
				return done();
			}
		})
	})
})

