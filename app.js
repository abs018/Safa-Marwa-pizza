/*  ROUTER  */
const routes = {
  "/": renderHome,
  "/menu": renderMenu,
  "/deals": renderDeals,
  "/about": renderAbout,
  "/contact": renderContact,
  "/faq": renderFAQ,
  "/checkout": renderCheckout,
  "/order-confirmation": renderConfirmation
};

function parseHash(){
  let hash = window.location.hash.replace(/^#/, '') || '/';
  const [path, query] = hash.split('?');
  const params = new URLSearchParams(query || '');
  return { path: path || '/', params };
}

function router(){
  const { path, params } = parseHash();
  const render = routes[path] || routes["/"];

  if(path === "/menu"){
    const cat = params.get('category');
    if(cat && CATEGORIES.includes(cat)) activeCategory = cat;
  }

  document.getElementById('app').innerHTML = render();
  window.scrollTo({ top:0, behavior:'auto' });

  document.querySelectorAll('.navbar-links a, .mobile-overlay-links a').forEach(a=>{
    a.classList.toggle('active', a.dataset.path === path);
  });

  closeMobileMenu();
  closeCart();
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('footYear').textContent = new Date().getFullYear();
  renderCartUI();
  router();
});

/*  NAV / MOBILE MENU  */
function openMobileMenu(){ document.getElementById('mobileOverlay').classList.add('open'); }
function closeMobileMenu(){ document.getElementById('mobileOverlay').classList.remove('open'); }

document.addEventListener('click', (e)=>{
  if(e.target.closest('#mobileMenuBtn')) openMobileMenu();
  if(e.target.closest('#mobileCloseBtn')) closeMobileMenu();
});

/*  CART DRAWER TOGGLE  */
function openCart(){
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('open');
}
function closeCart(){
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
}
document.addEventListener('click', (e)=>{
  if(e.target.closest('#cartToggleBtn')) openCart();
  if(e.target.closest('#cartCloseBtn')) closeCart();
  if(e.target.id === 'drawerOverlay') closeCart();
});

/*  LINK INTERCEPTION (category tagging)  */
document.addEventListener('click', (e)=>{
  const link = e.target.closest('[data-link]');
  if(!link) return;
  const category = link.dataset.category;
  if(category){
    e.preventDefault();
    window.location.hash = `#/menu?category=${encodeURIComponent(category)}`;
  }
});

/*  DELEGATED ACTIONS (product cards, deals, faq, tabs)  */
document.getElementById('app').addEventListener('click', (e)=>{
  const el = e.target.closest('[data-action]');
  if(!el) return;
  const action = el.dataset.action;

  if(action === 'select-size'){
    const p = MENU.find(m=>m.id===el.dataset.product);
    const st = getProductState(p);
    st.sizeIndex = Number(el.dataset.sizeIndex);
    const card = el.closest('.product-card');
    card.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));
    el.classList.add('active');
    card.querySelector('.price-tag').innerHTML = `<span class="rs">Rs.</span>${p.sizes[st.sizeIndex].price}`;
  }

  if(action === 'qty-dec' || action === 'qty-inc'){
    const p = MENU.find(m=>m.id===el.dataset.product);
    const st = getProductState(p);
    st.qty = Math.max(1, st.qty + (action==='qty-inc'?1:-1));
    const card = el.closest('.product-card');
    card.querySelector(`#qty-${p.id}`).textContent = st.qty;
    card.querySelectorAll('[data-action="qty-dec"]').forEach(b=>b.disabled = st.qty<=1);
  }

  if(action === 'order-whatsapp'){
    const p = MENU.find(m=>m.id===el.dataset.product);
    const st = getProductState(p);
    const hasSizes = p.sizes && p.sizes.length > 0;
    const size = hasSizes ? p.sizes[st.sizeIndex].name : undefined;
    const price = hasSizes ? p.sizes[st.sizeIndex].price : p.price;
    const qty = st.qty;
    sendProductOrderOnWhatsApp(p, size, price, qty);
    showToast('Opening WhatsApp…', `Sending order details for ${p.nameEn}.`);
    st.qty = 1;
    const card = el.closest('.product-card');
    if(card){
      const qtyEl = card.querySelector(`#qty-${p.id}`);
      if(qtyEl) qtyEl.textContent = 1;
      card.querySelectorAll('[data-action="qty-dec"]').forEach(b=>b.disabled = true);
    }
  }

  if(action === 'order-deal-whatsapp'){
    const d = DEALS.find(x=>x.id===el.dataset.deal);
    sendDealOrderOnWhatsApp(d);
    showToast('Opening WhatsApp…', `Sending order details for ${d.title}.`);
  }

  if(action === 'set-category'){
    activeCategory = el.dataset.category;
    document.getElementById('app').innerHTML = renderMenu();
  }

  if(action === 'toggle-faq'){
    const item = el.closest('.faq-item');
    item.classList.toggle('open');
  }

  if(action === 'set-delivery-method'){
    checkoutDeliveryMethod = el.value;
    document.getElementById('app').innerHTML = renderCheckout();
  }

  if(action === 'set-payment-method'){
    checkoutPaymentMethod = el.value;
    // just update visual state, no full re-render needed except pill classes
    el.closest('.checkout-section').querySelectorAll('.choice-pill').forEach(p=>p.classList.remove('checked'));
    el.closest('.choice-pill').classList.add('checked');
  }
});

/* also handle radio "checked" visual state for delivery method pills without full rerender flicker */
document.getElementById('app').addEventListener('change', (e)=>{
  if(e.target.name === 'deliveryMethod'){
    // handled by click action above via full rerender (keeps address section toggle in sync)
  }
});

