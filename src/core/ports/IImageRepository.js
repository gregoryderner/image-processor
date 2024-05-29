/*
No paradigma de Programação Orientada a Objetos (POO), especialmente seguindo
os princípios SOLID e arquitetura limpa (Clean Architecture), uma classe que
implementa uma interface deve fornecer implementações para todos os métodos
definidos nessa interface.

Isso funciona como um contrato, impedindo que o sistema quebre por falta de
implementações necessarisa para o funcionamento do código.

 Se uma classe não fornecer essas implementações, ela não está cumprindo o
 contrato da interface, o que pode levar a erros de tempo de execução e viola os
 princípios de design, como o Princípio da Substituição de Liskov (o "L" no SOLID).
*/
class IImageRepository {
  async getImagesByProductId(sellerId, productId) {
    throw new Error('Método getImagesByProductId não implementado');
  }

  async updateProductImages(sellerId, productId, images) {
    throw new Error('Método updateProductImages não implementado');
  }
}

module.exports = IImageRepository;
