import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { QuestionDifficulty } from '@mqplus/database';

export class CreateQuestionDto {
  @ApiProperty({ description: 'ID do assunto/tópico associado' })
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ description: 'Texto do enunciado da questão' })
  @IsString()
  @IsNotEmpty()
  statement: string;

  @ApiProperty({ description: 'Gabarito comentado detalhado', required: false })
  @IsString()
  @IsOptional()
  explanation?: string;

  @ApiProperty({ enum: QuestionDifficulty, default: QuestionDifficulty.MEDIUM })
  @IsEnum(QuestionDifficulty)
  difficulty: QuestionDifficulty;

  @ApiProperty({ description: 'Parâmetro TRI a (Discriminação)', default: 1.0 })
  @IsNumber()
  @IsOptional()
  triA?: number;

  @ApiProperty({ description: 'Parâmetro TRI b (Dificuldade)', default: 0.0 })
  @IsNumber()
  @IsOptional()
  triB?: number;

  @ApiProperty({ description: 'Parâmetro TRI c (Acerto ao Acaso)', default: 0.2 })
  @IsNumber()
  @IsOptional()
  triC?: number;

  @ApiProperty({ description: 'Ano do exame', example: 2024 })
  @IsInt()
  @Min(2000)
  @Max(2030)
  examYear: number;

  @ApiProperty({ description: 'Instituição / Banca da prova', example: 'INEP / ENEM' })
  @IsString()
  @IsNotEmpty()
  institution: string;
}
