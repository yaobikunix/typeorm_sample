import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

/**
 * service.ts => controllerを補助する役割を担う
 * サービス自体のロジックはここに基本的記述していく（いわば、modelのようなもの）
 * データベースに保存したり、APIからのデータを取得したりして、データを扱いやすくしてコンローラーに渡す
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    // Repositoryはデータベースのデータを操作するためのオブジェクト
    private usersRepository: Repository<User>,
  ) {}

  // ユーザー情報を保存する
  async create(createUser: CreateUserDto): Promise<boolean> {
    try {
      await this.usersRepository.save(createUser); 
      return true; // 保存に成功
      
    } catch(error) {
      console.error('データの保存に失敗しました:', error);
      return false; // 保存に失敗
    }
  }

  // 登録されているすべてのユーザー情報を取得する
  async findAll(): Promise<User[]> {
    await this.usersRepository.find()

    return await this.usersRepository.find();
  }

  // ユーザの詳細情報を取得する
  async findOne(id: number): Promise<User> {
    const userId = {
      id: id //id(column): id(userId)
    };

    const user = await this.usersRepository.findOneBy(userId);

    return user;
  }

  // ユーザー情報の削除
  async remove(id: number): Promise<Boolean> {
    const userId = {
      id: id //id(column): id(userId)
    };

    const result = await this.usersRepository.delete(userId);

    return result.affected === 1;
  }

  // ユーザー情報の更新
  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const updateUser = {
      nickName: updateUserDto.nickName,
      isAdult: updateUserDto.isAdult
    }

    try {
      await this.usersRepository.update(id, updateUser)
      return true; // 更新に成功
      
    } catch(error) {
      console.error('データの更新に失敗しました:', error);
      return false; // 更新に失敗
    }
  }  
}
