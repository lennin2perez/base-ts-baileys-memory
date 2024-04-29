console.log('Hello, world!, soy nivel A1, esto el nuevo GunBound')
import { join } from 'path'
import { createBot, createProvider, createFlow, addKeyword, utils } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

const PORT = process.env.PORT ?? 3008

const flowDefault = addKeyword<Provider, Database>(['chao', 'CHAO', 'Chao', 'Hasta luego', 'hasta luego', 'HASTA LUEGO']).addAnswer("Envíanos un mensaje directo si tienes alguna pregunta. Nos complace ayudarte.")

const flowToA = addKeyword<Provider, Database>(['inf', 'INF', 'Inf'])
.addAnswer( 
    ['📄 Puedes escribirnos de lunes a viernes de 9:00 a. m. a 6:00 p. m. por este chat de la tienda\n',
    'por correo electrónico a soporteonline@touchechile.cl y WhatsApp al +56 22289500.\n', 
    'Los casos del fin de semana y festivos se atenderán a partir del siguiente día hábil en orden de llegada. \n', 
    
    'Regístrate para recibir las últimas noticias y actualización de catalogos \n',

    'Recibe promociones y actualizaciones especiales por correo electrónico. Puedes darte de baja en cualquier momento. \n',
    'indica la palaba *si*, para realizar el registro '].join(
        '\n'
    ),
    { delay: 300, capture: true },
    
    async (ctx, { gotoFlow, flowDynamic }) => {
        //if (ctx.body.toLocaleLowerCase().includes('yes')) {
        //if (!['si', 'Si', 'SI', 'S', 's'].some(word => ctx.body.toLowerCase().includes(word))) {
        if (['si', 'Si', 'SI', 'S', 's'].some(word => ctx.body.toLowerCase().includes(word))) {
            return gotoFlow(registerFlow);
        }
        return await flowDynamic('Gracias!');
        
    }
   )

const flowToB = addKeyword<Provider, Database>(['pedido', 'PEDIDO', 'Pedido'])
.addAnswer( 
    ['Para ver el estado, indícanos los detalles de tu pedido.  \n', 
    '*Número de Pedido* \n',
    '*Nombre y Apellido* \n',
    '*Direccion de correo electrónico* \n',
    
    'Indica la palaba *si*, para realizar el registro '].join(
        '\n'
    ),
    { delay: 200, capture: true },
    
    async (ctx, { gotoFlow, flowDynamic }) => {        
        if (['si', 'Si', 'SI', 'S', 's'].some(word => ctx.body.toLowerCase().includes(word))) {
            return gotoFlow(registerPEDIDO);
        }
        return await flowDynamic('Gracias!');
        
    }
)

const flowToC = addKeyword<Provider, Database>(['envio', 'ENVIO', 'Envio'])
.addAnswer( 
    ['Todos los pedidos ingresados a la plataforma online, serán despachados en el orden de llegada de cada pedido. \n',
    'Cuando el pedido está preparado para su envío o retiro, le llegará un mensaje al correo con la confirmación.\n',
    'La entrega se hará aproximadamente de:\n',
    '24 horas hábiles* para Retiro en Tienda.\n',
    '1 a 3 días hábiles* para Santiago y Regiones de 3 a 5 días hábiles*, el tiempo de entrega dependerá de la ciudad de destino.\n',
    
    'En ocasiones se presentan novedades que nos impiden cumplir con nuestra promesa de entrega, sin embargo, queremos garantizarte que este tiempo no excederá un plazo máximo de 30 días.\n',
    '*Días hábiles se consideran de lunes a viernes.\n',
        
    'Recibe promociones y actualizaciones especiales por correo electrónico.  indica la palabra *si*, para realizar el registro ']
    .join(
        '\n'
    ),
    { delay: 200, capture: true },
    
    async (ctx, { gotoFlow, flowDynamic }) => {
        if (['si', 'Si', 'SI', 'S', 's'].some(word => ctx.body.toLowerCase().includes(word))) {
            return gotoFlow(registerFlow);
        }
        return await flowDynamic('Gracias!');
        
    }   
)

