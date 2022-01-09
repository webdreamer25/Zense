import { Zense } from "../../../zense";

const ProgressiveImgBehavior = Object.create(Zense.Behavior);

ProgressiveImgBehavior.config({
  name: 'progressive-image-behavior',

  ui: {
    container: '[data-progressive-desktop]'
  },

  handleSmallImageLoad(e) {
    e.target.classList.add('b-progressive-img--loaded');
  },

  handleLargeImageLoad(e) {
    let image = e.currentTarget;
    let imageBlur = image.nextElementSibling
    
    image.classList.add('b-progressive-img--loaded');

    imageBlur.style.transition = 'opacity 0.7s ease-out';
    imageBlur.style.opacity = '0';

    setTimeout(() => {
      imageBlur.remove();
    }, 750);
  },

  progressiveImageLoading(region) {
    let imgClass = region.dataset.progressiveClass;
    let imgLarge = document.createElement('img');

    imgLarge.src = region.dataset.progressiveDesktop;
    imgLarge.onload = this.handleLargeImageLoad.bind(this);

    if (imgClass !== undefined && imgClass !== '') {
      imgLarge.classList.add(imgClass, 'b-progressive-img__image');
    }

    region.insertBefore(imgLarge, region.firstChild);
  },

  start() {
    this.bindUIElements();

    if (this.ui.container.exists && this.ui.container.length) {
      this.ui.container.each((region) => {
        this.progressiveImageLoading(region);
      });
    } else {
      this.progressiveImageLoading(this.ui.container);
    }
  }
});

export default ProgressiveImgBehavior;