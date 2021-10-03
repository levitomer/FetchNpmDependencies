import { Request, Response, NextFunction } from 'express';
import validate from 'validate-npm-package-name';

export default function validation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { package_name } = req.params;
    if (!validate(package_name).validForOldPackages) {
        //check the data on redis store.
        res.send('Invalid registry Name');
    } else {
        next();
    }
}