/*  FORM SUBMISSIONS  */
document.getElementById('app').addEventListener('submit', (e)=>{
  if(e.target.id === 'contactForm'){
    e.preventDefault();
    showToast('Message Sent!', "We've received your message and will get back to you soon.");
    e.target.reset();
  }

  if(e.target.id === 'checkoutForm'){
    e.preventDefault();
    handleCheckoutSubmit();
  }
});

/*  DIRECT WHATSAPP PRODUCT ORDER  */
function openWhatsAppWithMessage(message){
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

function sendProductOrderOnWhatsApp(p, size, price, qty){
  const total = price * qty;
  const lines = [];
  lines.push(`*New Order – Safa Marwa Pizza Point*`);
  lines.push(`---`);
  lines.push(`*Item:* ${p.nameEn}${size?` (${size})`:''}`);
  if(p.category) lines.push(`Category: ${p.category}`);
  if(p.description) lines.push(`Description: ${p.description}`);
  lines.push(`Quantity: ${qty}`);
  lines.push(`Unit Price: Rs. ${price}`);
  lines.push(`*Item Total: Rs. ${total}*`);
  lines.push(`---`);
  lines.push(`Hi, I'd like to place this order. Please confirm availability and share delivery/pickup details. Thank you!`);
  openWhatsAppWithMessage(lines.join('\n'));
}

function sendDealOrderOnWhatsApp(d){
  const lines = [];
  lines.push(`*New Deal Order – Safa Marwa Pizza Point*`);
  lines.push(`---`);
  lines.push(`*Deal:* ${d.title}`);
  if(d.description) lines.push(`Description: ${d.description}`);
  lines.push(`Quantity: 1`);
  lines.push(`*Price: Rs. ${d.price}*`);
  lines.push(`---`);
  lines.push(`Hi, I'd like to order this deal. Please confirm availability and share delivery/pickup details. Thank you!`);
  openWhatsAppWithMessage(lines.join('\n'));
}

function genOrderId(){
  return `SM-${Math.floor(1000 + Math.random()*9000)}`;
}

function handleCheckoutSubmit(){
  const fullName = document.getElementById('fullName').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const whatsappNum = document.getElementById('whatsappNum').value.trim();
  const notes = document.getElementById('notes').value.trim();
  const errEl = document.getElementById('checkoutError');

  let address = '', city = '', landmark = '';
  if(checkoutDeliveryMethod === 'Delivery'){
    address = document.getElementById('address').value.trim();
    city = document.getElementById('city').value.trim();
    landmark = document.getElementById('landmark').value.trim();
  }

  if(!fullName || fullName.length < 2){ errEl.textContent = 'Full Name is required.'; errEl.style.display='block'; return; }
  if(!mobile || mobile.length < 11){ errEl.textContent = 'A valid mobile number is required.'; errEl.style.display='block'; return; }
  if(checkoutDeliveryMethod === 'Delivery'){
    if(!address || address.length < 5){ errEl.textContent = 'Complete address is required for delivery.'; errEl.style.display='block'; return; }
    if(!city || city.length < 2){ errEl.textContent = 'City is required for delivery.'; errEl.style.display='block'; return; }
  }
  errEl.style.display = 'none';

  const t = Cart.totals();
  const actualDeliveryFee = checkoutDeliveryMethod === 'Pickup' ? 0 : t.deliveryFee;
  const actualTotal = t.subtotal + actualDeliveryFee;
  const orderId = genOrderId();

  const lines = [];
  lines.push(`*New Order - Safa Marwa Pizza Point*`);
  lines.push(`Order ID: ${orderId}`);
  lines.push(`---`);
  lines.push(`*Items:*`);
  Cart.items.forEach(item=>{
    const sizeStr = item.size ? ` (${item.size})` : '';
    lines.push(`• ${item.quantity}x ${item.name}${sizeStr} - Rs. ${item.price*item.quantity}`);
  });
  lines.push(`---`);
  lines.push(`Subtotal: Rs. ${t.subtotal}`);
  lines.push(`Delivery: Rs. ${actualDeliveryFee}`);
  lines.push(`*Total: Rs. ${actualTotal}*`);
  lines.push(`---`);
  lines.push(`*Customer Details:*`);
  lines.push(`Name: ${fullName}`);
  lines.push(`Mobile: ${mobile}`);
  if(whatsappNum) lines.push(`WhatsApp: ${whatsappNum}`);
  if(checkoutDeliveryMethod === 'Delivery'){
    lines.push(`Address: ${address}, ${city}`);
    if(landmark) lines.push(`Landmark: ${landmark}`);
  }
  lines.push(`Delivery: ${checkoutDeliveryMethod}`);
  lines.push(`Payment: ${checkoutPaymentMethod}`);
  if(notes) lines.push(`Notes: ${notes}`);
  const orderText = lines.join('\n');

  const orderData = {
    orderId,
    items: Cart.items,
    subtotal: t.subtotal,
    deliveryFee: actualDeliveryFee,
    total: actualTotal,
    customer: { fullName, mobile, whatsapp:whatsappNum, address, city, landmark, deliveryMethod:checkoutDeliveryMethod, paymentMethod:checkoutPaymentMethod, notes },
    whatsappMessage: orderText
  };
  localStorage.setItem('safaMarwaLastOrder', JSON.stringify(orderData));

  Cart.clear();
  window.location.hash = '#/order-confirmation';
}
