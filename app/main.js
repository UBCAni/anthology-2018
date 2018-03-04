const handler = StripeCheckout.configure({
    key: 'pk_test_pIsbCWi9hua5DAc1GcPxlxPc',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
        console.log(token);
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.
    }
});

$(() => {
    $(".parallax").parallax();
    $("select").material_select();
    $("#purchase").click((event) => {
        event.preventDefault();
        const id = $("#membership");
        const name = $("#name");
        let valid = true;

        if (!name[0].value) {
            valid = false;
            name.addClass("invalid");
        }

        const membershipId = id[0].value;
        if (membershipId && isNaN(parseInt(membershipId))) {
            valid = false;
            id.addClass("invalid");
        }

        if (valid) {
            handler.open({
                name: "UBC Anime Club",
                description: "Anthology 2018",
                currency: "cad",
                amount: (membershipId ? 2000 : 2500) * parseInt($("#copies")[0].value)
            });
        }
    });
});

window.addEventListener("popstate", () => {
    handler.close();
});
