console.log('Hello, world!, soy nivel A1, esto el nuevo GunBound')
import { join } from 'path'
import { createBot, createProvider, createFlow, addKeyword, utils } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

const PORT = process.env.PORT ?? 3008

const flowToA = addKeyword<Provider, Database>('inf').addAnswer( 
    ['📄 Puedes escribirnos de lunes a viernes de 9:00 a. m. a 6:00 p. m. por este chat de la tienda, por correo electrónico a soporteonline@touchechile.cl y WhatsApp al +56 22289500. Los casos del fin de semana y festivos se atenderán a partir del siguiente día hábil en orden de llegada. \n', 
    'Regístrate para recibir las últimas noticias y actualización de catalogos \n',
    'Recibe promociones y actualizaciones especiales por correo electrónico. Puedes darte de baja en cualquier momento. *si* '].join(
        '\n'
    ),
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic }) => {
        if (ctx.body.toLocaleLowerCase().includes('si')) {
            return gotoFlow(registerFlow)
        }
        await flowDynamic('Gracias!')
        return
    },
)

const flowToB = addKeyword<Provider, Database>('pedido').addAnswer( 
    ['Para ver el estado, indícanos los detalles de tu pedido.  \n', 
    'Número de Pedido \n',
    'Direccion de correo electrónico \n',
    'Recibe promociones y actualizaciones especiales por correo electrónico.  *si* '].join(
    '\n'
    ),
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic }) => {
        if (ctx.body.toLocaleLowerCase().includes('si')) {
            return gotoFlow(registerFlow)
        }
        await flowDynamic('Gracias!')
        return
    },
)

const flowToC = addKeyword<Provider, Database>('envio').addAnswer( 
    ['Todos los pedidos ingresados a la plataforma online, serán despachados en el orden de llegada de cada pedido. \n',
    'Cuando el pedido está preparado para su envío o retiro, le llegará un mensaje al correo con la confirmación.\n',
    'La entrega se hará aproximadamente de:\n',
    '24 horas hábiles* para Retiro en Tienda.\n',
    '1 a 3 días hábiles* para Santiago y Regiones de 3 a 5 días hábiles*, el tiempo de entrega dependerá de la ciudad de destino.\n',
    
    'En ocasiones se presentan novedades que nos impiden cumplir con nuestra promesa de entrega, sin embargo, queremos garantizarte que este tiempo no excederá un plazo máximo de 30 días.\n',
    '*Días hábiles se consideran de lunes a viernes.\n',
        
    'Recibe promociones y actualizaciones especiales por correo electrónico.  *si* '].join(
    '\n'
    ),
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic }) => {
        if (ctx.body.toLocaleLowerCase().includes('si')) {
            return gotoFlow(registerFlow)
        }
        await flowDynamic('Gracias!')
        return
    },
)
const flowToD = addKeyword<Provider, Database>('cambios').addAnswer( 
    ['Para hacer un cambio tienes 2 opciones: Puede hacer el cambio GRATIS en cualquier Touché Store de Chile presentando la boleta de compra.    Envía el paquete a la dirección:   Alonso de Córdova 2843, Local A, Vitacura, A nombre de Comercializadora MS S.A (TOUCHE), Con una nota que diga "PEDIDO XXXX CAMBIO POR TALLA O POR PRODUCTO” Incluir el nombre de la tienda TOUCHE Santiago – Chile Teléfono: (+56) 222289500    Los cambios serán procesados dentro de los 15 días hábiles posteriores a la recepción del envío.\n',
        
    'Recibe promociones y actualizaciones especiales por correo electrónico.  *si* '].join(
    '\n'
    ),
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic }) => {
        if (ctx.body.toLocaleLowerCase().includes('si')) {
            return gotoFlow(registerFlow)
        }
        await flowDynamic('Gracias!')
        return
    },
)

const flowDefault = addKeyword<Provider, Database>('').addAnswer("Envíanos un mensaje directo si tienes alguna pregunta. Nos complace ayudarte. No has indicado ninguna opción 🤔")

/**
        *
const discordFlow = addKeyword<Provider, Database>('inf').addAnswer(
    ['📄 Puedes escribirnos de lunes a viernes de 9:00 a. m. a 6:00 p. m. por este chat de la tienda, por correo electrónico a soporteonline@touchechile.cl y WhatsApp al +56 22289500. Los casos del fin de semana y festivos se atenderán a partir del siguiente día hábil en orden de llegada. \n', 
    'Regístrate para recibir las últimas noticias y actualización de catalogos \n',
    'Recibe promociones y actualizaciones especiales por correo electrónico. Puedes darte de baja en cualquier momento. *si* '].join(
        '\n'
    ),
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic }) => {
        if (ctx.body.toLocaleLowerCase().includes('si')) {
            return gotoFlow(registerFlow)
        }
        await flowDynamic('Gracias!')
        return
    },
)
 */

