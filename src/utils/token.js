import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { envs } from '../config/enviroments/enviroments.js';
import { AppError, catchAsync } from '../errors/index.js';

export const protect = catchAsync(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        next(new AppError('You are not logged in! Please log in to get access', 401));
    }
    console.log(token)

    const decoded = await promisify(jwt.verify)(
        token,
        envs.SECRET_JWD_SEED
    );

    if (decoded.id && decoded.exp > 0) {
        console.log(decoded)
    } else {
        console.log(error)
    }

    req.token = token
    next()
});