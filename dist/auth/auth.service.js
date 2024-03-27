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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../users/entities/user.entity");
const users_json_1 = __importDefault(require("../db/pickbazar/users.json"));
const mongoose_1 = require("@nestjs/mongoose");
const user_1 = require("../users/schema/user");
const mongoose_2 = __importDefault(require("mongoose"));
const jwt_1 = require("@nestjs/jwt");
const users = (0, class_transformer_1.plainToClass)(user_entity_1.User, users_json_1.default);
let AuthService = class AuthService {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.users = users;
    }
    async register(createUserInput) {
        let newObj = Object.assign(Object.assign({}, createUserInput), { permissions: [createUserInput.permission] });
        delete newObj.permission;
        let user;
        user = await this.userModel.findOne({ email: createUserInput.email });
        if (!user) {
            user = await this.userModel.create(newObj);
        }
        const payload = {
            email: user.email,
            sub: user.id,
        };
        const token = this.jwtService.sign(payload);
        return {
            token: token,
            permissions: [createUserInput.permission],
        };
        this.users.push(user);
        return {
            token: 'jwt token',
            permissions: ['super_admin', 'customer'],
        };
    }
    async login(loginInput) {
        const user = await this.userModel.findOne({ email: loginInput.email });
        if (!user) {
            return {
                token: '',
                permissions: [],
                role: '',
            };
        }
        if (user.password !== loginInput.password) {
            return {
                token: '',
                permissions: [],
                role: '',
            };
        }
        const payload = { email: user.email, sub: user.id };
        const jwtToken = this.jwtService.sign(payload);
        console.log(jwtToken);
        return {
            token: jwtToken,
            permissions: user.permissions,
        };
    }
    async changePassword(changePasswordInput) {
        return {
            success: true,
            message: 'Password change successful',
        };
    }
    async forgetPassword(forgetPasswordInput) {
        return {
            success: true,
            message: 'Password change successful',
        };
    }
    async verifyForgetPasswordToken(verifyForgetPasswordTokenInput) {
        return {
            success: true,
            message: 'Password change successful',
        };
    }
    async resetPassword(resetPasswordInput) {
        return {
            success: true,
            message: 'Password change successful',
        };
    }
    async socialLogin(socialLoginDto) {
        return {
            token: 'jwt token',
            permissions: ['super_admin', 'customer'],
            role: 'customer',
        };
    }
    async otpLogin(otpLoginDto) {
        return {
            token: 'jwt token',
            permissions: ['super_admin', 'customer'],
            role: 'customer',
        };
    }
    async verifyOtpCode(verifyOtpInput) {
        return {
            message: 'success',
            success: true,
        };
    }
    async sendOtpCode(otpInput) {
        return {
            message: 'success',
            success: true,
            id: '1',
            provider: 'google',
            phone_number: '+919494949494',
            is_contact_exist: true,
        };
    }
    me(request) {
        return this.users[0];
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", user_entity_1.User)
], AuthService.prototype, "me", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_1.UsersModel.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService, mongoose_2.default.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map