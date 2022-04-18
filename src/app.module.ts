import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Domain } from './domains/entities/domain.entity';
import { DomainsModule } from './domains/domains.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tlduser',
      password: 'tldpassword',
      database: 'tldregistry',
      entities: [User, Domain],
      synchronize: true,
    }),
    UsersModule,
    DomainsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
