import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBooleanString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    // 追加でチェックする時にみる?
}
