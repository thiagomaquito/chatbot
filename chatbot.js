const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox'],
    },
    authStrategy: new LocalAuth()
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

client.on('message', async msg => {
    if (msg.body ==='Olá, tenho interesse em agendar maquiagem social.' && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá '+ name.split(" ")[0] + ', tudo bem?\nMe chamo Fernanda, sou maquiadora, e vou realizar seu atendimento ☺️');
        await delay(5000); //delay de 5 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await client.sendMessage(msg.from,'Para agilizar os próximos passos, poderia me informar os dados abaixo?\nEvento:\nData:\nHorário que precisa estar pronta:');
        let labels = (await chat.getLabels()).map(l => l.id);
        labels.push('10');
        await chat.changeLabels(labels);
    }

    if (msg.body ==='Olá, quero saber mais informações sobre pacotes de noivas.' && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá '+ name.split(" ")[0] + ', tudo bem?\nMe chamo Fernanda, sou maquiadora, e vou realizar seu atendimento ☺️');
        await delay(5000); //delay de 5 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await client.sendMessage(msg.from,'Para agilizar os próximos passos, poderia me informar os dados abaixo?\nData do casamento:\nLocal do casamento: \nHorário da cerimônia:');
        let labels = (await chat.getLabels()).map(l => l.id);
        labels.push('3');
        await chat.changeLabels(labels);
        
    }

    if (msg.body ==='Olá, quero saber mais informações sobre curso de automaquiagem.' && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá '+ name.split(" ")[0] + ', tudo bem?\nMe chamo Fernanda, sou maquiadora, e vou realizar seu atendimento ☺️');
        await delay(5000); //delay de 5 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await client.sendMessage(msg.from,'Segue abaixo as informações sobre o curso de automaquiagem');
        const media = await MessageMedia.fromFilePath('./images/curso_automake.jpeg');
        await client.sendMessage(msg.from, media);
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //delay de 3 segundos        
        await client.sendMessage(msg.from,'Você tem disponibilidade em quais dias de semana para realizar o curso?');
        let labels = (await chat.getLabels()).map(l => l.id);
        labels.push('13');
        await chat.changeLabels(labels);
    }
});

process.on("SIGINT", async () => {
    console.log("(SIGINT) Shutting down...");
    await client.destroy();
    process.exit(0);
})
