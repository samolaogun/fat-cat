var Rhythm;

Rhythm = (function() {
  Rhythm.sSize = window.innerWidth;

  Rhythm.units = ['rem', 'em', 'vw', 'vh', 'px', '%'];

  function Rhythm(elements, props, pairs, opts) {
    var a1, a2, above, b1, b2, beforeLast, below, el, i, item, j, k, l, last, len, len1, len2, len3, m, prop, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    this.elements = elements;
    this.props = props;
    this.pairs = pairs;
    this.opts = opts;
    if (!Array.isArray(this.props)) {
      this.props = [this.props];
    }
    if (!Array.isArray(this.elements)) {
      this.elements = [this.elements];
    }
    this.unit = (ref = (ref1 = this.opts) != null ? ref1.unit : void 0) != null ? ref : 'px';
    this.clamp = (ref2 = (ref3 = this.opts) != null ? ref3.clamp : void 0) != null ? ref2 : true;
    if (!Rhythm.units.includes(this.unit)) {
      throw 'Rhythm: Incompatible units.';
    }
    if (this.pairs.length < 2) {
      throw 'Rhythm: A minimum of two pairs is required.';
    }
    this.pairs.sort(function(a, b) {
      if (a[1] > b[1]) {
        return 1;
      } else if (a[1] < b[1]) {
        return -1;
      }
      return 0;
    });
    this.filteredPairs = this.pairs.filter(function(p) {
      return p[1] < Rhythm.sSize;
    });
    if (this.filteredPairs.length === 0) {
      this.current = [this.pairs[0], this.pairs[1]];
    } else if (this.filteredPairs.length === this.pairs.length) {
      ref4 = this.filteredPairs, i = ref4.length - 2, beforeLast = ref4[i++], last = ref4[i++];
      this.current = [beforeLast, last];
    } else {
      ref5 = this.filteredPairs, below = ref5[ref5.length - 1];
      above = this.pairs[this.filteredPairs.length];
      this.current = [below, above];
    }
    this.current = [[this.current[0][1], this.current[1][1]], [this.current[0][0], this.current[1][0]]];
    ref6 = this.current[0], a1 = ref6[0], a2 = ref6[1];
    ref7 = this.current[1], b1 = ref7[0], b2 = ref7[1];
    this.value = b1 + (Rhythm.sSize - a1) * (b2 - b1) / (a2 - a1);
    if (this.clamp) {
      if (this.value > b2) {
        this.value = b2;
      } else if (this.value < b1) {
        this.value = b1;
      }
    }
    ref8 = this.elements;
    for (j = 0, len = ref8.length; j < len; j++) {
      el = ref8[j];
      if (typeof el === 'string') {
        el = document.querySelectorAll(el);
        for (k = 0, len1 = el.length; k < len1; k++) {
          item = el[k];
          ref9 = this.props;
          for (l = 0, len2 = ref9.length; l < len2; l++) {
            prop = ref9[l];
            item.style[prop] = this.value + this.unit;
          }
        }
      } else {
        ref10 = this.props;
        for (m = 0, len3 = ref10.length; m < len3; m++) {
          prop = ref10[m];
          el.style[prop] = this.value + this.unit;
        }
      }
    }
  }

  return Rhythm;

})();

if (typeof module !== "undefined" && module !== null) {
  module.exports = Rhythm;
}
