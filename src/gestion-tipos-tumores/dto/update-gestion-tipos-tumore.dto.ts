import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateGestionTiposTumoreDto {
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    systemAffected?: string;
}
