//Responsavel por receber as regras de negocio e fazer a delegacao dos eventos
// Controller eh o nosso mediador, ele que vai inicializar todo mundo

import ComponentsBuilder from "./components.js";

export default class TerminalController {
  constructor() {}

  #onInputReceived(eventEmitter) {
    return function () {
      const message = this.getValue();
      console.log(message);
      this.clearValue();
    };
  }

  //comeca o projeto
  async initializeTable(eventEmitter) {
    // fazendo nosso builder entrar em acao
    const components = new ComponentsBuilder()
      .setScreen({ title: "Hacker Chat - Alden Merlin" })
      .setLayoutComponent()
      .setInputComponent(this.#onInputReceived(eventEmitter))
      .setChatComponent()
      .build();

    components.input.focus();
    components.screen.render();
  }
}
