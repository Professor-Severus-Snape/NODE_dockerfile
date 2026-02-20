import express from 'express';
import actionsRoutes from './actions/index.js';
import apiRoutes from './api/index.js';
import viewRoutes from './view/index.js';

const router = express.Router();

// Action маршруты -> http://localhost:{PORT}/actions:
router.use('/actions', actionsRoutes);

// API маршруты -> http://localhost:{PORT}/api:
router.use('/api', apiRoutes);

// View маршруты -> http://localhost:{PORT}:
router.use('/', viewRoutes);

export default router;
