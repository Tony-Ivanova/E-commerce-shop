import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Admin",
        email: "Who@cares.com",
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: "User",
        email: "user@cares.com",
        password: bcrypt.hashSync('12345', 10),    }
]

export default users
