import { Request, Response, Router } from 'express';
import reportRouter from './report';
import { ResultFunction } from '../helpers/utils';
import { ReturnStatus } from '../types/generic';

const apiRouter = Router();

// define your routes
apiRouter.use('/report', reportRouter);

apiRouter.use('/hello', (req: Request, res: Response) => {
	const data = ResultFunction(
		true,
		'Welcome to Zywa api v1.0',
		200,
		ReturnStatus.OK,
		null
	);
	return res.status(data.code).json(data);
});

export default apiRouter;
