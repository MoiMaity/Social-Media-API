import express from 'express';
import {
  addComment,
  deleteComment,
  updateComment,
} from '../Controllers/comment.controller.js';

const router = express.Router();

router.post('/:postId', addComment);
router.delete('/:commentId', deleteComment);
router.put('/:commentId', updateComment);

export default router;
