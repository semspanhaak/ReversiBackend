"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}var apiUrl="/api/url",Game=function(){console.log("hallo, vanuit module Game!");var e={gameState:""},t=function(){e.gameState=Game.Model.getGameState};return{init:function(e){e(),window.setInterval(t,2e3)}}}();Game.Data=function(){var t=[{url:"api/Spel/Beurt",data:0}],n={environment:""};return{init:function(e){if(console.log("Game.Data starting..."),"production"!==e&&"development"!==e)throw new Error("Please set env to 'production' or 'development'!");n.environment=e},get:function(e){return"production"==n.environment?$.get(e).then(function(e){return e}).catch(function(e){console.log(e.message)}):"development"==n.environment?(a=t,new Promise(function(e,t){e(a)})):void 0;var a},getQuoteFromApi:function(){return $.get("https://programming-quotes-api.herokuapp.com/quotes/random")}}}(),Game.Model={init:function(){console.log("Game.Model starting...")},getGameState:function(e){var t="/api/Spel/Beurt/"+e;Game.Data.get(t).then(function(e){if(0!==e.value||1!==e.value||2!==e.value)throw new Error("Value out of range!");return e})},getWeather:function(){Game.Data.get("http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=55eea571a79d521c360b1fe8f7b99b9e").then(function(e){if(void 0===e.main.temp)throw new Error("Geen termperatuur gevonden.");console.log("Temperatuur: "+(e.main.temp-273.15))})}},Game.Reversi=function(){console.log("hallo, vanuit module Reversi");function m(e,t,a){if(0==e)$(".div_"+a+"_"+t).removeClass("fiche-black"),$(".div_"+a+"_"+t).removeClass("fiche-white");else{$(".div_"+a+"_"+t).removeClass("fiche-black"),$(".div_"+a+"_"+t).removeClass("fiche-white");var n=1==e?"white":"black";$(".div_"+a+"_"+t).addClass("fiche-"+n)}}var a={apiPath:"/api/spel/",idOfGame:0},n=function(e){$.get(a.apiPath+e).then(function(e){for(var t=e.bord,a=0;a<=7;a++)for(var n=0;n<=7;n++){var o=t[a][n];m(o,a,n)}Game.Stats.removeDataset("Aantal zwarte fiches"),Game.Stats.removeDataset("Aantal witte fiches"),Game.Stats.removeDataset("Totaal aantal fiches");for(var i=[],r=0;r<e.amountOfBlack.length;r++)i.push(r.toString());Game.Stats.setLabels(i);for(var s=[],l=0;l<i.length;l++){var c=0;c+=e.amountOfBlack[l],c+=e.amountOfWhite[l],s.push(c.toString()),c=0}var u={label:"Aantal totale fiches",data:s,backgroundColor:"rgba(0, 0, 255, 0.1)"};Game.Stats.addDataset(u);var d={label:"Aantal zwarte fiches",data:e.amountOfBlack,backgroundColor:"rgba(0, 255, 255, 0.3)"};Game.Stats.addDataset(d);var f={label:"Aantal witte fiches",data:e.amountOfWhite,backgroundColor:"rgba(255, 0, 0, 0.3)"};Game.Stats.addDataset(f)})};return{init:function(e){console.log("Game.Template starting..."),a.idOfGame=e,n(e)},showFiche:m,clearBoard:function(){for(var e=0;e<8;e++)for(var t=0;t<8;t++)$(".div_"+e+"_"+t).removeClass("fiche-black"),$(".div_"+e+"_"+t).removeClass("fiche-white")},showQuote:function(){$(".quote-container").append(Game.Template.parseTemplate("quote",{quote:Game.Api.quote}))},getGameState:n,Move:function(e,t){$.get(a.apiPath+a.idOfGame+"/"+e+"/"+t).then(function(e){n(a.idOfGame)})}}}(),Game.Template=function(){function a(e){return spa_templates.templates[e]}return{init:function(){console.log("Game.Template starting...")},getTemplate:a,parseTemplate:function(e,t){return a(e)(t)}}}(),Game.Api=function(){var t={quote:""};return{init:function(){Game.Data.getQuoteFromApi().then(function(e){t.quote=e.en+" - "+e.author})},quote:function(){return t.quote}}}();var FeedbackWidget=function(){function t(e){_classCallCheck(this,t),this._element=$("."+e)}return _createClass(t,[{key:"show",value:function(e,t){this._element.removeClass("widget-hidden"),this._element.addClass("widget-show"),this._element.InnerText=e,this.log({message:e,type:t})}},{key:"hide",value:function(){this._element.removeClass("widget-show"),this._element.addClass("widget-hidden")}},{key:"log",value:function(e){if(null===localStorage.getItem("feedback_widget")){var t={messages:[e]};localStorage.setItem("feedback_widget",JSON.stringify(t))}else{var a=JSON.parse(localStorage.getItem("feedback_widget"));a.messages.unshift(e),10<a.messages.length&&a.messages.pop(),localStorage.setItem("feedback_widget",JSON.stringify(a))}}},{key:"removeLog",value:function(){localStorage.removeItem("feedback_widget")}},{key:"history",value:function(){var e=JSON.parse(localStorage.getItem("feedback_widget")),t="";e.messages.forEach(function(e){t=t+e.type+" - "+e.message+" \n "}),console.log(t)}},{key:"ElementById",get:function(){return this.element}}]),t}();$(function(){var e=new FeedbackWidget("widget-success");new FeedbackWidget("widget-danger");$(".btn_ok").on("click",function(){e.show("Hier ben ik!","success")}),$(".btn_hide").on("click",function(){e.hide()})}),Game.Stats=function(){function n(){return e.chart}function o(t){return n().data.datasets.findIndex(function(e){return e.label===t})}function t(e){n().data.datasets.push(e),n().update()}var e={chartPointer:"",chart:""},a=function(){return e.chartPointer},i=function(e,t){return Math.random()*(t-e)+e};return{init:function(){e.chartPointer=document.getElementById("myChart").getContext("2d"),e.chart=new Chart(a(),{type:"line",data:{},options:{hover:{mode:"nearest",intersect:!0}}})},addDataset:t,removeDataset:function(e){var t=n().data.datasets,a=o(e);t.splice(a,1),n().update()},setTestData:function(){t({label:"1",data:[12,19,3,5,2,3],fill:!0});t({label:"2",data:[7,13,2,8,1,8],fill:!0})},addTestData:function(){var e={label:"Added data",data:[i(1,15),i(1,15),i(1,15),i(1,15),i(1,15),i(1,15),i(1,15)]};t(e)},addDataToDataset:function(e,t){var a;(a=e,n().data.datasets[o(a)]).data.push(t),n().update()},setLabels:function(e){n().data.labels=e,n().update}}}();