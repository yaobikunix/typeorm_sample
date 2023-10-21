import { MaxLength, IsBooleanString, IsNotEmpty } from 'class-validator';

/**
 * DTOはバリデーションと型のチェックを担う部分になっている
 * interfaceやtypeのように型を定義して、
 * データベースなどに値を保存する前にチェックする。
 */ 
export class CreateUserDto {
    id: number;

    @IsNotEmpty({message: '文字を入力してください'})
    @MaxLength(10, {message: '文字数を10文字以下にしてください'})
    nickName: string;

    // @IsBooleanString({message: 'isAdultはboolean型である必要があります'})
    isAdult: boolean;
}