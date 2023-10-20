/**
 * DTOはバリデーションの役割に近い働きがある
 * interface型のように型を定義して、
 * データベースなどに値を保存する前にチェックする。
 */ 
export class CreateUserDto {
    id: number;
    nickName: string;
    isAdult: boolean;
}