type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc["length"]]>;
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
export default class ProgressBar extends HTMLElement {
    #private;
    /**
     * Renders the progress bar to a shadow DOM, caches references to the wrapper
     * && indicator elements and adds a click handler to the wrapper element for
     * handling the seeking.
     */
    connectedCallback(): void;
    /**
     * Handle clicking the progress bar wrapper. Calculate the percentate
     * to seek to and emits a progress-bar:seek CustomEvent to be listened
     * to outside this component to react to the click.
     */
    handleClick(event: MouseEvent): void;
    /**
   * Calculates where in the progress bar the person clicked
   * in percent.

   */
    getMousePositionAsPercent(mouse: MouseEvent): number;
    /**
     * Setting this recrates the animation with the new duraton and pauses the animation.
     */
    set duration(durationSeconds: number);
    /**
     * Setting this stops the animations, updates the playback rate and plays it again.
     */
    set playbackRate(playbackRate: IntRange<0, 1>);
    /**
     * Set current time with miliseconds.
     * @memberof ProgressBar
     */
    set currentTime(currentTime: number);
    /**
     * Starts the animation if duration is defined.
     *
     * @throws Will throw an error if duration is not set.
     */
    start(): void;
    /**
     * Stops the animation if duration is defined.
     *
     * @throws Will throw an error if duration is not set.
     */
    stop(): void;
}
export {};
