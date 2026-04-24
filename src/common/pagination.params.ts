import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationParams {
    @IsOptional()
    @Type(()=> Number)
    @Min(1)
    @Max(10000)
    limit: number = 10;

    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    offset: number = 0;
}