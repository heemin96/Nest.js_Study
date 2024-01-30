import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

// injectable을 통해 어디서든 사용 가능하다
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`Cant find Board with id ${id}`);
    }
    return found;
  }

  createBoard(creatBoardDto: CreateBoardDto) {
    const { title, description } = creatBoardDto;

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
