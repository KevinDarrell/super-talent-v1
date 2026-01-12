import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(':id')
    async getProfile(@Param('id') id: string) {
        return this.userService.getProfile(id);
    }

    @Patch(':id')
    async updateProfile(
        @Param('id') id: string,
        @Body() body: { name?: string; picture?: string }
    ) {
        return this.userService.updateProfile(id, body);
    }

    @Patch(':id/password')
    async changePassword(
        @Param('id') id: string,
        @Body() body: { currentPassword: string; newPassword: string }
    ) {
        return this.userService.changePassword(id, body);
    }

    @Get(':id/cvs')
    async getUserCvs(@Param('id') id: string) {
        return this.userService.getUserCvs(id);
    }
}
