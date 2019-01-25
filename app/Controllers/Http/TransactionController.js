'use strict'

class TransactionController {

    async index({ request, response, auth, session, view }) {

       
        // try {
        //     const user = await auth.getUser()
            return view.render('layouts.dashboard.dashboard')
        // } catch (e) {
        // }

    }
}

module.exports = TransactionController
