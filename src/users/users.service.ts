import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUsersByBoothId(boothId: number): Promise<User[]> {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.boothMembers', 'boothMember')
      .innerJoin('boothMember.booth', 'booth')
      .where('booth.id = :boothId', { boothId })
      .getMany();

    return users;
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['boothMembers', 'boothMembers.booth'],
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponseDto;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['boothMembers', 'boothMembers.booth'],
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Credenciales inválidas');
    }

    // No validamos las casetas aquí, eso lo hace el AuthService
    return user;
  }

  async getUserBooths(userId: number): Promise<any[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['boothMembers', 'boothMembers.booth'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user.boothMembers.map((member) => ({
      id: member.booth.id,
      name: member.booth.name,
    }));
  }
}
