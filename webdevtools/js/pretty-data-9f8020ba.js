/**
* pretty-data - nodejs plugin to pretty-print or minify data in XML, JSON and CSS formats.
*  
* Version - 0.40.0
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/pretty-data/
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*	pd.xml(data ) - pretty print XML;
*	pd.json(data) - pretty print JSON;
*	pd.css(data ) - pretty print CSS;
*	pd.sql(data)  - pretty print SQL;
*
*	pd.xmlmin(data [, preserveComments] ) - minify XML; 
*	pd.jsonmin(data)                      - minify JSON; 
*	pd.cssmin(data [, preserveComments] ) - minify CSS; 
*	pd.sqlmin(data)                       - minify SQL; 
*
* PARAMETERS:
*
*	@data  			- String; XML, JSON, CSS or SQL text to beautify;
* 	@preserveComments	- Bool (optional, used in minxml and mincss only); 
*				  Set this flag to true to prevent removing comments from @text; 
*	@Return 		- String;
*	
* USAGE:
*	
*	var pd  = require('pretty-data').pd;
*
*	var xml_pp   = pd.xml(xml_text);
*	var xml_min  = pd.xmlmin(xml_text [,true]);
*	var json_pp  = pd.json(json_text);
*	var json_min = pd.jsonmin(json_text);
*	var css_pp   = pd.css(css_text);
*	var css_min  = pd.cssmin(css_text [, true]);
*	var sql_pp   = pd.sql(sql_text);
*	var sql_min  = pd.sqlmin(sql_text);
*
* TEST:
*	comp-name:pretty-data$ node ./test/test_xml
*	comp-name:pretty-data$ node ./test/test_json
*	comp-name:pretty-data$ node ./test/test_css
*	comp-name:pretty-data$ node ./test/test_sql
*/
function pp(){this.shift=["\n"],this.step="  ";var e=100,r=0;for(r=0;e>r;r++)this.shift.push(this.shift[r]+this.step)}function isSubquery(e,r){return r-(e.replace(/\(/g,"").length-e.replace(/\)/g,"").length)}function split_sql(e,r){return e.replace(/\s{1,}/g," ").replace(/ AND /gi,"~::~"+r+r+"AND ").replace(/ BETWEEN /gi,"~::~"+r+"BETWEEN ").replace(/ CASE /gi,"~::~"+r+"CASE ").replace(/ ELSE /gi,"~::~"+r+"ELSE ").replace(/ END /gi,"~::~"+r+"END ").replace(/ FROM /gi,"~::~FROM ").replace(/ GROUP\s{1,}BY/gi,"~::~GROUP BY ").replace(/ HAVING /gi,"~::~HAVING ").replace(/ IN /gi," IN ").replace(/ JOIN /gi,"~::~JOIN ").replace(/ CROSS~::~{1,}JOIN /gi,"~::~CROSS JOIN ").replace(/ INNER~::~{1,}JOIN /gi,"~::~INNER JOIN ").replace(/ LEFT~::~{1,}JOIN /gi,"~::~LEFT JOIN ").replace(/ RIGHT~::~{1,}JOIN /gi,"~::~RIGHT JOIN ").replace(/ ON /gi,"~::~"+r+"ON ").replace(/ OR /gi,"~::~"+r+r+"OR ").replace(/ ORDER\s{1,}BY/gi,"~::~ORDER BY ").replace(/ OVER /gi,"~::~"+r+"OVER ").replace(/\(\s{0,}SELECT /gi,"~::~(SELECT ").replace(/\)\s{0,}SELECT /gi,")~::~SELECT ").replace(/ THEN /gi," THEN~::~"+r).replace(/ UNION /gi,"~::~UNION~::~").replace(/ USING /gi,"~::~USING ").replace(/ WHEN /gi,"~::~"+r+"WHEN ").replace(/ WHERE /gi,"~::~WHERE ").replace(/ WITH /gi,"~::~WITH ").replace(/ ALL /gi," ALL ").replace(/ AS /gi," AS ").replace(/ ASC /gi," ASC ").replace(/ DESC /gi," DESC ").replace(/ DISTINCT /gi," DISTINCT ").replace(/ EXISTS /gi," EXISTS ").replace(/ NOT /gi," NOT ").replace(/ NULL /gi," NULL ").replace(/ LIKE /gi," LIKE ").replace(/\s{0,}SELECT /gi,"SELECT ").replace(/~::~{1,}/g,"~::~").split("~::~")}pp.prototype.xml=function(e){var r=e.replace(/>\s{0,}</g,"><").replace(/</g,"~::~<").replace(/xmlns\:/g,"~::~xmlns:").replace(/xmlns\=/g,"~::~xmlns=").split("~::~"),p=r.length,s=!1,c=0,l="",a=0;for(a=0;p>a;a++)r[a].search(/<!/)>-1?(l+=this.shift[c]+r[a],s=!0,(r[a].search(/-->/)>-1||r[a].search(/\]>/)>-1||r[a].search(/!DOCTYPE/)>-1)&&(s=!1)):r[a].search(/-->/)>-1||r[a].search(/\]>/)>-1?(l+=r[a],s=!1):/^<\w/.exec(r[a-1])&&/^<\/\w/.exec(r[a])&&/^<[\w:\-\.\,]+/.exec(r[a-1])==/^<\/[\w:\-\.\,]+/.exec(r[a])[0].replace("/","")?(l+=r[a],s||c--):r[a].search(/<\w/)>-1&&-1==r[a].search(/<\//)&&-1==r[a].search(/\/>/)?l=l+=s?r[a]:this.shift[c++]+r[a]:r[a].search(/<\w/)>-1&&r[a].search(/<\//)>-1?l=l+=s?r[a]:this.shift[c]+r[a]:r[a].search(/<\//)>-1?l=l+=s?r[a]:this.shift[--c]+r[a]:r[a].search(/\/>/)>-1?l=l+=s?r[a]:this.shift[c]+r[a]:l+=r[a].search(/<\?/)>-1?this.shift[c]+r[a]:r[a].search(/xmlns\:/)>-1||r[a].search(/xmlns\=/)>-1?this.shift[c]+r[a]:r[a];return"\n"==l[0]?l.slice(1):l},pp.prototype.json=function(e){return"string"==typeof e?JSON.stringify(JSON.parse(e),null,this.step):"object"==typeof e?JSON.stringify(e,null,this.step):null},pp.prototype.css=function(e){var r=e.replace(/\s{1,}/g," ").replace(/\{/g,"{~::~").replace(/\}/g,"~::~}~::~").replace(/\;/g,";~::~").replace(/\/\*/g,"~::~/*").replace(/\*\//g,"*/~::~").replace(/~::~\s{0,}~::~/g,"~::~").split("~::~"),p=r.length,s=0,c="",l=0;for(l=0;p>l;l++)c+=/\{/.exec(r[l])?this.shift[s++]+r[l]:/\}/.exec(r[l])?this.shift[--s]+r[l]:/\*\\/.exec(r[l])?this.shift[s]+r[l]:this.shift[s]+r[l];return c.replace(/^\n{1,}/,"")},pp.prototype.sql=function(e){var r=e.replace(/\s{1,}/g," ").replace(/\'/gi,"~::~'").split("~::~"),p=r.length,s=[],c=0,l=this.step,a=0,i="",t=0;for(t=0;p>t;t++)s=t%2?s.concat(r[t]):s.concat(split_sql(r[t],l));for(p=s.length,t=0;p>t;t++)a=isSubquery(s[t],a),/\s{0,}\s{0,}SELECT\s{0,}/.exec(s[t])&&(s[t]=s[t].replace(/\,/g,",\n"+l+l)),/\s{0,}\(\s{0,}SELECT\s{0,}/.exec(s[t])?(c++,i+=this.shift[c]+s[t]):/\'/.exec(s[t])?(1>a&&c&&c--,i+=s[t]):(i+=this.shift[c]+s[t],1>a&&c&&c--);return i=i.replace(/^\n{1,}/,"").replace(/\n{1,}/g,"\n")},pp.prototype.xmlmin=function(e,r){var p=r?e:e.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"");return p.replace(/>\s{0,}</g,"><")},pp.prototype.jsonmin=function(e){return e.replace(/\s{0,}\{\s{0,}/g,"{").replace(/\s{0,}\[$/g,"[").replace(/\[\s{0,}/g,"[").replace(/:\s{0,}\[/g,":[").replace(/\s{0,}\}\s{0,}/g,"}").replace(/\s{0,}\]\s{0,}/g,"]").replace(/\"\s{0,}\,/g,'",').replace(/\,\s{0,}\"/g,',"').replace(/\"\s{0,}:/g,'":').replace(/:\s{0,}\"/g,':"').replace(/:\s{0,}\[/g,":[").replace(/\,\s{0,}\[/g,",[").replace(/\,\s{2,}/g,", ").replace(/\]\s{0,},\s{0,}\[/g,"],[")},pp.prototype.cssmin=function(e,r){var p=r?e:e.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"");return p.replace(/\s{1,}/g," ").replace(/\{\s{1,}/g,"{").replace(/\}\s{1,}/g,"}").replace(/\;\s{1,}/g,";").replace(/\/\*\s{1,}/g,"/*").replace(/\*\/\s{1,}/g,"*/")},pp.prototype.sqlmin=function(e){return e.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")")},exports.pd=new pp;