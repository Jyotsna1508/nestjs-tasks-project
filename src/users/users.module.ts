import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypedConfigService } from 'src/config/typed.config.service';
import { AuthConfig } from 'src/config/auth.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: TypedConfigService): JwtModuleOptions => {
        const auth = config.get<AuthConfig>('auth');

        if (!auth) {
          throw new Error('Auth config is missing');
        }

        return {
          secret: auth.jwt.secret,
          signOptions: {
            expiresIn: auth.jwt.expiresIn,
          },
        };
      },
    }),
  ],
})
export class UsersModule {}
