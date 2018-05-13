import { errorResponse } from './defaultObjects';
import errorMsgs from './errorMsgs';

export const errorHandling = (error, res) => {
    //console.error(error);
    res.json(Object.assign({}, errorResponse, {error: errorMsgs.unhandledError}));
};