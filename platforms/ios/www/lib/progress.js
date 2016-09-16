/*! circular-progress - v0.2.1 - https://github.com/neoziro/circular-progress */
(function(){var t=["fillStyle","font","globalAlpha","globalCompositeOperation","lineCap","lineDashOffset","lineJoin","lineWidth","miterLimit","shadowBlur","shadowColor","shadowOffsetX","shadowOffsetY","strokeStyle","textAlign","textBaseLine"],e=function(t){var e=t.getContext("2d"),i=window.devicePixelRatio||1;return 1!==i&&(t.style.width=t.width+"px",t.style.height=t.height+"px",t.width*=i,t.height*=i,e.scale(i,i)),t},i=function(e,i){for(var n in i)-1!==t.indexOf(n)&&(e[n]=i[n])},n=this.CircularProgress=function(e){var i,n,a;e=e||{},this.el=document.createElement("canvas"),this.options=e,e.text=e.text||{},e.text.value=e.text.value||null,i=this.el.getContext("2d");for(n in t)a=t[n],e[a]=e[a]!==void 0?e[a]:i[a];e.radius&&this.radius(e.radius)};n.prototype.update=function(t){return this._percent=t,this.draw(),this},n.prototype.radius=function(t){var i=2*t;return this.el.width=i,this.el.height=i,e(this.el),this},n.prototype.draw=function(){var t,e,n,a=this.options,h=this.el.getContext("2d"),l=Math.min(this._percent,100),o=window.devicePixelRatio||1,s=2*Math.PI*l/100,r=this.el.width/o,d=r/2,u=d,c=d;return h.clearRect(0,0,r,r),a.initial&&(i(h,a),i(h,a.initial),h.beginPath(),h.arc(u,c,d-h.lineWidth,0,2*Math.PI,!1),h.stroke()),i(h,a),h.beginPath(),h.arc(u,c,d-h.lineWidth,0,s,!1),h.stroke(),a.text&&(i(h,a),i(h,a.text)),e=null===a.text.value?(0|l)+"%":a.text.value,t=h.measureText(e).width,n=h.font.match(/(\d+)px/),n=n?n[1]:0,h.fillText(e,u-t/2+1,c+n/2-1),this}}).call(this);
//@ sourceMappingURL=circular-progress.min.map