db.createUser(
        {
            user: "be-test-user",
            pwd: "be-test-password",
            roles: [
                {
                    role: "readWrite",
                    db: "be-test"
                }
            ]
        }
);

db.users.insertOne({
	username: 'admin',
	password: '$2b$10$Mp21drR.wlCXtJ4BffTg1.dAEaLrbnlKEKkkPHExpcgxLmQT3yRGa',
	role: 'admin'
});
