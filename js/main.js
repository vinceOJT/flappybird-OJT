var world_parameters = {
    "w": 400, //to be an array
    "h": 10,
    "px": 50,
    "grid": [],
    "grid_level": [],
    "c": 1,
    "d": 0,
}
var player = {
    "x": 30,
    "y": 240,
    "px": 40,
    "ff": 2,
    "lpx": 5,
    "g": 10,
    "dg": 10,
    "ag": 30,
    "kp": true,
    "f": 0, //flying
    "s": 0,
    "state": "start",
    "img": "",

}

var p_sound = new Audio("audio/point.mp3");
var d_sound = new Audio("audio/die.mp3");
var fly_sound = new Audio("audio/vine.mp3");

// const instance = fly_sound.cloneNode();
var p_img = {
    "b-1": "",
    "b-2": "",
}


let redirect = false;
var choice;
var player_initial;
var player_fly;
function redirectToWebsite(url) {
    if (redirect == true) {
        window.location.href = url;

    } else {

    }
}

function takeInput() {
    let character_choice = document.getElementById('choose_player').value;
    if (!character_choice) {
        alert("Please choose a character");
        return;
    }

    const chosent_character = character_choice;
    console.log("Pick a character [1,2,3]: ", chosent_character);
    const parse_value = parseInt(chosent_character);
    choice = parse_value;
    console.log("number", choice);
    if (choice === 1) {
        player_initial = "images/14.png";
        player_fly = "images/07.png";
    } else if (choice === 2) {
        player_initial = "images/1.png";
        player_fly = "images/2.png";
    } else if (choice === 3) {
        player_initial = "images/burger.png";
        player_fly = "images/chaddest.png";
    }
    else {
        player_initial = "images/11.png";
        player_fly = "images/22.png";
    }

}


// load in chosen image
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));

    });
}

//wait for the player to choose the character before loading them
async function setCharacter() {
    p_img["b-1"] = await loadImage(player_initial);
    p_img["b-2"] = await loadImage(player_fly);
}


// let tmpImg = new Image();
// tmpImg.src = "images/1.png";

// tmpImg.onload = () => {
//     p_img["b-1"] = tmpImg;

//     tmpImg = new Image();
//     tmpImg.src = "images/2.png";

//     tmpImg.onload = () => {
//         p_img["b-2"] = tmpImg;
//     }
// }





let tmpImg2 = new Image();
tmpImg2.src = "images/head.png";

tmpImg2.onload = () => {
    p_img["head"] = tmpImg2;
    tmpImg2 = new Image();
    tmpImg2.src = "images/mid.png";
    tmpImg2.onload = () => {
        p_img["mid"] = tmpImg2;

        tmpImg2 = new Image();
        tmpImg2.src = "images/head2.png";
        tmpImg2.onload = () => {
            p_img['head2'] = tmpImg2;
        }
    }
}

let wy = window.innerHeight;
if (wy <= 754) {
    world_parameters.px = world_parameters.px - 2;
    player.px = player.px - 1;
}

if (wy <= 625) {
    world_parameters.px = world_parameters.px - 4;
    player.px = player.px - 2;
}

document.getElementById("player_canvas").addEventListener("mousedown", (e) => {

    if (player.state === "start") {
        // if (!player.kp) { 
        //     player.f = 0;
        //     return; 
        // }
        player.f = 1;
        player.kp = false;
        fly();
    }
})

document.getElementById("player_canvas").addEventListener("mouseup", (e) => {

    if (player.state === "start") {
        player.f = 0;
        player.kp = true;
    }
})

window.addEventListener("keydown", (e) => {

    if (player.state === "start") {
        if (e.code === "Space" || e.code === "ArrowUp") {
            const instance = fly_sound.cloneNode();
            instance.play()


            // if (!player.kp) { 
            //     player.f = 0;
            //     return; 
            // }
            player.f = 1;
            player.kp = false;
            fly();
        }
        else if (e.code === "KeyD" || e.code === "ArrowRight") {
            player.f = 1;
            player.kp = false;
            dash();
        }
    }


})

window.addEventListener("keyup", (e) => {

    if (player.state === "start") {
        if (e.code === "Space") {
            player.f = 0;
            player.kp = true;
        } else if (e.code === "KeyD") {
            player.f = 0;
            player.kp = true;
        }
    }


})

