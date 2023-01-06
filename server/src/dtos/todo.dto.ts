import {IsBoolean, IsString} from 'class-validator';
import {Transform} from 'class-transformer';

export class TodoDto {
    @IsString()
    text: string

    @Transform(({value}) => value === 'true')
    @IsBoolean()
    is_completed: boolean;
}