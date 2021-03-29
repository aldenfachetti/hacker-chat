// responsavel por construir nosso layout sob demanda

import blessed from "blessed";

export default class ComponentBuilder {
  #screen;
  #layout;
  #input;
  #chat;

  constructor() {}

  // propriedades comum que todos compoentes tem
  #baseComponent() {
    // component privado '#'
    return {
      border: "line",
      mouse: true,
      keys: true,
      top: 0,
      scrollbar: {
        ch: " ",
        inverse: true,
      },
      // habilita colocar cores e tags no texto
      tags: true,
    };
  }

  setScreen({ title }) {
    this.#screen = blessed.screen({
      // faz alguns redimensionamentos automaticos na tela
      smartCSR: true,
      title,
    });

    // para o programa
    this.#screen.key(["escape", "q", "C-c"], () => process.exit(0));

    return this;
  }

  // cria os quadrados primeiro
  setLayoutComponent() {
    this.#layout = blessed.layout({
      parent: this.screen,
      width: "100%",
      height: "100%",
    });

    return this;
  }

  // pra pegar o text area, pegar nosso texto no terminal
  setInputComponent(onEnterPressed) {
    const input = blessed.textarea({
      parent: this.#screen,
      bottom: 0,
      height: "10%",
      inputOnFocus: true,
      padding: {
        top: 1,
        left: 2,
      },
      style: {
        fg: "#f6f6f6",
        bg: "#353535",
      },
    });

    input.key("enter", onEnterPressed);
    this.#input = input;

    return this;
  }

  setChatComponent() {
    this.#chat = blessed.list({
      ...this.#baseComponent(),
      parent: this.#layout,
      align: "left",
      width: "50%",
      height: "90%",
      items: ["{bold}Menssenger{/}"],
    });

    return this;
  }

  // responsavel por entregar uma factory, nosso objeto que precisamos para a tela
  build() {
    const components = {
      // deixando publico somente essas variaveis
      screen: this.#screen,
      input: this.#input,
    };

    return components;
  }
}
