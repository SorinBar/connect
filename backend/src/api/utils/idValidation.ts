import { ObjectId } from 'mongodb';
import { string } from 'yup';

export const id = () => {
    return string().test(
        'is-ObjectId',
        'Id must be an ObjectId string',
        function (_id) {
            if (!_id) {
                return false;
            }
            return ObjectId.isValid(_id);
        }
    );
};
