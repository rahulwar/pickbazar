import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersModel } from './schema/user';
import mongoose from 'mongoose';
export declare class UsersService {
    private Usermodel;
    private users;
    constructor(Usermodel: mongoose.Model<UsersModel>);
    create(createUserDto: CreateUserDto): Promise<User>;
    getUsers({ text, limit, page, search, }: GetUsersDto): Promise<UserPaginator>;
    getUsersNotify({ limit }: GetUsersDto): User[];
    findOne(id: number): User;
    update(id: number, updateUserDto: UpdateUserDto): User;
    remove(id: number): string;
    makeAdmin(user_id: string): User;
    banUser(id: number): User;
    activeUser(id: number): User;
    getAdmin({ text, limit, page, search, }: GetUsersDto): Promise<UserPaginator>;
    getVendors({ text, limit, page, search, }: GetUsersDto): Promise<UserPaginator>;
    getAllCustomers({ text, limit, page, search, }: GetUsersDto): Promise<UserPaginator>;
    getMyStaffs({ text, limit, page, search, }: GetUsersDto): Promise<UserPaginator>;
    getAllStaffs({ text, limit, page, search, }: GetUsersDto): Promise<UserPaginator>;
}
