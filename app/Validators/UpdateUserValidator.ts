import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    // email: schema.string({}, [
    //   rules.unique({ table: 'users', column: 'email' }),
    //   rules.required()
    // ]),
    // password: schema.string({}, [
    //   rules.required()
    // ]),
    role_id: schema.number([
      rules.required()
    ]),
    // USER PROFILE
    name: schema.string([
      rules.required()
    ]),
    last_name: schema.string([
      rules.required()
    ]),
    street: schema.string([
      rules.required()
    ]),
    number: schema.string([
      rules.required()
    ]),
    suburb: schema.string([
      rules.required()
    ]),
    city: schema.string([
      rules.required()
    ]),
    state: schema.string([
      rules.required()
    ]),
    zip_code: schema.string([
      rules.required()
    ]),
    phone: schema.string([
      rules.required()
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    required: 'The {{ field }} is required',
  }
}
