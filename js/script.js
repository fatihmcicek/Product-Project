$.get("sample_products.txt", function (data) {

    var veri = JSON.parse(data);
    var divAp = $(".container"),
        product = "";

    $.each(veri, function (index, data) {

        var discount = "";
        var likeCount = "";
        var isNew = "";
        var oldPricePush = "";
        var basePrice = "";


        /* Discount Control */
        if (data.oldPrice > 0) {

            discount = Math.abs(Math.round(((data.price - data.oldPrice) / data.oldPrice) * 100));
        } else {
            discount = "hidden";
        }

        /* Likecount Control */
        if (typeof data.params === 'undefined') {
            likeCount = "hidden";
        } else {
            if (data.params.likeCount > 0) {
                likeCount = data.params.likeCount;
            } else {
                likeCount = "hidden";
            }
        }

        /* Isnew Control */
        if (typeof data.params === "undefined") {
            isNew = "hidden";
        } else {
            if (data.params.isNew == "true") {
                isNew = "NEU";
            } else {
                isNew = "hidden";
            }
        }

        /* Oldprice Control */
        if (data.oldPrice === 'undefined') {
            oldPricePush = "hidden";
        } else {
            if (data.oldPrice > 0) {
                oldPricePush = data.oldPrice;
            } else {
                oldPricePush = "hidden";
            }
        }

        /* Baseprice Control */
        if (typeof data.params === 'undefined') {
            basePrice = "hidden";
        } else {
            basePrice = data.params.basePrice;
        }


        /* ParamStatemenet Short If Section */
        var paramsStatement = "";
        var separator = " | ";
        if (typeof data.params != 'undefined') {
            paramsStatement = data.params.land != "" ? paramsStatement = data.params.land : paramsStatement;
            paramsStatement = data.params.region != "" ? paramsStatement + (separator + data.params.region) : paramsStatement;
            paramsStatement = data.params.art != "" ? paramsStatement += (separator + data.params.art) : paramsStatement;
            paramsStatement = data.params.rebsorte != "" ? paramsStatement += (separator + data.params.rebsorte) : paramsStatement;
        }



        product += '<li>\
        <div class="product">\
            <div class="image">\
                 <div class="images">\
                    <img src="' + data.imageS + '" alt=""\
                    srcset="" ">\
                </div>\
            <div class="badges">\
                <div class="discount fonts" ' + discount + '><span>' + discount + ' %</span></div>\
                <div class="likeCount fonts" ' + likeCount + '><span>' + likeCount + ' ♥</span></div>\
                <div class="isNew fonts" ' + isNew + '><span>' + isNew + '</span></div>\
            </div>\
            </div>\
                <div class="names">\
                <div class="name" ' + data.name + '><span>' + data.name + '</span></div>\
            </div>\
            <div class="params">\
                <span>' + paramsStatement + '</span>\
            </div>\
            <div class="priceMain">\
                <div class="price" ' + data.priceText + '><span>' + data.priceText.slice(1) + " €* " + '</span></div>\
                <div class="oldPrice" ><span ' + oldPricePush + ' >' + oldPricePush + " €* " + '</span></div>\
            </div>\
            <div class="divBasePrice" id="basePrice' + index + '" ' + basePrice + ' >' + basePrice + '</div>\
        </div>\
        </li>'
    })


    var widgets = "";
    for (i = 0; i < 3; i++) {
        widgets += '<div class="productsContainer owl-carousel">' + product + '</div>'
    }

    divAp.append(widgets);


    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,



        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }

    })



})