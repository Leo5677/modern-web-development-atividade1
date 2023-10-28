import { NestFactory } from '@nestjs/core'

import { setupDocumentation } from './api/documentation'
import { AppModule } from './app.module'

async function bootstrap() {
    const port = 3030
    const app = await NestFactory.create(AppModule)
    
    app.enableCors()
    setupDocumentation(app, port)

    await app.listen(port)
}

bootstrap()