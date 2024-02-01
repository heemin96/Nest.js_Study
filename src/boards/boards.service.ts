import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { prisma } from 'src/prisma';

@Injectable()
export class BoardsService {
  // private boards: Board[] = [];

  async getAllBoards() {
    return await prisma.board.findMany();
  }

  async getBoardById(id: any) {
    const found = await prisma.board.findMany({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Cannot find Board with id ${id}`);
    }

    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    return await prisma.board.create({
      data: {
        title,
        description,
        status: BoardStatus.PUBLIC, // 이 부분은 적절한 상태 값으로 변경해야 합니다.
      },
    });
  }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  async updateBoardStatus(id: string, status: BoardStatus) {
    const board = await prisma.board.update({
      where: { id },
      data: { status },
    });

    if (!board) {
      throw new NotFoundException(`Cannot find Board with id ${id}`);
    }

    return board;
  }
}
