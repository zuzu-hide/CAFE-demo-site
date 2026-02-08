//カート管理クラス
class ShoppingCart {
    constructor() {
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
    updateQuantity(productName, quantity) {
        const item = this.items.find(item => item.name === productName);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productName);
            } else {
                this.saveCart();
            }
        }
    }

    //合計金額を計算
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    //カート内の商品数を更新
    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const badges = document.querySelectorAll('.cart-badge');

        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-flex' : 'none';
        })
    }

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

}
const cart = new ShoppingCart();
