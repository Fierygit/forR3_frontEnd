
let path = [
    "image/ling2.webp",
    "image/ling5.jpg",
    "image/jiao.jpg",
    "image/cang.jpg",
    "image/ling7.png",
    "image/ying.png",
    "image/cang1.png",
    "image/ling6.jpeg",
    "image/ling1.jpg",
    "image/ling3.jpg",
    "image/bai.jpeg",
    "image/lingLast.png",
    "image/last.png"];


let msg = [
    "琳儿胸大还可爱吗？😕",
    "你在看哪儿？是及腰的长发吗？",
    "小娇就一张",
    " 向魔鬼道歉是没有用的！",
    "阳光、沙滩、樱花、还有我~！",
    " 花里胡哨",
    " 不会再让伙伴牺牲！！！",
    " 我眼里有光！",
    "阳光、沙滩、没有你！",
    "选一个吧！ 我全都要",
    " 一只可恶的小白",
    "  好像看过这张了，跳过吧！",
    " 图片展示经得小白允许"
];

let lineColor = [
    "line4",
    "line2",
    "line3",
    "line4",
    "line5",
    "line6",
    "line7",
    "line8",
    "line9",
    "line10",
    "line11",
    "line12",
    "line13",
]

// 加载图片


window.onload = load;

function load() {
    getTable();
    showImg();
}

function showImg() {
 //   console.log("test");
    let v = document.getElementById("imgTable");
    for (let item = 0; item < path.length; item++) {
        let temp = path[item];
        v.innerHTML += "" +
            "<div class=\"showImg\">\n" +
            "        <img onclick='img()' src=" + temp + "  alt=\"加载中请稍后！\" style=\"width: 100%;  height: auto\">\n" +
            "\n" +
            "        <div class=" + lineColor[item] + "></div>\n" +
            "\n" +
            "        <div>" + msg[item] + "</div>\n" +
            "\n" +
            "    </div>";
        //console.log(path[item])
    }
}

function getTable(){
    //console.log("test");
    $.ajax({
        url: "http://49.235.13.36:4666/Info/getLatesd",
        type: "POST",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            if (data.code === 0) {
                let v = document.getElementById("showTrTh");
                v.innerHTML = "";
                let temp = data.data;
                for(let item = 0; item < temp.length; item++){
                    v.innerHTML += "<tr >\n" +
                        "<td style=\"padding-left: 15px\">"+temp[item].date+"</td>\n" +
                        "<td>" + temp[item].info+"</td>\n" +
                        "</tr>";
                }
            } else {

            }
        }
    });
}

function img() {
    return false;
}

function headTo(){
    let url = "./info.html";
    url = encodeURI(url);
    window.location.href = url;
}

function sendMsg() {
    let msg = document.getElementById("input1").value;
    if (msg.length === 0) {
        addMsg("请输入兑换码", "hf", "red");
        return;
    }
    addMsg(msg + " 正在给全站玩家兑换，请稍候！", "hf", "green");
    $.ajax({
        url: "http://49.235.13.36:4666/Info/addOne",
        data: {
            info: msg
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.code === 0) {
                getTable();
                addMsg("", "hf", "green");
                document.getElementById("hf").innerHTML = " <div style=\"display:inline-block;\" id = \"sucMsg\">"+msg+"" +
                    "  兑换成功!   </div>\n" +
                    "            <button onclick='headTo()' type=\"button\" class=\"btn btn-default btn-xs\" id = \"btn\"\n" +
                    " style=\" display:inline-block; margin-left: 20px;\n" +
                    "background-color: #63ff52;color:#df48ff;\n"   +
                    "visibility: visible\">查看结果</button>";
                //console.log(data);
                localStorage.removeItem("data");
                localStorage.setItem("data",data.data);

            } else {
                addMsg("服务器错误", "sucMsg");
            }
        }
    });
}

function addMsg(tem1, tem2, tem3 = "blue") {
    let x = document.getElementById(tem2);
    x.innerText = tem1;
    x.style.color = tem3;
    x.style.fontFamily = "Arial";
    x.style.fontSize = "larger";
    //  alert("success1")
}
var datat;
function getMsg() {
    let msg = document.getElementById("input2").value;
    //console.log("fdf");
    if (msg.length === 9) {

        $.ajax({
            url: "Http://statistics.pandadastudio.com/player/simpleInfo",
            data: {
                uid: msg
            },
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.code === 0) {
                    //console.log(data);
                    datat = data;
                    addMsg("欢迎" + data.data.title + data.data.name + ",请点击添加！", "succesMsg", "red");
                } else {
                    addMsg(data.msg, "succesMsg", "red");
                }
            }
        });
    } else {
        addMsg("", "succesMsg", "red");
    }
}


function addOne() {
    let msg = document.getElementById("input2").value;
    if (msg.length !== 9) {
        addMsg("请输入正确的UID", "succesMsg", "red");
        return;
    }
    if (datat.code === 0) {
        addMsg(datat.data.name + " 正在添加，请稍候！", "succesMsg", "black");

        $.ajax({
            url: "http://49.235.13.36:4666/usr/add",
            data: {
                uid: msg
            },
            type: "POST",
            dataType: "json",
            success: function (data) {
                if (data.code === 0) {
                    document.getElementById("input2").value = "";
                    addMsg(datat.data.name + data.data + "!", "succesMsg");
                } else addMsg("服务器错误，请联系Firefly！", "succesMsg");
            }
        });
    } else {
        addMsg(datat.msg, "succesMsg", "black");
    }

}