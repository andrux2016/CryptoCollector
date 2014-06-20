function update_overall_fiat_total() {
    // Get the totals from each wallet and add them up.
    // Stick that number into the DOM.
    var total = 0;
    $(".fiat-value").each(function(i, element) {
        total += Number($(element).html())
    });

    $("#total-fiat-amount").html(total.toLocaleString());
}
function update_DOM_with_price_for_wallet(wallet_id, data) {
    // from a dict of new prices for a wallet, update the DOM
    // gets called after ajax call to get updated price.
    // Updates the wallet, exchange, and fiat value.
    var exchange = data.fiat_exchange;
    if(exchange > 1) {
        exchange = exchange.toPrecision(5);
    } else {
        exchange = exchange.toFixed(4);
    }

    $("#" + wallet_id + " .wallet-value").html(data.wallet_value.toLocaleString());
    $("#" + wallet_id + " .fiat-exchange").html(exchange.toLocaleString());
    $("#" + wallet_id + " .fiat-value").html(data.fiat_value.toFixed(2).toLocaleString());
}

$(function() {
    $("#new-wallet").click(function() {
        $("#new-wallet-modal").bPopup();
    });

    $(".show-transactions").click(function(event) {
        // Get transactions from backend, then plug them into the DOM.
        //
        event.preventDefault()
        var show_transaction = $(this);
        var wallet_id = show_transaction.data("wallet-id");
        var spinner = show_transaction.next();
        var container = spinner.next();
        spinner.show();

        $.ajax({
            url: "/wallet/transactions",
            data: {js_id: wallet_id},
        }).success(function(transactions) {
            console.log(transactions);
            $.each(transactions, function(i, transaction) {
                console.log(transaction);
                var time_utc = transaction['time_utc'];
                var amount = transaction['amount'];
                var txid = transaction['tx'];
                container.html(container.html() + txid + '<br>')
            })
        }).error(function(response) {
            // dump error message to the screen, figure it out later.
            container.html("oh snap!! error!! " + response.responseText);
        }).complete(function() {
            spinner.hide();
        });
    });

    $(".reload-wallet-price").click(function(event) {
        // Get the current price from the backend, and then update the
        // front end with new wallet totals.
        event.preventDefault();
        var wallet_id = $(this).data('wallet-id');
        var wallet = $("#" + wallet_id);
        var spinner = wallet.find(".price-spinner");
        spinner.show();
        $("#overall-spinner").show();

        $.ajax({
            url: "/wallet/value",
            data: {js_id: wallet_id}
        }).success(function(data) {
            // returned will be new totals for this wallet
            // plug into front end.

            update_DOM_with_price_for_wallet(wallet_id, data);
            update_overall_fiat_total();
        }).error(function(response) {
            wallet.find('.error').html("oh snap!! error!! " + response.responseText);
        }).complete(function() {
            spinner.hide();
            $("#overall-spinner").hide();
        });
    });
});