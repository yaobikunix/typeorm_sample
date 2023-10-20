import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    /**
 * DTOはバリデーションの役割に近い働きがある
 * interface型のように型を定義して、
 * データベースなどに値を保存する前にチェックする。
 */ 
// export class CreateUserDto {
    id: number;
    nickName: string;
    isAdult: boolean;
// }
}
