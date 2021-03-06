if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function format_fiat(num) {
    return numberWithCommas(num.toFixed(2));
}

function format_crypto(num) {
    return numberWithCommas(num.toPrecision(6));
}

function clean_number(num) {
    return num.replace(/,/g, '');
}

function update_overall_fiat_total() {
    // Get the totals from each wallet and add them up.
    // Stick that number into the DOM.
    var total = 0;
    var failures_detected = false;
    $(".wallet-total-fiat").each(function(i, element) {
        var number_with_commas = $(element).html();
        //console.log("-----", number_with_commas);
        total += Number(clean_number(number_with_commas));
    });
    var with_commas = total.toLocaleString();
    $("title").text(with_commas + " - CryptoCollector");
    $("#total-fiat-amount").html(with_commas);

    if($('.price-fail').length) {
        $("#failures-detected").show();
    }
    console.log("updated overall totals")
}
function update_address_balance(js_id, data) {
    // from a dict of new prices for an address, update the DOM
    // gets called after ajax call to get updated price.
    // Updates the wallet crypto value, and fiat value.
    var crypto_symbol = data['crypto_symbol'].toLowerCase();
    var num = $(".wallet-" + crypto_symbol + " .fiat-exchange-rate").first().text()

    var num_exchange = Number(num);

    var fiat_value = format_fiat(num_exchange * data.wallet_value);
    var wallet_value = numberWithCommas(data.wallet_value);

    $("#" + js_id + " .address-value").html(wallet_value);
    $("#" + js_id + " .address-fiat-value").html(fiat_value);

    update_wallet_total(crypto_symbol);
}

function update_wallet_total(crypto_symbol) {
    // for a passed in crypto-symbol ('btc', 'ltc', etc) add up
    // all addresses, and then put that into the header.
    var crypto_symbol = crypto_symbol.toLowerCase()
    var wallet = $('.wallet-' + crypto_symbol);
    var addresses = wallet.find('.address-value');
    var wallet_total = 0;

    $.each(addresses, function(i, address) {
        var num = $(address).text();
        var cleaned = clean_number(num);
        wallet_total += Number(cleaned);
    });
    wallet.find('.wallet-total-crypto').text(format_crypto(wallet_total));

    var exchange_rate = clean_number(
        $('.wallet-' + crypto_symbol).find('.fiat-exchange-rate').first().text()
    );

    var fiat_total = exchange_rate * wallet_total;
    wallet.find('.wallet-total-fiat').text(format_fiat(fiat_total));
}

function update_wallet_exchange_rate(crypto_symbol, data) {
    // data is the response from the /wallets/get_exchange_rate api call.
    var crypto_symbol = crypto_symbol.toLowerCase();
    var wallet_element = $('.wallet-' + crypto_symbol);

    var rate = data['exchange_rate'];

    if(rate == 0) {
        wallet_element.find('.fiat-exchange-status').html("<span class='price-fail'>&#9888; Price service not available</span>");
        wallet_element.find('.fiat-exchange-units').hide();
        wallet_element.find('.fiat-exchange-rate').text(0).hide();
        wallet_element.find('.fiat-exchange-small-status').html("<span class='price-fail'>&#9888;</span>");
    } else {
        var source = '(via ' + data['price_source'] + ")";
        wallet_element.find('.fiat-exchange-source').text(source);
        wallet_element.find('.fiat-exchange-rate').text(rate);
    }
}

