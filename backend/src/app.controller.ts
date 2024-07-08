import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { RequireLogin, RequirePermission } from './custom.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('aaa')
  @RequireLogin()
  @RequirePermission('ddd', 'ttt')
  //   @SetMetadata('require-login', true)
  //   @SetMetadata('require-permission', ['ddd', 'ttt'])
  aaaa() {
    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }
}
