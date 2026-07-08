/*  SHARED CARD BUILDERS  */
const productState = {}; // id -> { sizeIndex, qty }

function getProductState(p){
  if(!productState[p.id]) productState[p.id] = { sizeIndex:0, qty:1 };
  return productState[p.id];
}

function starsHTML(n){
  let s = '';
  for(let i=0;i<n;i++) s += `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9"/></svg>`;
  return s;
}

function productCardHTML(p){
  const hasSizes = p.sizes && p.sizes.length > 0;
  const st = getProductState(p);
  const price = hasSizes ? p.sizes[st.sizeIndex].price : p.price;
  return `
  <div class="product-card" data-product="${p.id}">
    <div class="product-media">
      <img src="${p.image}" alt="${p.nameEn}" loading="lazy">
      ${p.nameUr ? `<div class="product-urdu">${p.nameUr}</div>` : ''}
    </div>
    <div class="product-body">
      <div class="product-cat">${p.category}</div>
      <h3>${p.nameEn}</h3>
      <p class="product-desc">${p.description}</p>
      <div class="product-bottom">
        ${hasSizes ? `
        <div class="size-select">
          ${p.sizes.map((s,i)=>`<button class="size-btn ${i===st.sizeIndex?'active':''}" data-action="select-size" data-product="${p.id}" data-size-index="${i}">${s.name}</button>`).join('')}
        </div>` : ''}
        <div class="price-row">
          <div class="price-tag" id="price-${p.id}"><span class="rs">Rs.</span>${price}</div>
          <div class="stepper">
            <button data-action="qty-dec" data-product="${p.id}" ${st.qty<=1?'disabled':''} aria-label="Decrease quantity">−</button>
            <span id="qty-${p.id}">${st.qty}</span>
            <button data-action="qty-inc" data-product="${p.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="add-cart-btn whatsapp-order-btn" data-action="order-whatsapp" data-product="${p.id}">
          <svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.696 4.607 1.898 6.472L4 29l7.72-1.865A11.94 11.94 0 0 0 16.001 27C22.63 27 28 21.627 28 15S22.63 3 16.001 3Zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.94 9.94 0 0 1-5.06-1.377l-.362-.213-4.583 1.108 1.137-4.464-.238-.377A9.94 9.94 0 0 1 6.001 15c0-5.523 4.477-10 10-10Zm-3.94 5.06c-.198-.005-.412-.003-.63.001-.218.005-.573.083-.874.41-.302.328-1.152 1.126-1.152 2.745 0 1.62 1.18 3.184 1.343 3.404.163.22 2.26 3.653 5.59 4.973 2.766 1.096 3.33.878 3.93.822.6-.055 1.937-.79 2.21-1.554.271-.764.271-1.42.19-1.555-.082-.135-.3-.216-.628-.379-.328-.163-1.937-.956-2.237-1.065-.3-.11-.518-.163-.736.163-.218.328-.844 1.065-1.035 1.283-.19.219-.382.246-.71.083-.328-.164-1.384-.51-2.636-1.626-.975-.867-1.632-1.936-1.823-2.264-.19-.328-.02-.505.144-.668.148-.147.328-.383.492-.574.163-.19.218-.328.327-.546.11-.219.055-.41-.027-.573-.082-.164-.712-1.782-1.001-2.437-.257-.586-.523-.61-.72-.62Z"/></svg>
          Order on WhatsApp
        </button>
      </div>
    </div>
  </div>`;
}

function dealCardHTML(d){
  return `
  <div class="deal-card" data-deal="${d.id}">
    <h3 class="deal-title">${d.title}</h3>
    <p class="deal-desc">${d.description}</p>
    <div class="deal-price-box"><span class="only">Only</span><span class="amt">Rs. ${d.price}</span></div>
    <button class="btn btn-whatsapp" data-action="order-deal-whatsapp" data-deal="${d.id}">
      <svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.696 4.607 1.898 6.472L4 29l7.72-1.865A11.94 11.94 0 0 0 16.001 27C22.63 27 28 21.627 28 15S22.63 3 16.001 3Zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.94 9.94 0 0 1-5.06-1.377l-.362-.213-4.583 1.108 1.137-4.464-.238-.377A9.94 9.94 0 0 1 6.001 15c0-5.523 4.477-10 10-10Zm-3.94 5.06c-.198-.005-.412-.003-.63.001-.218.005-.573.083-.874.41-.302.328-1.152 1.126-1.152 2.745 0 1.62 1.18 3.184 1.343 3.404.163.22 2.26 3.653 5.59 4.973 2.766 1.096 3.33.878 3.93.822.6-.055 1.937-.79 2.21-1.554.271-.764.271-1.42.19-1.555-.082-.135-.3-.216-.628-.379-.328-.163-1.937-.956-2.237-1.065-.3-.11-.518-.163-.736.163-.218.328-.844 1.065-1.035 1.283-.19.219-.382.246-.71.083-.328-.164-1.384-.51-2.636-1.626-.975-.867-1.632-1.936-1.823-2.264-.19-.328-.02-.505.144-.668.148-.147.328-.383.492-.574.163-.19.218-.328.327-.546.11-.219.055-.41-.027-.573-.082-.164-.712-1.782-1.001-2.437-.257-.586-.523-.61-.72-.62Z"/></svg>
      Order This Deal
    </button>
  </div>`;
}

