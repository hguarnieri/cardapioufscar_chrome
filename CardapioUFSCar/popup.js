// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var ufscar = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
  url_: 'http://www2.ufscar.br/servicos/restaurantes.php',

  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  getCardapio: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.url_, true);
    req.onload = this.showCardapio_;
    req.send(null);
  },

  showCardapio_: function (e) {
    var html = this.responseText;
    var almoco = html.split("<div align=\"left\">Prato Principal: ")[1].split("</div></td>")[0];
    var jantar = html.split("<div align=\"left\">Prato Principal: ")[2].split("</div></td>")[0];

    console.log(almoco);
    console.log(jantar);  

    var pratosAlmoco = almoco.split("<BR>");
    var pratosJantar = jantar.split("<BR>");

    var almocoPrincipal = pratosAlmoco[0];
    var almocoGuarnicao = pratosAlmoco[1].split(": ")[1];
    var almocoSobremesa = pratosAlmoco[5].split("Sobremesa: ")[1];

    var jantarPrincipal = pratosJantar[0];
    var jantarGuarnicao = pratosJantar[1].split(": ")[1];
    var jantarSobremesa = pratosJantar[5].split("Sobremesa: ")[1];

    console.log("Almoco:");
    console.log(almocoPrincipal);
    console.log(almocoGuarnicao);
    console.log(almocoSobremesa);

    console.log("Jantar:");
    console.log(jantarPrincipal);
    console.log(jantarGuarnicao);
    console.log(jantarSobremesa);

    var tabela = "<table style='text-align: center;'>" +
                 "<thead>" +
                    "<tr><th colspan=\"2\">Cardápio de Hoje</th></tr>" +
                    "<tr><th style='width: 50%; font-size: 12px;'>Almoço</th><th style='width: 50%; font-size: 12px;'>Jantar</th></tr>" + 
                 "</thead>" +
                 "<tbody>" +
                 "<tr>" +
                    "<td>" + almocoPrincipal + "</td>" +
                    "<td>" + jantarPrincipal + "</td>" +
                 "</tr>" +
                 "<tr>" +
                    "<td>" + almocoGuarnicao + "</td>" +
                    "<td>" + jantarGuarnicao + "</td>" +
                 "</tr>" +
                 "<tr>" +
                    "<td>" + almocoSobremesa + "</td>" +
                    "<td>" + jantarSobremesa + "</td>" +
                 "</tr>" +
                 "</tbody>" +
                 "</table>";

    document.getElementById("cardapio").innerHTML = tabela;

  },
};

// Executa o script ao finalizar de carregar
document.addEventListener('DOMContentLoaded', function () {
  ufscar.getCardapio();
});
