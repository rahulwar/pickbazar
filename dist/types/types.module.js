"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesModule = void 0;
const common_1 = require("@nestjs/common");
const types_service_1 = require("./types.service");
const types_controller_1 = require("./types.controller");
const mongoose_1 = require("@nestjs/mongoose");
const types_1 = require("./schema/types");
let TypesModule = class TypesModule {
};
TypesModule = __decorate([
    (0, common_1.Module)({
        controllers: [types_controller_1.TypesController],
        providers: [types_service_1.TypesService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: types_1.TypesModel.name, schema: types_1.TypesSchema }]),
        ],
    })
], TypesModule);
exports.TypesModule = TypesModule;
//# sourceMappingURL=types.module.js.map