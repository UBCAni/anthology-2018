const handler = StripeCheckout.configure({
    key: 'pk_test_pIsbCWi9hua5DAc1GcPxlxPc',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
        fetch('/', {
            body: {
                email: token.email,
                token: token.id,
                fullName: $("#name")[0].value,
                membershipNum: $("#membership")[0].value,
                copies: parseInt($("#copies")[0].value)
            },
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            credentials: 'same-origin'
        });
    }
});

const data = [
    {
        name: "Pang Naruekatpichai"
    },
    {
        name: "Alma Dziho (ALeMeryA)",
        links: {
            instagram: "alemery",
            tumblr: "alemerya"
        }
    },
    {
        name: "Justin Oh"
    },
    {
        name: "kuyuan",
        links: {
            tumblr: "kuyuan",
            twitter: "weepingknight"
        }
    },
    {
        name: "noctilumos",
        links: {
            twitter: "noctilumos"
        }
    },
    {
        name: "Yan Li (Turd)",
        links: {
            instagram: "nihilscire"
        }
    },
    {
        name: "Cloudkourin",
        links: {
            instagram: "cloudkourin"
        }
    },
    {
        name: "Koki Norimatsu (Kugui Issei)",
        links: {
            instagram: "kuguiissei",
            pixiv: "s792079"
        }
    },
    {
        name: "Mocha",
        links: {
            tumblr: "minicchumocha"
        }
    },
    {
        name: "Cheepee Sheepee",
        links: {
            deviantart:"cheepeesheepee",
            pixiv: "cheepeesheepee"
        }
    },
    {
        name: "Max Wei",
        links: {
            deviantart: "Xcissors"
        }
    },
    {
        name: "Leva",
        links: {
            instagram: "owlyleva"
        }
    },
    {
        name: "genta",
        links: {
            instagram: "centixue",
            tumblr: "centixue",
            twitter: "centixue"
        }
    },
    {
        name: "Hannah (Maltaku)"
    },
    {
        name: "Rachel",
        links: {
            instagram: "radchul",
            tumblr: "radchul",
            twitter: "radchul"
        }
    }
];

const logos = {
    instagram: function (id) { return `<a class="logo instagram" target="_blank" rel="noopener noreferrer" href="https://instagram.com/${id}"></a>`; },
    pixiv: function (id) { return `<a class="logo pixiv" target="_blank" rel="noopener noreferrer" href="https://pixiv.me/${id}"></a>`; },
    twitter: function (id) { return `<a class="logo twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/${id}"></a>`; },
    tumblr: function (id) { return  `<a class="logo tumblr" target="_blank" rel="noopener noreferrer" href="https://${id}.tumblr.com"></a>`; },
    deviantart: function (id) { return `<a class="logo deviantart" target="_blank" rel="noopener noreferrer" href="https://${id}.deviantart.com"></a>`; }
};

$(function() {
    $("#modal").modal({
        outDuration: 100,
        endingTop: $(document).width() > 600 ? "25%" : "10%"
    });

    $(".parallax").parallax();
    $("select").material_select();
    $(".artist img").each(function (i, element) {
        element.addEventListener('click', function (event) {
            const key = parseInt(event.target.dataset.key);
            const d = data[key];

            let result = "";

            if (d.links) {
                const links = d.links;
                result += links.instagram ? logos.instagram(links.instagram) : '';
                result += links.tumblr ? logos.tumblr(links.tumblr) : '';
                result += links.twitter ? logos.twitter(links.twitter) : '';
                result += links.pixiv ? logos.pixiv(links.pixiv) : '';
                result += links.deviantart ? logos.deviantart(links.deviantart) : '';
            }

            $("#modal img")[0].src = event.target.src;
            $("#modal .name")[0].innerText = d.name;
            $("#modal .links")[0].innerHTML = result;
            $("#modal").modal('open');
        });
    });
    $("#purchase").click(function (event) {
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
                amount: (membershipId ? 2000 : 2400) * parseInt($("#copies")[0].value)
            });
        }
    });
});

window.addEventListener("popstate", function () {
    handler.close();
});
