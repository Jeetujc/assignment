import express from 'express'
import { getContact,getContacts, postContact, putContact, deleteContact } from '../controllers/contactController.js'
import validateToken from '../middlewares/validateTokenHandler.js';

const router = express.Router()

router.use(validateToken) ;
router.get('/',getContacts) ;
router.get('/:id',getContact) ;
router.post('/',postContact) ;
router.put('/:id',putContact) ;
router.delete('/:id',deleteContact) ;

export default router ;