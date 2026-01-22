import { ArrayNotEmpty, IsArray, IsIn, IsInt, isInt, IsNotEmpty, IsString } from "class-validator";
import { DayOfWeek } from "../entities/item.entity";

const DAYS: DayOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];

export class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsIn(DAYS, { each: true })
    usage_days: DayOfWeek[];

    @IsString()
    start_time: string;

    @IsString()
    end_time: string;

    @IsInt()
    usage_watt: number;
}
