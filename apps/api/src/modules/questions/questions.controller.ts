import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionDifficulty } from '@mqplus/database';

@ApiTags('Questões')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra uma nova questão no banco de dados com parâmetros TRI' })
  @ApiResponse({ status: 201, description: 'Questão cadastrada com sucesso.' })
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista questões com suporte a filtros por assunto e dificuldade' })
  @ApiQuery({ name: 'subjectId', required: false })
  @ApiQuery({ name: 'difficulty', enum: QuestionDifficulty, required: false })
  async findAll(
    @Query('subjectId') subjectId?: string,
    @Query('difficulty') difficulty?: QuestionDifficulty
  ) {
    return this.questionsService.findAll(subjectId, difficulty);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca os detalhes completos de uma questão por ID' })
  @ApiResponse({ status: 200, description: 'Questão encontrada.' })
  @ApiResponse({ status: 404, description: 'Questão não encontrada.' })
  async findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }
}
