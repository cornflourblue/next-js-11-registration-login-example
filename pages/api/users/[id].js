const bcrypt = require('bcryptjs');

import { apiHandler } from 'helpers/api';
import { usersRepo, omit } from 'helpers/api';

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getById();
        case 'PUT':
            return update();
        case 'DELETE':
            return _delete();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getById() {
        const user = usersRepo.getById(req.query.id);

        if (!user) throw 'User Not Found';

        return res.status(200).json(omit(user, 'hash'));
    }

    function update() {
        // split out password from user details 
        const { password, ...user } = req.body;

        // validate
        if (user.username !== user.username && users.find(x => x.username === user.username))
            throw `User with the username ${user.username} already exists`;

        // only update hashed password if entered
        if (password) {
            user.hash = bcrypt.hashSync(password, 10);
        }

        usersRepo.update(req.query.id, user);
        return res.status(200).json({});
    }

    function _delete() {
        usersRepo.delete(req.query.id);
        return res.status(200).json({});
    }
}
