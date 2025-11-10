import userRouter from '../routes/user.route.js';

export const attachRoutes = (app) => {
    app.use('/api/users', userRouter);
}