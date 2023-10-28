import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export function setupDocumentation(app: INestApplication, serverPort: number): void {

    const baseURL = `http://locahost:${serverPort}/`

    const options = new DocumentBuilder()
        .setTitle('Social Network API')
        .setDescription(`Base URL: ${baseURL}`)
        .setVersion('1.0.0')
    .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)
}