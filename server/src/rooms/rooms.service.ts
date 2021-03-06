import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { ENV_CONFIGURATION } from 'config/configuration';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-channel.dto';
import { GetTokenDto } from './dto/get-token.dto';
import { Room } from './rooms.entity';
import { GetTokenRes } from './types/controller-response-types';

@Injectable()
export class RoomsService {
  constructor(
    private configService: ConfigService<ENV_CONFIGURATION>,
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private createToken(data: CreateRoomDto, userId: number): string {
    const appId = this.configService.get('AGORA_APP_ID');
    const appCertificate = this.configService.get('AGORA_APP_CERTIFICATE');
    const channelName = data.roomName;
    const uid = userId;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 432000;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    return RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs,
    );
  }

  async getTokenForRoom(data: GetTokenDto): Promise<GetTokenRes> {
    const roomExists = await this.roomsRepository.findOne({
      where: { url_name: data.roomName },
    });

    if (!roomExists) {
      throw new NotFoundException('Room does not exists');
    }

    //Genera un uid:number de el count de los usuarios hasta 1000000.
    const uid = parseInt(data.uid);

    const userId = !uid
      ? Math.floor(Math.random() * 1000000) +
        (await this.usersRepository.count())
      : uid;

    const token = this.createToken(data, userId as number);

    return {
      roomName: data.roomName,
      token,
      uid: userId as number,
    };
  }

  async createRoom(data: CreateRoomDto, uid: number): Promise<any> {
    const isRoomNameUnique = await this.roomsRepository.findOne({
      where: { name: data.roomName, creatorId: uid },
    });

    if (isRoomNameUnique) {
      throw new BadRequestException('Room name already exists');
    }

    const room = await this.roomsRepository.create({
      name: data.roomName,
      creatorId: uid,
      url_name: `${data.roomName}_${uid}`,
    });

    //const token = this.createToken(data, uid);

    if (!room) {
      throw new BadRequestException('Room could not be created');
    }

    await this.roomsRepository.save(room);

    return await this.roomsRepository.findOne({
      where: { id: room.id },
      relations: ['creator'],
    });
  }

  async getAllRooms(): Promise<Array<Room>> {
    const rooms = await this.roomsRepository.find({
      relations: ['creator'],
      order: { created_at: 'DESC' },
    });

    if (!rooms) {
      throw new NotFoundException('No rooms available');
    }

    return rooms;
  }

  async getMyRooms(id: number): Promise<Room[]> {
    const rooms = await this.roomsRepository.find({
      where: { creatorId: id },
      relations: ['creator'],
      order: { created_at: 'DESC' },
    });

    if (!rooms) throw new NotFoundException('No rooms available');

    return rooms;
  }

  async getRoomByName(roomName: string): Promise<Room> {
    const room = await this.roomsRepository.findOne({
      where: { url_name: roomName },
      relations: ['messages', 'messages.user'],
    });

    if (!room) throw new NotFoundException('Room does not exist');

    return room;
  }
}
