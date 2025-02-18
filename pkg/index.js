var m=e=>{throw TypeError(e)};var p=(e,s,t)=>s.has(e)||m("Cannot "+t);var n=(e,s,t)=>(p(e,s,"read from private field"),t?t.call(e):s.get(e)),c=(e,s,t)=>s.has(e)?m("Cannot add the same private member more than once"):s instanceof WeakSet?s.add(e):s.set(e,t),d=(e,s,t,r)=>(p(e,s,"write to private field"),r?r.call(e,t):s.set(e,t),t);var f=`
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
`,b={NO_DURATION:"You need to set duration before you can start/stop the progress bar."},o,h,i,a,l=class extends HTMLElement{constructor(){super(...arguments);c(this,o);c(this,h);c(this,i);c(this,a)}connectedCallback(){let t=this.attachShadow({mode:"closed"});t.innerHTML=`
      <style>${f}</style>
      <div id="wrapper">
        <div id="indicator"></div>
      </div>
    `,d(this,o,t.querySelector("#wrapper")),d(this,h,t.querySelector("#indicator")),n(this,o).addEventListener("click",r=>{r instanceof MouseEvent&&this.handleClick(r)},!1)}handleClick(t){let r=this.getMousePositionAsPercent(t),u={percent:r};document.dispatchEvent(new CustomEvent("progress-bar:seek",{detail:u})),this.currentTime=n(this,a)*r}getMousePositionAsPercent(t){let r=n(this,o).getBoundingClientRect(),u={left:Math.abs(r.left+window.pageXOffset-t.pageX),width:Math.round(r.width)};return u.left/u.width}set duration(t){d(this,a,t*1e3);let r=[{transform:"translateX(-100%)"},{transform:"translateX(0%)"}];d(this,i,n(this,h).animate(r,{duration:n(this,a),iterations:1})),n(this,i).pause()}set playbackRate(t){this.stop(),n(this,i).playbackRate=t,this.start()}set currentTime(t){n(this,i)&&(n(this,i).currentTime=t)}start(){if(!n(this,i))throw new Error(b.NO_DURATION);n(this,i).play()}stop(){if(!n(this,i))throw new Error(b.NO_DURATION);n(this,i).pause()}};o=new WeakMap,h=new WeakMap,i=new WeakMap,a=new WeakMap;customElements.define("progress-bar",l);export{l as default};
//# sourceMappingURL=index.js.map