/*  HOME  */
function renderHome(){
  const popular = MENU.filter(p => POPULAR_NAMES.includes(p.nameEn));
  return `
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-badge"><span class="pulse-dot"></span> Open Every Day 12pm - 2am</div>
      <h1>Fresh, Hot &amp;<br><span class="accent-word">Delivered
        <svg class="hero-underline" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" stroke-width="4"/></svg>
      </span></h1>
      <p class="lead">Ghaseet Pura's favorite pizza spot since 2026. Taking pride in every slice, every roll, every bite.</p>
      <div class="hero-ctas">
        <a href="#/menu" data-link class="btn btn-primary">Order Now →</a>
        <a href="#/deals" data-link class="btn btn-outline">View Deals</a>
      </div>
    </div>
  </section>

  <section class="block on-card">
    <div class="container">
      <div class="section-head">
        <div>
          <h2>Our Menu</h2>
          <p>Explore our wide range of delicious offerings</p>
        </div>
        <a href="#/menu" data-link class="see-all">See All →</a>
      </div>
      <div class="grid grid-5">
        ${CATEGORIES.slice(1).map(cat => `
          <a href="#/menu" data-link data-category="${cat}" class="category-card"><h3>${cat}</h3></a>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div class="section-centered">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>
        <h2>Customer Favorites</h2>
        <p>The most loved items by our community.</p>
      </div>
      <div class="grid grid-4">
        ${popular.map(productCardHTML).join('')}
      </div>
    </div>
  </section>

  <section class="block on-card">
    <div class="container">
      <div class="section-centered">
        <h2 class="text-stroke" style="color:var(--primary);">Mega Deals</h2>
        <p style="font-weight:700; color:var(--foreground); font-size:19px;">Unbeatable value, unforgettable taste.</p>
      </div>
      <div class="grid grid-3">
        ${DEALS.map(dealCardHTML).join('')}
      </div>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div class="grid grid-3" style="max-width:1000px; margin:0 auto;">
        <div class="info-card">
          <div class="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div>
          <h3>Fast Delivery</h3>
          <p>Hot food at your doorstep in 30-45 minutes. Rs. 50 flat delivery charge.</p>
        </div>
        <div class="info-card">
          <div class="info-icon gold"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z"/></svg></div>
          <h3>Service Area</h3>
          <p>Serving Ghaseet Pura and surrounding areas with love.</p>
        </div>
        <div class="info-card">
          <div class="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9"/></svg></div>
          <h3>Quality First</h3>
          <p>Fresh dough made daily, premium ingredients, and 100% real cheese.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="block on-card">
    <div class="container">
      <h2 style="text-align:center; text-transform:uppercase; letter-spacing:.06em; font-size:clamp(28px,5vw,42px); margin-bottom:56px;">What Locals Say</h2>
      <div class="grid grid-3" style="max-width:1100px; margin:0 auto;">
        ${REVIEWS.map(r => `
          <div class="review-card">
            <div class="review-stars">${starsHTML(r.rating)}</div>
            <p class="review-text">"${r.text}"</p>
            <div class="review-name">${r.name}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;
}

/*  MENU  */
let activeCategory = "All";
function renderMenu(){
  const filtered = activeCategory === "All" ? MENU : MENU.filter(p => p.category === activeCategory);
  return `
  <div class="page-header">
    <div class="container">
      <h1>Our Menu</h1>
      <p>Everything is prepared fresh to order using the finest ingredients.</p>
    </div>
  </div>
  <div class="container">
    <div class="tabs hide-scrollbar">
      ${CATEGORIES.map(c => `<button class="tab-btn ${c===activeCategory?'active':''}" data-action="set-category" data-category="${c}">${c}</button>`).join('')}
    </div>
    <div class="grid grid-4" id="menuGrid">
      ${filtered.map(productCardHTML).join('')}
    </div>
    ${filtered.length===0 ? '<div class="empty-state">No items found in this category.</div>' : ''}
  </div>
  <div style="height:70px;"></div>
  `;
}

/*  DEALS  */
function renderDeals(){
  return `
  <div class="deals-hero">
    <img src="deals-banner.png" alt="Safa Marwa Deals">
    <div class="deals-hero-text">
      <h1 class="text-stroke">Hot Deals</h1>
      <p>Maximum flavor, minimum price.</p>
    </div>
  </div>
  <div class="container">
    <div class="grid grid-3" style="max-width:1100px; margin:0 auto;">
      ${DEALS.map(dealCardHTML).join('')}
    </div>
    <div class="combo-cta">
      <h2>Need a Custom Combo?</h2>
      <p>Throwing a party or hosting an event? Contact us on WhatsApp and we'll create a custom deal tailored for your gathering.</p>
      <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">Chat on WhatsApp</a>
    </div>
  </div>
  <div style="height:70px;"></div>
  `;
}

/*  ABOUT  */
function renderAbout(){
  return `
  <div class="container" style="padding-top:44px;">
    <div class="about-hero">
      <img src="logo.png" alt="Safa Marwa Logo">
      <h1>Our Story</h1>
      <p>Safa Marwa Pizza Point was established in 2026 by Mian Adeel with a simple vision: to bring premium, restaurant-quality fast food to the heart of Ghaseet Pura.</p>
    </div>

    <div class="about-split">
      <div class="about-visual"><h2>Taste the<br>Difference</h2></div>
      <div class="about-copy">
        <div style="margin-bottom:26px;">
          <h3>The Ghaseet Pura Standard</h3>
          <p>We believe that great food shouldn't be hard to find. We source local, fresh ingredients daily. Our dough is prepared every morning, and our special sauces are made in-house. We don't compromise on quality because our community deserves the best.</p>
        </div>
        <div style="margin-bottom:26px;">
          <h3>More Than Just Pizza</h3>
          <p>While pizza is in our name, our Shawarmas, Paratha Rolls, and Kabab items are legendary in the neighborhood. We blend modern fast-food techniques with rich Pakistani flavors to create something uniquely ours.</p>
        </div>
        <div class="about-quote">
          <p>"We don't just serve food, we serve happiness."</p>
          <span>— Mian Adeel, Founder</span>
        </div>
      </div>
    </div>

    <div class="grid grid-3" style="max-width:1000px; margin:0 auto 90px;">
      <div class="info-card">
        <div class="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 5.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.4-9.5 9-9.5 9Z"/></svg></div>
        <h3>Made with Love</h3>
        <p>Every order is crafted by people who care about what goes on your plate.</p>
      </div>
      <div class="info-card">
        <div class="info-icon gold"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 12 2 2 4-4"/><path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z"/></svg></div>
        <h3>100% Halal</h3>
        <p>Strictly verified halal ingredients sourced from trusted local suppliers.</p>
      </div>
      <div class="info-card">
        <div class="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div>
        <h3>Always Fresh</h3>
        <p>We never freeze our dough. Fresh ingredients mean a better tasting meal.</p>
      </div>
    </div>
  </div>
  `;
}

/*  CONTACT  */
function renderContact(){
  return `
  <div class="container" style="padding-top:44px; padding-bottom:70px;">
    <div class="page-header" style="padding-top:0;">
      <h1>Contact Us</h1>
      <p>Have a question, feedback, or a large order? Reach out to us.</p>
    </div>
    <div class="contact-grid">
      <div class="form-card">
        <h2>Send a Message</h2>
        <form id="contactForm">
          <div class="field">
            <label>Your Name</label>
            <input type="text" id="cName" placeholder="Ali Raza" required minlength="2">
          </div>
          <div class="field">
            <label>Phone Number</label>
            <input type="tel" id="cPhone" placeholder="0300 1234567" required minlength="10">
          </div>
          <div class="field">
            <label>Message</label>
            <textarea id="cMessage" placeholder="How can we help you?" required minlength="10"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Send Message</button>
        </form>
      </div>
      <div>
        <div class="contact-detail-card">
          <h2>Get In Touch</h2>
          <div class="contact-row">
            <div class="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg></div>
            <div><h3>Address</h3><p>Shell Petrol Pump,<br>69RB Ghaseet Pura</p></div>
          </div>
          <div class="contact-row">
            <div class="contact-icon gold"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.65a2 2 0 0 1-.45 2.11L8.1 9.7a16 16 0 0 0 6.2 6.2l1.22-1.22a2 2 0 0 1 2.11-.45c.86.31 1.75.53 2.65.65A2 2 0 0 1 22 16.92Z"/></svg></div>
            <div>
              <h3>Phone / WhatsApp</h3>
              <p>+92 307 3289332</p>
              <div class="contact-actions">
                <a href="tel:+923073289332" class="contact-call">Call Now</a>
                <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" class="contact-wa">
                  <svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2z"/></svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="contact-map">
          <div class="contact-map-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>
            <strong>Ghaseet Pura</strong>
            <span>Interactive map coming soon</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

/*  FAQ  */
function renderFAQ(){
  return `
  <div class="container" style="padding-top:44px; padding-bottom:70px;">
    <div class="page-header" style="padding-top:0;">
      <h1>FAQ</h1>
      <p>Common questions about ordering from Safa Marwa Pizza Point.</p>
    </div>
    <div class="faq-wrap">
      <div class="faq-card">
        ${FAQS.map((f,i) => `
          <div class="faq-item" data-index="${i}">
            <button class="faq-q" data-action="toggle-faq" data-index="${i}">
              <span>${f.q}</span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="faq-a">${f.a}</div>
          </div>
        `).join('')}
      </div>
      <div class="faq-cta">
        <p>Still have questions?</p>
        <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">Ask us on WhatsApp</a>
      </div>
    </div>
  </div>
  `;
}

/* ===================== CHECKOUT ===================== */
let checkoutDeliveryMethod = "Delivery";
let checkoutPaymentMethod = "Cash on Delivery";

function renderCheckout(){
  if(Cart.items.length === 0){
    return `
    <div class="container" style="padding:100px 20px; text-align:center;">
      <h1 style="font-size:34px; margin-bottom:16px;">Your cart is empty</h1>
      <p style="color:var(--muted-foreground); margin-bottom:24px;">Add something delicious before checking out.</p>
      <a href="#/menu" data-link class="btn btn-primary">Go to Menu</a>
    </div>`;
  }

  const t = Cart.totals();
  const actualDeliveryFee = checkoutDeliveryMethod === "Pickup" ? 0 : t.deliveryFee;
  const actualTotal = t.subtotal + actualDeliveryFee;

  return `
  <div class="container" style="padding-top:36px; padding-bottom:80px; max-width:1200px;">
    <a href="#/menu" data-link class="checkout-back">← Back to Menu</a>
    <h1 class="checkout-title">Checkout</h1>
    <div class="checkout-grid">
      <div class="checkout-form-card">
        <form id="checkoutForm">
          <div class="checkout-section">
            <h2>1. Contact Info</h2>
            <div class="field-grid">
              <div class="field"><label>Full Name *</label><input type="text" id="fullName" required minlength="2"></div>
              <div class="field"><label>Mobile Number *</label><input type="tel" id="mobile" placeholder="03XX XXXXXXX" required minlength="11"></div>
            </div>
            <div class="field"><label>WhatsApp Number (Optional)</label><input type="tel" id="whatsappNum" placeholder="Same as mobile if empty"></div>
          </div>

          <div class="checkout-section">
            <h2>2. Delivery Method</h2>
            <div class="choice-grid">
              <label class="choice-pill ${checkoutDeliveryMethod==='Delivery'?'checked':''}">
                <input type="radio" name="deliveryMethod" value="Delivery" data-action="set-delivery-method" ${checkoutDeliveryMethod==='Delivery'?'checked':''}>
                <span class="label">Delivery</span><span class="note">Rs. 50 Charge</span>
              </label>
              <label class="choice-pill ${checkoutDeliveryMethod==='Pickup'?'checked':''}">
                <input type="radio" name="deliveryMethod" value="Pickup" data-action="set-delivery-method" ${checkoutDeliveryMethod==='Pickup'?'checked':''}>
                <span class="label">Pickup</span><span class="note">Free</span>
              </label>
            </div>
          </div>

          <div class="checkout-section" id="addressSection" ${checkoutDeliveryMethod!=='Delivery'?'style="display:none;"':''}>
            <h2>3. Address</h2>
            <div class="field"><label>Complete Address *</label><input type="text" id="address" placeholder="Street, House No, etc."></div>
            <div class="field-grid">
              <div class="field"><label>City/Area *</label><input type="text" id="city" value="Ghaseet Pura"></div>
              <div class="field"><label>Nearest Landmark (Optional)</label><input type="text" id="landmark"></div>
            </div>
          </div>

          <div class="checkout-section">
            <h2>4. Payment &amp; Notes</h2>
            <div class="choice-grid four" style="margin-bottom:20px;">
              ${["Cash on Delivery","Bank Transfer","JazzCash","Easypaisa"].map(m => `
                <label class="choice-pill small ${checkoutPaymentMethod===m?'checked':''}">
                  <input type="radio" name="paymentMethod" value="${m}" data-action="set-payment-method" ${checkoutPaymentMethod===m?'checked':''}>
                  <span class="label">${m}</span>
                </label>
              `).join('')}
            </div>
            <div class="field"><label>Order Notes (Optional)</label><textarea id="notes" placeholder="Less spicy, extra ketchup, etc."></textarea></div>
          </div>

          <p class="err" id="checkoutError" style="display:none; margin-bottom:16px;"></p>
          <button type="submit" class="btn btn-primary btn-block" style="padding:18px;">Place Order (Rs. ${actualTotal})</button>
        </form>
      </div>

      <div class="summary-card">
        <h2>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--primary);"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
          Order Summary
        </h2>
        <div class="summary-items">
          ${Cart.items.map(item => `
            <div class="summary-item">
              <div class="summary-item-left">
                <div class="summary-thumb"><img src="${item.image}" alt="${item.name}"></div>
                <div>
                  <div class="summary-name">${item.quantity}x ${item.name}</div>
                  ${item.size ? `<div class="summary-size">${item.size}</div>` : ''}
                </div>
              </div>
              <div style="font-weight:700;">${money(item.price*item.quantity)}</div>
            </div>
          `).join('')}
        </div>
        <div class="summary-totals">
          <div class="summary-row"><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
          <div class="summary-row"><span>Delivery (${checkoutDeliveryMethod})</span><span>${actualDeliveryFee===0?'Free':money(actualDeliveryFee)}</span></div>
          <div class="summary-row grand"><span>Total</span><span class="amt">${money(actualTotal)}</span></div>
        </div>
      </div>
    </div>
  </div>
  `;
}

/*  ORDER CONFIRMATION  */
function renderConfirmation(){
  let orderData = null;
  try{ orderData = JSON.parse(localStorage.getItem('safaMarwaLastOrder')); }catch(e){}

  if(!orderData){
    return `
    <div class="confirm-empty">
      <h1>No Recent Order Found</h1>
      <a href="#/menu" data-link>Go to Menu</a>
    </div>`;
  }

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderData.whatsappMessage)}`;

  return `
  <div class="container">
    <div class="confirm-wrap">
      <div class="confirm-card">
        <div class="confirm-hero">
          <div class="confirm-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 13 4 4L19 7"/></svg></div>
          <h1>Thank You!</h1>
          <p>Almost there...</p>
        </div>
        <div class="confirm-body">
          <p>Your order details are ready. To complete the process and confirm your order, please send these details to our WhatsApp number.</p>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding:18px 34px; font-size:16px;">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width:22px;height:22px;"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2z"/></svg>
            Send Order on WhatsApp
          </a>

          <div class="confirm-order-box">
            <div class="confirm-order-head">
              <div>
                <div class="confirm-label">Order ID</div>
                <div class="confirm-order-id">${orderData.orderId}</div>
              </div>
              ${orderData.customer.deliveryMethod === "Delivery" ? `
              <div>
                <div class="confirm-label">Est. Delivery</div>
                <div class="confirm-eta">30 - 45 Mins</div>
              </div>` : ''}
            </div>
            <div class="confirm-items-label">🛍 Order Details</div>
            <div class="confirm-items">
              ${orderData.items.map(item => `
                <div class="confirm-item-row">
                  <div><strong>${item.quantity}x</strong> ${item.name} ${item.size ? `(${item.size})` : ''}</div>
                  <div style="font-weight:700;">${money(item.price*item.quantity)}</div>
                </div>
              `).join('')}
            </div>
            <div class="confirm-totals">
              <div class="row"><span>Subtotal</span><span>${money(orderData.subtotal)}</span></div>
              <div class="row"><span>Delivery Fee</span><span>${orderData.deliveryFee===0?'Free':money(orderData.deliveryFee)}</span></div>
              <div class="row grand"><span>Grand Total</span><span class="amt">${money(orderData.total)}</span></div>
            </div>
          </div>

          <a href="#/" data-link class="confirm-home-link">Return to Home →</a>
        </div>
      </div>
    </div>
  </div>
  `;
}
