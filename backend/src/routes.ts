import express from "express";
import ItemsController from './controller/itemsController';
import PointsController from './controller/pointController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';
const itemscontroller = new ItemsController();
const pointcontroller = new PointsController();

const router = express.Router();
const upload = multer(multerConfig);

router.get('/items', itemscontroller.index);
router.post('/points', upload.single('image'),
celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
    })
}, {
    abortEarly: false,
})
, pointcontroller.create);
router.get('/points', pointcontroller.index);
router.get('/points/:id', pointcontroller.show);

export default router;