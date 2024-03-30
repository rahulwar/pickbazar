import { CreateMessageDto } from './dto/create-message.dto';
import { GetConversationsDto } from 'src/conversations/dto/get-conversations.dto';
import { MessageModel } from './schema/message';
import mongoose from 'mongoose';
export declare class MessagesService {
    private messageModel;
    private messages;
    constructor(messageModel: mongoose.Model<MessageModel>);
    createMessage(createMessageDto: CreateMessageDto): Promise<mongoose.Document<unknown, {}, MessageModel> & MessageModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    getMessages({ search, limit, page }: GetConversationsDto): Promise<{
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
        data: (mongoose.Document<unknown, {}, MessageModel> & MessageModel & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
}
