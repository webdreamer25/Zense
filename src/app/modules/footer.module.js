import { Module } from '../../zense/index';
import FormComponent from '../components/form.component';

const FooterModule = Object.create(Module);

FooterModule.create({
  name: 'footer',
  selector: '#app',
  components: [
    FormComponent
  ],
  
  template() {
    return '<footer id="footer-region">Test footer module</footer>'
  }
});

export default FooterModule;