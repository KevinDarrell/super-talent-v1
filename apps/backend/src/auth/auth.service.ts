import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async syncUser(userDto: any) {
    const { email, name, picture } = userDto;
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          picture: picture,
          credits: 1,
          lastCreditRefresh: new Date(),
        },
      });
    } else {
      // Check and apply daily free credit
      user = await this.applyDailyFreeCredit(user);
    }

    return user;
  }

  /**
   * Apply daily free credit logic:
   * - If lastCreditRefresh is before today AND user has 0 credits
   * - Grant 1 free credit and update lastCreditRefresh
   */
  private async applyDailyFreeCredit(user: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastRefresh = new Date(user.lastCreditRefresh);
    lastRefresh.setHours(0, 0, 0, 0);

    // Check if last refresh was before today AND user has 0 credits
    if (lastRefresh < today && user.credits === 0) {
      return this.prisma.user.update({
        where: { id: user.id },
        data: {
          credits: 1,
          lastCreditRefresh: new Date(),
        },
      });
    }

    return user;
  }

  async register(body: any) {
    const { email, password, name } = body;
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        picture: `https://ui-avatars.com/api/?name=${name}`,
        credits: 1,
        lastCreditRefresh: new Date(),
      },
    });
    return user;
  }

  async validateUser(body: any) {
    const { email, password } = body;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    // Apply daily free credit on login
    const updatedUser = await this.applyDailyFreeCredit(user);

    const { password: _, ...result } = updatedUser;
    return result;
  }
}
