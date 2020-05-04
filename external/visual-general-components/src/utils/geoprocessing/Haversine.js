/**
 * @author Daniel Falci - 16/10/17
 *
 * Classe com métodos utilitários para calculo de distância entre pontos geo-referenciados
 *
 * O método getItensProximos ordena a lista de acordo com esta medida de proximidade
 *
 *
 **/
export class Haversine {
  
    toRad(num) {
      return num * Math.PI / 180;
    }
  
    calculaDistancia(inicio, fim, options) {
      this.options = options || {}
      var R = 6371 //km
  
      var dLat = this.toRad(fim.latitude - inicio.latitude);
      var dLon = this.toRad(fim.longitude - inicio.longitude);
      var lat1 = this.toRad(inicio.latitude);
      var lat2 = this.toRad(fim.latitude);
  
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      if (options.raio) {
        var dist = R * c;
        if (options.raio > (R * c)) {
          return R * c;
        } else {
          return -1;
        }
      } else {
        return R * c
      }
    }
  
    itensProximos(itens, coord) {
      var options = {
        raio: coord.raio
      }
      var inicio = {
        latitude: coord.lat,
        longitude: coord.lng
      };
      var itensFiltrados = [];
      if (itens !== null) {
        for (let i = 0; i < itens.length; i++) {
          var fim = {
            latitude: itens[i].lat,
            longitude: itens[i].lon
          };
          var dist = this.calculaDistancia(inicio, fim, options)
          if (dist != -1) {
            itens[i].dist = dist
            itensFiltrados.push(itens[i]);
          }
        }
      }
      return itensFiltrados;
    }
  }
  