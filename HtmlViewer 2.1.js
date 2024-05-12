console.log("成功加载 HtmlViewer 2.0。\n作者：Ruize Sun\n感谢使用！");
// HtmlViewer 窗口初始化
let styles = document.createElement("style");
styles.innerHTML =
	".HtmlViewer{position:absolute;width:1024px;height:768px;z-index:9999;top:4px;right:4px;overflow:hidden;background-color:white;border:2px solid black;border-radius:6px;animation: fadein 0.15s;}#HtmlViewerCloseButton{text-decoration:none;color:red;font-size:1.5rem;cursor: pointer;}.HtmlViewerWindowTitle{background:linear-gradient(to bottom,#ccc,#999);padding: 4px;cursor: default;user-select: none;}.HtmlViewerWindowTitle > span{color:white;font-weight: bold;}.HtmlViewerBox{padding:6px;}#HtmlViewerCloseButton:hover{color:#E00}@keyframes fadein{0%{opacity:0;transform:translateY(100px);}100%{opacity:1;transform:translateY(0px);}}.HtmlViewerProjectIframeBox{height:100%;width:100%;overflow:hidden;}";

document.head.appendChild(styles);

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
// 作品展示UI更改
function changeButton() {
	/**
	document
		.getElementById("HtmlViewerIframe")
		.getElementsByClassName(
			"ma-2 sd v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default accent"
		)[0].href = "https://www.40code.com/#page=work&id=" + args.projectid;
	document
		.getElementById("HtmlViewerIframe")
		.getElementsByClassName(
			"ma-2 sd v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default accent"
		)[0]
		.getElementById("HtmlViewerIframe")
		.getElementsByClassName("v-btn__content")[0].innerHTML = "重新加载作品";
	document
		.getElementById("HtmlViewerIframe")
		.getElementsByClassName(
			"v-icon notranslate mdi mdi-search theme--light"
		)[0]
		.parentNode.parentNode.setAttribute("disabled", "true");
	document
		.getElementById("HtmlViewerIframe")
		.getElementsByClassName(
			"v-icon notranslate mdi mdi-search theme--light"
		)[0]
		.parentNode.setAttribute("style", "cursor: no-drop;");*/
}
// Turbo 平台支持
// 主 Class
class HtmlViewer {
	constructor(runtime) {
		this.runtime = runtime;
	}

	getInfo() {
		return {
			id: "HtmlViewer",
			name: "HtmlViewer 2.1",
			blocks: [
				{
					opcode: "showHtml",
					blockType: Scratch.BlockType.COMMAND,
					text: "显示HTML代码 [html]",
					arguments: {
						html: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "<p>Hello, World!</p>",
						},
					},
				},
				{
					opcode: "showProject",
					blockType: Scratch.BlockType.COMMAND,
					text: "窗口显示作品 [projectid] ",
					arguments: {
						projectid: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "1000",
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
		const html = markdownToHtml(args.html);
		div.getElementsByClassName("HtmlViewerBox")[0].innerHTML = html;
		document.body.appendChild(div);
		windowMovingEvent();
	}
	showProject(args, util) {
		if (isNaN(Number(args.projectid, 10))) {
			console.error("作品ID不合法");
		} else {
			const html =
				"<div class='HtmlViewerProjectIframeBox'><iframe id='HtmlViewerIframe' src='https://www.40code.com/#page=work&id=" +
				args.projectid +
				"' height='200%' width='100%' style='margin-top:-170px;' scrolling='no' onload='changeButton()'></iframe></div>";
			div.getElementsByClassName("HtmlViewerBox")[0].innerHTML = html;
			document.body.appendChild(div);
			windowMovingEvent();
		}
	}
	closeHtmlViewer(args) {
		document.body.removeChild(document.getElementById("HtmlViewerWindow"));
	}
}
Scratch.extensions.register(new HtmlViewer());
