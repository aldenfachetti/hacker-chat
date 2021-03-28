// responsavel por construir nosso layout sob demanda

import blessed from "blessed";

export default class ComponentBuilder {
  #screen
  #layout
  #input

  constructor() {}

  // propriedades comum que todos compoentes tem
  #baseComponent() {// component privado '#'
    return {
      border: "line",
      mouse: true,
      keys: true,
      top: 0;
      scrollbar: {
        ch: ' ',
        inverse: true
      },
      // habilita colocar cores e tags no texto
      tags: true
    };
  }

  setScreen({ title }) {
    this.#screen = blessed.screen({
      // faz alguns redimensionamentos automaticos na tela
      smartCSR: true,
      title
    })

    // para o programa
    this.#screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

    return this
  }

  // cria os quadrados primeiro
  setLayoutComponent() {
    this.#layout = blessed.layout({
      parent: this.screen,
      width: '100%',
      height: '100%'
    })

    return this
  }

  // pra pegar o text area, pegar nosso texto no terminal
  setInputComponent(onEnterPressed) {
    const input = blessed.textarea({
      parent: this.#screen,
      bottom: 0,
      height: '10%',
      inputOnFocus: true,
      padding: {
        top: 1,
        left: 2
      },
      style: {
        fg: '#f6f6f6',
        bg: '#353535'
      }
    })

    input.key('enter', onEnterPressed)
    this.#input = input

    return this
  }
}
