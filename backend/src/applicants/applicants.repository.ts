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

export class PostgresApplicantRepository implements ApplicantAccountRepository {
  constructor(private readonly pool: Pool) {}

  async findByEmail(email: string): Promise<ApplicantAccount | null> {
    const result = await this.pool.query<ApplicantAccount>(
      `SELECT id, applicant_number, email_address, password_hash
       FROM applicants
       WHERE LOWER(TRIM(email_address)) = $1
       LIMIT 1`,
      [email.trim().toLowerCase()],
    );
    return result.rows[0] ?? null;
  }
}
