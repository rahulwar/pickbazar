import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { GetTagsDto, TagPaginator } from './dto/get-tags.dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): {
        name: string;
        type: import("../types/entities/type.entity").Type;
        language: string;
        details: string;
        icon: string;
        image: import("../common/entities/attachment.entity").Attachment;
        id: number;
    };
    findAll(query: GetTagsDto): Promise<TagPaginator>;
    findOne(param: string, language: string): import("./entities/tag.entity").Tag;
    update(id: string, updateTagDto: UpdateTagDto): import("./entities/tag.entity").Tag;
    remove(id: string): string;
}