check_allow_config();

function check_allow_config(i = 0) {

    let r_data = {};
    r_data['cmd'] = "check_allow_config";

    // Calling API's
    $.ajax({
        url: "api/world_fx.php",
        type: "post",
        data: r_data,
        success: (res) => {
            if (JSON.parse(res)['sc_on'] != 1) {
                player.state = "game_over";
                alert("Game access not allowed");
                document.body.innerHTML = "";
            }
        }
    })

}

;

async function game_start(sk = 0) {
    // let character_choice = document.getElementById('choose_player').value;
    // const chosent_character = character_choice;
    // console.log("Pick a character [1,2,3]: ", chosent_character);
    // const parse_value = parseInt(chosent_character);
    // choice = parse_value;

    takeInput();
    await setCharacter()

    let pn = document.getElementById("playername").value;

    if (!pn) {
        alert("Please input name and character");
        return;
    }

    // if (!sk) {
    //     alert("game start");
    // }

    world_parameters = {
        "w": 400, //to be an array
        "h": 10,
        "px": 50,
        "grid": [],
        "grid_level": [],
        "c": 1,
        "d": 0,
    }

    player = {
        "x": 30,
        "y": 240,
        "px": 35,
        "ff": 2,
        "lpx": 5,
        "g": 10,
        "dg": 10,
        "ag": 40,
        "kp": true,
        "f": 0, //flying
        "s": 0,
        "state": "start",
        "img": p_img["b-2"],
    }


    let pc = document.getElementById("player_canvas");
    pc.style.left = 0;
    let cc = document.getElementById("canvas_cont");
    cc.scrollLeft = 0;

    create_world_grid(world_parameters);
    document.getElementById("start_btn").style.display = "none";
    document.getElementById("playing_status").style.display = "block";

}

function create_world_grid(data) {

    data['cmd'] = "create_world_grid";
    $.ajax({
        url: "api/world_fx.php",
        type: "post",
        data: data,
        success: (res) => {

            world_parameters = JSON.parse(res);
            create_world_graphics(JSON.parse(res), "world_canvas");
            create_player_graphics(player, "player_canvas");

            setTimeout(() => {
                update();
            }, 500);

        }
    })

}

function create_world_graphics(data) {

    // Make some skips based on level
    let id = "world_canvas";
    let c = document.getElementById(id);
    let ctx = c.getContext("2d");
    let d = data;

    c.width = d.w * d.px;
    c.height = d.h * d.px;

    // c.style.width = "1290px";
    // c.style.maxWidth = c.style.width;

    // c.style.height = "720px";
    // c.style.maxHeight = c.style.height;

    // 1280 x 720

    id = "canvas_cont";
    let cc = document.getElementById(id);
    cc.style.display = "block";
    cc.style.height = c.height + "px";
    cc.style.maxHeight = cc.style.height;


    let mx = window.innerWidth;
    cc.style.width = "98vw";

    // if (mx <= 1366) {
    //     cc.style.width = "430px";
    // }

    // if (mx <= 1111) {
    //     cc.style.width = "376px";
    // }

    // cc.style.width = "600px";
    // cc.style.width = "100%";
    cc.style.maxWidth = cc.style.width;

    // cc.style.height = c.style.height;
    // cc.style.maxHeight = c.style.height;


    id = "player_canvas";
    let pc = document.getElementById(id);
    pc.width = cc.offsetWidth;
    pc.height = c.height;

    // pc.style.width = c.style.width;
    // pc.style.maxWidth = c.style.width;

    // pc.style.height = c.style.height;
    // pc.style.maxHeight = c.style.height;

    ctx.clearRect(0, 0, c.width, c.height);

    for (let x = 0; x < d.w; x++) {

        for (let y = 0; y < d.h; y++) {

            if (d.grid[x][y]['block'] == 1) {


                // if (y <= 4) {
                //     // sky_designs(ctx, x * d.px, y * d.px, d.px, d.px / 2, 0.5, random_num(5, 8));
                //     // Math.random()
                //     sky_designs(ctx, x * d.px, y * d.px, d.px, d.px / 2, 0.5, random_num(5, 8), d.grid[x][y]['color'], d.grid[x][y]["design"]);

                // } else {
                //     // block_designs(ctx, x, y, d.px, d.grid[x][y]["color"], d.grid[x][y]["design"]);
                //     building_designs(ctx, x, y, d.px, d.grid[x][y]["color"], d.grid[x][y]["design"]);
                // }

                ctx.drawImage(p_img["mid"], x * d.px, y * d.px, d.px, d.px);

                if (d.grid[x][y + 1] && d.grid[x][y + 1]['block'] == 0) {
                    ctx.drawImage(p_img["head2"], x * d.px, y * d.px, d.px, d.px);
                }

                if (d.grid[x][y - 1] && d.grid[x][y - 1]['block'] == 0) {
                    ctx.drawImage(p_img["head"], x * d.px, y * d.px, d.px, d.px);
                }

                // if (y > 0) {
                //     if (d.grid[x][y + 1]['block'] == 1) {

                //     }
                // }

                // block_designs(ctx, x, y, d.px, d.grid[x][y]["color"], d.grid[x][y]["design"]);

            }

        }
    }

}

