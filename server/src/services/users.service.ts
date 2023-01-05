import { User } from '../entities/user.entity';
import { HttpException } from '../exceptions/HttpException';
import { UserDto } from '../dtos/user.dto';

class UsersService {
  public async findAllUsers(): Promise<User[]> {
    const users: User[] = await User.find();

    return users;
  }

  public async findUser(userId: number): Promise<User> {
    const findUser: User = await User.findOne({ where: { user_id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async findUserByKakaoId(kakaoId: number): Promise<User> {
    const findUser: User = await User.findOne({ where: { kakao_id: kakaoId, is_kakao: true } });

    return findUser;
  }

  public async createUser(userData: UserDto): Promise<User> {
    const findUser: User = await User.findOne({ where: { kakao_id: userData.kakao_id } });
    if (findUser) throw new HttpException(409, 'User already exist');

    const createUserData = await User.create({ ...userData }).save();

    return createUserData;
  }
}

export default UsersService;