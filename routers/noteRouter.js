import express from 'express';
import { isAuthenticate } from '../middleware/userAuthenticate.js';
import { getAllNotes ,createNotes ,updateNotes ,deleteNotes ,getnote} from '../controllers/noteController.js'

const noteRouter = express.Router();


noteRouter.get("/",isAuthenticate,getAllNotes);

noteRouter.post("/create",isAuthenticate,createNotes);

noteRouter.put("/update/:id",isAuthenticate,updateNotes);

noteRouter.get("/note/:id",isAuthenticate,getnote);

noteRouter.delete("/delete/:id",isAuthenticate,deleteNotes);

export { noteRouter};