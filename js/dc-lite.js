/*
 * dc-lite.js — a tiny, dependency-free renderer for the page template in index.html.
 *
 * The page is written as an HTML <template> with:
 *   {{path.to.value}}             text / attribute holes (dotted lookups only)
 *   <sc-for list="{{x}}" as="i">  repeat children for every item (also exposes $index)
 *   <sc-if value="{{flag}}">      render children only when flag is truthy
 *   onClick / onChange / onSubmit attributes bound to functions returned by renderVals()
 *
 * The page logic lives in a class `Component extends DCLogic` with React-like
 * state / setState / componentDidMount and a renderVals() method that returns the
 * values the template reads. On every setState the template is re-rendered and the
 * live DOM is patched in place (so focus, typing and scroll position are preserved).
 */
(function () {
  "use strict";

  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\{\{\s*([^}]+?)\s*\}\}$/;
  var SVG_NS = "http://www.w3.org/2000/svg";
  var EVENTS = { onclick: "click", onchange: "change", onsubmit: "submit", oninput: "input" };
  var BOOL_ATTRS = { disabled: 1, autoplay: 1, controls: 1, playsinline: 1, novalidate: 1, required: 1, hidden: 1, multiple: 1, selected: 1 };
  var KEEP_CLASSES = ["pre", "in"]; // classes added at runtime by the scroll-reveal observer

  function lookup(scope, path) {
    if (path === "true") return true;
    if (path === "false") return false;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    var v = scope, parts = path.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }

  function interp(str, scope) {
    var m = str.match(WHOLE);
    if (m) return lookup(scope, m[1]);
    return str.replace(HOLE, function (_, p) {
      var v = lookup(scope, p);
      return v == null ? "" : String(v);
    });
  }

  function listen(el, type) {
    el.__bound = el.__bound || {};
    if (el.__bound[type]) return;
    el.__bound[type] = true;
    el.addEventListener(type, function (e) {
      var fn = el.__h && el.__h[type];
      if (typeof fn === "function") fn(e);
    });
  }

  function render(node, scope, out) {
    if (node.nodeType === 3) {
      var t = interp(node.nodeValue, scope);
      out.push(document.createTextNode(t == null ? "" : String(t)));
      return;
    }
    if (node.nodeType !== 1) return;
    var tag = node.localName;
    var kids = node.childNodes;

    if (tag === "sc-for") {
      var list = interp(node.getAttribute("list") || "", scope) || [];
      var as = node.getAttribute("as") || "item";
      for (var i = 0; i < list.length; i++) {
        var s = Object.create(scope);
        s[as] = list[i];
        s.$index = i;
        for (var k = 0; k < kids.length; k++) render(kids[k], s, out);
      }
      return;
    }
    if (tag === "sc-if") {
      if (interp(node.getAttribute("value") || "", scope)) {
        for (var j = 0; j < kids.length; j++) render(kids[j], scope, out);
      }
      return;
    }

    var el = node.namespaceURI === SVG_NS ? document.createElementNS(SVG_NS, node.localName) : document.createElement(tag);
    var inputType = (node.getAttribute("type") || "").toLowerCase();
    var attrs = node.attributes;
    for (var a = 0; a < attrs.length; a++) {
      var name = attrs[a].name, raw = attrs[a].value;
      if (name.indexOf("hint-") === 0) continue;
      var lname = name.toLowerCase();
      if (EVENTS[lname]) {
        var type = EVENTS[lname];
        if (lname === "onchange" && ((tag === "input" && inputType !== "checkbox" && inputType !== "radio") || tag === "textarea")) type = "input";
        el.__h = el.__h || {};
        el.__h[type] = interp(raw, scope);
        listen(el, type);
        continue;
      }
      var v = interp(raw, scope);
      if (lname === "value" && (tag === "input" || tag === "textarea" || tag === "select")) {
        el.__value = v == null ? "" : String(v);
        if (tag === "input") el.setAttribute("value", el.__value);
        continue;
      }
      if (lname === "checked") { el.__checked = !!v; continue; }
      if (BOOL_ATTRS[lname]) {
        if (v && v !== "false") el.setAttribute(name, "");
        continue;
      }
      if (v == null || v === false) continue;
      el.setAttribute(name, String(v));
    }

    var childOut = [];
    for (var c = 0; c < kids.length; c++) render(kids[c], scope, childOut);
    for (var d = 0; d < childOut.length; d++) el.appendChild(childOut[d]);

    if (el.__value !== undefined) el.value = el.__value;
    if (el.__checked !== undefined) el.checked = el.__checked;
    out.push(el);
  }

  function sameKind(a, b) {
    if (a.nodeType !== b.nodeType) return false;
    if (a.nodeType === 1) return a.namespaceURI === b.namespaceURI && a.localName === b.localName;
    return true;
  }

  function morphAttrs(o, n) {
    var i, name;
    for (i = o.attributes.length - 1; i >= 0; i--) {
      name = o.attributes[i].name;
      if (!n.hasAttribute(name)) o.removeAttribute(name);
    }
    for (i = 0; i < n.attributes.length; i++) {
      name = n.attributes[i].name;
      var val = n.attributes[i].value;
      if (name === "class") {
        var keep = KEEP_CLASSES.filter(function (k) { return o.classList && o.classList.contains(k); });
        if (keep.length) val = (val + " " + keep.join(" ")).trim();
      }
      if (o.getAttribute(name) !== val) o.setAttribute(name, val);
    }
  }

  function morph(o, n) {
    if (o.nodeType === 3) {
      if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
      return;
    }
    morphAttrs(o, n);
    o.__h = n.__h;
    if (n.__h) for (var type in n.__h) listen(o, type);
    morphChildren(o, Array.prototype.slice.call(n.childNodes));
    if (n.__value !== undefined && o.value !== n.__value) o.value = n.__value;
    if (n.__checked !== undefined && o.checked !== n.__checked) o.checked = n.__checked;
  }

  function morphChildren(parent, next) {
    var old = Array.prototype.slice.call(parent.childNodes);
    for (var i = 0; i < next.length; i++) {
      var o = old[i], n = next[i];
      if (!o) parent.appendChild(n);
      else if (sameKind(o, n)) morph(o, n);
      else parent.replaceChild(n, o);
    }
    for (var j = next.length; j < old.length; j++) parent.removeChild(old[j]);
  }

  window.DCLogic = function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  };
  window.DCLogic.prototype.setState = function (update) {
    var u = typeof update === "function" ? update(this.state, this.props) : update;
    this.state = Object.assign({}, this.state, u);
    if (this.__schedule) this.__schedule();
  };
  window.DCLogic.prototype.forceUpdate = function () {
    if (this.__schedule) this.__schedule();
  };

  window.mountDC = function (ComponentClass, root, template, props) {
    var comp = new ComponentClass(props || {});
    var queued = false;
    function draw() {
      queued = false;
      var vals = comp.renderVals();
      var out = [];
      var nodes = template.content.childNodes;
      for (var i = 0; i < nodes.length; i++) render(nodes[i], vals, out);
      morphChildren(root, out);
    }
    comp.__schedule = function () {
      if (queued) return;
      queued = true;
      Promise.resolve().then(draw);
    };
    draw();
    if (typeof comp.componentDidMount === "function") comp.componentDidMount();
    return comp;
  };
})();
