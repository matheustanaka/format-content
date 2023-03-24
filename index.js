const fs = require("fs");

fs.readFile("teste.txt", "utf8", (err, data) => {
    if (err) throw err;

    // Regex para encontrar os campos que se parecem com json
    const regex = /{[^{}]*}/g;

    // Procura pelos campos que são iguais ao regex
    const matchJson = data.match(regex);

    if (matchJson) {
        // Mapeia os campos para objetos JSON formatados em estilo inline
        const formattedJson = matchJson.map(json => {
            const parsedJson = JSON.parse(json);
            const inlineJson = JSON.stringify(parsedJson);
            // Adiciona barras invertidas antes das aspas
            const escapedJson = inlineJson.replace(/"/g, '\\"');

            // Adiciona o comando curl antes de cada objeto JSON
            return `curl -i -v -u guest:guest -H "content-type:application/json" -X POST http://localhost:15672/api/exchanges/%2F/amq.default/publish -d ` +
                `'{"properties":{},"routing_key":"javainuse.queue","Content-type":"application/json;charset=UTF8", "payload":"${escapedJson}","payload_encoding":"string","deliverymode":2}'`;
        });

        // Junta todos os comandos curl em uma única linha e separa por uma quebra de linha
        const filteredJson = formattedJson.join("\n");

        fs.writeFile("filtrado.txt", filteredJson, (err) => {
            if (err) throw err;

            console.log("Conteúdo filtrado");
        });
    } else {
        console.log("Nenhum conteúdo filtrado");
    }
});




// curl -X POST -H "Content-Type: application/json" --data-binary "@filtrado.json" http://localhost:15672/api/exchanges/%2F/amq.default/publish
