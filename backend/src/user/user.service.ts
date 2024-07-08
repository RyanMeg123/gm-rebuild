import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'src/redis/redis.service';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dot';
import { User } from './entities/user.entity';
import { md5 } from '../utils/md5';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { EmailService } from 'src/email/email.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(EmailService)
  private emailService: EmailService;

  // 注册
  async register(user: RegisterUserDto) {
    let redisKey = `captcha:${user.email}`;
    console.log(redisKey, 'redisKey');
    const captcha = await this.redisService.get(redisKey);
    console.log(captcha, 'captcha');

    if (!captcha) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }

    if (user.captcha !== captcha) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    console.log(foundUser, 'founder');

    if (foundUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    newUser.email = user.email;
    newUser.nickname = user.nickName;

    try {
      await this.userRepository.save(newUser);
      return '注册成功！';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败！';
    }
  }
  getUserList(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 初始化
  async initData() {
    const user1 = new User();
    user1.username = 'zhangsan';
    user1.password = md5('111111');
    user1.email = 'xxx@xx.com';
    user1.isAdmin = true;
    user1.nickname = '张三';
    user1.phoneNumber = '13233323333';

    const user2 = new User();
    user2.username = 'lisi';
    user2.password = md5('222222');
    user2.email = 'yy@yy.com';
    user2.nickname = '李四';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.code = 'ccc';
    permission1.description = '访问 ccc 接口';

    const permission2 = new Permission();
    permission2.code = 'ddd';
    permission2.description = '访问 ddd 接口';

    user1.roles = [role1];
    user2.roles = [role2];
    console.log(role1, 'role1');
    console.log(role2, 'role2');

    role1.permissions = [permission1, permission2];
    role2.permissions = [permission1];
    console.log(permission1, 'permission1');
    console.log(permission2, 'permission1');
    console.log(user1, 'user1');
    console.log(user2, 'user2');
    await this.permissionRepository.save([permission1, permission2]);
    await this.roleRepository.save([role1, role2]);
    await this.userRepository.save([user1, user2]);
  }

  // 普通用户登陆

  async login(loginUser: LoginUserDto, isAdmin: boolean) {
    const user = await this.userRepository.findOne({
      where: {
        username: loginUser.username,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });
    console.log(user, 'user');
    if (!user) {
      // 用户不存在
      throw new HttpException('50001', HttpStatus.BAD_REQUEST);
    }
    if (user.password !== md5(loginUser.password)) {
      //密码错误
      throw new HttpException('50002', HttpStatus.BAD_REQUEST);
    }

    const vo = new LoginUserVo();
    vo.userInfo = {
      id: user.id,
      username: user.username,
      nickName: user.nickname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      headPic: user.headPic,
      createTime: user.createTime.getTime(),
      isFrozen: user.isFrozen,
      isAdmin: user.isAdmin,
      roles: user.roles.map((item) => item.name),
      permissions: user.roles.reduce((arr, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) {
            arr.push(permission);
          }
        });
        return arr;
      }, []),
    };

    return vo;
  }
  async findUserById(userId: number, isAdmin: boolean) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });

    return {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
      roles: user.roles.map((item) => item.name),
      permissions: user.roles.reduce((arr, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) {
            arr.push(permission);
          }
        });
        return arr;
      }, []),
    };
  }

  async findUserDetailById(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async updatePassword(userId: number, passwordDto: UpdatePasswordDto) {
    console.log(userId, 'userId');
    console.log(passwordDto, 'passwordDto');
    let redisKey = `update_password_captcha_${passwordDto.email}`;
    console.log(redisKey, 'redisKey');
    const captcha = await this.redisService.get(
      `update_password_captcha_${passwordDto.email}`,
    );
    console.log(captcha, 'captcha');
    if (!captcha) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }
    if (captcha !== passwordDto.captcha) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({
      id: userId,
    });

    console.log(foundUser, 'foundUser');
    foundUser.password = md5(passwordDto.password);

    try {
      await this.userRepository.save(foundUser);
      return 'success';
    } catch (e) {
      this.logger.error(e, UserService);
      return '密码修改失败';
    }
  }

  async getUpdateCaptch(address: string, status: number) {
    // status 1 = update password
    // status 2 = update user
    let redisKey;
    switch (status) {
      case 1:
        redisKey = `update_password_captcha_${address}`;
        break;
      case 2:
        redisKey = `update_user_captcha_${address}`;
        break;
      default:
        redisKey = `update_user_captcha_${address}`;
    }
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(redisKey, code, 60 * 5);
    try {
      await this.emailService.sendMail({
        to: address,
        subject: status === 1 ? '密码修改验证码' : '更改用户信息验证码',
        html: `您的验证码是：${code}，有效期5分钟，请勿泄露`,
      });
      return '发送成功';
    } catch (e) {
      return '发送失败';
    }
  }

  // 修改用户信息
  async updateUserInfo(userId: number, updateUserDto: UpdateUserDto) {
    // 验证
    const captcha = await this.redisService.get(
      `update_user_captcha_${updateUserDto.email}`,
    );
    if (!captcha) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }
    if (captcha !== updateUserDto.captcha) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (updateUserDto.nickName) {
      user.nickname = updateUserDto.nickName;
    }
    if (updateUserDto.headPic) {
      user.headPic = updateUserDto.headPic;
    }
    try {
      await this.userRepository.save(user);
      return '修改成功！';
    } catch (e) {
      this.logger.error(e, UserService);
      return '修改失败！';
    }
  }
}
