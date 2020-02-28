const express = require('express')
const routes = express.Router()

const authMiddleware = require('./middleware/auth_middleware')

const UserController = require('./controllers/user_controller')
const EnterpriseController = require('./controllers/enterprise_controller')
const PointController = require('./controllers/point_controller')

// Auth User
routes.post('/auth', UserController.auth);
routes.post('/register', UserController.store);
routes.put('/update/:_id', authMiddleware, UserController.update)

//Create a enterprise
routes.post('/new_enterprise', authMiddleware, EnterpriseController.store)
routes.get('/enterprise/:id', authMiddleware, EnterpriseController.show)

//Save Points
routes.get('/points', authMiddleware, PointController.index)
routes.post('/new_point', authMiddleware, PointController.store)

module.exports = routes