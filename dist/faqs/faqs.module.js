"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqsModule = void 0;
const common_1 = require("@nestjs/common");
const faqs_controller_1 = require("./faqs.controller");
const faqs_service_1 = require("./faqs.service");
const mongoose_1 = require("@nestjs/mongoose");
const faq_1 = require("./schema/faq");
let FaqsModule = class FaqsModule {
};
FaqsModule = __decorate([
    (0, common_1.Module)({
        controllers: [faqs_controller_1.FaqsController],
        providers: [faqs_service_1.FaqsService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: faq_1.FaqModel.name, schema: faq_1.FaqSchema }]),
        ],
    })
], FaqsModule);
exports.FaqsModule = FaqsModule;
//# sourceMappingURL=faqs.module.js.map