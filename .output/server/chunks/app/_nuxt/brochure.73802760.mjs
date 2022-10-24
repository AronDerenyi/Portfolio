globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { ssrRenderAttrs } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from '../server.mjs';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import 'defu';
import '@vueuse/shared';
import 'vue-router';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'fs';
import 'pathe';
import 'url';

const _sfc_main = {
  mounted() {
    const worker = new Worker(new URL("../plugins/artoolkit_worker.ts", globalThis._importMeta_.url), { type: "module" });
    console.log("Mounted", self);
    worker.postMessage("load");
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Brochure</h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/brochure.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const brochure = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { brochure as default };
//# sourceMappingURL=brochure.73802760.mjs.map
