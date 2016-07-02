/** @preserve
(c) 2012 by Cédric Mesnil. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
!function(r){function t(r,t,e){return r^t^e}function e(r,t,e){return r&t|~r&e}function n(r,t,e){return(r|~t)^e}function a(r,t,e){return r&e|t&~e}function o(r,t,e){return r^(t|~e)}function s(r,t){return r<<t|r>>>32-t}var c=CryptoJS,i=c.lib,h=i.WordArray,u=i.Hasher,d=c.algo,f=h.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),_=h.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),l=h.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),v=h.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),w=h.create([0,1518500249,1859775393,2400959708,2840853838]),y=h.create([1352829926,1548603684,1836072691,2053994217,0]),H=d.RIPEMD160=u.extend({_doReset:function(){this._hash=h.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(r,c){for(var i=0;16>i;i++){var h=c+i,u=r[h];r[h]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8)}var d,H,g,p,B,D,M,P,R,E,I=this._hash.words,m=w.words,b=y.words,k=f.words,x=_.words,z=l.words,A=v.words;D=d=I[0],M=H=I[1],P=g=I[2],R=p=I[3],E=B=I[4];for(var C,i=0;80>i;i+=1)C=d+r[c+k[i]]|0,C+=16>i?t(H,g,p)+m[0]:32>i?e(H,g,p)+m[1]:48>i?n(H,g,p)+m[2]:64>i?a(H,g,p)+m[3]:o(H,g,p)+m[4],C=0|C,C=s(C,z[i]),C=C+B|0,d=B,B=p,p=s(g,10),g=H,H=C,C=D+r[c+x[i]]|0,C+=16>i?o(M,P,R)+b[0]:32>i?a(M,P,R)+b[1]:48>i?n(M,P,R)+b[2]:64>i?e(M,P,R)+b[3]:t(M,P,R)+b[4],C=0|C,C=s(C,A[i]),C=C+E|0,D=E,E=R,R=s(P,10),P=M,M=C;C=I[1]+g+R|0,I[1]=I[2]+p+E|0,I[2]=I[3]+B+D|0,I[3]=I[4]+d+M|0,I[4]=I[0]+H+P|0,I[0]=C},_doFinalize:function(){var r=this._data,t=r.words,e=8*this._nDataBytes,n=8*r.sigBytes;t[n>>>5]|=128<<24-n%32,t[(n+64>>>9<<4)+14]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),r.sigBytes=4*(t.length+1),this._process();for(var a=this._hash,o=a.words,s=0;5>s;s++){var c=o[s];o[s]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}return a},clone:function(){var r=u.clone.call(this);return r._hash=this._hash.clone(),r}});c.RIPEMD160=u._createHelper(H),c.HmacRIPEMD160=u._createHmacHelper(H)}(Math);