console.log("正在加载 HtmlViewer 2.1.6。\n作者：Ruize Sun\n感谢使用！");

function vboxStyleInit() {
	/*
	【作用】窗口样式初始化
	【原理】这个函数会定义 div#HtmlViewerStyle 在 head 标签中。
	*/
	let styles = document.createElement("style");
	styles.innerHTML = ".HtmlViewer{position:absolute;z-index:9999;top:4px;right:4px;overflow:hidden;background-color:white;border:2px solid black;border-radius:6px;animation: fadein 0.15s;}#HtmlViewerCloseButton{text-decoration:none;color:red;font-size:1.5rem;cursor: pointer;}.HtmlViewerWindowTitle{background:linear-gradient(to bottom,#ccc,#999);padding: 4px;cursor: default;user-select: none;}.HtmlViewerWindowTitle > span{color:white;font-weight: bold;}.HtmlViewerBox{padding:6px;}#HtmlViewerCloseButton:hover{color:#E00}@keyframes fadein{0%{opacity:0;transform:translateY(100px);}100%{opacity:1;transform:translateY(0px);}}.HtmlViewerProjectIframeBox{height:100%;width:100%;overflow:hidden;}"; // 默认样式
	styles.setAttribute("id", "HtmlViewerStyle");
	document.head.appendChild(styles);
	let sizestyles = document.createElement("style");
	sizestyles.innerHTML = ".HtmlViewer{width: 640px;height: 480px;}";
	sizestyles.setAttribute("id", "HtmlViewerSizeStyle");
	document.head.appendChild(sizestyles);
}

function vboxInit() {
	/*
	【作用】窗口样式初始化
	【原理】这个函数会定义 div#HtmlViewerStyle 在 head 标签中。
	*/
	div = document.createElement("div");
	div.classList.add("HtmlViewer");
	div.classList.add("HtmlViewerWindow");
	div.setAttribute("id", "HtmlViewerWindow");
	div.innerHTML = '<div class="HtmlViewerWindowTitle" id="HtmlViewerWindowTitle"><a href=\'javascript:document.body.removeChild(document.getElementById("HtmlViewerWindow"));\' id=\'HtmlViewerCloseButton\'>●</a>&nbsp;&nbsp;<span class="HVTitle">HtmlViewer</span></div><div class="HtmlViewerBox"></div>';
}

function markdownToHtmlS(md) {
	/*
	【作用】Markdown 带过滤转换 HTML 
	【原理】检测 markdownToHtml 是否被定义，如果没有就警告并输出原文，如果有就调用。
	*/
	if (typeof markdownToHtml !== "undefined") {
		return markdownToHtml(md);
	} else {
		console.warn("非 40code 社区，无法使用安全过滤及 Markdown 渲染。");
		return md;
	}
}

async function windowMovingEvent() {
	/*
	【作用】窗口移动事件
	【原理】检测窗口移动事件，并调整位置。
	*/
	var e = 0,
		o = 0,
		n = !1;
	function t(e) {
		return document.getElementById(e);
	}
	t("HtmlViewerWindowTitle").addEventListener("mousedown", function (m) {
		m = m || window.event;
		(e = m.pageX - t("HtmlViewerWindow").offsetLeft), (o = m.pageY - t("HtmlViewerWindow").offsetTop), (n = !0);
	}),
		(document.onmousemove = function (m) {
			m = m || window.event;
			var u = 0,
				d = 0;
			!0 === n && ((u = m.pageX - e), (d = m.pageY - o), (t("HtmlViewerWindow").style.left = u + "px"), (t("HtmlViewerWindow").style.top = d + "px"));
		}),
		(document.onmouseup = function () {
			n = !1;
		});
}

