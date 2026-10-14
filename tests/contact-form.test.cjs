const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
// Exercise the shipped submission handler with a simulated receiver; never send mail.
const source = fs.readFileSync(path.join(__dirname, '../assets/site.js'), 'utf8');
const handlerSource = source.slice(source.indexOf('document.querySelectorAll("#contact-form")'));
function setup(fetchMock) {
  let submit;
  const events = [];
  const status = {textContent: '', dataset: {}, removeAttribute: () => { delete status.dataset.state; }};
  const button = {innerHTML: '相談する<svg></svg>', textContent: '', disabled: false};
  const form = {
    action: 'https://formspree.io/f/mojondnp', resetCount: 0,
    querySelector: selector => selector === '[data-form-status]' ? status : button,
    addEventListener: (name, callback) => { if (name === 'submit') submit = callback; },
    reset: () => form.resetCount++, dispatchEvent: () => {}
  };
  const sandbox = {
    document: {querySelectorAll: () => [form]},
    fetch: fetchMock, FormData: class {constructor(f) {this.form = f;}}, Event,
    trackEvent: (name, parameters) => events.push({name, parameters})
  };
  vm.runInNewContext(handlerSource, sandbox);
  return {form, button, status, events, send: () => submit({preventDefault() {}})};
}
test('success is recorded only after the receiver accepts the submission', async () => {
  let resolve;
  const h = setup(() => new Promise(r => {resolve = r;}));
  const pending = h.send();
  assert.equal(h.button.disabled, true);
  assert.equal(h.events.length, 0);
  resolve({ok: true}); await pending;
  assert.equal(h.status.dataset.state, 'success');
  assert.equal(h.form.resetCount, 1);
  assert.equal(h.events[0].name, 'contact_form_submit');
  assert.equal(h.button.disabled, false);
  assert.equal(h.button.innerHTML, '相談する<svg></svg>');
});
for (const [name, fetchMock] of [
  ['receiver failure', async () => ({ok: false})],
  ['network failure', async () => {throw Error('offline');}]
]) test(name + ' preserves input, restores retry, and does not count a conversion', async () => {
  const h = setup(fetchMock); await h.send();
  assert.equal(h.status.dataset.state, 'error');
  assert.equal(h.form.resetCount, 0);
  assert.equal(h.events.length, 0);
  assert.equal(h.button.disabled, false);
  assert.match(h.status.textContent, /LINE/);
});

test('a second submit while a request is pending does not send a duplicate', async () => {
  let resolve, requests = 0;
  const h = setup(() => {requests++; return new Promise(r => {resolve = r;});});
  const pending = h.send(); await h.send();
  assert.equal(requests, 1);
  resolve({ok: true}); await pending;
  assert.equal(h.events.length, 1);
});