function create_player_graphics(data, id = "player_canvas") {

    let my = document.getElementById(id).offsetHeight;
    let mx = document.getElementById(id).offsetWidth;

    let c = document.getElementById(id);
    let ctx = c.getContext("2d");

    c.width = mx;
    c.height = my;

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();

    let px_offsetx = 23;
    let px_offsety = 13;
    // Change if possible to animation
    //ctx.fillRect(player.x, data.y, data.px, data.px); // hitbox

    if ((player.x + player.px) < (mx / 2) + player.px) {
        ctx.drawImage(player["img"], player.x - px_offsetx + 5, data.y - px_offsety, data.px + px_offsetx, data.px + px_offsety);
    } else {
        ctx.drawImage(player["img"], (mx / 2) - px_offsetx + 5, data.y - px_offsety, data.px + px_offsetx, data.px + px_offsety);
    }


    ctx.closePath();

}

function sky_designs(ctx, x, y, px, r, ins, n, c) {

    ctx.beginPath();
    ctx.save();
    ctx.translate(x + (px / 2), y + (px / 2));
    ctx.moveTo(0, 0 - r);

    for (let i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (r * ins));

        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - r);

    }

    ctx.restore();
    ctx.closePath();
    // ctx.strokeStyle = "Black";
    // ctx.stroke();
    ctx.fillStyle = c;
    ctx.fill();
}

function building_designs(ctx, x, y, px, c = "", d = 0) {
    let b;
    d = parseInt(d);
    c = "#063060";

    switch (d) {
        case 1:

            ctx.beginPath();

            ctx.fillStyle = c;
            ctx.fillRect(x * px, y * px, px, px);

            ctx.fillStyle = pSBC(0.4, ctx.fillStyle);
            // 10 Array 4px each
            for (let iy = 0; iy < 10; iy++) {

                for (let ix = 0; ix < 10; ix++) {

                    if (ix == 10 - 1) {
                        // ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);
                        continue;
                    }

                    if (iy == 10 - 1) {
                        ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);

                        let tmpFs = ctx.fillStyle;

                        ctx.fillStyle = pSBC(-0.9, ctx.fillStyle);
                        ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4) + 1, 4, 1);

                        ctx.fillStyle = tmpFs;
                        continue;
                    }

                    if (iy % 2 == 0) {
                        ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);
                        continue;
                    }

                    if (ix % 2 == 0) {
                        ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);
                        continue;
                    }



                    // ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);
                }
            }

            ctx.closePath();
            break;

        case 2:

            ctx.beginPath();

            ctx.fillStyle = c;
            ctx.fillRect(x * px, y * px, px, px);

            ctx.fillStyle = pSBC(0.4, ctx.fillStyle);
            // 10 Array 4px each
            for (let iy = 0; iy < 10; iy++) {

                for (let ix = 0; ix < 10; ix++) {

                    if (ix == 10 - 1) {
                        // ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);
                        continue;
                    }

                    if (iy == 10 - 1) {
                        ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);

                        let tmpFs = ctx.fillStyle;
                        ctx.fillStyle = pSBC(-0.9, ctx.fillStyle);
                        ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4) + 1, 4, 1);
                        ctx.fillStyle = tmpFs;

                        continue;
                    }

                    // if (iy % 2 == 0) {
                    //     ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);
                    //     continue;
                    // }

                    if (![1, 6].includes(ix)) {
                        let tmpFs = ctx.fillStyle;
                        ctx.fillStyle = pSBC(0.7, ctx.fillStyle);
                        ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);
                        ctx.fillStyle = tmpFs;

                        if (ix == 8) {
                            ctx.fillStyle = pSBC(0.4, c);
                            ctx.fillRect((x * px) + (ix * 4) + 3, (y * px) + (iy * 4), 1, 4);
                            ctx.fillStyle = tmpFs;
                            continue;
                        }

                        continue;
                    }

                    if (ix == 1) {
                        ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);
                        continue;
                    }

                    if (ix == 6) {
                        ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);
                        continue;
                    }






                    // ctx.fillRect((x * px) + (ix * 4), (y * px) + (iy * 4), 4, 4);
                }
            }

            ctx.closePath();
            break;
        default:
            ctx.beginPath();

            ctx.fillStyle = c;
            ctx.fillRect(x * px, y * px, px, px);

            ctx.closePath();
            break;
    }


}

