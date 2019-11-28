'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', ({ response }) => {
    response.status(200).send({
        name: 'Api Financius',
        author: 'Matheus Ap. S. Roberto'
    });
});

// User e Login
Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

// Category CRUD
Route.resource('category', 'CategoryController').apiOnly().middleware('auth')

// Flow CRUD
Route.get('category/:id/flows', 'FlowController.index').middleware('auth');
Route.post('category/:id/flows', 'FlowController.store').middleware('auth');
Route.delete('flows/:id', 'FlowController.destroy').middleware('auth');
Route.patch('flows/:id', 'FlowController.update').middleware('auth');
Route.get('flows/:id', 'FlowController.listFlow').middleware('auth');


// Banks CRUD
Route.resource('banks', 'BankController').apiOnly().middleware('auth');
Route.get('banks/:id', 'BankController.show').middleware('auth');


// Funcs Bank
Route.post('/banksjson', 'BankController.storeJSON').middleware('auth');

// Payment
Route.resource('payments', 'PaymentController').apiOnly().middleware('auth');
// Card or Account List
Route.get('payment/:id', 'PaymentController.list').middleware('auth');

//Currencys
Route.get('currency/all', 'CurrencyController.listCurrency').middleware('auth');

Route.get('currency/convert', 'CurrencyController.convertCurrency').middleware('auth');

Route.get('investment/simulate', 'InvestmentController.simulate').middleware('auth');

// CRUD Transactions
Route.resource('transactions', 'TransactionController').apiOnly().middleware('auth');

//  Funcs Flow
Route.get('date/transactions', 'TransactionController.listDate').middleware('auth');
