import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTaskLabelDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name: string;
}