import { IsArray, IsEnum, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { TaskStatus } from "./tasks.model";
import { Transform } from "class-transformer";

export class FindTaskParams {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    
    @IsOptional()
    @MinLength(2)
    @IsString()
    search?: string;

    @IsOptional()
    @Transform(({value}: {value?: string})=> {
        if(!value) return undefined;
        return value.split(',').map((v)=> v.trim()).filter((v) => v.length)
    })
    @IsString({ each: true })
    labels?: string[]


    @IsOptional()
    @IsIn(['title', 'status'])
    sortBy?: string;
    @IsOptional()
    @IsEnum(['ASC', 'DESC' ])
    sortOrder?: 'ASC' | 'DESC' = 'DESC';
}