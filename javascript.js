const cep = window.document.getElementById('CEP')


cep.addEventListener("blur",(e)=>{   //blur = captura as informações que foram digitadas pelo usuario
    let search = cep.value.replace("-","") // replace busca o traço no cep e retira,caso houver
        //usei a CONST OPTIONS para passar alguns paramentros para dizer que estou buscando informações em um servidor diferente e preciso de resposta
        const options={ 
            method:'GET',
            mode:'cors',
            cache:'default'
        }



fetch(`https://viacep.com.br/ws/${search}/json/`, options)// depois da motificação realiza a pesquiça  

    .then(response=>{ response.json() //se deu certo,busca as informções verifica e faz o tratamento dos dados
        .then( data => exibirResultado(data)) // se deu certo novamente retorna os dados no console.log
    }) 
    .catch(e => alert('VOCÊ DIGITOU UM [CEP INVALIDO]')) //caso der errado

    
})

// fuction para exibir os resultados nos seus respectivos lugares usando o FOR IN
const exibirResultado = (result)=>{
    for(const campo in result){
        if(document.querySelector("#"+campo)){//mantem apenas os dados iquais aos ID´S dos campos
            console.log(campo) 
            document.querySelector("#"+campo).value = result[campo]// busca pelo ID´S usando um array e faz o preenchimento dos campos
        }
       
    }
}


