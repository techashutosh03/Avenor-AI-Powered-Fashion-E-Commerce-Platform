const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const productGroups = {
    flashDeals: [
        { name: "Samsung Galaxy S24", category: "Mobiles", price: "₹54,999", rating: "4.6", emoji: "📱", discount: "18% OFF" },
        { name: "Nike Air Max Sneakers", category: "Fashion", price: "₹7,499", rating: "4.5", emoji: "👟", discount: "22% OFF" },
        { name: "Gaming Headset RGB Pro", category: "Gaming", price: "₹2,499", rating: "4.4", emoji: "🎧", discount: "35% OFF" },
        { name: "Luxury Oud Perfume", category: "Beauty", price: "₹3,999", rating: "4.7", emoji: "🧴", discount: "15% OFF" }
    ],
    trendingProducts: [
        { name: "iPhone 15 Pro", category: "Mobiles", price: "₹1,29,900", rating: "4.8", emoji: "📱", discount: "Trending" },
        { name: "MacBook Air M3", category: "Laptops", price: "₹1,14,900", rating: "4.9", emoji: "💻", discount: "Top Pick" },
        { name: "Smart Watch Elite", category: "Luxury", price: "₹18,999", rating: "4.5", emoji: "⌚", discount: "Hot" },
        { name: "Wireless Keyboard Pro", category: "Gaming", price: "₹4,299", rating: "4.3", emoji: "⌨️", discount: "New" }
    ],
    recommendedProducts: [
        { name: "Gaming Laptop RTX 4050", category: "Laptops", price: "₹69,990", rating: "4.6", emoji: "💻", discount: "AI Pick" },
        { name: "Premium Leather Backpack", category: "Accessories", price: "₹5,499", rating: "4.4", emoji: "🎒", discount: "AI Pick" },
        { name: "Noise Cancelling Earbuds", category: "Electronics", price: "₹3,999", rating: "4.5", emoji: "🎵", discount: "AI Pick" },
        { name: "Men's Maroon Blazer", category: "Fashion", price: "₹6,999", rating: "4.7", emoji: "🧥", discount: "AI Pick" }
    ],
    electronicsProducts: [
        { name: "Sony 4K Smart TV", category: "Electronics", price: "₹52,999", rating: "4.7", emoji: "📺", discount: "Best Value" },
        { name: "Canon Mirrorless Camera", category: "Electronics", price: "₹72,999", rating: "4.8", emoji: "📷", discount: "Creator" },
        { name: "Tablet Pro 11 inch", category: "Electronics", price: "₹39,999", rating: "4.5", emoji: "📲", discount: "Popular" },
        { name: "Bluetooth Speaker Max", category: "Electronics", price: "₹5,999", rating: "4.4", emoji: "🔊", discount: "Top Rated" }
    ],
    luxuryProducts: [
        { name: "White Gold Minimal Watch", category: "Luxury", price: "₹42,999", rating: "4.8", emoji: "⌚", discount: "Luxury" },
        { name: "Designer Evening Perfume", category: "Luxury", price: "₹9,999", rating: "4.7", emoji: "💎", discount: "Premium" },
        { name: "Italian Leather Wallet", category: "Luxury", price: "₹8,499", rating: "4.6", emoji: "👛", discount: "Luxury" },
        { name: "Signature Sunglasses", category: "Luxury", price: "₹12,999", rating: "4.5", emoji: "🕶️", discount: "Premium" }
    ],
    recentProducts: [
        { name: "Ergonomic Office Chair", category: "Home", price: "₹11,999", rating: "4.3", emoji: "🪑", discount: "Viewed" },
        { name: "Skincare Gift Kit", category: "Beauty", price: "₹2,299", rating: "4.4", emoji: "💄", discount: "Viewed" },
        { name: "Running Shoes Flex", category: "Fashion", price: "₹4,999", rating: "4.2", emoji: "👟", discount: "Viewed" },
        { name: "Smart Home Lamp", category: "Home", price: "₹1,999", rating: "4.3", emoji: "💡", discount: "Viewed" }
    ]
};

function createProductCard(product) {
    return `
        <article class="product-card tilt-card reveal">
            <div class="product-image">
                <span class="discount-badge">${product.discount}</span>
                <button class="wishlist" aria-label="Add ${product.name} to wishlist">♡</button>
                <div class="product-emoji">${product.emoji}</div>
            </div>
            <div class="product-info">
                <p class="label">${product.category}</p>
                <h3>${product.name}</h3>
                <p class="rating">★ ${product.rating} rating</p>
                <div class="price-row">
                    <strong>${product.price}</strong>
                    <button type="button">Add</button>
                </div>
            </div>
        </article>
    `;
}

