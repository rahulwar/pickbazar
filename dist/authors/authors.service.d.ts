import { UpdateAuthorDto } from './dto/update-author.dto';
import { GetAuthorDto } from './dto/get-author.dto';
import { GetTopAuthorsDto } from './dto/get-top-authors.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorModel } from './schema/author';
import mongoose from 'mongoose';
export declare class AuthorsService {
    private authorModel;
    private authors;
    constructor(authorModel: mongoose.Model<AuthorModel>);
    create(createAuthorDto: CreateAuthorDto): Promise<mongoose.Document<unknown, {}, AuthorModel> & AuthorModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    getAuthors({ page, limit, search }: GetAuthorDto): Promise<{
        count: number;
        current_page: number;
        firstItem: number;
        lastItem: number;
        last_page: number;
        per_page: number;
        total: number;
        first_page_url: string;
        last_page_url: string;
        next_page_url: string;
        prev_page_url: string;
        data: (mongoose.Document<unknown, {}, AuthorModel> & AuthorModel & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
    getAuthorBySlug(slug: string): Promise<AuthorModel>;
    getTopAuthors({ limit, }: GetTopAuthorsDto): Promise<AuthorModel[]>;
    update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<mongoose.Document<unknown, {}, AuthorModel> & AuthorModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): mongoose.Query<mongoose.mongo.DeleteResult, mongoose.Document<unknown, {}, AuthorModel> & AuthorModel & {
        _id: mongoose.Types.ObjectId;
    }, {}, AuthorModel, "deleteOne">;
}
