/// <reference types="cypress" />
const perfil = require('/Users/gabrieltonelli/repositorios/EBAC-ExercicioModuloCypress/cypress/fixtures/perfil.json')
import paginaProdutos from '/Users/gabrieltonelli/repositorios/EBAC-ExercicioModuloCypress/cypress/support/page_objects/paginaProdutos.js.js'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
//   /*  Como cliente 
//       Quero acessar a Loja EBAC 
//       Para fazer um pedido de 4 produtos 
//       Fazendo a escolha dos produtos
//       Adicionando ao carrinho
//       Preenchendo todas opções no checkout
//       E validando minha compra ao final */

describe('Funcionalidade: Compra de produtos como cliente', () => {
    
    beforeEach(() => {
        /// Acessando a Loja EBAC e fazendo login como cliente
        cy.visit('minha-conta')
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(3)').should('exist')
    });
  
    it('Deve realizar compra de 4 produtos e fazer checkout da compra', () => {
        
        /// Adicionando produtos específicos ao carrinho
        cy.fixture('produtos').then(dados => {
            paginaProdutos.buscarProduto(dados[0].nomeProduto)
            paginaProdutos.addProdutoCarrinho(dados[0].tamanho, dados[0].cor, dados[0].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
            cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 1)
    
            paginaProdutos.buscarProduto(dados[1].nomeProduto)
            paginaProdutos.addProdutoCarrinho(dados[1].tamanho, dados[1].cor, dados[1].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
            cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 2)
    
            paginaProdutos.buscarProduto(dados[2].nomeProduto)
            paginaProdutos.addProdutoCarrinho(dados[2].tamanho, dados[2].cor, dados[2].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)
            cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 3)
    
            paginaProdutos.buscarProduto(dados[3].nomeProduto)
            paginaProdutos.addProdutoCarrinho(dados[3].tamanho, dados[3].cor, dados[3].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto)
            cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 4)
            
            ///Acessando o carrinho, fazendo checkout e validando compra
            cy.visit('checkout')
            cy.get('#order_comments').type('Pode entregar ao porteiro Márcio')
            cy.get('#payment_method_cod').click()
            cy.get('.wc_payment_method.payment_method_cod > .payment_box').should('contain', 'Pagar em dinheiro na entrega.')
            cy.get('#terms').click()
            cy.get('#place_order').click()
            cy.get('.woocommerce-notice', {timeout:10000}).should('contain', 'Obrigado. Seu pedido foi recebido.')
        })
    });
})
})
