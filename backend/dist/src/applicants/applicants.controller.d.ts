export declare class ApplicantsController {
    private readonly applicantsService;
    constructor(applicantsService: ApplicantsService);
    parseResume(file: any): Promise<{
        success: boolean;
        data: any;
    }>;
    login(body: any): Promise<{
        success: boolean;
        data: {
            id: any;
            email: any;
        };
    }>;
    applyJob(body: {
        applicantId: number;
        jobTitle: string;
        positionId?: number;
    }): Promise<{
        success: boolean;
        data: any;
    }>;
    getApplicants(): Promise<{
        success: boolean;
        data: any;
    }>;
    getApplications(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
    toggleSavedJob(id: string, body: {
        positionId: number;
    }): Promise<{
        success: boolean;
        data: any;
    }>;
    getSavedJobs(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
    submitApplication(body: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
