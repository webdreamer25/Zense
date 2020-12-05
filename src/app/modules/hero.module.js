import { Zense } from '../../../zense';
import ControlsComponent from '../components/controls.component';

const HeroModule = Object.create(Zense.Module);

HeroModule.create({
  name: 'hero-module',

  selector: '#hero-region',

  ui: {
    jsTrack: '.js-slide-track'
  },

  components: [
    ControlsComponent
  ],

  type: 'carousel',
  collection: [
    {
      path: `/images%2Fsplash%2F5 4.png?alt=media&token=20a2d373-3199-447d-9217-f3f5a073daef`,
      alt: 'Some test alt text 1',
      content: '<h2>Slide 1<\/h2><p>This is just some test text to test capabilities.<\/p>'
    },
    {
      path: `/images%2Fsplash%2F5 4.png?alt=media&token=20a2d373-3199-447d-9217-f3f5a073daef`,
      alt: 'Some test alt text 2',
      content: '<h2>Slide 2<\/h2><p>We need to test exactly how much text one can use in these things. This is specially when you plan to make the text responsive.<\/p>'
    },
    {
      path: `/images%2Fsplash%2F5 4.png?alt=media&token=20a2d373-3199-447d-9217-f3f5a073daef`,
      alt: 'Some test alt text 3',
      content: '<h2>Slide 3<\/h2><p>This is just some test text to test capabilities.<\/p>'
    }
  ],

  init() {
    this.settings.currPageNum = 1;
    this.storageOrigin = 'https://firebasestorage.googleapis.com/v0/b/crees-9efc7.appspot.com/o';
  },

  update(slideIdx) {
    let track = this.ui.jsTrack;

    track.style.transition = '.7s ease-out';
    track.style.transform = `translateX(${-this.slideWidth * slideIdx}px)`;
  },  

  afterRender() {
    if (this.type === 'carousel') {
      this.slideWidth = this.dom('#slide-1').offsetWidth;

      this.ui.jsTrack.style.transform = `translateX(${-this.slideWidth}px)`;
      this.ui.jsTrack.style.transition = 'width 0.3s ease-in-out';

      this.ui.jsTrack.on('transitionend', () => {
        let track = this.dom('.js-slide-track');
        let slides = this.dom('.js-slide');
        let index = this.settings.currPageNum;
        let currSlideId = slides[index].id;

        if (currSlideId === 'first-slide-clone') {
          track.style.transition = 'none';

          // index = this.settings.currPageNum = 1;

          track.style.transform = `translateX(${-this.slideWidth * index}px)`;
        }
      
        if (currSlideId === 'last-slide-clone') {
          track.style.transition = 'none';

          // index = this.settings.currPageNum = slides.length - 2;

          track.style.transform = `translateX(${-this.slideWidth * index}px)`;
        }
      });
    }
  },

  serializeData() {
    let data = this.collection;

    if (this.type === 'static') {
      data = {
        image: `${origin}/images%2Fsplash%2F5 4.png?alt=media&token=20a2d373-3199-447d-9217-f3f5a073daef`,
        alt: 'Some test alt text 1'
      };
    } else {
      if (Array.isArray(data) && data.length > 1) {
        this.firstSlide = data[0]
        this.lastSlide = data[data.length - 1];

        data.unshift(this.lastSlide);
        data.push(this.firstSlide);
      }
    }

    return data;
  },

  template(data) {
    let content;

    switch(this.type) {
      case 'carousel':
        content = /*html*/`<div class="c-carousel">
          <div class="c-carousel__track js-slide-track">
            ${data.map((slide, idx, allSlides) => {
              let id;

              if (idx === 0) {
                id = 'last-slide-clone';
              } else if (idx === allSlides.length - 1) {
                id = 'first-slide-clone';
              } else {
                id = `slide-${idx}`;
              }

              return /*html*/`<div id="${id}" class="c-carousel__slide js-slide">
                <img class="c-carousel__image" src="${this.storageOrigin + slide.path}" alt="${slide.alt}" />
                <div class="c-carousel__content">${slide.content}</div>
              </div>`;
            }).join('')}
          </div>

          <div class="c-controls" data-type="${this.type}"></div>
        </div>`;

        break;
      default:
        content = /*html*/`<img class="img-responsive" src="${data.image}" alt="${data.alt}" />`;
    }

    return /*html*/`<div class="hero">${content}</div>`;
  }
});

export default HeroModule;