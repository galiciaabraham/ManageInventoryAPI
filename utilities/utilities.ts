import { Request, Response, NextFunction } from 'express';
/*The Util object contains a middleware function that catches any errors during the execution.
The error is then throwed to the next error handler*/
const Util = {
  handleErrors: (fn: (req: Request, res: Response, next: NextFunction) => any) => 
    (req: Request, res: Response, next: NextFunction) => 
      Promise.resolve(fn(req, res, next)).catch(next),
};

export default Util;