console.log("成功加载 HtmlViewer 2.0。\n作者：Ruize Sun\n感谢使用！");
// 添加 CSS
let styles = document.createElement("style");
styles.innerHTML =
	".HtmlViewer{position:absolute;width:640px;height:480px;z-index:9999;top:4px;right:4px;background-color:white;border:2px solid black;border-radius:6px;animation: fadein 0.15s;}#HtmlViewerCloseButton{text-decoration:none;color:red;font-size:1.5rem;cursor: pointer;}.HtmlViewerWindowTitle{background:linear-gradient(to bottom,#ccc,#999);padding: 4px;cursor: default;user-select: none;}.HtmlViewerWindowTitle > span{color:white;font-weight: bold;}.HtmlViewerBox{padding:6px;}#HtmlViewerCloseButton:hover{color:#E00}@keyframes fadein{0%{opacity:0;transform:translateY(100px);}100%{opacity:1;transform:translateY(0px);}}";

document.head.appendChild(styles);
// 添加 Div 元素
div = document.createElement("div");
div.classList.add("HtmlViewer");
div.classList.add("HtmlViewerWindow");
div.setAttribute("id", "HtmlViewerWindow");
div.innerHTML =
	'<div class="HtmlViewerWindowTitle" id="HtmlViewerWindowTitle"><a href=\'javascript:document.body.removeChild(document.getElementById("HtmlViewerWindow"));\' id=\'HtmlViewerCloseButton\'>●</a>&nbsp;&nbsp;<span>HtmlViewer</span></div><div class="HtmlViewerBox"></div>';

async function windowMovingEvent() {
	var e = 0,
		o = 0,
		n = !1;
	function t(e) {
		return document.getElementById(e);
	}
	t("HtmlViewerWindowTitle").addEventListener("mousedown", function (m) {
		m = m || window.event;
		(e = m.pageX - t("HtmlViewerWindow").offsetLeft),
			(o = m.pageY - t("HtmlViewerWindow").offsetTop),
			(n = !0);
	}),
		(document.onmousemove = function (m) {
			m = m || window.event;
			var u = 0,
				d = 0;
			!0 === n &&
				((u = m.pageX - e),
				(d = m.pageY - o),
				(t("HtmlViewerWindow").style.left = u + "px"),
				(t("HtmlViewerWindow").style.top = d + "px"));
		}),
		(document.onmouseup = function () {
			n = !1;
		});
}

// 主 Class
class HtmlViewer {
	constructor(runtime) {
		this.runtime = runtime;
	}

	getInfo() {
		return {
			id: "HtmlViewer2d1",
			name: "HtmlViewer 2.1",
			blocks: [
				{
					opcode: "showHtml",
					blockType: Scratch.BlockType.COMMAND,
					text: "显示HTML代码 [html] (不支持 JS)",
					arguments: {
						html: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "<p>Hello, World!</p>",
						},
					},
				},
				{
					opcode: "showHtmlByList",
					blockType: Scratch.BlockType.COMMAND,
					text: "根据列表 [LIST] 显示HTML代码（不支持JS）",
					arguments: {
						LIST: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "list",
						},
					},
				},
				{
					opcode: "closeHtmlViewer",
					blockType: Scratch.BlockType.COMMAND,
					text: "关闭 HTML 显示窗口",
					arguments: {},
				},
			],
		};
	}

	showHtml(args) {
		const html = args.html;
		div.getElementsByClassName("HtmlViewerBox")[0].innerHTML = html;
		document.body.appendChild(div);
		windowMovingEvent();
	}
	showHtmlByList(args, util) {
		var html = util.target
			.lookupVariableByNameAndType(
				Scratch.Cast.toString(args.LIST),
				"list"
			)
			.value.join("\n");
		div.getElementsByClassName("HtmlViewerBox")[0].innerHTML = html;
		document.body.appendChild(div);
		windowMovingEvent();
	}
	closeHtmlViewer(args) {
		document.body.removeChild(document.getElementById("HtmlViewerWindow"));
	}
}

Scratch.extensions.register(new HtmlViewer());
