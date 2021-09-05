$(function () {
    //loading
    function loading() {
        let progress = $(".progress"),
            progressText = progress.find(".progress-text"),
            imgLoad = imagesLoaded("body"),
            imgTotal = imgLoad.images.length,
            imgLoaded = 0,
            imgCurrent = 0,
            progressTimer = setInterval(updateProgress, 1000 / 60);

        imgLoad.on("progress", function () {
            imgLoaded++;
        });

        function updateProgress() {
            let target = (imgLoaded / imgTotal) * 100;

            imgCurrent += (target - imgCurrent) * 0.1;
            progressText.text(Math.floor(imgCurrent) + "%");

            //이미지 로딩 완료
            if (imgCurrent >= 100) {
                clearInterval(progressTimer);
                //progress.delay(1000).animate({ top: "-130%" },400, "easeInExpo");
                progress.delay(1000).fadeOut()
            }

            if (imgCurrent > 99) {
                imgCurrent = 100;
            }
        };
    };
    loading();

    $(document).ready(function () {
        var height = document.body.scrollHeight;
        $("html,body").animate({
            scrollTop: height
        }, 600);

        setTimeout(aa, 1000)

        function aa() {
            $("#contents > section").removeClass("show");
            $(".project.p1").removeClass("show");
            $(".project.p2").removeClass("show");
            $(".project.p3").removeClass("show");
            $(".project.p4").removeClass("show");
            //alert("ddd")
        }
    });
    $('.home').click(function () {
        location.reload();
    });
    $(window).scroll(function () {
        var wScroll = $(this).scrollTop();
        $(".scroll ").text(wScroll);

        if (wScroll <= $("#section2").offset().top - $(window).height()) {
            $("#section1").addClass("show")
        }
        if (wScroll <= $("#section3").offset().top - $(window).height()) {
            $("#section2").addClass("show")
        }
        if (wScroll <= $("#section4").offset().top - $(window).height() / 2) {
            $("#section3").addClass("show")
        }
        if (wScroll <= $("#section5").offset().top - $(window).height()) {
            $("#section4").addClass("show")
        }
        if (wScroll <= $(".project.p4").offset().top - $(window).height() / 15) {
            $(".project.p4").addClass("show")
        }
        if (wScroll <= $(".project.p3").offset().top - $(window).height() / 15) {
            $(".project.p3").addClass("show")
        }
        if (wScroll <= $(".project.p2").offset().top - $(window).height() / 13) {
            $(".project.p2").addClass("show")
        }
        if (wScroll <= $(".project.p1").offset().top - $(window).height() / 13) {
            $(".project.p1").addClass("show")
        }
        // if (wScroll <= $("#section6").offset().top - $(window).height() / 2) {
        //     $("#section5").addClass("show")
        // }
        if (wScroll <= $("#section7").offset().top - $(window).height()) {
            $("#section6").addClass("show")
        }
        if (wScroll <= $("#section8").offset().top - $(window).height()) {
            $("#section7").addClass("show")
        }
    });

    //모바일 슬라이드
    const phone = $('#slide-list li');
    const dots = $('#slide-dot li');
    const nav = $('.navbnt');
    let selected_product_index = 0;

    function selectProduct(index) {
        selected_product_index = index % phone.length;
        if (selected_product_index < 0) selected_product_index = phone.length +
            selected_product_index;
        phone.each(function (i) {
            let offset = i -
                selected_product_index;
            if (offset < 0) offset += phone.length;
            let
                index;
            for (index = 0; index < phone.length + 1; index++) {
                $(this).removeClass('item-' + index).addClass('item-' + (offset + 1));
            }
        });
        dots.eq(index).addClass('active').siblings('li').removeClass('active');
    }
    /* Arrow clicks */
    nav.click(function () {
        const delta = $(this).hasClass('prev') ? -1 : 1;
        const $delta_product = $(`#slide-list li:eq(${(selected_product_index + delta) % phone.length})`);
        const delta_product_index = parseInt($delta_product.index());
        selectProduct(delta_product_index);
    });
    /* phone clicks */
    phone.click(function () {
        selectProduct($(this).index());
    });
    /*Pagination */
    dots.click(function (e) {
        selectProduct($(this).index());
        $(e.currentTarget).addClass('active').siblings('li').removeClass('active');
    });


    //모바일-윈도우 팝업
    $(".apple-main").click(function (e) {
        e.preventDefault();
        window.open("../mobile/apple/index.html", "Apple Music", "width=400, height=800, scrollbars=0, toolbar=0, menubar=no, left=500, top=50")
    });
    $(".apple-sub").click(function (e) {
        e.preventDefault();
        window.open("../mobile/apple/foryou/foryou.html", "For You", "width=400, height=800, scrollbars=0, toolbar=0, menubar=no, left=500, top=50")
    });
    $(".wadiz").click(function (e) {
        e.preventDefault();
        window.open("../mobile/wadiz/index.html", "Wadiz", "width=360,height=800, scrollbars=0, toolbar=0, menubar=no, left=500, top=50")
    });
    $(".apple-proto").click(function (e) {
        e.preventDefault();
        window.open("https://www.figma.com/proto/SMkpgsl2yWgJIsR9VOEklz/Music-App?node-id=1%3A29&viewport=-3486%2C-33%2C1&scaling=scale-down", "apple-proto", "width=360,height=800, scrollbars=0, toolbar=0, menubar=no, left=500, top=50")
    });
    $(".wadiz-proto").click(function (e) {
        e.preventDefault();
        window.open("https://www.figma.com/proto/vMRhg271lW4N1nVhuzSXbr/wadiz?node-id=2%3A461&viewport=504%2C253%2C0.34511134028434753&scaling=scale-down", "wadiz-proto", "width=360,height=800, scrollbars=0, toolbar=0, menubar=no, left=500, top=50")
    });

    //contact modal
    var modal = document.getElementById("contact-modal");
    var btn = document.getElementById("contact");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function () {
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    //audio
    var getaudio = $('#player')[0],
        mouseovertimer,
        audiostatus = 'off',
        playerControls = ".player-controls";
    $(document).on('mouseenter', playerControls, function () {
        if (!mouseovertimer) {
            mouseovertimer = window.setTimeout(function () {
                mouseovertimer = null;
                if (!$(playerControls).hasClass("playing")) {
                    getaudio.load();
                    getaudio.play();
                    $(playerControls).addClass('playing');
                    return false;
                }
            }, 2000);
        }
    });
    $(document).on('mouseleave', playerControls, function () {
        if (mouseovertimer) {
            window.clearTimeout(mouseovertimer);
            mouseovertimer = null;
        }
    });
    $(document).on('click touch', playerControls, function (e) {
        e.preventDefault();
        if (!$(playerControls).hasClass("playing")) {
            if (audiostatus == 'off') {
                $(playerControls).addClass('playing');
                getaudio.load();
                getaudio.play();
                window.clearTimeout(mouseovertimer);
                audiostatus = 'on';
                return false;
            } else if (audiostatus == 'on') {
                $(playerControls).addClass('playing');
                getaudio.play();
            }
        } else if ($(playerControls).hasClass("playing")) {
            getaudio.pause();
            $(playerControls).removeClass('playing');
            window.clearTimeout(mouseovertimer);
            audiostatus = 'on';
        }
        return false;
    });
    $('#player').on('ended', function () {
        $(playerControls).removeClass('playing');
        audiostatus = 'off';
    });


})