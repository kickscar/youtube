import express from 'express';
import categoryController from '../controllers/category.controller.js'

const router = express.Router(); // eslint-disable-line new-cap

router.route('/').get(categoryController.list);

export default router;