function block_designs(ctx, x, y, px, c = "", d = 0) {
    let b;
    d = parseInt(d);
    ctx.beginPath();
    d = 0
    switch (d) {
        // case 1:

        //     ctx.fillStyle = c;
        //     ctx.fillRect(x * px, y * px, px, px);

        //     // Border
        //     b = Math.floor(px * 0.1);
        //     ctx.fillStyle = c;
        //     ctx.fillRect((x * px) + b, (y * px) + b, px - (b * 2), px - (b * 2));

        //     ctx.strokeStyle = pSBC( 0.90, c);
        //     ctx.strokeRect((x * px) + b, (y * px) + b, px - (b * 2), px - (b * 2));
        //     break;
        // case 2:

        //     ctx.fillStyle = pSBC( -0.70, c);
        //     ctx.fillRect(x * px, y * px, px, px);

        //     b = Math.floor(px / 2);

        //     ctx.strokeStyle = pSBC( -0.20, c);
        //     ctx.fillStyle = c;

        //     ctx.arc((x * px) + b, (y * px) + b, px / 4, 0, 2 * Math.PI);
        //     ctx.stroke();
        //     ctx.fill();
        //     break;
        default:

            ctx.fillStyle = c;
            ctx.fillRect(x * px, y * px, px, px);

            let n = random_num(5, 8);
            let r = 2;
            ctx.beginPath();
            ctx.save();
            ctx.translate((x * px) + (px / 2), (y * px) + (px / 2));
            ctx.moveTo(0, 0 - r);

            for (let i = 0; i < n; i++) {
                ctx.rotate(Math.PI / n);
                ctx.lineTo(0, 0 - (r * n));

                ctx.rotate(Math.PI / n);
                ctx.lineTo(0, 0 - (r));

            }

            ctx.restore();
            ctx.closePath();
            ctx.strokeStyle = pSBC(0.7, c);
            ctx.stroke();

            break;
    }
    ctx.closePath();
}

function gravity() {

    if (((player.y + (player.px / 2)) + player.px) > world_parameters.h * world_parameters.px) {
        player.state = "game_over";
        player.y = player.y + player.dg;
    } else {
        player.y = player.y + player.dg;
        player.g = player.g + player.ag;
    }
    player["img"] = p_img["b-1"];
    // create_player_graphics(player);

    // Change to update
    // setTimeout( () => {
    //     gravity();
    // }, 250);

}

function level() {

    let id = "world_canvas";
    let c = document.getElementById(id);
    if ((player.x + (player.lpx)) + player.px > c.width) {
        player.state = "game_over";
        player.x = player.x + (player.lpx);
    } else {
        player.x = player.x + (player.lpx);
    }



    // setTimeout( () => {
    //     level();
    // }, 50)
}

function camera_movement() {

    let cc = document.getElementById("canvas_cont");

    if (player.x > cc.offsetWidth / 2) {
        cc.scrollLeft = (player.x - cc.offsetWidth / 2);
        let pc = document.getElementById("player_canvas");
        pc.style.left = (player.x - cc.offsetWidth / 2);
    }


    // if (player.y > window_screen.offsetHeight / 2) {
    //     cc.scrollTop = (player.y - cc.offsetHeight / 2);
    // }

}

