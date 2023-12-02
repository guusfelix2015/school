import 'reflect-metadata'
import helmet from 'helmet'
import { NestFactory } from '@nestjs/core'
import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '@/prisma'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn'] })
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }))

  const configService = app.get(ConfigService)
  const isDev = configService.get('NODE_ENV') === 'development'
  app.use(
    helmet({
      contentSecurityPolicy: isDev ? false : undefined,
      crossOriginEmbedderPolicy: isDev ? false : undefined,
    }),
  )

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(3000)
}

bootstrap()
