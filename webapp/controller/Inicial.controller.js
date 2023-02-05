sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagem.controller.Inicial", {
            onInit: function () {
                //vamos fazer um table type dentro da estrutura do ABAP
                let ImageList = {
                    Imagens: []
                };
                //criacao do modelo para exibir dados na tela
                let ImageModel = new JSONModel(ImageList);
                let view = this.getView();
                view.setModel(ImageModel, "ModeloImagem");
            },
            onPressBuscar: function() {
                //instancia objeto input na variavel
                let inputBusca = this.byId("inpBusca");
                //coleta o valor digitado no input
                let query = inputBusca.getValue();
                //exibe na tela
                //alert(query);
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="+query+"&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "2e9dd74ecdmsh9c0d04253155c11p14dc5fjsnbf1338dba108",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                $.ajax(settings).done(function(response){
                    console.log(response);
                    //instanciar o modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData();
                    //clear tabela interna = array
                    oDadosImage.Imagens = [];
                    //loop que adiciona dados de uma tabela em outra tabela
                    let listaResultados = response.value;
                    let newItem;
                    //vamos fazer loop = for
                    for (var i=0;i<listaResultados.length;i++){
                        //read table pelo indice
                        newItem = listaResultados[i];
                        //append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);
                    }
                    oImageModel.refresh();
                }.bind(this));
            }
        });
    });
