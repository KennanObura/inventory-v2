'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with supliers
 */

const Suplier = use('App/Models/Suplier')
const Database = use('Database')

const { validate } = use('Validator')


class SuplierController {
  /**
   * Show a list of all supliers.
   * GET supliers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, params }) {

    const page = params.page ? params.page : 1
    let data = await Database
      .select('*')
      .from('supliers')
      .orderBy('id', 'Desc')
      .paginate(page, 10)

    return view.render('layouts.suppliers.supplier-home', { suppliers: data })
  }

  /**
   * Render a form to be used for creating a new suplier.
   * GET supliers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    return view.render('layouts.suppliers.create')
  }

  /**
   * Create/save a new suplier.
   * POST supliers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth, session }) {

    //get all reguested parameters
    const params = request.all()

    //define validation rules here
    const rules = {
      sup_businessname: 'required',
      sup_telephone: 'required',
      sup_address: 'required',
      sup_email: 'required',
      sup_website: 'required'
    }


    //validate inputs
    const validation = await validate(params, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.route('SuplierController.store')
    }


    try {
      //new supplier instance
      const supplier = new Suplier()
      let supCode =  Math.random().toString(36).substring(2, 10).toUpperCase() + Math.random().toString(36).substring(2, 10).toUpperCase()
      
      supplier.sup_businessname = params.sup_businessname
      supplier.sup_code = supCode
      supplier.sup_telephone = params.sup_telephone
      supplier.sup_address = params.sup_address
      supplier.sup_email = params.sup_email
      supplier.sup_website = params.sup_website
      supplier.sup_industrytype = params.sup_industrytype
      supplier.sup_additional = params.sup_additional
      // supplier.sup_userid = await auth.user.id
      supplier.sup_userid = 3 //test

      //store new supplier data
      await supplier.save()

      //return supplier object
      response.status(201).json({
        message: 'New entry successfull',
        data: supplier
      })

      return response.route('SuplierController.index')

    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'Could not create supplier'
      })
    }


  }

  /**
   * Display a single suplier.
   * GET supliers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing suplier.
   * GET supliers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const supplierId = params.id

    const supplier = await Suplier.find(supplierId)

    return view.render('layouts.suppliers.edit', {supplier: supplier.toJSON()})

    // return response.json(supplier)

  }

  /**
   * Update suplier details.
   * PUT or PATCH supliers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {

    //get parameters
    const values = request.all()

    //assign the supplier to the supplier instance
    const supplier = await Suplier.find(params.id)
    supplier.sup_businessname = values.sup_businessname
    supplier.sup_telephone = values.sup_telephone
    supplier.sup_address = values.sup_address
    supplier.sup_email = values.sup_email
    supplier.sup_website = values.sup_website
    supplier.sup_industrytype = values.sup_industrytype
    supplier.sup_additional = values.sup_additional


    //store changes
    await supplier.save()

    return response.route('SuplierController.index')


  }

  /**
   * Delete a suplier with id.
   * DELETE supliers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = SuplierController
