document.querySelector('#pesquisa').addEventListener('submit', async (event) => {
    event.preventDefault(); // permissão para não atualizar mas a página

    const cidadeNome = document.querySelector('#cidade').value;

    // Caso não seja digitado nenhuma cidade
    if(!cidadeNome){
        document.querySelector("#tempo").classList.remove('show');
         mensagemAlerta("Tens que digitar uma cidade");
         return;
    }
    
    // Passando o caminho da API com a chave de confirmação
    const apiChave = 'ca2f154abbfed2af9462ca348caf5a9e';
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidadeNome)}&appid=${apiChave}&units=metric&lang=pt_br`;

    
    const resultado = await fetch(apiURL);
    const json = await resultado.json();

    if(json.cod === 200){
        informacao({
            cidade: json.name,
            pais: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            descricao: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            velocidadeVento: json.wind.speed,
            humidade: json.main.humidity

        })
    }else{
        document.querySelector("#tempo").classList.remove('show');
        mensagemAlerta(`
             Não foi possível localizar a cidade! 
             <img src="./src/image/undraw_reading_time_re_phf7.svg"></img>
             `);
    }

});

function informacao(json){
    mensagemAlerta('');

    document.querySelector("#tempo").classList.add('show');

    document.querySelector("#title").innerHTML = `${json.cidade}, ${json. pais}`;
    document.querySelector("#temp_valor").innerHTML = `${json.temp.toFixed(1)} <sup>ºC</sup>`;
    document.querySelector("#temp_descricao").innerHTML = `${json.descricao}`;
    document.querySelector("#temp_img").setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}10d@2x.png`);
    document.querySelector("#temp_max").innerHTML = `${json.tempMax.toFixed(1)} <sup>ºC</sup>`;
    document.querySelector("#temp_min").innerHTML = `${json.tempMin.toFixed(1)} <sup>ºC</sup>`;
    document.querySelector("#humidade").innerHTML = `${json.humidade}%`;
    document.querySelector("#vento").innerHTML = `${json.velocidadeVento.toFixed(1)}Km/h`;
}

function mensagemAlerta(msg){
    document.querySelector('#alert').innerHTML = msg;

}