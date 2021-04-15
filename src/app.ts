import { Request, Response, NextFunction} from 'express';
import  'express-async-errors';
import app from './server';
import AppError from './errors/AppErro';


app.use((err:Error, reqquest: Request, response: Response, next:NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'Error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Server Started on Pot 3333');
});
