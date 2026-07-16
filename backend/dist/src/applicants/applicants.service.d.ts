declare class ApplicantsServiceClass {
    parseResume(file: any): Promise<{
        surname: string;
        first_name: string;
        middle_name: string;
        email_address: string;
        mobile_no: string;
        residential_address: string;
        sex: string;
        work_experience: any[];
    }>;
    findOne(id: number): Promise<any>;
    findByEmail(email_address: string): Promise<any>;
    findAll(): Promise<any[]>;
    login(email_address: string, password_raw: string): Promise<any>;
    applyJob(applicantId: number, jobTitle: string, positionId?: string): Promise<any>;
    findApplications(applicantId: number): Promise<any[]>;
    toggleSavedJob(applicantId: number, positionId: string): Promise<{
        status: string;
    }>;
    findSavedJobs(applicantId: number): Promise<any[]>;
    create(data: any): Promise<any>;
    changePassword(applicantId: number, currentPasswordRaw: string, newPasswordRaw: string): Promise<boolean>;
    update(id: number, data: any): Promise<any>;
}
export declare const ApplicantsService: ApplicantsServiceClass;
export {};
