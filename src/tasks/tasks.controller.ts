import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { FindOneParams } from './find-one.params';
import { Task } from './tasks.entity';
import { FindTaskParams } from './find-task.params';
import { PaginationParams } from 'src/common/pagination.params';
import { PaginationResponse } from 'src/common/pagination-response';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}
 @Get()
  public async findAll(@Query() filter: FindTaskParams, @Query() paginationParams: PaginationParams): Promise<PaginationResponse<Task>>{
    const [items, total] = await this.tasksService.findAll(filter, paginationParams);
    return {
        data: items,
        meta: {
            total,
            ...paginationParams
        }
    }
  }
  @Get('/:id')
  public async findOne(@Param() params: any): Promise<Task | null>  {
    return await this.findTaskOrFail(params.id);
  }

  @Post()
  public async postTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.postTask(createTaskDto);
  }

  @Patch('/:id/status')
  public async patchTask(@Param() params: FindOneParams,
    @Body() body: CreateTaskDto):  Promise<Task> {
    const task = await this.findTaskOrFail(params.id);
    return await this.tasksService.patchTask(params.id, body)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTask(@Param() params: FindOneParams): Promise<void>{
    return await this.tasksService.deleteTask(params.id);
  }

  private async findTaskOrFail(id: string){ 
    const task = this.tasksService.findOne(id);
    if(task){
        return task;
    } else {
        throw new NotFoundException();
    }}
}
