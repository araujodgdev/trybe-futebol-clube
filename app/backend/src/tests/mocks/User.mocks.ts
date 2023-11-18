const dbUser = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      // senha: secret_admin
  };

const loginData = {
    email: 'admin@admin.com',
    password: 'secret_admin',
}

const loginWithWrongEmail = {
    email: 'doesnotexists@user.com',
    password: 'secret_admin',
}

const loginWithInvalidEmail = {
    email: '@email.com',
    password: 'secret_admin',
}

export { dbUser, loginData, loginWithInvalidEmail, loginWithWrongEmail };