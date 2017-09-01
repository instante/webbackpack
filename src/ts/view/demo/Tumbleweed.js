import * as $ from 'jquery';

export function Tumbleweed() {
    var bounceHeight = 50;
    //rotations per second
    var rotateSpeed = 2;
    //animation length
    var flyTime = 3000;
    //pause between animations
    var timeMin = 2000;
    var timeMax = 10000;
    var delayedStart = 2000;
    var frameskip = 1;

    var tumbleHeight = 95;
    var shadowWidth = 100;
    var shadowShiftLeft = (shadowWidth - 68) / 2;
    var minx = -shadowWidth;
    var t;
    var frame = 0;

    function flyRandom()
    {
        var y = Math.random() * ($(window).height() - bounceHeight - 150);
        var rtl = Math.random() * 2 < 1;
        flyTumble(y, rtl);


        t = Math.random() * (timeMax - timeMin) + timeMin + flyTime;
        setTimeout(flyRandom, t);
    }

    function flyTumble(y, rtl)
    {
        $tumble.css({
            top: y + 'px',
            visibility: 'visible'
        });
        $shadow.css({
            top: y + tumbleHeight + 'px',
            visibility: 'visible'
        });
        var start = null;
        var reqAF = function(msec) {
            if (!start) start = msec;
            var time = msec - start;
            if (++frame % frameskip === 0) {
                var maxx = $(window).width() + shadowWidth;
                var dy;
                var part = 6 * time / flyTime;
                var floor = Math.floor(part);
                var stageTime = part - floor;
                var rotationState = (time % 1000) * rotateSpeed / 1000;
                if (floor % 2 === 1) { //go up
                    stageTime = 1 - stageTime;
                }
                var t2 = stageTime * stageTime;
                dy = t2 * bounceHeight;
                var left = (time * (maxx - minx) / flyTime) + minx;
                if (rtl) {
                    left = maxx - left + minx;
                    rotationState *= -1;
                }
                $tumble.css({
                    left: left + 'px',
                    top: y + dy + 'px',
                    transform: 'rotate(' + (rotationState * 360) + 'deg)'
                });
                var shadowWidthReduce = (1 - t2) * 40;
                $shadow.css({
                    width: (shadowWidth - shadowWidthReduce) + 'px',
                    left: (left - shadowShiftLeft + shadowWidthReduce / 2) + 'px',
                    opacity: 0.2 + t2 / 4,

                });
            }
            if (time < flyTime) {
                window.requestAnimationFrame(reqAF);
            } else {
                $tumble.css({
                    visibility: 'hidden'
                });
                $shadow.css({
                    visibility: 'hidden'
                });
            }
        };
        window.requestAnimationFrame(reqAF);
    }

    var $body = $('body');
    var $tumble = $('<img alt="tumbleweed">');
    var $shadow = $('<img alt="shadow">');
    // 150*50px shadow
    $shadow.attr('src',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAhCAYAAAAvdw6LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAVSSURBVHja1FrrzuI6DGwuhe/9n3Ypbbx/qGQNM05Slj17kKK0CeXiicfXtPxbr/SazV1/62Xwff+UAP6WUHEP35Mmf2MKhL1M7BkBKgLsa2CmL35GCu6Tu2eAqNkmf7eJ59WMaxYAaRcOwx8HpCd8dcITgJDJc4ncsz1zz/deDZ4zIXC2dz6P+5GGfQxS+uB90YlPARCnQP1ehjmR/UhzegLyAjYyGsx+PQXA2IRGDQGTJveTONkLCHQR1zkYqTMvApweXTVyHc1qGACD10rzZuhumv+Rcnon+hR2gevyel8BUIoAKdIgBYbSACb8g9zbaz7E+3oah5Q3BEwdoKJFUE8KqKcKIM713lzcrDRrEaAYaAQ76QcIeB+YGTC7oLpE6MuEs2ERID27oIAoIMjqhHuur6+14vb9fYG9DOuoUSMaok68F/QO64db9/dPAGV//Z4GAKPb7DVm6YFSB+xDj9szCLcQ4VYHyDnfxHoln1cJ3eWOhjRCOyh8P54wb2L9HNV9lv88r4kMGBXTWKQhkceEtqCCwFYAAcftNdZgMGAyXDNQmM3wGqGAUGN7Dbbnn/fy8KCj660C4zcNSSJuUAa2gmbgQIHfHRA3AOVOAFOgVEFbLNZoAIICAwX+ADD8eBDAivs8lJ1fM+JCv1FXDWIM/NNonCuxCV6gXvB3N98DgG4BlZUPNeQIqMmPOwDwgP+6waHYxCHegZ4aeKCMvlINImpGVYXYijUA4weA+AFQ7gEgNwFIBoeB2ZAmvCRmI5QmPIgt855fFACb8KyU17ooG6KAYXFEIV6VB4ZpxU8AzCq0ZBWGfoSymAE/6eb2En4lwCM7WJAJQI0sIgZCekqzbi+6ZSruKAIo1KLbwLgLg1+J81A6lIXe1e5c1eKMMQrehKfW4Hkch3ODUUbodRnI3KLA8EoeLPLGohGBiK5w6Rh2BERxOdJaEVrfGynIGlzOon8CiA2mK3o5IkxZHO7E7e6EJXdKozQPc3cb2JWDaNHIMBGZD+eqRgFJzvKXwGdugWtZiGAPMKY1oAuWOj+FtTqQ8mse8bLQqD+dMVcGfYNYw1/j/1L5MHYwk4jOG7q9XuhJIO8fYidOJf5Y2tyE8UXDe9LVc8DLSiJlEnlZz0688ViW5Ze73ty8iSBxH9Qwlvd687IQvROE4q6zo4yoYLOQBB/ShPd2buAye2+tiIh9RkMOyE1t4P4+CSAemAeA8YCgciPAHJB8bCAPWkeppK5thI8zeBk9/jYhCB8dn27nGqRSPBBr4GH13N7mkoNRymRz0fomQNpIlL8HicojKIC92Z7aMUYtcIkNXEIE4BQqgnAjaZJeLsu7vBgXsZo5ZnkbSZuMANPLZz1FcnEnNsYC6noz6iZOO9oPxtPZ/fnqjO8mhHwjiccaAFFEfSV1InUT9YsjAGYntmET4DWRtseDoErElOJHO0NY7iiL0mwVhacq6iErSeGzqDx/WA9pInrH061swS4KV/uAJrASMK2/p8EOkjTYlJAJz2dSrGKFqdHKYZoExCYqhezEH8RrYzHMSNOE9TpVrtTUUycyX4LUShaRcA0i+V5Xiuq7sgFgmAvfRHyBMysV20BnShhAznQF9jpOkgAEKa90uk1y0HWSF91k10v+LZ0uE+s0QJhobmD3lztPrvZlpQ69ZdIQ19OuHhV+oy+rDVBMFCi3Dg1Np1RmkmAj9MYElTvNdCP3uXMwRvJsi2h4m7nHUCBqRZ1ukvsoK3nRBi1BT1VERWnw+2xQYxS1qWTpMnni7U8L9Bufd8VezQI/K6gZSrm6958C8n/9DV8R7pXX7wEAPfBCIJh2WzcAAAAASUVORK5CYII='
    );


    // 68*70px, rotation radius 50px
    $tumble.attr('src',
        'data:image/png;base64,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'
    );
    $tumble.css({
        position: 'fixed',
        left: '-100px',
        top: '0px',
        visibility: 'hidden'
    });
    $shadow.css({
        position: 'fixed',
        left: '-100px',
        top: '68px',
        visibility: 'hidden'
    });
    $body.append($tumble);
    $body.append($shadow);

    setTimeout(flyRandom, delayedStart);
}
