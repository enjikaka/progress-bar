// @ts-ignore
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
  /**
   * Renders the progress bar to a shadow DOM, caches references to the wrapper
   * && indicator elements and adds a click handler to the wrapper element for
   * handling the seeking.
   */
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

    this.wrapper.addEventListener('click', event => {
      if (event instanceof MouseEvent) {
        this.handleClick(event);
      }
    }, false);
  }

  /**
   * Handle clicking the progress bar wrapper. Calculate the percentate
   * to seek to and emits a progress-bar:seek CustomEvent to be listened
   * to outside this component to react to the click.
   *
   * @param {MouseEvent} event
   */
  handleClick (event) {
    const percent = this.getMousePositionAsPercent(event);
    const detail = { percent };

    document.dispatchEvent(new CustomEvent('progress-bar:seek', { detail }));

    if (this.animation) {
      this.animation.currentTime = this.animationDuration * percent;
    }
  }

  /**
   * Calculates where in the progress bar the person clicked
   * in percent.
   *
   * @param {MouseEvent} mouse
   */
  getMousePositionAsPercent (mouse) {
    const boundRect = this.wrapper.getBoundingClientRect();
    const offset = {
      left: Math.abs((boundRect.left + window.pageXOffset) - mouse.pageX),
      width: Math.round(boundRect.width)
    };

    return offset.left / offset.width;
  }

  /**
   * Setting this recrates the animation with the new duraton and pauses the animation.
   */
  set duration (duration) {
    this.animationDuration = duration * 1000;

    /** @type {Keyframe[]} */
    const keyframes = ([
      {
        transform: 'translateX(-100%)'
      },
      {
        transform: 'translateX(0%)'
      }
    ]);

    this.animation = this.indicator.animate(keyframes, {
      duration: this.animationDuration,
      iterations: 1
    });

    this.animation.pause();
  }

  /**
   * Setting this stops the animations, updates the playback rate and plays it again.
   */
  set playbackRate (playbackRate) {
    this.stop();
    this.animation.playbackRate = playbackRate;
    this.start();
  }

  /**
   * Starts the animation if duration is defined.
   *
   * @throws Will throw an error if duration is not set.
   */
  start () {
    if (!this.animation) {
      throw new Error(ErrorMessages.NO_DURATION);
    }

    this.animation.play();
  }

  /**
   * Stops the animation if duration is defined.
   *
   * @throws Will throw an error if duration is not set.
   */
  stop () {
    if (!this.animation) {
      throw new Error(ErrorMessages.NO_DURATION);
    }

    this.animation.pause();
  }
}

customElements.define('progress-bar', ProgressBar);