const welcomeFlow = addKeyword<Provider, Database>(['hi', 'hello', 'hola','Hola', 'HOLA', 'BUENAS', 'Buenas', 'buenas'])
    .addAnswer(`🙌 Hola, Bienvenido *touchechile.cl*`)
    .addAnswer(
        [
            '¡Hola! Envíanos un mensaje con tus preguntas. ¡Estamos encantados de ayudarte!',
             'Habla con nosotros, indicanos en que podemos ayudarte:',
             '1️⃣ ¿Cuál es la información de contacto? ',
             '  👉🏻 escribe *inf* para ver información de contacto',
             '2️⃣ Hacer seguimiento de mi pedido ',
             '  👉🏻 escribe *pedido* para ver información',
             '3️⃣¿Cuál es la política de envío y entrega? ',
             '  👉🏻 escribe *envio* para ver información',
             '4️⃣¿Cuál es la política de cambios y devoluciones? ',
             '  👉🏻 escribe *cambios* para ver información',
        ].join('\n'),

        { delay: 800, capture: true },
        /**
        * 
        async (ctx, { fallBack }) => {
            if (!ctx.body.toLocaleLowerCase().includes('inf')) {
                return fallBack('Deberías escribir *inf*, *pedido*, *envio*, *cambios*')            
            }
            if (!ctx.body.toLocaleLowerCase().includes('pedido')) {
                return fallBack('Deberías escribir *inf*, *pedido*, *envio*, *cambios*')            
            }
            if (!ctx.body.toLocaleLowerCase().includes('envio')) {
                return fallBack('Deberías escribir *inf*, *pedido*, *envio*, *cambios*')            
            }
            if (!ctx.body.toLocaleLowerCase().includes('cambios')) {
                return fallBack('Deberías escribir *inf*, *pedido*, *envio*, *cambios*')            
            }
            return             
        },
        
        [discordFlow]
         */        
    )
    
    .addAnswer(`Gracias por la respuesta `, async (ctx, { gotoFlow }) => {
        const userAnswer = ctx.body
        if(userAnswer === 'inf'){
            return gotoFlow(flowToA)
        } 
        if(userAnswer === 'pedido'){
            return gotoFlow(flowToB)
        } 
        if(userAnswer === 'envio'){
            return gotoFlow(flowToC)
        } 
        if(userAnswer === 'cambios'){
            return gotoFlow(flowToD)
        } 
        return gotoFlow(flowDefault)
    })

const registerFlow = addKeyword<Provider, Database>(utils.setEvent('REGISTER_FLOW'))
    .addAnswer(`Indicanos nombre`, { capture: true }, async (ctx, { state }) => {
        await state.update({ name: ctx.body })
    })
    .addAnswer('Indicanos correo electronico', { capture: true }, async (ctx, { state }) => {
        await state.update({ correo: ctx.body })
    })
    .addAction(async (_, { flowDynamic, state }) => {
        await flowDynamic(`${state.get('name')}, Gracias!: correo: ${state.get('correo')}`)
    })

const fullSamplesFlow = addKeyword<Provider, Database>(['samples', utils.setEvent('SAMPLES')])
    .addAnswer(`💪 I'll send you a lot files...`)
    .addAnswer(`Send image from Local`, { media: join(process.cwd(), 'assets', 'sample.png') })
    .addAnswer(`Send video from URL`, {
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTJ0ZGdjd2syeXAwMjQ4aWdkcW04OWlqcXI3Ynh1ODkwZ25zZWZ1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LCohAb657pSdHv0Q5h/giphy.mp4',
    })
    .addAnswer(`Send audio from URL`, { media: 'https://cdn.freesound.org/previews/728/728142_11861866-lq.mp3' })
    .addAnswer(`Send file from URL`, {
        media: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    })

const main = async () => {
    const adapterFlow = createFlow([welcomeFlow, registerFlow, fullSamplesFlow])
    
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database()

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body
            await bot.sendMessage(number, message, { media: urlMedia ?? null })
            return res.end('sended')
        })
    )

    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('REGISTER_FLOW', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('SAMPLES', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body
            if (intent === 'remove') bot.blacklist.remove(number)
            if (intent === 'add') bot.blacklist.add(number)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ status: 'ok', number, intent }))
        })
    )

    httpServer(+PORT)
}

main()