function make_tx_html(transaction, cardinal, crypto_symbol) {
    // Make the html for a single transaction.
    // The caller of this function needs to place it in the DOM.
    var time_utc = new Date(transaction['date']);
    var amount = Number(transaction['amount']);
    var txid = transaction['txid'];
    var fiat_symbol = transaction['fiat_symbol'];
    var historical = transaction['historical_price'];
    var h_price = historical[0];
    var h_source = historical[1];
    var h_date = new Date(historical[2]).toDateString();
    var abs_amount = Math.abs(amount);
    var source = h_source + ': ' + h_price;
    var external_link = "<a target='_blank' href='" + get_tx_external_link(crypto_symbol, txid) + "'>BE</a>";

    if(amount < 0) {
        var verb = 'Sent';
    } else {
        var verb = "Received";
    }

    return String.format(
        "<tr class='transaction'>" +
            "<td>{0}</td>" +
            "<td class='date'>" +
                "<span class='date'>{1}</span>" +
                "<span class='time-ago'> ({2} ago)</span>" +
            "</td>" +
            "<td class='verb {3}'>{3}</td>" +
            "<td class='amount'>{4} {7}</td>" +
            "<td class='historical-price' title='{6} {8}/{7} at {9}'>{5} {8}</td>" +
            "<td class='external-link'>{10}</td>" +
        "</tr>",
        cardinal, time_utc.toDateString(), timeSince(time_utc), verb,
        abs_amount.toFixed(4), numberWithCommas((h_price * abs_amount).toFixed(2)),
        source, crypto_symbol.toUpperCase(), fiat_symbol.toUpperCase(),
        h_date, external_link
    );
}

navigator.getMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

var mediaStream = '';
function initialize_webcam(video) {
    navigator.getMedia(
        {video: true},
        function(stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
            }
            video.play();
            mediaStream = stream;
        },
        function(err) {
            console.log("An error occured! " + err);
        }
    );
}
function reload_currency_exchange(crypto_symbol) {
    var spinner = $(".wallet-" + crypto_symbol + " .exchange-rate-spinner");
    var fiat_symbol = $('.fiat-symbol').first().text();
    spinner.show();

    return $.ajax({
        url: '/wallets/get_exchange_rate',
        data: {
            crypto: crypto_symbol,
            fiat: fiat_symbol
        }
    }).success(function(response) {
        update_wallet_exchange_rate(crypto_symbol, response);
    }).complete(function() {
        spinner.hide();
    });
}
function reload_address_price(js_id, standalone) {
    // Get the current price from the backend, and then update the
    // front end with new wallet totals.
    // `standalone` means this function was not called as part of a batch
    // therefore the overall spinner needs to be hidden after the ajax call.
    // otherwise, the spinner will be turned off at a different time.

    var wallet = $("#" + js_id);
    var spinner = wallet.find(".price-spinner");
    var fiat_symbol = $('.fiat-symbol').first().text();

    spinner.show();

    if(standalone) {
        $("#overall-spinner").show();
    }

    return $.ajax({
        url: "/wallets/value",
        data: {
            js_id: js_id,
            fiat: fiat_symbol
        }
    }).success(function(data) {
        // returned will be new totals for this wallet
        // plug into front end.
        update_address_balance(js_id, data);
    }).error(function(response) {
        wallet.find('.error').html("<pre>" + response.responseText + "</pre>");
    }).complete(function() {
        spinner.hide();
        if(standalone) {
            $("#overall-spinner").hide();
        }
    });
}

