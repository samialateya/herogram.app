import { BadRequestError } from '../errors/BadRequestError';
import { Schema, Validator, ValidationError } from 'jsonschema';

interface SchemaWithErrorMessage extends Schema {
  properties: { [name: string]: Schema & { errorMessage?: Record<string, string> } };
}

type Data = Record<string, number | string>;

/**
 * FormValidator class for validating data against a schema.
 * 
 * This class is used to validate data against a schema with error messages.
 * It throws a BadRequestError with the error messages if the validation fails.
 * 
 */
class FormValidator {
  private validator = new Validator();

  validate(schema: SchemaWithErrorMessage, data: Data): boolean {
    const validatorResponse = this.validator.validate(data, schema, { required: true, nestedErrors: true });
    if (!validatorResponse.valid) {
      const errorMessages = FormValidator.getErrorMessages(schema, validatorResponse.errors);
      throw new BadRequestError('Invalid request data', errorMessages);
    }
    return true;
  }

  private static getErrorMessages(schema: SchemaWithErrorMessage, errors: ValidationError[]): string[] {
    return errors.map(error => {
      return schema.properties[error.path[0]]?.errorMessage?.[error.name] || error.stack;
    });
  }
}

const formValidator = new FormValidator();
export { formValidator };