Object.entries(productGroups).forEach(([sectionId, products]) => {
    const container = document.getElementById(sectionId);
    if (container) {
        container.innerHTML = products.map(createProductCard).join("");
    }
});

document.querySelectorAll(".category-card, .bento-card, .product-card").forEach((el) => {
    el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

function attachTiltCards() {
    document.querySelectorAll(".tilt-card").forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateX = ((y / rect.height) - 0.5) * -8;
            const rotateY = ((x / rect.width) - 0.5) * 8;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
        });
    });
}

attachTiltCards();

document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    document.querySelectorAll(".spatial-layer").forEach((layer) => {
        const depth = Number(layer.dataset.depth || 10);
        layer.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });
});

function initParticles() {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    const particles = [];
    const count = 90;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.4,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            a: Math.random() * 0.55 + 0.15
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.a})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

function initMarketplace3D() {
    const canvas = document.getElementById("marketCanvas");
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 1.1, 7);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const maroonLight = new THREE.PointLight(0x8f1d2d, 3, 9);
    maroonLight.position.set(-3, 2, 3);
    scene.add(maroonLight);

    const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f4f4, metalness: 0.3, roughness: 0.25 });
    const maroonMaterial = new THREE.MeshStandardMaterial({ color: 0x5b101b, metalness: 0.3, roughness: 0.32 });
    const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x070707, metalness: 0.45, roughness: 0.3 });
    const silverMaterial = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, metalness: 0.8, roughness: 0.18 });

    const group = new THREE.Group();

    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.18, 48), blackMaterial);
    base.position.y = -1.65;
    group.add(base);

    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.35, 1.35), maroonMaterial);
    cube.rotation.set(0.35, 0.55, 0.2);
    cube.position.y = 0.15;
    group.add(cube);

    const screen = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.05, 0.08), whiteMaterial);
    screen.position.set(-1.55, 0.25, 0.25);
    screen.rotation.y = 0.48;
    group.add(screen);

    const screenInner = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.78, 0.085), blackMaterial);
    screenInner.position.set(-1.53, 0.25, 0.31);
    screenInner.rotation.y = 0.48;
    group.add(screenInner);

    const phone = new THREE.Mesh(new THREE.BoxGeometry(0.58, 1.25, 0.08), silverMaterial);
    phone.position.set(1.55, 0.2, 0.15);
    phone.rotation.y = -0.52;
    group.add(phone);

    const phoneScreen = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.02, 0.085), blackMaterial);
    phoneScreen.position.set(1.54, 0.2, 0.2);
    phoneScreen.rotation.y = -0.52;
    group.add(phoneScreen);

    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(2.25, 0.012, 12, 120),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 })
    );
    ring1.rotation.x = Math.PI / 2.4;
    group.add(ring1);

    const ring2 = ring1.clone();
    ring2.rotation.y = Math.PI / 2.6;
    ring2.material = new THREE.MeshBasicMaterial({ color: 0x8f1d2d, transparent: true, opacity: 0.32 });
    group.add(ring2);

    const smallItems = [
        [-2.0, -0.9, 0.5],
        [2.1, -0.85, -0.2],
        [0.2, 1.65, -0.35],
        [0.95, 1.08, 0.85]
    ];

    smallItems.forEach((pos, index) => {
        const mesh = new THREE.Mesh(
            index % 2 === 0 ? new THREE.SphereGeometry(0.18, 24, 24) : new THREE.BoxGeometry(0.3, 0.3, 0.3),
            index % 2 === 0 ? silverMaterial : maroonMaterial
        );

        mesh.position.set(pos[0], pos[1], pos[2]);
        group.add(mesh);
    });

    const dotsGeometry = new THREE.BufferGeometry();
    const dotsCount = 400;
    const positions = new Float32Array(dotsCount * 3);

    for (let i = 0; i < dotsCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 6;
        positions[i + 1] = (Math.random() - 0.5) * 6;
        positions[i + 2] = (Math.random() - 0.5) * 6;
    }

    dotsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const dots = new THREE.Points(
        dotsGeometry,
        new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.025,
            transparent: true,
            opacity: 0.45
        })
    );

    scene.add(dots);
    scene.add(group);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 0.35;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 0.25;
    });

    function resizeRenderer() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", resizeRenderer);

    function animate() {
        requestAnimationFrame(animate);

        group.rotation.y += 0.006;
        group.rotation.x += (mouseY - group.rotation.x) * 0.03;
        group.position.x += (mouseX - group.position.x) * 0.03;

        ring1.rotation.z += 0.006;
        ring2.rotation.x += 0.004;
        dots.rotation.y -= 0.0018;

        renderer.render(scene, camera);
    }

    resizeRenderer();
    animate();
}

initParticles();
initMarketplace3D();
