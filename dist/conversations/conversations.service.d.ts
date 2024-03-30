import { CreateConversationDto } from './dto/create-conversation.dto';
import { GetConversationsDto } from './dto/get-conversations.dto';
import { ConversationModel } from './schema/conversation';
import mongoose from 'mongoose';
export declare class ConversationsService {
    private conversationModel;
    private conversations;
    constructor(conversationModel: mongoose.Model<ConversationModel>);
    create(createConversationDto: CreateConversationDto): Promise<mongoose.Document<unknown, {}, ConversationModel> & ConversationModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    getAllConversations({ page, limit, search }: GetConversationsDto): Promise<{
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
        data: any;
    }>;
    getConversation(param: string): Promise<{}>;
}