$(function() {

    $('.reload-currency-exchange').click(function(event) {
        event.preventDefault();
        event.stopPropagation()
        var crypto_symbol = $(this).data('crypto-symbol').toLowerCase()
        reload_currency_exchange(crypto_symbol);
        update_overall_fiat_total();
    });
    $(".reload-address-price").click(function(event) {
        event.preventDefault();
        var js_id = $(this).data('js-id');
        var crypto_symbol = $(this).data('crypto-symbol');
        reload_address_price(js_id, true);
        update_overall_fiat_total();
    });

    $(".launch-public-qr-modal").click(function(event) {
        event.preventDefault();
        var modal = $(this).prev();
        var public_key = $(this).data('public-key');
        modal.find(".modal-contents").qrcode(public_key);
        modal.bPopup();
    });

    $(".launch-private-qr-modal").click(function(event) {
        // Make ajax call to get the private key from the server.
        // This is done to prevent private keys from being accidently stolen.
        event.preventDefault();
        var modal = $(this).prev();
        var js_id = $(this).data('js-id');

        $.ajax({
            url: "/wallets/get_private_key/",
            data: {js_id: js_id},
        }).success(function(private_key){
            modal.find(".modal-contents").qrcode(private_key);
            modal.find(".modal-bottom-section").text(private_key);
            modal.bPopup();
        });

    });

    $('.launch-import-private-key-modal').click(function(event) {
        event.preventDefault();
        var modal = $(this).prev();
        var video = modal.find('video')[0];
        var js_id = $(this).data('js-id');
        var canvas = $("#canvas")[0];
        var width = 400;
        var height = 400;
        var interval_timer;

        qrcodeCallback = function(data) {
            // This function gets called whenever the qrdecoder finishes
            // decoding something. If something is decoded, we are done.
            if(data != "error decoding QR Code") {
                beep();
                clearInterval(interval_timer);
                mediaStream.stop();
                $(video).hide();
                modal.find('input[name=private_key]').val(data);
            }
        }
        qrcode.callback = qrcodeCallback;

        modal.bPopup(
            {onClose: function() {
                if(interval_timer) {
                    clearInterval(interval_timer);
                }
                if(mediaStream) {
                    mediaStream.stop();
                }
            }},
            function() {
                modal.find('.launch-webcam').click(function() {
                    $(video).show();
                    initialize_webcam(video);
                    interval_timer = setInterval(function() {
                        // Once the qr code video has started, sample the screen every
                        // second until something can be decoded.
                        canvas.width = width;
                        canvas.height = height;
                        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
                        var data = canvas.toDataURL('image/png');
                        qrcode.decode(data);
                    }, 1000);
                });
            }
        );
    });

    $("#new-wallet").click(function() {
        $("#new-wallet-modal").bPopup();
    });

    $(".show-transactions").click(function(event) {
        // Get transactions from backend, then plug them into the DOM.
        event.preventDefault();
        var show_transaction = $(this);
        var wallet_id = show_transaction.data("wallet-id");
        var crypto_symbol = show_transaction.data("crypto-symbol");
        var fiat_symbol = $("#fiat-currency").val();
        var js_id = crypto_symbol + "-" + wallet_id;
        var spinner = show_transaction.next();
        var container = spinner.next();
        spinner.show();

        $.ajax({
            url: "/wallets/transactions",
            data: {
                js_id: js_id,
                fiat: fiat_symbol,
            },
        }).success(function(transactions) {
            container.find("tr").remove();
            $.each(transactions.reverse(), function(i, transaction) {
                html = make_tx_html(transaction, i + 1, crypto_symbol);
                container.html(container.html() + html);
            })
        }).error(function(response) {
            // dump error message to the screen, figure it out later.
            container.html("<tr><td><pre>" + response.responseText + "</pre></td><tr>");
        }).complete(function() {
            spinner.hide();
        });
        $(this).hide();
        $(this).prev().show(); // show the 'hide transactions' button.
    });

    $(".hide-transactions").click(function(event) {
        event.preventDefault();
        $(this).next().next().next().find('tr').remove(); // hide transactions section
        $(this).next().show(); // show 'show transaction' button
        $(this).hide();
    });

    $(".wallet-top-section").click(function(event) {
        var top_section = $(this);
        top_section.siblings('.addresses-container').toggle('fast', function() {
            top_section.find('.hide-addresses').toggle();
            top_section.find('.show-addresses').toggle();

        });
    });

    $("#fiat-currency-selector").change(function(event){
        var fiat = $(this).val();
        localStorage['fiat-currency-selector'] = fiat;
        console.log("change fiat selector", $(this).val());
        window.location.reload();
    });

    if(localStorage['fiat-currency-selector']) {
        var fiat = localStorage['fiat-currency-selector'];
    } else {
        var fiat = localStorage['fiat-currency-selector'] = 'usd';
    }

    $("#fiat-currency-selector").val(fiat);
    $('.fiat-symbol').text(fiat.toUpperCase());

});
