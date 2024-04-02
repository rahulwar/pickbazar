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
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const address_1 = require("./schema/address");
const mongoose_2 = __importDefault(require("mongoose"));
const user_1 = require("../users/schema/user");
let AddressesService = class AddressesService {
    constructor(addressModel) {
        this.addressModel = addressModel;
    }
    async create(createAddressDto) {
        return await this.addressModel.create(createAddressDto);
    }
    async findAll() {
        return await this.addressModel
            .find()
            .populate({ path: 'customer', model: user_1.UsersModel.name });
    }
    async findOne(id) {
        const address = await this.addressModel
            .findById(id)
            .populate({ path: 'customer', model: user_1.UsersModel.name });
        if (!address) {
            throw new Error(`Could not find the address for ${id}`);
        }
        return address;
    }
    async update(id, updateAddressDto) {
        const address = await this.addressModel
            .findById(id)
            .populate({ path: 'customer', model: user_1.UsersModel.name });
        if (!address) {
            throw new Error(`Could not find the address for ${id}`);
        }
        await this.addressModel.updateOne({ _id: id }, { $set: updateAddressDto });
        return await this.addressModel.findById(id);
    }
    async remove(id) {
        return await this.addressModel.deleteOne({ _id: id });
    }
};
AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(address_1.AddressModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], AddressesService);
exports.AddressesService = AddressesService;
//# sourceMappingURL=addresses.service.js.map