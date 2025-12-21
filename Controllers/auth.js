import { compare, hashPassword } from './../utils/password.js'
import * as queries from './../db/admin-queries.js'
import * as jwt from './../utils/jwt.js'

export async function authenticateAdmin(req, res, next) {
    if (!req.body.email || !req.body.password) return res.status(400).send('failure');

    let email = req.body.email;
    let providedPassword = req.body.password;

    try {
        let user = await queries.getAdmin(email);

        let targetPassword = user[0].password;

        await compare(providedPassword, targetPassword)

        user = {
            name: user[0].name,
            email: user[0].email,
            id: user[0].id,
            admin: true,
        }

        let token = jwt.signToken(user);
        res.json({ token })

    } catch (error) {
        return res.status(401).send('Wrong Credentials');
    }
}


export function authorizeAccess(req, res, next) {

    try {
        let token = req.header('authorization').split(' ')[1];
        let result = jwt.verifayToken(token);
        req.user = result;
        next();
    } catch (error) {
        res.status(403);
        res.send();
    }
}