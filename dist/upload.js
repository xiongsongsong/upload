define("arale/upload/1.1.1/upload",["$"],function(a,b,c){function d(a){if(!(this instanceof d))return new d(a);e(a)&&(a={trigger:a});var b={trigger:null,name:null,action:null,data:null,accept:null,change:null,error:null,multiple:!0,success:null};a&&k.extend(b,a);var c=k(b.trigger);b.action=b.action||c.data("action")||"/upload",b.name=b.name||c.attr("name")||c.data("name")||"file",b.data=b.data||g(c.data("data")),b.accept=b.accept||c.data("accept"),b.success=b.success||c.data("success"),this.settings=b,this.setup(),this.bind()}function e(a){return"[object String]"===Object.prototype.toString.call(a)}function f(a){if(!a)return[];var b,c=[];for(var d in a)b=document.createElement("input"),b.type="hidden",b.name=d,b.value=a[d],c.push(b);return c}function g(a){if(!a)return{};for(var b={},c=a.split("&"),d=function(a){return decodeURIComponent(a.replace(/\+/g," "))},e=0;e<c.length;e++){var f=c[e].split("="),g=d(f[0]),h=d(f[1]);b[g]=h}return b}function h(a){for(var b=a.parentsUntil("body"),c=0,d=0;d<b.length;d++){var e=b.eq(d);"static"!==e.css("position")&&(c=parseInt(e.css("zIndex"),10)||c)}return c}function i(){var a="iframe-uploader-"+l,b=k('<iframe name="'+a+'" />').hide();return l+=1,b}function j(a){if(!(this instanceof j))return new j(a);e(a)&&(a={trigger:a});var b=k(a.trigger),c=[];b.each(function(b,e){a.trigger=e,c.push(new d(a))}),this._uploaders=c}var k=a("$"),l=0;d.prototype.setup=function(){this.form=k('<form method="post" enctype="multipart/form-data"target="" action="'+this.settings.action+'" />'),this.iframe=i(),this.form.attr("target",this.iframe.attr("name"));var a=this.settings.data;this.form.append(f(a)),window.FormData?this.form.append(f({_uploader_:"formdata"})):this.form.append(f({_uploader_:"iframe"}));var b=document.createElement("input");b.type="file",b.name=this.settings.name,this.settings.accept&&(b.accept=this.settings.accept),this.settings.multiple&&(b.multiple=!0,b.setAttribute("multiple","multiple")),this.input=k(b);var c=k(this.settings.trigger);return this.input.attr("hidefocus",!0).css({position:"absolute",top:0,right:0,opacity:0,outline:0,cursor:"pointer",height:c.outerHeight(),fontSize:Math.max(64,5*c.outerHeight())}),this.form.append(this.input),this.form.css({position:"absolute",top:c.offset().top,left:c.offset().left,overflow:"hidden",width:c.outerWidth(),height:c.outerHeight(),zIndex:h(c)+10}).appendTo("body"),this},d.prototype.bind=function(){var a=this,b=k(a.settings.trigger);b.mouseenter(function(){a.form.css({top:b.offset().top,left:b.offset().left,width:b.outerWidth(),height:b.outerHeight()})}),a.bindInput()},d.prototype.bindInput=function(){var a=this;a.input.change(function(b){a._files=this.files||[{name:b.target.value}];var c=a.input.val();if(a.settings.change)a.settings.change.call(a,a._files);else if(c)return a.submit()})},d.prototype.submit=function(){var a=this;if(window.FormData&&a._files){var b=new FormData(a.form.get(0));b.append(a.settings.name,a._files);var c;if(a.settings.progress){var d=a._files;c=function(){var b=k.ajaxSettings.xhr();return b.upload&&b.upload.addEventListener("progress",function(b){var c=0,e=b.loaded||b.position,f=b.total;b.lengthComputable&&(c=Math.ceil(100*(e/f))),a.settings.progress(b,e,f,c,d)},!1),b}}return k.ajax({url:a.settings.action,type:"post",processData:!1,contentType:!1,data:b,xhr:c,context:this,success:a.settings.success,error:a.settings.error}),this}return a.iframe=i(),a.form.attr("target",a.iframe.attr("name")),k("body").append(a.iframe),a.iframe.one("load",function(){var b=k(this).contents().find("body").html();k(this).remove(),b?a.settings.success&&a.settings.success(b):a.settings.error&&a.settings.error(a.input.val())}),a.form.submit(),this},d.prototype.refreshInput=function(){var a=this.input.clone();this.input.before(a),this.input.off("change"),this.input.remove(),this.input=a,this.bindInput()},d.prototype.change=function(a){return a?(this.settings.change=a,this):this},d.prototype.success=function(a){var b=this;return this.settings.success=function(c){b.refreshInput(),a&&a(c)},this},d.prototype.error=function(a){var b=this;return this.settings.error=function(c){a&&(b.refreshInput(),a(c))},this},d.prototype.enable=function(){this.input.prop("disabled",!1)},d.prototype.disable=function(){this.input.prop("disabled",!0)},j.prototype.submit=function(){return k.each(this._uploaders,function(a,b){b.submit()}),this},j.prototype.change=function(a){return k.each(this._uploaders,function(b,c){c.change(a)}),this},j.prototype.success=function(a){return k.each(this._uploaders,function(b,c){c.success(a)}),this},j.prototype.error=function(a){return k.each(this._uploaders,function(b,c){c.error(a)}),this},j.prototype.enable=function(){return k.each(this._uploaders,function(a,b){b.enable()}),this},j.prototype.disable=function(){return k.each(this._uploaders,function(a,b){b.disable()}),this},j.Uploader=d,c.exports=j});
