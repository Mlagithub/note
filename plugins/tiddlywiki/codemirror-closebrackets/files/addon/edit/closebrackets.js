// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(C){var r={pairs:"()[]{}''\"\"",closeBefore:")]}'\":;>",triples:"",explode:"[]{}"},x=C.Pos;function P(e,t){return"pairs"==t&&"string"==typeof e?e:"object"==typeof e&&null!=e[t]?e[t]:r[t]}C.defineOption("autoCloseBrackets",!1,function(e,t,r){r&&r!=C.Init&&(e.removeKeyMap(i),e.state.closeBrackets=null),t&&(n(P(t,"pairs")),e.state.closeBrackets=t,e.addKeyMap(i))});var i={Backspace:function(e){var t=k(e);if(!t||e.getOption("disableInput"))return C.Pass;for(var r=P(t,"pairs"),n=e.listSelections(),i=0;i<n.length;i++){if(!n[i].empty())return C.Pass;var a=s(e,n[i].head);if(!a||r.indexOf(a)%2!=0)return C.Pass}for(i=n.length-1;0<=i;i--){var o=n[i].head;e.replaceRange("",x(o.line,o.ch-1),x(o.line,o.ch+1),"+delete")}},Enter:function(n){var e=k(n),t=e&&P(e,"explode");if(!t||n.getOption("disableInput"))return C.Pass;for(var i=n.listSelections(),r=0;r<i.length;r++){if(!i[r].empty())return C.Pass;var a=s(n,i[r].head);if(!a||t.indexOf(a)%2!=0)return C.Pass}n.operation(function(){var e=n.lineSeparator()||"\n";n.replaceSelection(e+e,null),n.execCommand("goCharLeft"),i=n.listSelections();for(var t=0;t<i.length;t++){var r=i[t].head.line;n.indentLine(r,null,!0),n.indentLine(r+1,null,!0)}})}};function n(e){for(var t=0;t<e.length;t++){var r=e.charAt(t),n="'"+r+"'";i[n]||(i[n]=function(t){return function(e){return function(i,e){var t=k(i);if(!t||i.getOption("disableInput"))return C.Pass;var r=P(t,"pairs"),n=r.indexOf(e);if(-1==n)return C.Pass;for(var a,o=P(t,"closeBefore"),s=P(t,"triples"),l=r.charAt(n+1)==e,c=i.listSelections(),f=n%2==0,h=0;h<c.length;h++){var u,d=c[h],p=d.head,g=i.getRange(p,x(p.line,p.ch+1));if(f&&!d.empty())u="surround";else if(!l&&f||g!=e)if(l&&1<p.ch&&0<=s.indexOf(e)&&i.getRange(x(p.line,p.ch-2),p)==e+e){if(2<p.ch&&/\bstring/.test(i.getTokenTypeAt(x(p.line,p.ch-2))))return C.Pass;u="addFour"}else if(l){var v=0==p.ch?" ":i.getRange(x(p.line,p.ch-1),p);if(C.isWordChar(g)||v==e||C.isWordChar(v))return C.Pass;u="both"}else{if(!f||!(0===g.length||/\s/.test(g)||-1<o.indexOf(g)))return C.Pass;u="both"}else u=l&&function(e,t){var r=e.getTokenAt(x(t.line,t.ch+1));return/\bstring/.test(r.type)&&r.start==t.ch&&(0==t.ch||!/\bstring/.test(e.getTokenTypeAt(t)))}(i,p)?"both":0<=s.indexOf(e)&&i.getRange(p,x(p.line,p.ch+3))==e+e+e?"skipThree":"skip";if(a){if(a!=u)return C.Pass}else a=u}var m=n%2?r.charAt(n-1):e,b=n%2?e:r.charAt(n+1);i.operation(function(){if("skip"==a)i.execCommand("goCharRight");else if("skipThree"==a)for(var e=0;e<3;e++)i.execCommand("goCharRight");else if("surround"==a){for(var t=i.getSelections(),e=0;e<t.length;e++)t[e]=m+t[e]+b;i.replaceSelections(t,"around"),t=i.listSelections().slice();for(e=0;e<t.length;e++)t[e]=(r=t[e],n=0<C.cmpPos(r.anchor,r.head),{anchor:new x(r.anchor.line,r.anchor.ch+(n?-1:1)),head:new x(r.head.line,r.head.ch+(n?1:-1))});i.setSelections(t)}else"both"==a?(i.replaceSelection(m+b,null),i.triggerElectric(m+b),i.execCommand("goCharLeft")):"addFour"==a&&(i.replaceSelection(m+m+m+m,"before"),i.execCommand("goCharRight"));var r,n})}(e,t)}}(r))}}function k(e){var t=e.state.closeBrackets;return t&&!t.override&&e.getModeAt(e.getCursor()).closeBrackets||t}function s(e,t){var r=e.getRange(x(t.line,t.ch-1),x(t.line,t.ch+1));return 2==r.length?r:null}n(r.pairs+"`")});