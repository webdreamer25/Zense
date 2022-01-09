import { Zense } from '../../../zense';
import ProgressiveImgBehavior from '../behaviors/progressive-img.behavior';
import ControlsComponent from '../components/controls.component';

const HeroModule = Object.create(Zense.Module);

HeroModule.create({
  name: 'hero-module',

  selector: '#hero-region',

  ui: {
    jsTrack: '.js-slide-track'
  },

  behaviors: [
    ProgressiveImgBehavior
  ],

  components: [
    ControlsComponent
  ],

  init() {
    this.controlType = 'carousel';
    this.currPageNum = 1;
    this.collection = [
      {
        image: 'about-us-desktopv1.jpg',
        imageBlur: 'about-us-desktop-blur.jpg',
        mobileImage: 'about-us-mobile-960-960-v1.jpg',
        alt: 'Some test alt text 1',
        content: '<h2>Slide 1<\/h2><p>This is just some test text to test capabilities.<\/p>',
        position: {
          x: 'right',
          y: 'middle'
        }
      },
      {
        image: 'optum-ma-carousel-desktop.jpg',
        imageBlur: 'about-us-desktop-blur.jpg',
        mobileImage: 'optum-ma-carousel-mobile-960-960-v5.jpg',
        alt: 'Some test alt text 2',
        content: '<h2>Slide 2<\/h2><p>We need to test exactly how much text one can use in these things. This is specially when you plan to make the text responsive.<\/p>',
        position: {
          x: 'left',
          y: 'top'
        }
      },
      {
        image: 'optum-perks-desktop-v7.jpg',
        imageBlur: 'about-us-desktop-blur.jpg',
        mobileImage: 'optum-perks-mobile-v7.jpg',
        alt: 'Some test alt text 3',
        content: '<h2>Slide 3<\/h2><p>This is just some test text to test capabilities.<\/p>',
        position: {
          x: 'left',
          y: 'middle'
        }
      },
      {
        image: 'optum-store-12-2-20.jpg',
        imageBlur: 'about-us-desktop-blur.jpg',
        mobileImage: 'optumstore-mobile-960-960-v2.jpg',
        alt: 'Some test alt text 4',
        content: '<h2>Slide 4<\/h2><p>We need to test exactly how much text one can use in these things. This is specially when you plan to make the text responsive.<\/p><p>This is just some test text to test capabilities.<\/p>',
        position: {
          x: 'right',
          y: 'middle'
        }
      }
    ]
  },

  update(slideIdx) {
    const track = this.ui.jsTrack;
    const slides = this.dom('.js-slide');
    const currSlideId = slides[slideIdx].id;
    const collectionLen = this.collection.length;
    
    track.style.transition = '.3s ease-out';
    track.style.transform = `translateX(${-this.slideWidth * slideIdx}px)`;

    // Ensures we carousel back to first or last slide.
    if (slideIdx === 0) {
      this.currPageNum = collectionLen - 2;
    } else if (slideIdx === collectionLen - 1) {
      this.currPageNum = 1;
    }

    // Ensures continuous animation from cloned to actual slide rep.
    if (currSlideId === 'first-slide-clone' || currSlideId === 'last-slide-clone') {
      setTimeout(() => {
        track.removeAttribute('style');

        track.style.transition = 'none';
        track.style.transform = `translateX(${-this.slideWidth * this.currPageNum}px)`;
      }, 380);
    }
  },  

  afterRender() {

    // Needed for initial carousel transitions.
    if (this.controlType === 'carousel') {
      this.slideWidth = this.dom('#slide-1').offsetWidth;

      this.ui.jsTrack.style.transform = `translateX(${-this.slideWidth}px)`;
      this.ui.jsTrack.style.transition = 'width 0.3s ease-in-out';

      //
      window.addEventListener('resize', () => {
        this.slideWidth = this.dom('#slide-1').offsetWidth;

        this.update(this.currPageNum);
      });
    }

  },

  serializeData() {
    let data = this.collection;

    if (this.controlType === 'static') {
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
    let origin = window.location.origin;

    switch(this.controlType) {
      case 'carousel':
        content = /*html*/`<div class="c-carousel">
          <div class="c-controls" data-type="${this.controlType}"></div>

          <div class="c-carousel__track js-slide-track">
            ${data.map((slide, idx, allSlides) => {
              let id;
              let positionClass = `is--${slide.position.x}-${slide.position.y}`;

              if (idx === 0) {
                id = 'last-slide-clone';
              } else if (idx === allSlides.length - 1) {
                id = 'first-slide-clone';
              } else {
                id = `slide-${idx}`;
              }

              return /*html*/`<div id="${id}" class="c-carousel__slide js-slide" 
                data-progressive-desktop="${origin}/assets/${slide.image}"
                data-progressive-mobile=""
                data-progressive-class="c-carousel__image">
                <!--<img class="c-carousel__image" src="${origin}/assets/${slide.image}" alt="${slide.alt}" />-->
                <img class="b-progressive-img__blur" src="${origin}/assets/${slide.imageBlur}" />
                <img class="c-carousel__mobile-image" src="${origin}/assets/${slide.mobileImage}" alt="${slide.alt}" />
                <div class="c-carousel__content ${positionClass}">
                  <div class="c-carousel__caption">${slide.content}</div>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>`;

        break;
      default:
        content = /*html*/`<img class="img-responsive" src="${data.image}" alt="${data.alt}" />`;
    }

    return /*html*/`<div class="m-hero">${content}</div>`;
  }
});

export default HeroModule;