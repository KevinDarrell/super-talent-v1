import { IsNumber, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateCheckoutDto {
    @IsNumber()
    packageId: number; // 1, 3, or 5 credits

    @IsOptional()
    @IsString()
    redirectUrl?: string;
}

export class MayarWebhookDto {
    id: string;
    event: string;
    status: string;
    amount: number;
    email: string;
    name: string;
    mobile?: string;
    description: string;
    createdAt: string;
    paidAt?: string;
    metadata?: Record<string, any>;
}

export interface CreditPackage {
    id: number;
    name: string;
    credits: number;
    priceIdr: number;
    description: string;
    savings?: string;
    popular: boolean;
}

export const CREDIT_PACKAGES: CreditPackage[] = [
    {
        id: 1,
        name: '1 Credit',
        credits: 1,
        priceIdr: 10000,
        description: 'Try it out',
        popular: false,
    },
    {
        id: 3,
        name: '3 Credits',
        credits: 3,
        priceIdr: 25000,
        description: 'Best for job seekers',
        savings: '17% off',
        popular: true,
    },
    {
        id: 5,
        name: '5 Credits',
        credits: 5,
        priceIdr: 35000,
        description: 'Maximum value',
        savings: '30% off',
        popular: false,
    },
];
