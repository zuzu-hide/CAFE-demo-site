//カート管理クラス
class ShoppingCart {
    constructor() {
        this.updateCartCount = this.updateCartCount.bind(this);
        this.items = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        const saved = localStorage.getItem('smeag-cafe-cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('smeag-cafe-cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(product) {
        const exisiting = this.items.find(item => item.name === product.name);

        if (exisiting) {
            exisiting.quantity += 1;
        } else {
            this.items.push ({
                name: product.name,
                nameEn: product.nameEn,
                price: product.price,
                quantity: 1,
            });
        }

        this.saveCart();
        this.showNotification(`${product.name}をカートに追加しました`)
    }

    //カートから削除
    removeItem (productName) {
        this.items = this.items.filter(item => item.name !== productName);
        this.saveCart();
    }

    //数量を更新
    updateQuantity(productName, newQuantity) {
        const item = this.items.find(item => item.name === productName);
        if (!item) return;
        item.quantity = Number(newQuantity);
    }

    //合計金額を計算
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    //カート内の商品数を更新
    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const badges = document.querySelectorAll('.cart-badge');
        const countTexts = document.querySelectorAll(".cart-count-text");

        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display =  '';
        });

        countTexts.forEach(text => {
            text.textContent = `${count}`;
        });
    }

    //カート内のすべての商品の合計金額
    updateCartSummary() {
        const subtotalEl = document.getElementById("cart-subtotal");
        const totalEl = document.getElementById("cart-total");

        if (!subtotalEl || !totalEl) return;

        const total = this.getTotal();
        subtotalEl.textContent = `₱${total}`;
        totalEl.textContent = `₱${total}`;
    };

    // 通知を表示
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }

    //カートをクリア
    clear() {
        this.items = [];
        this.saveCart();
    }

    //カートがからかチェック
    isEmpty() {
        return this.items.length === 0;
    }

    renderCartItems(containerSelector) {
        const emptyEl = document.getElementById("cartEmpty");
        const container = document.querySelector(containerSelector);
            if(!container || !emptyEl) return;

            container.innerHTML = "";

            if (this.items.length === 0) {
                emptyEl.style.display = "block";
                container.style.display = "none";
                return;
            };

            emptyEl.style.display = "none";
            container.style.display = "block";

            this.items.forEach(item => {
                const div = document.createElement("div"); // <- 正しいスペル
                div.className = "cart-item";
                div.innerHTML = `
                    <div class="item-info">
                        <p class="item-name">${item.name}</p>
                        <p class="item-name-en">${item.nameEn || item.name}</p>
                        <p class="item-price">₱${item.price}</p>
                    </div>
                    <div class="item-controls">
                        <div class="quantity-control">
                            <button class="qty-btn decrease">-</button>
                            <input type="text" value="${item.quantity}" class="quantity-input" readonly>
                            <button class="qty-btn add">+</button>
                        </div>
                        <div class="quantity-control">
                            <button class="qty-btn delete">削除</button>
                        </div>
                        <span class="item-subtotal">小計:₱${item.price * item.quantity}</span>
                    </div>
                `;
                container.appendChild(div);
            
                //カートの数量の加減
                const addBtn = div.querySelector(".qty-btn.add");
                const decreaseBtn = div.querySelector(".qty-btn.decrease");
                const deleteBtn = div.querySelector(".qty-btn.delete");
                

                addBtn.addEventListener("click", () => {
                    this.updateQuantity(item.name, item.quantity + 1);
                    this.saveCart();
                    this.renderCartItems(containerSelector);
                });
                decreaseBtn.addEventListener("click", () => {
                    if (item.quantity <= 1) return; 
                    this.updateQuantity(item.name, item.quantity - 1);
                    this.saveCart();
                    this.renderCartItems(containerSelector);
                });
                deleteBtn.addEventListener("click", () => {
                    this.removeItem(item.name);
                    this.renderCartItems(containerSelector);
                });                
            });

            const clearBtn = document.getElementById("clearBtn");
            if (clearBtn) {
                clearBtn.onclick = () => {
                    this.clear();
                    this.renderCartItems(containerSelector);
                };
            };

            this.updateCartSummary();
    }
}
const cart = new ShoppingCart();
window.cart = cart;


