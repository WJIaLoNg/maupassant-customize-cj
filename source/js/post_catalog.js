/**
 * 生成文章的目录
 * @param from 从哪里寻找目录
 * @param to 添加目录到哪里
 * @param marginSpace 不同等级的标题错开多少距离
 * @param success 成功后调用的方法
 */
function generateCatalogs(from, to, marginSpace, success) {
    // 获取所有的标题
    let titles = $(`${from} h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]`);
    // 得到标题数字的最小数字，用来计算每个标题的margin-left间距，例如["h2", "h3"]则返回2
    let minTitleNumber = Math.min.apply(null, [...new Set(titles.get().map(value => value.tagName[1]))]);
    // 如果没有title的话返回0
    minTitleNumber = minTitleNumber === Infinity ? 0 : minTitleNumber;
    // 创建一个目录盒子
    let catalogs = $("<div class='pl-4 pt-4 pb-2 text-truncate'></div>");
    let idNum = 1;
    minTitleNumber && (() => {
        // 开始生成目录
        titles.each(function () {
            // 修复中文目录问题，将锚点改为数字
            $(this).attr('id', guid());
            // 得到标题等级，用来做margin-left处理
            let titleLevel = parseInt($(this).prop("tagName")[1]) - minTitleNumber;
            catalogs.append(
                `<p class='catalog-item'>
                        <a href="javascript:void(0)" style="margin-left: ${titleLevel * marginSpace}rem;" data-catalog-target="${$(this).attr('id')}">${$(this).text()}</a>
                    </p>`
            );
        });
        // 添加目录到目标盒子中
        $(to).append(catalogs);
        // 为目录中每个链接添加一个点击事件
        $(`${to} a[data-catalog-target]`).on('click', function (event) {
            let titleId = `#${$(this).attr("data-catalog-target")}`;
            changeUrlAnchor(titleId);
            let offsetTop = $(titleId).offset().top - 20;
            $("html,body").animate({scrollTop: offsetTop}, 300);
            event.preventDefault();
        });
        // 调用用户自定义的成功添加目录后的方法
        success();
    })();
}

function guid() {
    return 'xxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 改变URL中的锚点
 * @param anchorId 锚点ID
 */
function changeUrlAnchor(anchorId) {
    let location = window.location;
    let origin = location.origin;
    let pathname = location.pathname;
    let baseUrl = origin + pathname;
    window.history.replaceState(null, null, baseUrl + anchorId);
}

$(document).ready(function () {
//  生成文章的目录
    generateCatalogs("#post-content", "#catalogs", 1.125, () => {
        // $("#catalogBox").addClass("d-block");
        // $("#catalogButton").addClass("d-block");
    });
});