function fly() {

    player.y = player.y - (parseInt(player.px) - parseInt(player.ff));

    player.g = player.dg;
    player.f = 0;
    player.img = p_img["b-2"];

}

function dash() {

    player.x = player.x + 10 + (parseInt(player.px) - parseInt(player.ff));

    player.g = player.dg;
    player.f = 0;
    player.img = p_img["b-2"];

}

function update(gt = 0, lt = 0) {

    if (gt >= (250 - player.g > 150 ? 250 - player.g : 50) && player.f != 1) {
        // if (gt >= 250) {
        gt = 0;
        gravity();

    }

    if (lt >= 50) {
        level();
        lt = 0;
    }

    create_player_graphics(player);
    camera_movement();
    check_collision()
    update_score();

    if (player.state === "game_over") {
        // Record High Score
        d_sound.play();
        redirectToWebsite("http://192.168.70.205/crossyroad2/")
        let r_data = {};
        r_data["name"] = document.getElementById("playername").value;
        r_data['cmd'] = "update_score";
        r_data['score'] = player.s;

        $.ajax({
            url: "api/world_fx.php",
            type: "post",
            data: r_data,
            success: (res) => {
                // console.log(res);
                check_allow_config();
                setTimeout(() => {
                    if (confirm("Game Over (Score is recorded), wanna play again?")) {
                        game_start(1);
                    } else {
                        document.getElementById("start_btn").style.display = "block ";
                        document.getElementById("playing_status").style.display = "none";
                    }
                }, 100)

            }
        })

        return;
    }

    setTimeout(() => {
        gt = gt + (1000 / 60);
        lt = lt + (1000 / 60);
        update(gt, lt);
    }, 1000 / 60);
}

function update_score() {
    document.getElementById("player_score").innerText = player.s;
}

function check_collision() {
    let wp = world_parameters;
    let p = player;
    // let mnx = Math.floor(p.x / wp.px);
    // let mxx = Math.floor((p.x + p.px) / wp.px);

    // let mny = Math.floor(p.y / wp.px);
    // let mxy = Math.floor((p.y + p.px) / wp.px);

    let mnx = Math.floor(p.x / wp.px);
    let mxx = Math.floor((p.x + p.px) / wp.px);

    let mny = Math.floor(p.y / wp.px);
    let mxy = Math.floor((p.y + p.px) / wp.px);

    let sr = wp.grid_level.indexOf(mxx);

    if (sr >= 0) {
        player.s = player.s + 1;
        world_parameters.grid_level.splice(sr, 1);
        const instance = p_sound.cloneNode();
        instance.play()
    }



    if (wp.grid[mnx]) {

        if (!wp.grid[mnx][mny]) {
            player.state = "game_over";
            return;
        }

        if (!wp.grid[mnx][mxy]) {
            player.state = "game_over";
            return;
        }

        if (wp.grid[mnx][mny]['block'] || wp.grid[mnx][mxy]['block']) {
            player.state = "game_over";
            return;
        }
    }

    if (wp.grid[mxx]) {

        if (!wp.grid[mxx][mny]) {
            player.state = "game_over";
            return;
        }

        if (!wp.grid[mxx][mxy]) {
            player.state = "game_over";
            return;
        }

        if (wp.grid[mxx][mny]['block'] || wp.grid[mxx][mxy]['block']) {
            player.state = "game_over";
            return;
        }
    }

}




function random_num(min = 0, max = 0) {
    return Math.floor(Math.random() * max) + min;
}

/**
 * Version 4.0
 * By Pimp Trizkit
 * https://stackoverflow.com/users/693927/pimp-trizkit
 * */
const pSBC = (p, c0, c1, l) => {
    let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == "string";
    if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
    if (!this.pSBCr) this.pSBCr = (d) => {
        let n = d.length, x = {};
        if (n > 9) {
            [r, g, b, a] = d = d.split(","), n = d.length;
            if (n < 3 || n > 4) return null;
            x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
        } else {
            if (n == 8 || n == 6 || n < 4) return null;
            if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
            d = i(d.slice(1), 16);
            if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
            else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
        } return x
    };
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) return null;
    if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
    else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
    else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}