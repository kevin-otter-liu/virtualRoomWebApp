import MicroController from './MicroController';

export default class Controller {
  microControllers: Map<string, MicroController>;

  constructor() {
    this.microControllers = new Map<string, MicroController>();
  }

  public registerMicroController(
    name: string,
    microController: MicroController
  ) {
    if (this.microControllers.get(name) != null) {
      return;
    }
    this.microControllers.set(name, microController);
  }
}
