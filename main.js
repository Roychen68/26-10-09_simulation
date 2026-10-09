function setting() {
        window['lang'] = localStorage.getItem("lang") ?? "zh-tw"
    
    if (window['lang'] == "en") {
        $("header").html(`
            <nav class="navbar gap-3 d-block">
            <div class="d-flex align-items-center">
            <div class="logo">
            <img src="logo.png" alt="logo" class="logo">
            </div>
            <div class="titles d-lg-flex d-block align-items-center gap-3">
            <h1 tabindex="0">Aurora Finland</h1>
            <span class="slogan d-none d-md-block" tabindex="0">Finland Aurora Travel Guide</span>
            </div>
            <div class="functions d-flex align-items-center ms-auto gap-3">
            <button class="navbar-toggler d-lg-none d-block" tabindex="0" data-bs-target="#nav" data-bs-toggle="collapse">
            <span tabindex="0" class="navbar-toggler-icon"></span>
            </button>
            <select name="theme" id="theme" class="form-control">
            <option value="light">🌝</option>
            <option value="dark">🌚</option>
            </select>
            <select name="lang" id="lang" class="form-control">
            <option value="en">English</option>
            <option value="zh-tw">中文</option>
            </select>
            <select name="font-size" id="font-size" class="form-control">
            <option value="14">A-</option>
            <option value="16">A</option>
            <option value="20">A+</option>
            </select>
            </div>
            </div>
            <nav class="navbar-dropdown row show" id="nav">
            <a href="index.html" class="link col-12 col-md-3">Home</a>
            <a href="forecast.html" class="link col-12 col-md-3">Aurora Forecast</a>
            <a href="journal.html" class="link col-12 col-md-3">Travelers' Journals</a>
            <a href="login.html" class="link col-12 col-md-3">Administration</a>
            </nav>
            </nav>
            `)
    } else {
        $("header").html(`
            <nav class="navbar gap-3 d-block">
            <div class="d-flex align-items-center">
            <div class="logo">
            <img src="logo.png" alt="logo" class="logo">
            </div>
            <div class="titles d-lg-flex d-block align-items-center gap-3">
            <h1 tabindex="0">Aurora Finland</h1>
            <span class="slogan d-none d-md-block" tabindex="0">芬蘭極光旅遊資訊平台</span>
            </div>
            <div class="functions d-flex align-items-center ms-auto gap-3">
            <button class="navbar-toggler d-lg-none d-block" tabindex="0" data-bs-target="#nav" data-bs-toggle="collapse">
            <span tabindex="0" class="navbar-toggler-icon"></span>
            </button>
            <select name="theme" id="theme" class="form-control">
            <option value="light">🌝</option>
            <option value="dark">🌚</option>
            </select>
            <select name="lang" id="lang" class="form-control">
            <option value="en">English</option>
            <option value="zh-tw">中文</option>
            </select>
            <select name="font-size" id="font-size" class="form-control">
            <option value="14">A-</option>
            <option value="16">A</option>
            <option value="20">A+</option>
            </select>
            </div>
            </div>
            <nav class="navbar-dropdown row show" id="nav">
            <a href="index.html" class="link col-12 col-md-3">首頁</a>
            <a href="forecast.html" class="link col-12 col-md-3">極光預報</a>
            <a href="journal.html" class="link col-12 col-md-3">旅人日記</a>
            <a href="login.html" class="link col-12 col-md-3">系統管理</a>
            </nav>
            </nav>`)
        }
        // font-size setting
    window['font-size'] = localStorage.getItem("font-size")
    $("#font-size").val(window['font-size'])
    $("html").css("font-size",window['font-size']+"px")
    // theme setting
    window['theme'] = localStorage.getItem("theme")
    $("#theme").val(window['theme'])
    $("html").attr("data-bs-theme",window['theme'])
    $("#lang").val(window['lang'])
    $("html").attr("lang",window['lang'])
        const path = location.pathname.split("/").pop()
        if ($(`a.link[href="${path}"]`).length > 0) {
            $(`a.link[href="${path}"]`).addClass("active")
        } else if (path == "") {
            $(`a.link[href="index.html"]`).addClass("active")
        } else {
            $(`a.link[href="login.html"]`).addClass("active")
        }
}
setting()

$("#font-size").on("change",function () {
    window['font-size'] = $(this).val()
    localStorage.setItem("font-size",$(this).val())
    location.reload()
})
$("#theme").on("change",function () {
    window['theme'] = $(this).val()
    localStorage.setItem("theme",$(this).val())
    location.reload()
})

$("#lang").on("input",function () {
    console.log($(this).val());
    
    window['lang'] = $(this).val()
    localStorage.setItem("lang",$(this).val())
    location.reload()
})

function level(data) {
    if (data['kp_index'] >= 5 && data['cloud_cover'] <= 30 && data['aurora_probability'] >= 70) {
        return `<span class="bg-success p-1 rounded-1 text-light">${window.lang == "en" ? "高" : "H"}</span>`
    } else if (data['kp_index'] >= 3 && data['cloud_cover'] <= 50 && data['aurora_probability'] >= 50) {
        return `<span class="bg-warning p-1 rounded-1 text-light">${window.lang == "en" ? "中" : "M"}</span>`
    } else {
        return `<span class="bg-danger p-1 rounded-1 text-light">${window.lang == "en" ? "低" : "L"}</span>`
    }
}

function cut(text) {
    if (text.length > 30) {
        return `${text.slice(0,30)}<span class="readmore d-none">${text.slice(30)}</span><a class="link-primary readtoggle" href="#">...閱讀更多</a>`
    } else {
        return text
    }
}

function empty() {
    return `<span class="bg-secondary p-1 rounded-1 text-light">無資料</span>`
}

function sorting(key,data) {
    const object = key.split("+")[0]
    const order = key.split("+")[1]
    if (order == "asc") {
        return data.sort((a,b) => a[object] - b[object])
    } else {
        return data.sort((a,b) => b[object] - a[object])
    }
}

$(document).on("click",".readtoggle",function () {
    $(this).prev().toggleClass("d-none")
    $(this).text(
        $(this).text() == "閱讀更少" ? "...閱讀更多" : "閱讀更少"
    )
})