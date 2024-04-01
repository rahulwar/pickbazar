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
import { CreateFeedBackDto } from './dto/create-feedback.dto';
import { UpdateFeedBackDto } from './dto/update-feedback.dto';
import { FeedbackService } from './feedbacks.service';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    findAll(): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schema/feedback").FeedbackModel> & import("./schema/feedback").FeedbackModel & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    find(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/feedback").FeedbackModel> & import("./schema/feedback").FeedbackModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(createFeedBackDto: CreateFeedBackDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/feedback").FeedbackModel> & import("./schema/feedback").FeedbackModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateFeedBackDto: UpdateFeedBackDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/feedback").FeedbackModel> & import("./schema/feedback").FeedbackModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<import("mongodb").DeleteResult>;
}
