'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')

Route.group(() => {
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login')
    Route.post('logout', 'AuthController.signout')

    //
    
    // .middleware(['auth'])
}).prefix('api/v2/auth')

Route.group(() => {
    Route.get('home', 'TransactionController.index')

    Route.get('suppliers/page/:page?', 'SuplierController.index')
    Route.post('suppliers', 'SuplierController.store')
    Route.get('suppliers', 'SuplierController.create')
    Route.put('suppliers/:id', 'SuplierController.update')
    Route.delete('suppliers/:id', 'SuplierController.destroy')

}).prefix('api/v2/')
