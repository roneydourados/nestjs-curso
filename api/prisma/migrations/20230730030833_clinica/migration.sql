-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 1,
    "agenda" BOOLEAN NOT NULL DEFAULT false,
    "anamnese" BOOLEAN NOT NULL DEFAULT false,
    "atestado" BOOLEAN NOT NULL DEFAULT false,
    "dadosPaciente" BOOLEAN NOT NULL DEFAULT false,
    "exame" BOOLEAN NOT NULL DEFAULT false,
    "felicitacao" BOOLEAN NOT NULL DEFAULT false,
    "orcamento" BOOLEAN NOT NULL DEFAULT false,
    "plano" BOOLEAN NOT NULL DEFAULT false,
    "root" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinicas" (
    "id" SERIAL NOT NULL,
    "fantasia" VARCHAR(100) NOT NULL,
    "razaoSocial" VARCHAR(100) NOT NULL,
    "responsavel" VARCHAR(100) NOT NULL,
    "responsavelCro" VARCHAR(10) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "endereco" VARCHAR(100) NOT NULL,
    "cidade" VARCHAR(100) NOT NULL,
    "numero" VARCHAR(10) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "whatsapp" VARCHAR(20) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "clinicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anamneses" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "pAnP01" BOOLEAN NOT NULL,
    "pAnP02" TEXT NOT NULL,
    "pAnP02q" TEXT NOT NULL,
    "pAnP03" BOOLEAN NOT NULL,
    "pAnP03q" TEXT NOT NULL,
    "pAnP04" BOOLEAN NOT NULL,
    "pAnP04q" TEXT NOT NULL,
    "pAnP05" BOOLEAN NOT NULL,
    "pAnP05q" TEXT NOT NULL,
    "pAnP06" BOOLEAN NOT NULL,
    "pAnP07" BOOLEAN NOT NULL,
    "pAnP08" BOOLEAN NOT NULL,
    "pAnP09q" TEXT NOT NULL,
    "pAnP10" BOOLEAN NOT NULL,
    "pAnP10q" TEXT NOT NULL,
    "pAnP11" TEXT NOT NULL,
    "pAnP11q" TEXT NOT NULL,

    CONSTRAINT "anamneses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exames" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "assoalho" TEXT NOT NULL,
    "exame" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "labios" TEXT NOT NULL,
    "lingua" TEXT NOT NULL,
    "palato" TEXT NOT NULL,

    CONSTRAINT "exames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicos" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "valor" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoques" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "valor" DECIMAL(18,2) NOT NULL,
    "quantidade" DECIMAL(18,3) NOT NULL,

    CONSTRAINT "estoques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caixas" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,

    CONSTRAINT "caixas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financeiros" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "caixaId" INTEGER NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "emissao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vencimento" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" VARCHAR(100) NOT NULL,
    "valor" DECIMAL(18,2) NOT NULL,
    "quantidade" DECIMAL(18,3) NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "financeiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoas" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(20) NOT NULL,
    "rg" VARCHAR(20) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "endereco" VARCHAR(150) NOT NULL,
    "numero" VARCHAR(10) NOT NULL,
    "cidade" VARCHAR(80) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "bairro" VARCHAR(100) NOT NULL,
    "dataNascimento" DATE NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "whatsapp" VARCHAR(18) NOT NULL,
    "telefone" VARCHAR(18) NOT NULL,
    "observacao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compromissos" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,

    CONSTRAINT "compromissos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planos" (
    "id" SERIAL NOT NULL,
    "clinicaId" INTEGER NOT NULL,
    "codPac" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,

    CONSTRAINT "planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radios" (
    "id" SERIAL NOT NULL,
    "planoId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,

    CONSTRAINT "radios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "odontogramas" (
    "id" SERIAL NOT NULL,
    "planoId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,

    CONSTRAINT "odontogramas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anamneses" ADD CONSTRAINT "anamneses_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exames" ADD CONSTRAINT "exames_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoques" ADD CONSTRAINT "estoques_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caixas" ADD CONSTRAINT "caixas_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financeiros" ADD CONSTRAINT "financeiros_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financeiros" ADD CONSTRAINT "financeiros_caixaId_fkey" FOREIGN KEY ("caixaId") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financeiros" ADD CONSTRAINT "financeiros_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financeiros" ADD CONSTRAINT "financeiros_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoas" ADD CONSTRAINT "pessoas_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compromissos" ADD CONSTRAINT "compromissos_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compromissos" ADD CONSTRAINT "compromissos_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planos" ADD CONSTRAINT "planos_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radios" ADD CONSTRAINT "radios_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "odontogramas" ADD CONSTRAINT "odontogramas_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
