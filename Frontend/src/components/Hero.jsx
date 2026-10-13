function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero-content">
                <p className="subtitle">Welcome to Foodie!</p>
                <h1> Delicious Food, <br/><span>Delivered to You</span> </h1>
                <p className="description">Experience the best culinary delights from the comfort of your home. Order now and enjoy a feast!</p>
                <div className="hero-buttons">
                    <button className="menu-btn">Explore Menu</button>
                    <button className="order-btn">Order Now</button>
                </div>
            </div>
        </section>
    );
}

export default Hero;
