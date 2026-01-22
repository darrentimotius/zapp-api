import { ExceptionFilter, Catch, ArgumentsHost, ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError & { code?: string }, host: ArgumentsHost) {
    if (exception.code === '23505') {
        throw new ConflictException('Duplicate data');
    }

    throw exception;
    }
}