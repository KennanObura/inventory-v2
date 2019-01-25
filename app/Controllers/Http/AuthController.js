'use strict'

const User = use('App/Models/User')

const { validate } = use('Validator')

class AuthController {

    async login({ request, response, auth, session }) {
        const params = request.only(['email', 'password'])
        try {
            const rules = {
                email: 'required',
                password: 'required'
            }



            //validate userinputs
            const validation = await validate(request.all(), rules)

            if (validation.fails()) {
                session
                    .withErrors(validation.messages())
                    .flashExcept(['password'])

                return response.redirect('/')
            }

            const token = await auth.attempt(params.email, params.password)

            response.header('Authorization', 'bearer' + token)
            response.header('Content-type', 'application/json')

            return response.json(token)

        } catch (error) {
            return response.status(400).json({ data: 'error occured while trying to login' })
        }

    }

    async register({ request, response, auth }) {
        const params = request.all()

        //Define validation rules
        const rules = {
            email: 'required|email|unique:users,email',
            password: 'required',
            password2: 'required',
            username: 'required|unique:users'

        }

        //validate userinputs
        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.json(validation.messages())
        }

        // new user instance
        const user = new User()
        user.email = params.email
        user.password = params.password
        user.username = params.username

        //save user
        await user.save()

        //generate new user token
        let token = await auth.generate(user)

        // give response
        return response.json({
            message: 'Successfully',
            data: token
        })
    }

    async signout({ request, response, auth }) {
        await auth.logout()
        return response.json({
            message: 'Signout Success'
        })

    }
}

module.exports = AuthController
