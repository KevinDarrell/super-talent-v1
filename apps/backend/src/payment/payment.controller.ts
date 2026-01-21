import {
    Controller,
    Post,
    Get,
    Body,
    Headers,
    UseGuards,
    HttpCode,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCheckoutDto } from './dto/payment.dto';
import { AuthGuard, CurrentUser } from '../auth/guards/auth.guard';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get('packages')
    getPackages() {
        return this.paymentService.getPackages();
    }

    @Post('create-checkout')
    @UseGuards(AuthGuard)
    async createCheckout(
        @CurrentUser() userId: string,
        @Body() dto: CreateCheckoutDto,
    ) {
        return this.paymentService.createCheckout(userId, dto);
    }

    @Post('webhook')
    @HttpCode(200)
    async handleWebhook(
        @Body() payload: any,
        @Headers('x-mayar-signature') signature?: string,
    ) {
        return this.paymentService.handleWebhook(payload, signature);
    }

    @Get('transactions')
    @UseGuards(AuthGuard)
    async getTransactions(@CurrentUser() userId: string) {
        return this.paymentService.getUserTransactions(userId);
    }
}
