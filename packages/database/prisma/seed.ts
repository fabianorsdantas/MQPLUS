import { PrismaClient, KnowledgeArea, UserRole, TargetExam } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Seeding do Banco de Dados MQPLUS...');

  // 1. Criar Disciplinas Oficiais BNCC
  const mat = await prisma.discipline.upsert({
    where: { code: 'MAT' },
    update: {},
    create: {
      name: 'Matemática e Suas Tecnologias',
      code: 'MAT',
      area: KnowledgeArea.MATHEMATICS,
    },
  });

  const fis = await prisma.discipline.upsert({
    where: { code: 'FIS' },
    update: {},
    create: {
      name: 'Física',
      code: 'FIS',
      area: KnowledgeArea.NATURAL_SCIENCES,
    },
  });

  console.log('✅ Disciplinas criadas: MAT, FIS');

  // 2. Criar Assuntos Iniciais
  const subjEletro = await prisma.subject.create({
    data: {
      disciplineId: fis.id,
      name: 'Eletrodinâmica e Circuitos',
    },
  });

  // 3. Criar Usuário Admin de Teste
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@mqplus.com.br' },
    update: {},
    create: {
      email: 'admin@mqplus.com.br',
      fullName: 'Administrador Geral MQPLUS',
      passwordHash: '$2b$12$eImiTXuWVxfM37uY4JANjO5E/8p.uE2qO6b5M/cI6QZ2Y/sV6', // hash dummy
      role: UserRole.ADMIN,
      profile: {
        create: {
          targetExam: TargetExam.ENEM,
          targetCourse: 'Engenharia de Software',
          dailyGoalMinutes: 120,
        },
      },
    },
  });

  console.log(`✅ Usuário Administrador criado: ${adminUser.email}`);
  console.log('✨ Seeding concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante a execução do seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
