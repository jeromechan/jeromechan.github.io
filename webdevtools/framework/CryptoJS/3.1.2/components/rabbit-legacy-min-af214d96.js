!function(){function i(){for(var i=this._X,t=this._C,r=0;8>r;r++)s[r]=t[r];for(t[0]=t[0]+1295307597+this._b|0,t[1]=t[1]+3545052371+(t[0]>>>0<s[0]>>>0?1:0)|0,t[2]=t[2]+886263092+(t[1]>>>0<s[1]>>>0?1:0)|0,t[3]=t[3]+1295307597+(t[2]>>>0<s[2]>>>0?1:0)|0,t[4]=t[4]+3545052371+(t[3]>>>0<s[3]>>>0?1:0)|0,t[5]=t[5]+886263092+(t[4]>>>0<s[4]>>>0?1:0)|0,t[6]=t[6]+1295307597+(t[5]>>>0<s[5]>>>0?1:0)|0,t[7]=t[7]+3545052371+(t[6]>>>0<s[6]>>>0?1:0)|0,this._b=t[7]>>>0<s[7]>>>0?1:0,r=0;8>r;r++){var o=i[r]+t[r],e=65535&o,c=o>>>16;a[r]=((e*e>>>17)+e*c>>>15)+c*c^((4294901760&o)*o|0)+((65535&o)*o|0)}i[0]=a[0]+(a[7]<<16|a[7]>>>16)+(a[6]<<16|a[6]>>>16)|0,i[1]=a[1]+(a[0]<<8|a[0]>>>24)+a[7]|0,i[2]=a[2]+(a[1]<<16|a[1]>>>16)+(a[0]<<16|a[0]>>>16)|0,i[3]=a[3]+(a[2]<<8|a[2]>>>24)+a[1]|0,i[4]=a[4]+(a[3]<<16|a[3]>>>16)+(a[2]<<16|a[2]>>>16)|0,i[5]=a[5]+(a[4]<<8|a[4]>>>24)+a[3]|0,i[6]=a[6]+(a[5]<<16|a[5]>>>16)+(a[4]<<16|a[4]>>>16)|0,i[7]=a[7]+(a[6]<<8|a[6]>>>24)+a[5]|0}var t=CryptoJS,r=t.lib.StreamCipher,o=[],s=[],a=[],e=t.algo.RabbitLegacy=r.extend({_doReset:function(){for(var t=this._key.words,r=this.cfg.iv,o=this._X=[t[0],t[3]<<16|t[2]>>>16,t[1],t[0]<<16|t[3]>>>16,t[2],t[1]<<16|t[0]>>>16,t[3],t[2]<<16|t[1]>>>16],t=this._C=[t[2]<<16|t[2]>>>16,4294901760&t[0]|65535&t[1],t[3]<<16|t[3]>>>16,4294901760&t[1]|65535&t[2],t[0]<<16|t[0]>>>16,4294901760&t[2]|65535&t[3],t[1]<<16|t[1]>>>16,4294901760&t[3]|65535&t[0]],s=this._b=0;4>s;s++)i.call(this);for(s=0;8>s;s++)t[s]^=o[s+4&7];if(r){var o=r.words,r=o[0],o=o[1],r=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),o=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),s=r>>>16|4294901760&o,a=o<<16|65535&r;for(t[0]^=r,t[1]^=s,t[2]^=o,t[3]^=a,t[4]^=r,t[5]^=s,t[6]^=o,t[7]^=a,s=0;4>s;s++)i.call(this)}},_doProcessBlock:function(t,r){var s=this._X;for(i.call(this),o[0]=s[0]^s[5]>>>16^s[3]<<16,o[1]=s[2]^s[7]>>>16^s[5]<<16,o[2]=s[4]^s[1]>>>16^s[7]<<16,o[3]=s[6]^s[3]>>>16^s[1]<<16,s=0;4>s;s++)o[s]=16711935&(o[s]<<8|o[s]>>>24)|4278255360&(o[s]<<24|o[s]>>>8),t[r+s]^=o[s]},blockSize:4,ivSize:2});t.RabbitLegacy=r._createHelper(e)}();