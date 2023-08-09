import { HttpException, HttpStatus } from '@nestjs/common'

export const throwConflictError = (header: string): void => {
  throw new HttpException(`This ${header} is exists`, HttpStatus.CONFLICT)
}
