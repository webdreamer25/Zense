import { Module } from "../../zense/index";

const ColorBlockModule = Object.create(Module);

ColorBlockModule.create({
  name: 'color-block',
  selector: '#main-region',

  template() {
    return `
      <section class="color-block">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-auto">
              <h2>Some random title</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet condimentum faucibus.</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              AREA 1
            </div>
            <div class="col-6">
              AREA 2
            </div>
          </div>
        </div>
      </section>
    `;
  }
});

export default ColorBlockModule;