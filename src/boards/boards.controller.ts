import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation-pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // @Get('/')
  // getAllboards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // creatBoards(@Body() createdBoardDto: CreateBoardDto) {
  //   return this.boardsService.createBoard(createdBoardDto);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  creatBoards(@Body() createdBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createdBoardDto);
  }

  // @Delete('/:id')
  // deleteBoards(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardsStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
