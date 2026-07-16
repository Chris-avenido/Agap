import { Pool } from 'pg';
export type ApplicantAccount = {
    id: number;
    applicant_number: string;
    email_address: string;
    password_hash?: string | null;
};
export interface ApplicantAccountRepository {
    findByEmail(email: string): Promise<ApplicantAccount | null>;
}
export declare class PostgresApplicantRepository implements ApplicantAccountRepository {
    private readonly pool;
    constructor(pool: Pool);
    findByEmail(email: string): Promise<ApplicantAccount | null>;
}
