"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const feedback_1 = require("./schema/feedback");
const mongoose_2 = __importDefault(require("mongoose"));
const user_1 = require("../users/schema/user");
let FeedbackService = class FeedbackService {
    constructor(feedbackModel) {
        this.feedbackModel = feedbackModel;
    }
    async findAllFeedBacks() {
        return await this.feedbackModel
            .find()
            .populate({ path: 'user_id', model: user_1.UsersModel.name });
    }
    async findFeedBack(id) {
        const feedback = await this.feedbackModel
            .findById(id)
            .populate({ path: 'user_id', model: user_1.UsersModel.name });
        if (feedback) {
            return feedback;
        }
        else {
            throw new Error(`Feedback for ${id} not found`);
        }
    }
    async create(createFeedBackDto) {
        return this.feedbackModel.create(createFeedBackDto);
    }
    async update(id, updateFeedbackDto) {
        const feedback = await this.feedbackModel.findById(id);
        if (!feedback) {
            throw new Error(`Feedback for ${id} not found`);
        }
        await this.feedbackModel.updateOne({ _id: id }, { $set: { updateFeedbackDto } });
        return await this.feedbackModel.findById(id);
    }
    async delete(id) {
        return this.feedbackModel.deleteOne({ _id: id });
    }
};
FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(feedback_1.FeedbackModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], FeedbackService);
exports.FeedbackService = FeedbackService;
//# sourceMappingURL=feedbacks.service.js.map