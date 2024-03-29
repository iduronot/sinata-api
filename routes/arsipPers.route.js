var express = require('express');
var router = express.Router();

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware');
const {
  viewArsipPers,
  addArsipPers,
  editArsipPers,
  deleteArsipPers,
  viewOneArsipPers,
} = require('../controllers/arsipPers.controller');

router.get('/lihat', isLoginSuperAdmin, viewArsipPers);
router.get('/:id/lihat', isLoginSuperAdmin, viewOneArsipPers);
router.post('/tambah', isLoginSuperAdmin, addArsipPers);
router.put('/:id/edit', isLoginSuperAdmin, editArsipPers);
router.delete('/:id/delete', isLoginSuperAdmin, deleteArsipPers);

module.exports = router;
