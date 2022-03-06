var products = [];
jQuery.get('product-list.json', function (data) {
    try {
        let categories = data.responses[0][0].params.userCategories
        products = data.responses[0][0].params.recommendedProducts

        categories.forEach(function (item, index) {
            let lastItem = item.split(' > ');
            let template = `
            <li class="navbar__item ${index==0 ? "navbar__item-active": "" } " data-attribute="${item}">
                <span class="navbar__item-link"> ${lastItem[lastItem.length-1]} </span> 
             </li>
            `
            jQuery('.navbar__ul').append(template)
        });

        // init first category
        productsInit(Object.keys(products)[0]);
    } catch (error) {
        // error
    }
})

// products template
function productsInit(category) {
    let activeProducts = products[category];
    let productTemplate = '';
    activeProducts.forEach(function (item) {
        let product = `              
        <div class="product-card">
            <div class="product-card__content">
                <div class="product-card__image">
                    <img src="${item.image}" alt="" loading="lazy" />
                </div>

                <div class="product-card__title">
                    <h4>
                        ${item.name}
                    </h4>
                </div>

                <div class="product-card__price">
                    ${item.priceText}
                </div>

                ${item.params.shippingFee === "FREE" ? `               
                <div class="product-card__shipment">
                <img src="assets/icons/truck.svg" class="product-card__truck" alt="Truck" />
                <h4 class="product-card__shipment-text">
                    Ücretsiz Kargo
                </h4>
            </div>`:``}

                <div class="product-card__actions">
                    <button class="btn btn--basket">
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </div>
        `
        productTemplate = productTemplate.concat(product)
    })
    jQuery('.products').html(productTemplate);
    sliderInit();
}

// catch on category click
jQuery(document).on('click', 'li.navbar__item', function () {
    try {
        jQuery('li.navbar__item').removeClass('navbar__item-active');
        jQuery(this).addClass('navbar__item-active');

        var selectedCategory = jQuery(this).attr('data-attribute');
        jQuery('.products').slick('unslick');
        productsInit(selectedCategory);
    } catch (error) {
        // error
    }
})


// init slider
function sliderInit() {
    jQuery('.btn--right, .btn--left').show()
    jQuery('.products').slick({
        lazyLoad: 'ondemand',
        dots: false,
        infinite: false,
        slidesToShow: 4.3,
        slidesToScroll: 4,
        arrow: false,
        prevArrow: jQuery('.btn--left'),
        nextArrow: jQuery('.btn--right'),
        responsive: [{
                breakpoint: 1324,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2.3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2.3,
                    slidesToScroll: 2
                }
            }
        ]
    });
}

// snackbar show
jQuery(document).on('click', '.btn--basket', function () {
    jQuery('#snackbar').addClass('show');
    setTimeout(function () {
        jQuery('#snackbar').removeClass('show');
    }, 3000);
});

// snackbar close
jQuery(document).on('click', '.snackbar__btn-exit', function () {
    jQuery('#snackbar').removeClass('show');
})