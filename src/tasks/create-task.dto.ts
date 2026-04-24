import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { TaskStatus } from './tasks.model';
import { Type } from 'class-transformer';
import { CreateTaskLabelDto } from './create-task-label.dto';

export class CreateTaskDto {
 @IsString()
 @IsNotEmpty()
 @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

 @IsNotEmpty() 
 @IsEnum(TaskStatus)
 @IsOptional()
  taskStatus?: TaskStatus;


  // @IsNotEmpty()
  // @IsUUID()
  // userId: string

  @IsOptional()
  @ValidateNested({each: true})
  @Type(()=> CreateTaskLabelDto)
  labels?: CreateTaskLabelDto[];

}
