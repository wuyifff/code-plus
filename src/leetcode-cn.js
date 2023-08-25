"use strict";

import $ from "jquery";
import { html2md } from "./utils.js";

// This is the content script for leetcode-cn

console.log("CodePlus leetcode ok");

let from = "Leetcode";
let url = window.location.href;
let head = $("#qd-content").text().trim();
console.log(head);

let title_regex = /[\u4e00-\u9fff]+(\d+)\. ([\w ]+)([\u4e00-\u9fff]+)/;
let id = head.match(title_regex)[1].trim();
let title = head.match(title_regex)[2].trim();
let difficulty_regex = /(简单|困难|中等)/;
let difficulty = head.match(title_regex)[3].match(difficulty_regex)[0];
let full_title = id + '.' + title;
let description = html2md($("div[class^='content']").html(), from);
console.log(id);
console.log(title);

// already get code in background.js
let code = document.body.getAttribute("data-fullcode");

let code_language = $("#lang-select").children("span").text().toLowerCase();
let tags = [];
const getTags = $('[href]').filter(function() {
    const hrefValue = $(this).attr('href');
    const regex = /^\/tag\//; // 正则表达式：以 /tag/ 开头
    return regex.test(hrefValue);
  });

getTags.each(function() {
    const tag = $(this).text();
    tags.push(tag);
});

let info = {
  from,
  url,
  id,
  title,
  full_title,
  difficulty,
  description,
  code,
  code_language,
  tags,
};

console.log("CodePlus grabbed info", info);

chrome.runtime.sendMessage({
  type: "info",
  data: info,
});
