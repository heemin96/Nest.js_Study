import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

// injectable을 통해 어디서든 사용 가능하다
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: any,
  ) {}

  // private boards: Board[] = [];
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Cant find Board with id ${id}`);
  //   }
  //   return found;
  // }

  async getBoardById(id: any): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`cant find Board with id ${id}`);
    }

    return found;
  }
  // createBoard(creatBoardDto: CreateBoardDto) {
  //   const { title, description } = creatBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  // }

  async createBoard(creatBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = creatBoardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardRepository.save(board);
    return board;
  }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
