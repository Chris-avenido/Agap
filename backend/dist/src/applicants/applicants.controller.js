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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const applicants_service_1 = require("./applicants.service");
let ApplicantsController = class ApplicantsController {
    applicantsService;
    constructor(applicantsService) {
        this.applicantsService = applicantsService;
    }
    async parseResume(file) {
        if (!file) {
            throw new common_1.HttpException('No file uploaded', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const data = await this.applicantsService.parseResume(file);
            return { success: true, data };
        }
        catch (error) {
            console.error("Parse endpoint error:", error);
            throw new common_1.InternalServerErrorException(error.message || 'Error parsing resume');
        }
    }
    async login(body) {
        const { email_address, password } = body;
        try {
            const applicant = await this.applicantsService.login(email_address, password);
            if (!applicant) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            return { success: true, data: { id: applicant.id, email: applicant.email_address } };
        }
        catch (error) {
            console.error("Error logging in:", error);
            throw new common_1.InternalServerErrorException(error.message || 'Error logging in');
        }
    }
    async applyJob(body) {
        try {
            const result = await this.applicantsService.applyJob(body.applicantId, body.jobTitle, body.positionId);
            return { success: true, data: result };
        }
        catch (error) {
            console.error("Error applying to job:", error);
            throw new common_1.InternalServerErrorException(error.message || 'Error saving job application');
        }
    }
    async getApplicants() {
        try {
            const applicants = await this.applicantsService.findAll();
            return { success: true, data: applicants };
        }
        catch (error) {
            console.error("Error fetching applicants:", error);
            throw new common_1.InternalServerErrorException(error.message || 'Error fetching applicants');
        }
    }
    async getApplications(id) {
        try {
            const applications = await this.applicantsService.findApplications(Number(id));
            return { success: true, data: applications };
        }
        catch (error) {
            console.error("Error fetching applications:", error);
            throw new common_1.InternalServerErrorException(error.message || 'Error fetching applications');
        }
    }
    async toggleSavedJob(id, body) {
        try {
            const result = await this.applicantsService.toggleSavedJob(Number(id), body.positionId);
            return { success: true, data: result };
        }
        catch (error) {
            console.error("Error toggling saved job:", error);
            throw new common_1.InternalServerErrorException(error.message || 'Error toggling saved job');
        }
    }
    async getSavedJobs(id) {
        try {
            const savedJobs = await this.applicantsService.findSavedJobs(Number(id));
            return { success: true, data: savedJobs };
        }
        catch (error) {
            console.error("Error fetching saved jobs:", error);
            throw new common_1.InternalServerErrorException(error.message || 'Error fetching saved jobs');
        }
    }
    async submitApplication(body) {
        try {
            const applicant = await this.applicantsService.create(body);
            return { success: true, message: 'Application submitted successfully', data: applicant };
        }
        catch (error) {
            console.error("Error saving applicant:", error);
            throw new common_1.InternalServerErrorException(error.message || 'Error submitting application');
        }
    }
};
exports.ApplicantsController = ApplicantsController;
__decorate([
    (0, common_1.Post)('parse-resume'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('resume')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicantsController.prototype, "parseResume", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicantsController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('apply-job'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicantsController.prototype, "applyJob", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicantsController.prototype, "getApplicants", null);
__decorate([
    (0, common_1.Get)(':id/applications'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicantsController.prototype, "getApplications", null);
__decorate([
    (0, common_1.Post)(':id/save-job'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApplicantsController.prototype, "toggleSavedJob", null);
__decorate([
    (0, common_1.Get)(':id/saved-jobs'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicantsController.prototype, "getSavedJobs", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicantsController.prototype, "submitApplication", null);
exports.ApplicantsController = ApplicantsController = __decorate([
    (0, common_1.Controller)('api/applicants'),
    __metadata("design:paramtypes", [applicants_service_1.ApplicantsService])
], ApplicantsController);
//# sourceMappingURL=applicants.controller.js.map