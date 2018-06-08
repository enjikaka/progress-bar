const css = `
  #wrapper {
    width: 100%;
    height: 100%;
    contain: strict;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }

  #indicator {
    width: 100%;
    height: 100%;
    transform: none;
    will-change: transform;
    background-color: currentColor;
    pointer-events: none;
  }
`;

const ErrorMessages = {
  NO_DURATION: 'You need to set duration before you can start/stop the progress bar.'
};

class ProgressBar extends HTMLElement {
  connectedCallback () {
    const sDOM = this.attachShadow({ mode: 'closed' });

    sDOM.innerHTML = `
      <style>${css}</style>
      <div id="wrapper">
        <div id="indicator"></div>
      </div>
    `;

    this.wrapper = sDOM.querySelector('#wrapper');
    this.indicator = sDOM.querySelector('#indicator');

    this.wrapper.addEventListener('click', event => this.handleClick(event), false);
  }

  handleClick (event) {
    const percent = this.getRelativePercMouseEvent(event);

    document.dispatchEvent(new CustomEvent('progress-bar:seek', {
      detail: {
        percent
      }
    }));

    this.animation.currentTime = this.animationDuration * percent;
  }

  getRelativePercMouseEvent (mouse) {
    const boundRect = this.wrapper.getBoundingClientRect();
    const offset = {
      left: Math.abs((boundRect.left + window.pageXOffset) - mouse.pageX),
      width: Math.round(boundRect.width)
    };

    return offset.left / offset.width;
  }

  set duration (duration) {
    this.animationDuration = duration * 1000;

    this.animation = this.indicator.animate([
      {
        transform: 'translateX(-100%)'
      },
      {
        transform: 'translateX(0%)'
      }
    ], {
      duration: this.animationDuration,
      iterations: 1
    });

    this.animation.pause();
  }

  set playbackRate (playbackRate) {
    this.stop();
    this.animation.playbackRate = playbackRate;
    this.start();
  }

  start () {
    if (!this.animation) {
      throw new Error(ErrorMessages.NO_DURATION);
    }

    this.animation.play();
  }

  stop () {
    if (!this.animation) {
      throw new Error(ErrorMessages.NO_DURATION);
    }

    this.animation.pause();
  }
}

customElements.define('progress-bar', ProgressBar);
