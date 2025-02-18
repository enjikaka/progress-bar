# `<progress-bar>`

A small 60 FPS smooth progress bar. Usig the Web Animation API.

## API

### Inputs

| Method | Description | Related media event |
| --- | --- | --- |
| `set duration` | Set the duration of the animation. | [`durationchange`](https://developer.mozilla.org/en-US/docs/Web/Events/durationchange) |
| `set playbackRate` | Set the playbackRate of the animation. | [`ratechange`](https://developer.mozilla.org/en-US/docs/Web/Events/ratechange) |
| `start()` | Start the animation. | [`play`](https://developer.mozilla.org/en-US/docs/Web/Events/play) |
| `stop()` | Stop the animation. | [`pause`](https://developer.mozilla.org/en-US/docs/Web/Events/pause) / [`ended`](https://developer.mozilla.org/en-US/docs/Web/Events/ended) |

### Outputs

| CustomEvent | Description | event.detail keys |
| --- | --- | --- |
| `progress-bar:seek` | Sends the position to seek to in percent. | `percent`

## Other useful information

The colour of the progress is styled by the `currentColor` CSS variable. That means that the parent of `<progress-bar>` controls the colour of the progress via its `color` prop in CSS.

## Usage

The progress bar fills to it's provided width and height.

```html
<audio src="test.mp3" controls></audio>
<progress-bar style="width: 200px; height: 5px; background-color: #eee; color: #000"></progress-bar>
```

```js
const $progressBar = document.querySelector('progress-bar');
const $audio = document.querySelector('audio');

$audio.addEventListener('durationchange', e => {
    $progressBar.duration = e.target.duration;
}, false);
$audio.addEventListener('playing', () => $progressBar.start(), false);
$audio.addEventListener('pause', () => $progressBar.stop(), false);
$audio.addEventListener('waiting', () => $progressBar.stop(), false);
$audio.addEventListener('seeked', () => {
    if (!$audio.paused) {
        $progressBar.start();
    }
}, false);
$audio.addEventListener('seeking', () => $progressBar.stop(), false);
```