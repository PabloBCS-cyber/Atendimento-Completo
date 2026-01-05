// clima.js

const API_KEY = "4edce22ed0bd2fec8bf656a140503ef3";

// Coordenadas das cidades
const cidades = {
    carapicuiba: { lat: -23.5227, lon: -46.835 },
    osasco:      { lat: -23.5320, lon: -46.7926 }
};

async function carregarClimas() {
    const container = document.getElementById("clima-container");
    container.innerHTML = ""; // limpa o container

    for (const [nome, coords] of Object.entries(cidades)) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}&lang=pt`;

            const response = await fetch(url);

            if (!response.ok) throw new Error("Erro na API");
            const data = await response.json();
            const cidade = data.name || nome;
            const tempAtual = data.main.temp.toFixed(1);
            const tempMin = data.main.temp_min.toFixed(1);
            const tempMax = data.main.temp_max.toFixed(1);
            const descricao = data.weather[0].description;
            console.log(data.weather[0].description);
            let imagem = "";
            switch(descricao){
                case "céu limpo":
                imagem = "/imgs/01d.png";
                    break;
                    case "poucas nuvens":
                    imagem ="/imgs/02d.png";
                    break;
                    case "nuvens dispersas":
                        imagem ="/imgs/03d.png";
                    break;
                    case "nuvens quebradas":
                    imagem ="/imgs/04d.png";
                    break;
                    case "pouca chuva":
                    imagem = "/imgs/09d.png";
                    break;
                    case "chuva":
                    imagem = "/imgs/10d.png";
                    break;
                    case "tempestade":
                    imagem ="/imgs/11d.png";
                    break;
                    default:
                    break;
            }
            console.log(data);
            const card = document.createElement("div");
            card.className = "clima-card";
            card.innerHTML = `
                <div style="position: relative; bottom:10px; left:04px; justify-content:center; width:200px; height:185px;">
                <h3 style="font-size:27px; text-align: center;">${cidade}</h3>
                <img src="${imagem}" width="85px" height="85px">
                <div style="position: relative; left:88px;bottom:145px; height=85px;">
                <p style="font-size:35px">${tempAtual}°C</p>
                <p style="font-size:17px;"><b>↑Máx</b> ${tempMax}°C <br> <b>↓Mín</b> ${tempMin}°C</p>
                </div>
                </div>
            `;
            container.appendChild(card);

        } catch (err) {
            console.error(`Erro ao buscar clima de ${nome}:, err`);
            const card = document.createElement("div");
            card.className = "clima-card";
            card.innerHTML = `<h3>${nome}</h3><p>Erro ao carregar clima</p>`;
            container.appendChild(card);
        }
    }
}

// Chama a função ao carregar a página
carregarClimas();