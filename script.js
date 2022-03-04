$.get("product-list.json", function (data) {
    debugger
    var categories = data.responses[0][0].params.userCategories
    var products =  data.responses[0][0].params.recommendedProducts


    categories.forEach(function (item) {
        var lastItem = item.split(' > ');

        var template = `<li class='item' data-attribute="${item}"> ${lastItem[lastItem.length-1]} </li>`
        jQuery('.categories').append(template)
    })

    var first =  products['Size Özel'];

    var productsFirstTemplate = '';
    first.forEach(function(item){
        var productTemplate = `<div>${item.name}</div>`
        productsFirstTemplate = productsFirstTemplate.concat(productTemplate)
    })
    jQuery('.products').html(productsFirstTemplate);

    jQuery('li.item').click(function(){
        var selectedCategory = jQuery(this).attr('data-attribute');
        var selectedProducts = products[selectedCategory];
        var productsTemplate = '';
        selectedProducts.forEach(function(item){
            debugger

            var productTemplate = `
            <div class="product-wrapper">
                <div class="product-name">${item.name}</div> 
                <div class="product-price">${item.price}</div> 
            </div>
            `
            productsTemplate = productsTemplate.concat(productTemplate)
        })
        jQuery('.products').html(productsTemplate)
        $('.products').slick('refresh');
    })
    $('.products').slick({});

    
})