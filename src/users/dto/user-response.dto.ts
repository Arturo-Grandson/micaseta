import { BoothMember } from '@/booth/entities/booth-member.entity';

export class UserResponseDto {
  id: number;
  uuid: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  boothMembers?: BoothMember[];
}
