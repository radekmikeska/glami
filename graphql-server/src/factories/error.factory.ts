import { DocumentNotFound, InternalError } from 'src/graphql';

export class ErrorFactory {
  create(code: number, message: string) {
    const error = new InternalError();
    error.code = code;
    error.message = message;

    return error;
  }

  internalError() {
    return this.create(500, 'Internal server error.');
  }

  documentNotFound(message = 'Document not found.') {
    const error = new DocumentNotFound();
    error.message = message;

    return error;
  }
}
