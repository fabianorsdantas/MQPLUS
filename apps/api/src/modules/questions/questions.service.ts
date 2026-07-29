import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, QuestionDifficulty } from '@mqplus/database';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  async create(createQuestionDto: CreateQuestionDto) {
    return prisma.question.create({
      data: createQuestionDto,
      include: { options: true },
    });
  }

  async findAll(subjectId?: string, difficulty?: QuestionDifficulty) {
    return prisma.question.findMany({
      where: {
        ...(subjectId && { subjectId }),
        ...(difficulty && { difficulty }),
        deletedAt: null,
      },
      include: {
        options: {
          select: { id: true, letter: true, content: true }, // Não expõe o gabarito na listagem
        },
      },
      take: 20,
    });
  }

  async findOne(id: string) {
    const question = await prisma.question.findUnique({
      where: { id },
      include: { options: true, subject: true },
    });

    if (!question || question.deletedAt) {
      throw new NotFoundException(`Questão com ID "${id}" não encontrada.`);
    }

    return question;
  }
}