/*      主 Class     */
vboxStyleInit();
vboxInit();
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
					text: "窗口样式设置",
				},
				{
					opcode: "setPresetStyle",
					blockType: Scratch.BlockType.COMMAND,
					text: "设置预设窗口样式为 [preset]",
					arguments: {
						preset: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "default",
							menu: "presetstyle",
						},
					},
				},
				{
					opcode: "setStyle",
					blockType: Scratch.BlockType.COMMAND,
					text: "自定义窗口样式为 [style]",
					arguments: {
						style: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "用法见 Github Wiki",
						},
					},
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: "基本功能",
				},
				{
					opcode: "showHtml",
					blockType: Scratch.BlockType.COMMAND,
					text: "显示大小为 [width] × [height] 标题为 [title] 内容为 [html] 的窗口（单位：px）",
					arguments: {
						title: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "Hello, world!",
						},
						html: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "你好，世界！",
						},
						width: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "640",
						},
						height: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "480",
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
				presetstyle: {
					acceptReporters: false,
					items: [
						{
							text: "默认样式",
							value: "default",
						},
					],
				},
			},
		};
	}

	setPresetStyle(args) {
		let presets = { default: '".HtmlViewer{position:absolute;z-index:9999;top:4px;right:4px;overflow:hidden;background-color:white;border:2px solid black;border-radius:6px;animation: fadein 0.15s;}#HtmlViewerCloseButton{text-decoration:none;color:red;font-size:1.5rem;cursor: pointer;}.HtmlViewerWindowTitle{background:linear-gradient(to bottom,#ccc,#999);padding: 4px;cursor: default;user-select: none;}.HtmlViewerWindowTitle > span{color:white;font-weight: bold;}.HtmlViewerBox{padding:6px;}#HtmlViewerCloseButton:hover{color:#E00}@keyframes fadein{0%{opacity:0;transform:translateY(100px);}100%{opacity:1;transform:translateY(0px);}}.HtmlViewerProjectIframeBox{height:100%;width:100%;overflow:hidden;}"' };
		let styles = document.getElementById("HtmlViewerStyle");
		styles.innerHTML = presets[args.preset];
	}

	setStyle(args) {
		let styles = document.getElementById("HtmlViewerStyle");
		styles.innerHTML = args.style.replaceAll("<", "").replaceAll(">", "");
	}

	showHtml(args) {
		const html = markdownToHtmlS(args.html);
		let styles = document.getElementById("HtmlViewerSizeStyle");
		styles.innerHTML = ".HtmlViewer{width: " + args.width + "px;height: " + args.height + "px;}";
		div.getElementsByClassName("HtmlViewerBox")[0].innerHTML = html;
		div.getElementsByClassName("HVTitle")[0].innerHTML = args.title;
		document.body.appendChild(div);
		windowMovingEvent();
	}
	showProject(args, util) {
		if (isNaN(Number(args.projectid, 10))) {
			console.error("作品ID不合法");
		} else {
			window.open("https://www.40code.com/#page=work&id=" + args.projectid, "_blank", "top=4,right=4,toolbar=no,menubar=no,location=no, status=no");
		}
	}
	showUser(args, util) {
		if (isNaN(Number(args.usrid, 10))) {
			console.error("用户ID不合法");
		} else {
			window.open("https://www.40code.com/#page=user&id=" + args.usrid, "_blank", "top=4,right=4,toolbar=no,menubar=no,location=no, status=no");
		}
	}
	showForum(args, util) {
		if (isNaN(Number(args.postid, 10))) {
			console.error("帖子ID不合法");
		} else {
			window.open("https://www.40code.com/#page=post&id=" + args.postid, "_blank", "top=4,right=4,toolbar=no,menubar=no,location=no, status=no");
		}
	}
	closeHtmlViewer(args) {
		document.body.removeChild(document.getElementById("HtmlViewerWindow"));
	}
	gogithub(args) {
		if (args.type == "res") {
			const uri = args.id.replaceAll("%", "_").replaceAll("\\", "_").replaceAll("*", "_").replaceAll("..", "_");
			window.open("https://www.github.com/" + uri, "_blank", "top=4,right=4,toolbar=no,menubar=no,location=no, status=no");
		} else {
			const uri = args.id.replaceAll("%", "_").replaceAll("\\", "_").replaceAll("*", "_").replaceAll("..", "_");
			window.open("https://www.github.com/" + uri + "/", "_blank", "toolbar=no,menubar=no,location=no, status=no");
		}
	}
}
Scratch.extensions.register(new HtmlViewer());
