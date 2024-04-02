/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AuthorsService } from './authors.service';
import { GetAuthorDto } from './dto/get-author.dto';
import { GetTopAuthorsDto } from './dto/get-top-authors.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorModel } from './schema/author';
export declare class AuthorsController {
    private readonly authorsService;
    constructor(authorsService: AuthorsService);
    createAuthor(createAuthorDto: CreateAuthorDto): Promise<import("mongoose").Document<unknown, {}, AuthorModel> & AuthorModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAuthors(query: GetAuthorDto): Promise<{
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
        data: (import("mongoose").Document<unknown, {}, AuthorModel> & AuthorModel & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getAuthorBySlug(slug: string): Promise<AuthorModel>;
    update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<import("mongoose").Document<unknown, {}, AuthorModel> & AuthorModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").Document<unknown, {}, AuthorModel> & AuthorModel & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, AuthorModel, "deleteOne">;
}
export declare class TopAuthors {
    private authorsService;
    constructor(authorsService: AuthorsService);
    getTopAuthors(query: GetTopAuthorsDto): Promise<AuthorModel[]>;
}
