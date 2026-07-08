/* ===================== CART STATE ===================== */
const Cart = {
  items: [],

  load(){
    try{
      const raw = localStorage.getItem('safaMarwaCart');
      if(raw){
        const parsed = JSON.parse(raw);
        this.items = parsed.items || [];
      }
    }catch(e){ console.error('Failed to load cart', e); }
  },

  save(){
    const totals = this.totals();
    localStorage.setItem('safaMarwaCart', JSON.stringify({ items:this.items, ...totals }));
  },

  totals(){
    const subtotal = this.items.reduce((s,i)=>s + i.price*i.quantity, 0);
    const deliveryFee = this.items.length > 0 ? DELIVERY_FEE : 0;
    return { subtotal, deliveryFee, total: subtotal + deliveryFee };
  },

  totalCount(){
    return this.items.reduce((s,i)=>s+i.quantity,0);
  },

  addItem(item){
    const existing = this.items.find(i=>i.id===item.id);
    if(existing){ existing.quantity += item.quantity; }
    else{ this.items.push(item); }
    this.save();
    renderCartUI();
  },

  updateQuantity(id, qty){
    const item = this.items.find(i=>i.id===id);
    if(!item) return;
    item.quantity = Math.max(1, qty);
    this.save();
    renderCartUI();
  },

  removeItem(id){
    this.items = this.items.filter(i=>i.id!==id);
    this.save();
    renderCartUI();
  },

  clear(){
    this.items = [];
    localStorage.setItem('safaMarwaCart', JSON.stringify({ items:[], subtotal:0, deliveryFee:0, total:0 }));
    renderCartUI();
  }
};
Cart.load();

function money(n){ return "Rs. " + Number(n).toLocaleString('en-PK'); }

function showToast(title, desc){
  const el = document.getElementById('toast');
  el.innerHTML = `<strong>${title}</strong>${desc||''}`;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>el.classList.remove('show'), 2600);
}

/* ---------- cart drawer render ---------- */
function renderCartUI(){
  const countEl = document.getElementById('cartCount');
  const count = Cart.totalCount();
  countEl.textContent = count;
  countEl.hidden = count === 0;

  const body = document.getElementById('cartDrawerBody');
  const foot = document.getElementById('cartDrawerFoot');

  if(Cart.items.length === 0){
    body.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
        <p style="font-family:var(--font-heading); font-size:20px; letter-spacing:.05em;">Your cart is empty</p>
        <p style="font-size:13.5px;">Looks like you haven't added anything yet.</p>
      </div>`;
    foot.innerHTML = '';
    return;
  }

  body.innerHTML = Cart.items.map(item => `
    <div class="cart-line" data-id="${item.id}">
      <div class="cart-thumb"><img src="${item.image}" alt="${item.name}"></div>
      <div class="cart-line-info">
        <div class="cart-line-top">
          <div>
            <div class="cart-line-name">${item.name}</div>
            ${item.size ? `<div class="cart-line-size">${item.size}</div>` : ''}
          </div>
          <button class="cart-remove" onclick="Cart.removeItem('${item.id}')" aria-label="Remove item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
          </button>
        </div>
        <div class="cart-line-bottom">
          <div class="cart-line-price">${money(item.price)}</div>
          <div class="mini-stepper">
            <button ${item.quantity<=1?'disabled':''} onclick="Cart.updateQuantity('${item.id}', ${item.quantity-1})">−</button>
            <span>${item.quantity}</span>
            <button onclick="Cart.updateQuantity('${item.id}', ${item.quantity+1})">+</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  const t = Cart.totals();
  foot.innerHTML = `
    <div class="cart-totals">
      <div class="row"><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
      <div class="row"><span>Delivery Charges</span><span>${money(t.deliveryFee)}</span></div>
      <div class="row grand"><span>Grand Total</span><span class="amt">${money(t.total)}</span></div>
    </div>
    <a href="#/checkout" data-link class="btn btn-primary btn-block" onclick="closeCart()">Proceed to Checkout</a>
  `;
}
