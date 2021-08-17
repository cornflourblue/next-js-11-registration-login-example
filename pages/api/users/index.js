import { apiHandler, usersRepo, omit } from 'helpers/api';

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getUsers();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getUsers() {
        // return users without hashed passwords in the response
        const response = usersRepo.getAll().map(x => omit(x, 'hash'));
        return res.status(200).json(response);
    }
}
