import express from 'express';
import authController from '../controllers/authController.js';
import { estateController } from '../controllers/index.js';
import commentRouter from './commentRoutes.js';
import { uploader } from '../utils/multer.js';
import wishesListRouter from './wishesListRoutes.js';
import commentController from '../controllers/commentController.js';
import { estateMiddleware } from '../middlewares/index.js';

const estateRouter = express.Router();

estateRouter.get('/', estateController.getAllEstate);
estateRouter.route('/:estateId/comments', commentController.getCommentByEstate);
estateRouter.get(
  '/:id',
  estateMiddleware.checkExistanceEstate,
  estateController.getInfoEstate
);
estateRouter.use(authController.protect);
estateRouter.use('/:estateId/wishesLists', wishesListRouter);
estateRouter.post('/', uploader.multifile, estateController.createEstate);
estateRouter.use('/:estateId/comments', commentRouter);
export default estateRouter;
