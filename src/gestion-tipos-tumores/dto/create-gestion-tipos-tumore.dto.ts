import { IsString, IsNotEmpty} from 'class-validator';
export class CreateGestionTiposTumoreDto {
    @IsString()
    @IsNotEmpty()
    identifier: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    systemAffected: string;
}
