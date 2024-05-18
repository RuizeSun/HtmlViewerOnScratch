console.log("成功加载 HtmlViewer 2.0。\n作者：Ruize Sun\n感谢使用！");
// HtmlViewer 窗口初始化
let styles = document.createElement("style");
styles.innerHTML =
	".HtmlViewer{position:absolute;width:720px;height:640px;z-index:9999;top:4px;right:4px;overflow:hidden;background-color:white;border:2px solid black;border-radius:6px;animation: fadein 0.15s;}#HtmlViewerCloseButton{text-decoration:none;color:red;font-size:1.5rem;cursor: pointer;}.HtmlViewerWindowTitle{background:linear-gradient(to bottom,#ccc,#999);padding: 4px;cursor: default;user-select: none;}.HtmlViewerWindowTitle > span{color:white;font-weight: bold;}.HtmlViewerBox{padding:6px;}#HtmlViewerCloseButton:hover{color:#E00}@keyframes fadein{0%{opacity:0;transform:translateY(100px);}100%{opacity:1;transform:translateY(0px);}}.HtmlViewerProjectIframeBox{height:100%;width:100%;overflow:hidden;}";

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
					blockType: Scratch.BlockType.LABEL,
					text: "基本功能",
				},
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
					opcode: "closeHtmlViewer",
					blockType: Scratch.BlockType.COMMAND,
					text: "关闭 HTML 显示窗口",
					arguments: {},
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: "社区功能",
				},
				{
					opcode: "showProject",
					blockType: Scratch.BlockType.COMMAND,
					text: "显示作品 [projectid] ",
					arguments: {
						projectid: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "8",
						},
					},
				},
				{
					opcode: "showForum",
					blockType: Scratch.BlockType.COMMAND,
					text: "显示论坛帖子 [postid] ",
					arguments: {
						postid: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "198",
						},
					},
				},
				{
					opcode: "showUser",
					blockType: Scratch.BlockType.COMMAND,
					text: "显示用户主页 [usrid] ",
					arguments: {
						usrid: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "40",
						},
					},
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: "实验功能",
				},
				{
					opcode: "gogithub",
					blockType: Scratch.BlockType.COMMAND,
					text: "Github [type] [id]",
					arguments: {
						type: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "res",
							menu: "githubType",
						},
						id: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "RuizeSun/HtmlViewerOnScratch",
						},
					},
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: "可到Github仓库进行Bug反馈",
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: "（作者：RuizeSun）",
				},
			],
			menus: {
				githubType: {
					acceptReporters: false,
					items: [
						{
							text: "仓库",
							value: "res",
						},
						{
							text: "用户",
							value: "usr",
						},
					],
				},
			},
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
			window.open(
				"https://www.40code.com/#page=work&id=" + args.projectid,
				"_blank",
				"top=4,right=4,toolbar=no,menubar=no,location=no, status=no"
			);
		}
	}
	showUser(args, util) {
		if (isNaN(Number(args.usrid, 10))) {
			console.error("用户ID不合法");
		} else {
			window.open(
				"https://www.40code.com/#page=user&id=" + args.usrid,
				"_blank",
				"top=4,right=4,toolbar=no,menubar=no,location=no, status=no"
			);
		}
	}
	showForum(args, util) {
		if (isNaN(Number(args.postid, 10))) {
			console.error("帖子ID不合法");
		} else {
			window.open(
				"https://www.40code.com/#page=post&id=" + args.postid,
				"_blank",
				"top=4,right=4,toolbar=no,menubar=no,location=no, status=no"
			);
		}
	}
	closeHtmlViewer(args) {
		document.body.removeChild(document.getElementById("HtmlViewerWindow"));
	}
	gogithub(args) {
		if (args.type == "res") {
			const uri = args.id
				.replaceAll("%", "_")
				.replaceAll("\\", "_")
				.replaceAll("*", "_")
				.replaceAll("..", "_");
			window.open(
				"https://www.github.com/" + uri,
				"_blank",
				"top=4,right=4,toolbar=no,menubar=no,location=no, status=no"
			);
		} else {
			const uri = args.id
				.replaceAll("%", "_")
				.replaceAll("\\", "_")
				.replaceAll("*", "_")
				.replaceAll("..", "_");
			window.open(
				"https://www.github.com/" + uri + "/",
				"_blank",
				"toolbar=no,menubar=no,location=no, status=no"
			);
		}
	}
}
Scratch.extensions.register(new HtmlViewer());