const flowToD = addKeyword<Provider, Database>(['cambios', 'CAMBIOS', 'Cambios']).addAnswer( 
    ['Para hacer un cambio tienes 2 opciones: Puede hacer el cambio GRATIS en cualquier Touché Store de Chile presentando la boleta de compra.    Envía el paquete a la dirección:   Alonso de Córdova 2843, Local A, Vitacura, A nombre de Comercializadora MS S.A (TOUCHE), Con una nota que diga "PEDIDO XXXX CAMBIO POR TALLA O POR PRODUCTO” Incluir el nombre de la tienda TOUCHE Santiago – Chile Teléfono: (+56) 222289500    Los cambios serán procesados dentro de los 15 días hábiles posteriores a la recepción del envío.\n',
        
    'Recibe promociones y actualizaciones especiales por correo electrónico.  indica la palabra *si*, para realizar el registro '].join(
        '\n'
    ),
    { delay: 300, capture: true },
    
    async (ctx, { gotoFlow, flowDynamic }) => {
        if (['si', 'Si', 'SI', 'S', 's'].some(word => ctx.body.toLowerCase().includes(word))) {
            return gotoFlow(registerFlow);
        }
        return await flowDynamic('Gracias!');
        
    }
)

const flowToE = addKeyword<Provider, Database>(['rey', 'REY', 'MIJU', 'miju', 'Miju', 'cuenteme', 'CUENTEME']).addAnswer( 
    ['Mensaje automatico de bot de whatsapp. actualmente en contrucción\n',
    'Hello, world!, soy nivel A1, esto el nuevo GunBound\n',    
    'Recibe promociones y actualizaciones especiales por correo electrónico.  indica la palabra *si*, para realizar el registro '].join(
        '\n'
    ),
    { delay: 300, capture: true },
    
    async (ctx, { gotoFlow, flowDynamic }) => {
        if (['si', 'Si', 'SI', 'S', 's'].some(word => ctx.body.toLowerCase().includes(word))) {
            return gotoFlow(registerFlow);
        }
        return await flowDynamic('Gracias!');
        
    }
)


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

        { delay: 300, capture: true },
       
        async (ctx, { fallBack, flowDynamic }) => {                   
            if (!['inf', 'INF', 'Inf','pedido', 'PEDIDO', 'Pedido', 'envio', 'ENVIO', 'Envio', 'cambios', 'CAMBIOS', 'Cambios'].some(word => ctx.body.toLowerCase().includes(word))) {
                return fallBack('Deberías escribir *inf*, *pedido*, *envio*, *cambios*');
              }
            return await flowDynamic('Gracias!');                    
        },      
    )
    .addAction(async (ctx, { gotoFlow, flowDynamic }) => {
        if (['inf', 'INF', 'Inf'].some(word => ctx.body.toLowerCase().includes(word))) {        
            return gotoFlow(flowToA);
        } 
        if (['pedido', 'PEDIDO', 'Pedido'].some(word => ctx.body.toLowerCase().includes(word))) { 
            return gotoFlow(flowToB);
        } 
        if (['envio', 'ENVIO', 'Envio'].some(word => ctx.body.toLowerCase().includes(word))) { 
            return gotoFlow(flowToC);
        } 
        if (['cambios', 'CAMBIOS', 'Cambios'].some(word => ctx.body.toLowerCase().includes(word))) {
            return gotoFlow(flowToD);
        }
        if (['rey', 'REY', 'MIJU', 'miju', 'Miju', 'cuenteme', 'CUENTEME'].some(word => ctx.body.toLowerCase().includes(word))) {
            return gotoFlow(flowToE);
        }
        await flowDynamic('Gracias!');

        return gotoFlow(flowDefault);
    })
    
const registerFlow = addKeyword<Provider, Database>(utils.setEvent('REGISTER_FLOW'))
    .addAnswer(`Indicanos un Nombre y Apellido para el registro`, { capture: true }, async (ctx, { state }) => {
        await state.update({ name: ctx.body });
    })
    .addAnswer('Indicanos un correo electronico', { capture: true }, async (ctx, { state }) => {
        await state.update({ correo: ctx.body });
    })
    .addAction(async (_, { flowDynamic, state }) => {
        await flowDynamic(`${state.get('name')}, Gracias!: correo: ${state.get('correo')}`);
    })

const registerPEDIDO = addKeyword<Provider, Database>(utils.setEvent('REGISTER_FLOW'))
    .addAnswer('Indicanos el número de pedido', { capture: true }, async (ctx, { state }) => {
        await state.update({ pedido: ctx.body });
    })
    .addAnswer(`Indicanos un Nombre y Apellido para el registro`, { capture: true }, async (ctx, { state }) => {
        await state.update({ name: ctx.body });
    })
    .addAnswer('Indicanos un correo electronico', { capture: true }, async (ctx, { state }) => {
        await state.update({ correo: ctx.body });
    })
    .addAction(async (_, { flowDynamic, state }) => {
        await flowDynamic(`${state.get('name')}, Gracias!: número de pedido: ${state.get('pedido')} correo: ${state.get('correo')}`);
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
    const adapterFlow = createFlow([welcomeFlow, registerFlow, registerPEDIDO, fullSamplesFlow, flowDefault, flowToA, flowToB, flowToC, flowToD, flowToE])
    
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
