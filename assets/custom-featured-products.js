class FeaturedAddButton extends HTMLButtonElement {
  connectedCallback() {
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
  }

  async onClick(event) {
    event.preventDefault();

    const variantId = this.dataset.variantId;
    const sectionId = this.dataset.sectionId;
    if (!variantId || !sectionId) return;

    this.disabled = true;
    this.classList.add('is-loading');

    try {
      const fd = new FormData();
      fd.append('id', variantId);
      fd.append('quantity', '1');

      const res = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: fd
      });

      if (!res.ok) throw new Error('Add to cart failed');

     
      const cartDrawer = document.querySelector('cart-drawer');
      if (cartDrawer && typeof cartDrawer.open === 'function') {
        cartDrawer.open();
      }



      const url = new URL(window.location.href);
      url.searchParams.set('sections', sectionId);
      url.searchParams.set('section_id', sectionId);

      const html = await fetch(url.toString(), {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      }).then(r => r.text());

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const updated = doc.querySelector(`#featured-${sectionId}`);
      const current = document.querySelector(`#featured-${sectionId}`);
      if (updated && current) current.replaceWith(updated);
    } catch (error) {
      console.error(error);
      alert('Unable to add to cart. Please try again.');
    } finally {
      this.disabled = false;
      this.classList.remove('is-loading');
    }
  }
}

customElements.define('featured-add-button', FeaturedAddButton, { extends: 'button' });
