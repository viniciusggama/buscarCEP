const cep = document.getElementById('CEP');

cep.addEventListener("blur", (e) => {
    let search = cep.value.replace("-", "");
    const options = { method: 'GET', mode: 'cors', cache: 'default' };

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        .then(response => response.json())
        .then(data => exibirResultado(data))
        .catch(e => alert('VOCÊ DIGITOU UM [CEP INVALIDO]'));
});

const exibirResultado = (result) => {
    for (const campo in result) {
        if (document.querySelector("#" + campo)) {
            document.querySelector("#" + campo).value = result[campo];
        }
    }
};

$(document).ready(function () {
    $('#cepForm').on('submit', function (e) {
        e.preventDefault();
        const cep = $('#CEP').val().replace(/\D/g, '');

        if (cep) {
            $.get(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
                if (!data.erro) {
                    $('#uf').val(data.uf);
                    $('#localidade').val(data.localidade);
                    $('#logradouro').val(data.logradouro);
                    $('#bairro').val(data.bairro);
                    $('#resultado').html('<div class="alert alert-success">Endereço encontrado!</div>');

                    const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
                    buscarCoordenadas(endereco);
                } else {
                    $('#resultado').html('<div class="alert alert-danger">CEP não encontrado.</div>');
                }
            });
        } else {
            $('#resultado').html('<div class="alert alert-warning">Por favor, insira um CEP válido.</div>');
        }
    });
});

function buscarCoordenadas(endereco) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    
    $.get(url, function (data) {
        if (data.length > 0) {
            const location = {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
            initMap(location);
        } else {
            $('#resultado').html('<div class="alert alert-danger">Localização não encontrada.</div>');
        }
    });
}

function initMap(location) {
    const map = L.map('map').setView([location.lat, location.lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    
    L.marker([location.lat, location.lng]).addTo(map);
}
