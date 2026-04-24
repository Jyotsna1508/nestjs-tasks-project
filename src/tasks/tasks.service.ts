import { Injectable, Query } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindTaskParams } from './find-task.params';
import { PaginationParams } from 'src/common/pagination.params';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async findAll(
    filters: FindTaskParams,
    paginationParams: PaginationParams,
  ): Promise<[Task[], number]> {
    const query = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.labels', 'labels');
    if (filters.status) {
      query.andWhere('task.taskStatus = :status', { status: filters.status });
    }
    if (filters.search?.trim()) {
      query.andWhere(
        'task.title ILIKE :search OR task.description ILIKE :search',
        { search: `%${filters.search}%` },
      );
    }
    if(filters?.labels?.length){
        const subQuery = query.subQuery()
        .select('labels.taskId')
        .from('task_label', 'labels')
        .where('labels.name IN (:...name)', { name: filters.labels})
        .getQuery();
        query.andWhere(`task.id IN ${subQuery}`)
    }

    query.orderBy(`task.${filters.sortBy}`, filters.sortOrder);
    query.skip(paginationParams.offset).take(paginationParams.limit);
    return query.getManyAndCount();

    // easy way without query builder
    // const where: FindOptionsWhere<Task> = {};
    // if (filters.status) {
    //   where.taskStatus = filters.status;
    // }
    // if (filters.search?.trim()) {
    //   where.title = Like(`%${filters.search}%`);
    //   where.description = Like(`%${filters.search}%`);
    // }
    // return await this.taskRepository.findAndCount({
    //   where: where,
    //   relations: ['labels'],
    //   skip: paginationParams.offset,
    //   take: paginationParams.limit,
    // });
  }
  async findOne(id: string): Promise<Task | null> {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['labels'],
    });
  }

  async postTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save(createTaskDto as any);
  }

  async patchTask(id: string, createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save(createTaskDto as any);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
