import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().get('/', (req, res, next) => {
    res.redirect('/docs');
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Profile Management Service')
    .setDescription('Profile Management Service Interface')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));

  SwaggerModule.setup('docs', app, document);

  const port = +process.env.PORT || 3000;
  await app.listen(port);
  console.log(`listening on port number: ${port}. ${process.env.PORT}`);
}
bootstrap();
