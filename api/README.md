# Comandos do prisma

# Iniciar o provider postgres

npx prisma init --datasource-provider postgresql

# rodar migration

npx prisma migrate dev --name int

# rodar mais migrations
prisma migrate dev --name <nome>