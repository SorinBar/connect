import { Router, Request, Response } from 'express';
import { validatePath, validateBody } from '../middlewares/validate';
import authenticateToken from '../middlewares/authenticate';
import permissionValidation from '../middlewares/permission';
import {
    contactPatchSchema,
    contactPathSchema,
    contactSchema,
} from '../schemas/contactSchema';
import { ContactController } from '../controllers/contactController';
import { Contact } from '../models/contactModel';

const contactRouter = Router();
contactRouter.use(authenticateToken);

contactRouter.patch(
    '/:userId',
    validatePath(contactPathSchema),
    validateBody(contactPatchSchema),
    permissionValidation,
    async (req: Request, res: Response) => {
        console.log(req.params.userId);
        const oldContact = await ContactController.getContactByUserId(
            req.params.userId
        );

        if (oldContact == null) {
            res.status(400).json('User contact do not exist');
        } else {
            await ContactController.patchContact({
                ...req.body,
                _id: oldContact._id,
                userId: oldContact.userId,
            } as Contact);
            const contact = await ContactController.getContactByUserId(
                req.params.userId
            );
            res.json(contact);
        }
    }
);

export default contactRouter;
