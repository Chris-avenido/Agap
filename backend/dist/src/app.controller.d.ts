import { PrismaService } from './prisma.service';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly prisma;
    constructor(appService: AppService, prisma: PrismaService);
    getHello(): string;
    registerHrAdmin(data: any): Promise<{
        success: boolean;
        data: {
            uid: any;
            email: any;
        };
    }>;
}
