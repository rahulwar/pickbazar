import { CreateFeedBackDto } from './dto/create-feedback.dto';
import { UpdateFeedBackDto } from './dto/update-feedback.dto';
import { FeedbackModel } from './schema/feedback';
import mongoose from 'mongoose';
export declare class FeedbackService {
    private feedbackModel;
    constructor(feedbackModel: mongoose.Model<FeedbackModel>);
    findAllFeedBacks(): Promise<Omit<mongoose.Document<unknown, {}, FeedbackModel> & FeedbackModel & {
        _id: mongoose.Types.ObjectId;
    }, never>[]>;
    findFeedBack(id: string): Promise<mongoose.Document<unknown, {}, FeedbackModel> & FeedbackModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    create(createFeedBackDto: CreateFeedBackDto): Promise<mongoose.Document<unknown, {}, FeedbackModel> & FeedbackModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: string, updateFeedbackDto: UpdateFeedBackDto): Promise<mongoose.Document<unknown, {}, FeedbackModel> & FeedbackModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    delete(id: string): Promise<mongoose.mongo.DeleteResult>;
}
