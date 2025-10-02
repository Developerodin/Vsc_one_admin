"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4358],{5002:function(e,t,n){n.d(t,{$q:function(){return lz},AK:function(){return ut},Ab:function(){return ui},B$:function(){return oS},Bt:function(){return un},Cf:function(){return op},EK:function(){return B},ET:function(){return l1},Eo:function(){return oD},F8:function(){return oH},Fc:function(){return oq},GL:function(){return l4},IO:function(){return lw},IX:function(){return oM},Ix:function(){return oB},JU:function(){return ox},Jj:function(){return oQ},K9:function(){return x},Ky:function(){return j},L$:function(){return oK},Lx:function(){return lA},Lz:function(){return oj},Me:function(){return e4},Mx:function(){return oU},PL:function(){return lH},PU:function(){return l6},Pb:function(){return oG},QT:function(){return l$},ST:function(){return oV},TF:function(){return oz},TQ:function(){return lN},UQ:function(){return lY},Ub:function(){return I},W:function(){return lG},WA:function(){return C},Wi:function(){return od},Wu:function(){return lM},Xb:function(){return Q},Xk:function(){return lW},Xo:function(){return lE},ar:function(){return lI},at:function(){return oI},b9:function(){return lS},cf:function(){return l2},e0:function(){return lC},fH:function(){return oP},hJ:function(){return oT},i3:function(){return ue},iE:function(){return oC},kl:function(){return lj},l7:function(){return ti},my:function(){return ob},nP:function(){return us},oe:function(){return l0},pl:function(){return lX},qK:function(){return lK},qY:function(){return oF},r7:function(){return lZ},sc:function(){return l5},u7:function(){return lP},vh:function(){return lx},vr:function(){return ur},xU:function(){return lB},yq:function(){return E},zN:function(){return lJ}});var r,i,s,a,o=n(9279),l=n(2680),u=n(9053),c=n(3943),h=n(6552),d=n(4035),f=n(357),m=n(6300).Buffer;let g="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}p.UNAUTHENTICATED=new p(null),p.GOOGLE_CREDENTIALS=new p("google-credentials-uid"),p.FIRST_PARTY=new p("first-party-uid"),p.MOCK_USER=new p("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let y="10.12.1",w=new u.Yd("@firebase/firestore");function v(){return w.logLevel}function I(e){w.setLogLevel(e)}function _(e,...t){if(w.logLevel<=u.in.DEBUG){let n=t.map(T);w.debug(`Firestore (${y}): ${e}`,...n)}}function b(e,...t){if(w.logLevel<=u.in.ERROR){let n=t.map(T);w.error(`Firestore (${y}): ${e}`,...n)}}function E(e,...t){if(w.logLevel<=u.in.WARN){let n=t.map(T);w.warn(`Firestore (${y}): ${e}`,...n)}}function T(e){if("string"==typeof e)return e;try{/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(e="Unexpected state"){let t=`FIRESTORE (${y}) INTERNAL ASSERTION FAILED: `+e;throw b(t),Error(t)}function x(e,t){e||S()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class C extends c.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class A{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(p.UNAUTHENTICATED))}shutdown(){}}class M{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class R{constructor(e){this.t=e,this.currentUser=p.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let n=this.i,r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve(),i=new N;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new N,e.enqueueRetryable(()=>r(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},a=e=>{_("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),s()};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(_("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new N)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(_("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||S(),new k(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||S(),new p(e)}}class F{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=p.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class L{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new F(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(p.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class V{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class P{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let n=e=>{null!=e.error&&_("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let n=e.token!==this.R;return this.R=e.token,_("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};let r=e=>{_("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.A.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){let e=this.A.getImmediate({optional:!0});e?r(e):_("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?("string"==typeof e.token||S(),this.R=e.token,new V(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,n="";for(;n.length<20;){let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(40);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let e=0;e<40;e++)n[e]=Math.floor(256*Math.random());return n}(0);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%e.length))}return n}}function q(e,t){return e<t?-1:e>t?1:0}function U(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new C(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new C(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return B.fromMillis(Date.now())}static fromDate(e){return B.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new B(t,Math.floor(1e6*(e-1e3*t)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?q(this.nanoseconds,e.nanoseconds):q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.timestamp=e}static fromTimestamp(e){return new z(e)}static min(){return new z(new B(0,0))}static max(){return new z(new B(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e,t,n){void 0===t?t=0:t>e.length&&S(),void 0===n?n=e.length-t:n>e.length-t&&S(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===G.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof G?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++){let n=e.get(r),i=t.get(r);if(n<i)return -1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class K extends G{construct(e,t,n){return new K(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new C(D.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new K(t)}static emptyPath(){return new K([])}}let $=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Q extends G{construct(e,t,n){return new Q(e,t,n)}static isValidIdentifier(e){return $.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Q.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new Q(["__name__"])}static fromServerFormat(e){let t=[],n="",r=0,i=()=>{if(0===n.length)throw new C(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},s=!1;for(;r<e.length;){let t=e[r];if("\\"===t){if(r+1===e.length)throw new C(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new C(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?s=!s:"."!==t||s?n+=t:i(),r++}if(i(),s)throw new C(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Q(t)}static emptyPath(){return new Q([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.path=e}static fromPath(e){return new j(K.fromString(e))}static fromName(e){return new j(K.fromString(e).popFirst(5))}static empty(){return new j(K.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===K.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return K.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new j(new K(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function H(e){return e.fields.find(e=>2===e.kind)}function Y(e){return e.fields.filter(e=>2!==e.kind)}W.UNKNOWN_ID=-1;class J{constructor(e,t){this.fieldPath=e,this.kind=t}}class X{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new X(0,et.min())}}function Z(e,t){let n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1;return new et(z.fromTimestamp(1e9===r?new B(n+1,0):new B(n,r)),j.empty(),t)}function ee(e){return new et(e.readTime,e.key,-1)}class et{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new et(z.min(),j.empty(),-1)}static max(){return new et(z.max(),j.empty(),-1)}}function en(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:0!==(n=j.comparator(e.documentKey,t.documentKey))?n:q(e.largestBatchId,t.largestBatchId)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let er="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ei{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function es(e){if(e.code!==D.FAILED_PRECONDITION||e.message!==er)throw e;_("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&S(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new ea((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof ea?t:ea.resolve(t)}catch(e){return ea.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):ea.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):ea.reject(t)}static resolve(e){return new ea((t,n)=>{t(e)})}static reject(e){return new ea((t,n)=>{n(e)})}static waitFor(e){return new ea((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=ea.resolve(!1);for(let n of e)t=t.next(e=>e?ea.resolve(e):n());return t}static forEach(e,t){let n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new ea((n,r)=>{let i=e.length,s=Array(i),a=0;for(let o=0;o<i;o++){let l=o;t(e[l]).next(e=>{s[l]=e,++a===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new ea((n,r)=>{let i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new N,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new eh(e,t.error)):this.V.resolve()},this.transaction.onerror=t=>{let n=ep(t.target.error);this.V.reject(new eh(e,n))}}static open(e,t,n,r){try{return new eo(t,e.transaction(r,n))}catch(e){throw new eh(t,e)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(_("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){let e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){return new ef(this.transaction.objectStore(e))}}class el{constructor(e,t,n){this.name=e,this.version=t,this.p=n,12.2===el.S((0,c.z$)())&&b("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return _("SimpleDb","Removing database:",e),em(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!(0,c.hl)())return!1;if(el.C())return!0;let e=(0,c.z$)(),t=el.S(e),n=eu(e);return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||0<t&&t<10||0<n&&n<4.5)}static C(){var e;return void 0!==f&&"YES"===(null===(e=f.__PRIVATE_env)||void 0===e?void 0:e.v)}static F(e,t){return e.store(t)}static S(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i);return Number(t?t[1].split("_").slice(0,2).join("."):"-1")}async M(e){return this.db||(_("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{let r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{t(e.target.result)},r.onblocked=()=>{n(new eh(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{let r=t.target.error;"VersionError"===r.name?n(new C(D.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new C(D.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new eh(e,r))},r.onupgradeneeded=e=>{_("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);let t=e.target.result;this.p.O(t,r.transaction,e.oldVersion,this.version).next(()=>{_("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=e=>this.N(e)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){let i="readonly"===t,s=0;for(;;){++s;try{this.db=await this.M(e);let t=eo.open(this.db,e,i?"readonly":"readwrite",n),s=r(t).next(e=>(t.g(),e)).catch(e=>(t.abort(e),ea.reject(e))).toPromise();return s.catch(()=>{}),await t.m,s}catch(t){let e="FirebaseError"!==t.name&&s<3;if(_("SimpleDb","Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function eu(e){let t=e.match(/Android ([\d.]+)/i);return Number(t?t[1].split(".").slice(0,2).join("."):"-1")}class ec{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return em(this.B.delete())}}class eh extends C{constructor(e,t){super(D.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function ed(e){return"IndexedDbTransactionError"===e.name}class ef{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(_("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(_("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),em(n)}add(e){return _("SimpleDb","ADD",this.store.name,e,e),em(this.store.add(e))}get(e){return em(this.store.get(e)).next(t=>(void 0===t&&(t=null),_("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return _("SimpleDb","DELETE",this.store.name,e),em(this.store.delete(e))}count(){return _("SimpleDb","COUNT",this.store.name),em(this.store.count())}U(e,t){let n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){let e=r.getAll(n.range);return new ea((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{let e=this.cursor(n),t=[];return this.W(e,(e,n)=>{t.push(n)}).next(()=>t)}}G(e,t){let n=this.store.getAll(e,null===t?void 0:t);return new ea((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}j(e,t){_("SimpleDb","DELETE ALL",this.store.name);let n=this.options(e,t);n.H=!1;let r=this.cursor(n);return this.W(r,(e,t,n)=>n.delete())}J(e,t){let n;t?n=e:(n={},t=e);let r=this.cursor(n);return this.W(r,t)}Y(e){let t=this.cursor({});return new ea((n,r)=>{t.onerror=e=>{r(ep(e.target.error))},t.onsuccess=t=>{let r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}W(e,t){let n=[];return new ea((r,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{let i=e.target.result;if(!i)return void r();let s=new ec(i),a=t(i.primaryKey,i.value,s);if(a instanceof ea){let e=a.catch(e=>(s.done(),ea.reject(e)));n.push(e)}s.isDone?r():null===s.K?i.continue():i.continue(s.K)}}).next(()=>ea.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function em(e){return new ea((t,n)=>{e.onsuccess=e=>{t(e.target.result)},e.onerror=e=>{n(ep(e.target.error))}})}let eg=!1;function ep(e){let t=el.S((0,c.z$)());if(t>=12.2&&t<13){let t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){let e=new C("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return eg||(eg=!0,setTimeout(()=>{throw e},0)),e}}return e}class ey{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}X(e){_("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{_("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(e){ed(e)?_("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",e):await es(e)}await this.X(6e4)})}}class ew{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){let n=new Set,r=t,i=!0;return ea.doWhile(()=>!0===i&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return _("IndexBackfiller",`Processing collection: ${t}`),this.ne(e,t,r).next(e=>{r-=e,n.add(t)});i=!1})).next(()=>t-r)}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{let i=n.changes;return this.localStore.indexManager.updateIndexEntries(e,i).next(()=>this.re(r,n)).next(n=>(_("IndexBackfiller",`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>i.size)}))}re(e,t){let n=e;return t.changes.forEach((e,t)=>{let r=ee(t);en(r,n)>0&&(n=r)}),new et(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ev{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ie(e),this.se=e=>t.writeSequenceNumber(e))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}}function eI(e){return null==e}function e_(e){return 0===e&&1/e==-1/0}function eb(e){return"number"==typeof e&&Number.isInteger(e)&&!e_(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eE(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t+="\x01\x01"),t=function(e,t){let n=t,r=e.length;for(let t=0;t<r;t++){let r=e.charAt(t);switch(r){case"\0":n+="\x01\x10";break;case"\x01":n+="\x01\x11";break;default:n+=r}}return n}(e.get(n),t);return t+"\x01\x01"}function eT(e){let t=e.length;if(t>=2||S(),2===t)return"\x01"===e.charAt(0)&&"\x01"===e.charAt(1)||S(),K.emptyPath();let n=t-2,r=[],i="";for(let s=0;s<t;){let t=e.indexOf("\x01",s);switch((t<0||t>n)&&S(),e.charAt(t+1)){case"\x01":let a;let o=e.substring(s,t);0===i.length?a=o:(i+=o,a=i,i=""),r.push(a);break;case"\x10":i+=e.substring(s,t)+"\0";break;case"\x11":i+=e.substring(s,t+1);break;default:S()}s=t+2}return new K(r)}ev.oe=-1;/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eS=["userId","batchId"],ex={},eD=["prefixPath","collectionGroup","readTime","documentId"],eC=["prefixPath","collectionGroup","documentId"],eN=["collectionGroup","readTime","prefixPath","documentId"],ek=["canonicalId","targetId"],eA=["targetId","path"],eM=["path","targetId"],eR=["collectionId","parent"],eF=["indexId","uid"],eL=["uid","sequenceNumber"],eV=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],eP=["indexId","uid","orderedDocumentKey"],eO=["userId","collectionPath","documentId"],eq=["userId","collectionPath","largestBatchId"],eU=["userId","collectionGroup","largestBatchId"],eB=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],ez=[...eB,"documentOverlays"],eG=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],eK=[...eG,"indexConfiguration","indexState","indexEntries"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e$ extends ei{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function eQ(e,t){return el.F(e._e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ej(e){let t=0;for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function eW(e,t){for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function eH(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eY{constructor(e,t){this.comparator=e,this.root=t||eX.EMPTY}insert(e,t){return new eY(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,eX.BLACK,null,null))}remove(e){return new eY(this.comparator,this.root.remove(e,this.comparator).copy(null,null,eX.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){let e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new eJ(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new eJ(this.root,e,this.comparator,!1)}getReverseIterator(){return new eJ(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new eJ(this.root,e,this.comparator,!0)}}class eJ{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class eX{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:eX.RED,this.left=null!=r?r:eX.EMPTY,this.right=null!=i?i:eX.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new eX(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return(r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n))).fixUp()}removeMin(){if(this.left.isEmpty())return eX.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let n,r=this;if(0>t(e,r.key))r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return eX.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,eX.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,eX.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw S();let e=this.left.check();if(e!==this.right.check())throw S();return e+(this.isRed()?0:1)}}eX.EMPTY=null,eX.RED=!0,eX.BLACK=!1,eX.EMPTY=new class{constructor(){this.size=0}get key(){throw S()}get value(){throw S()}get color(){throw S()}get left(){throw S()}get right(){throw S()}copy(e,t,n,r,i){return this}insert(e,t,n){return new eX(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eZ{constructor(e){this.comparator=e,this.data=new eY(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new e0(this.data.getIterator())}getIteratorFrom(e){return new e0(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof eZ)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new eZ(this.comparator);return t.data=e,t}}class e0{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function e1(e){return e.hasNext()?e.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e2{constructor(e){this.fields=e,e.sort(Q.comparator)}static empty(){return new e2([])}unionWith(e){let t=new eZ(Q.comparator);for(let e of this.fields)t=t.add(e);for(let n of e)t=t.add(n);return new e2(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return U(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e5 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e4(){return"undefined"!=typeof atob}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e3{constructor(e){this.binaryString=e}static fromBase64String(e){return new e3(function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new e5("Invalid base64 string: "+e):e}}(e))}static fromUint8Array(e){return new e3(function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e))}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}e3.EMPTY_BYTE_STRING=new e3("");let e8=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function e6(e){if(e||S(),"string"==typeof e){let t=0,n=e8.exec(e);if(n||S(),n[1]){let e=n[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:e9(e.seconds),nanos:e9(e.nanos)}}function e9(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function e7(e){return"string"==typeof e?e3.fromBase64String(e):e3.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function tt(e){let t=e.mapValue.fields.__previous_value__;return te(t)?tt(t):t}function tn(e){let t=e6(e.mapValue.fields.__local_write_time__.timestampValue);return new B(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t,n,r,i,s,a,o,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=l}}class ti{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ti("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof ti&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ts={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},ta={nullValue:"NULL_VALUE"};function to(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?te(e)?4:tI(e)?9007199254740991:10:S()}function tl(e,t){if(e===t)return!0;let n=to(e);if(n!==to(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return tn(e).isEqual(tn(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let n=e6(e.timestampValue),r=e6(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return e7(e.bytesValue).isEqual(e7(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return e9(e.geoPointValue.latitude)===e9(t.geoPointValue.latitude)&&e9(e.geoPointValue.longitude)===e9(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return e9(e.integerValue)===e9(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let n=e9(e.doubleValue),r=e9(t.doubleValue);return n===r?e_(n)===e_(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return U(e.arrayValue.values||[],t.arrayValue.values||[],tl);case 10:return function(e,t){let n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(ej(n)!==ej(r))return!1;for(let e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!tl(n[e],r[e])))return!1;return!0}(e,t);default:return S()}}function tu(e,t){return void 0!==(e.values||[]).find(e=>tl(e,t))}function tc(e,t){if(e===t)return 0;let n=to(e),r=to(t);if(n!==r)return q(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return q(e.booleanValue,t.booleanValue);case 2:return function(e,t){let n=e9(e.integerValue||e.doubleValue),r=e9(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return th(e.timestampValue,t.timestampValue);case 4:return th(tn(e),tn(t));case 5:return q(e.stringValue,t.stringValue);case 6:return function(e,t){let n=e7(e),r=e7(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){let t=q(n[e],r[e]);if(0!==t)return t}return q(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let n=q(e9(e.latitude),e9(t.latitude));return 0!==n?n:q(e9(e.longitude),e9(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){let n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){let t=tc(n[e],r[e]);if(t)return t}return q(n.length,r.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===ts.mapValue&&t===ts.mapValue)return 0;if(e===ts.mapValue)return 1;if(t===ts.mapValue)return -1;let n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let e=0;e<r.length&&e<s.length;++e){let t=q(r[e],s[e]);if(0!==t)return t;let a=tc(n[r[e]],i[s[e]]);if(0!==a)return a}return q(r.length,s.length)}(e.mapValue,t.mapValue);default:throw S()}}function th(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return q(e,t);let n=e6(e),r=e6(t),i=q(n.seconds,r.seconds);return 0!==i?i:q(n.nanos,r.nanos)}function td(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=e6(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?e7(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,j.fromName(t).toString()):"geoPointValue"in e?(n=e.geoPointValue,`geo(${n.latitude},${n.longitude})`):"arrayValue"in e?function(e){let t="[",n=!0;for(let r of e.values||[])n?n=!1:t+=",",t+=td(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),n="{",r=!0;for(let i of t)r?r=!1:n+=",",n+=`${i}:${td(e.fields[i])}`;return n+"}"}(e.mapValue):S()}function tf(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function tm(e){return!!e&&"integerValue"in e}function tg(e){return!!e&&"arrayValue"in e}function tp(e){return!!e&&"nullValue"in e}function ty(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function tw(e){return!!e&&"mapValue"in e}function tv(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return eW(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=tv(n)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=tv(e.arrayValue.values[n]);return t}return Object.assign({},e)}function tI(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}function t_(e,t){let n=tc(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function tb(e,t){let n=tc(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e){this.value=e}static empty(){return new tE({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(!tw(t=(t.mapValue.fields||{})[e.get(n)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=tv(t)}setAll(e){let t=Q.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=tv(e):r.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){let t=this.field(e.popLast());tw(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return tl(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];tw(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){for(let r of(eW(t,(t,n)=>e[t]=n),n))delete e[r]}clone(){return new tE(tv(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e,t,n,r,i,s,a){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(e){return new tT(e,0,z.min(),z.min(),z.min(),tE.empty(),0)}static newFoundDocument(e,t,n,r){return new tT(e,1,t,z.min(),n,r,0)}static newNoDocument(e,t){return new tT(e,2,t,z.min(),z.min(),tE.empty(),0)}static newUnknownDocument(e,t){return new tT(e,3,t,z.min(),z.min(),tE.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(z.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tE.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tE.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof tT&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new tT(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,t){this.position=e,this.inclusive=t}}function tx(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){let s=t[i],a=e.position[i];if(r=s.field.isKeyField()?j.comparator(j.fromName(a.referenceValue),n.key):tc(a,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function tD(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!tl(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tN{}class tk extends tN{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new tP(e,t,n):"array-contains"===t?new tB(e,n):"in"===t?new tz(e,n):"not-in"===t?new tG(e,n):"array-contains-any"===t?new tK(e,n):new tk(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new tO(e,n):new tq(e,n)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(tc(t,this.value)):null!==t&&to(this.value)===to(t)&&this.matchesComparison(tc(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return S()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tA extends tN{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new tA(e,t)}matches(e){return tM(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.ae||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function tM(e){return"and"===e.op}function tR(e){return"or"===e.op}function tF(e){return tL(e)&&tM(e)}function tL(e){for(let t of e.filters)if(t instanceof tA)return!1;return!0}function tV(e,t){let n=e.filters.concat(t);return tA.create(n,e.op)}class tP extends tk{constructor(e,t,n){super(e,t,n),this.key=j.fromName(n.referenceValue)}matches(e){let t=j.comparator(e.key,this.key);return this.matchesComparison(t)}}class tO extends tk{constructor(e,t){super(e,"in",t),this.keys=tU("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class tq extends tk{constructor(e,t){super(e,"not-in",t),this.keys=tU("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function tU(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map(e=>j.fromName(e.referenceValue))}class tB extends tk{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return tg(t)&&tu(t.arrayValue,this.value)}}class tz extends tk{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&tu(this.value.arrayValue,t)}}class tG extends tk{constructor(e,t){super(e,"not-in",t)}matches(e){if(tu(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!tu(this.value.arrayValue,t)}}class tK extends tk{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!tg(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>tu(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t${constructor(e,t=null,n=[],r=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=a,this.ue=null}}function tQ(e,t=null,n=[],r=[],i=null,s=null,a=null){return new t$(e,t,n,r,i,s,a)}function tj(e){if(null===e.ue){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>(function e(t){if(t instanceof tk)return t.field.canonicalString()+t.op.toString()+td(t.value);if(tF(t))return t.filters.map(t=>e(t)).join(",");{let n=t.filters.map(t=>e(t)).join(",");return`${t.op}(${n})`}})(e)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),eI(e.limit)||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>td(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>td(e)).join(",")),e.ue=t}return e.ue}function tW(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var n,r;if(n=e.orderBy[i],r=t.orderBy[i],!(n.dir===r.dir&&n.field.isEqual(r.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!function e(t,n){return t instanceof tk?n instanceof tk&&t.op===n.op&&t.field.isEqual(n.field)&&tl(t.value,n.value):t instanceof tA?n instanceof tA&&t.op===n.op&&t.filters.length===n.filters.length&&t.filters.reduce((t,r,i)=>t&&e(r,n.filters[i]),!0):void S()}(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!tD(e.startAt,t.startAt)&&tD(e.endAt,t.endAt)}function tH(e){return j.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function tY(e,t){return e.filters.filter(e=>e instanceof tk&&e.field.isEqual(t))}function tJ(e,t,n){let r=ta,i=!0;for(let n of tY(e,t)){let e=ta,t=!0;switch(n.op){case"<":case"<=":var s;e="nullValue"in(s=n.value)?ta:"booleanValue"in s?{booleanValue:!1}:"integerValue"in s||"doubleValue"in s?{doubleValue:NaN}:"timestampValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in s?{stringValue:""}:"bytesValue"in s?{bytesValue:""}:"referenceValue"in s?tf(ti.empty(),j.empty()):"geoPointValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in s?{arrayValue:{}}:"mapValue"in s?{mapValue:{}}:S();break;case"==":case"in":case">=":e=n.value;break;case">":e=n.value,t=!1;break;case"!=":case"not-in":e=ta}0>t_({value:r,inclusive:i},{value:e,inclusive:t})&&(r=e,i=t)}if(null!==n){for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){let e=n.position[s];0>t_({value:r,inclusive:i},{value:e,inclusive:n.inclusive})&&(r=e,i=n.inclusive);break}}return{value:r,inclusive:i}}function tX(e,t,n){let r=ts,i=!0;for(let n of tY(e,t)){let e=ts,t=!0;switch(n.op){case">=":case">":var s;e="nullValue"in(s=n.value)?{booleanValue:!1}:"booleanValue"in s?{doubleValue:NaN}:"integerValue"in s||"doubleValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in s?{stringValue:""}:"stringValue"in s?{bytesValue:""}:"bytesValue"in s?tf(ti.empty(),j.empty()):"referenceValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in s?{arrayValue:{}}:"arrayValue"in s?{mapValue:{}}:"mapValue"in s?ts:S(),t=!1;break;case"==":case"in":case"<=":e=n.value;break;case"<":e=n.value,t=!1;break;case"!=":case"not-in":e=ts}tb({value:r,inclusive:i},{value:e,inclusive:t})>0&&(r=e,i=t)}if(null!==n){for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){let e=n.position[s];tb({value:r,inclusive:i},{value:e,inclusive:n.inclusive})>0&&(r=e,i=n.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tZ{constructor(e,t=null,n=[],r=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function t0(e){return new tZ(e)}function t1(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function t2(e){return null!==e.collectionGroup}function t5(e){if(null===e.ce){let t;e.ce=[];let n=new Set;for(let t of e.explicitOrderBy)e.ce.push(t),n.add(t.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(t=new eZ(Q.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t).forEach(t=>{n.has(t.canonicalString())||t.isKeyField()||e.ce.push(new tC(t,r))}),n.has(Q.keyField().canonicalString())||e.ce.push(new tC(Q.keyField(),r))}return e.ce}function t4(e){return e.le||(e.le=function(e,t){if("F"===e.limitType)return tQ(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new tC(e.field,t)});let n=e.endAt?new tS(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new tS(e.startAt.position,e.startAt.inclusive):null;return tQ(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}(e,t5(e))),e.le}function t3(e,t){let n=e.filters.concat([t]);return new tZ(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function t8(e,t,n){return new tZ(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function t6(e,t){return tW(t4(e),t4(t))&&e.limitType===t.limitType}function t9(e){return`${tj(t4(e))}|lt:${e.limitType}`}function t7(e){var t;let n;return`Query(target=${n=(t=t4(e)).path.canonicalString(),null!==t.collectionGroup&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof tk?`${t.field.canonicalString()} ${t.op} ${td(t.value)}`:t instanceof tA?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),eI(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(n+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>td(e)).join(",")),t.endAt&&(n+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>td(e)).join(",")),`Target(${n})`}; limitType=${e.limitType})`}function ne(e,t){return t.isFoundDocument()&&function(e,t){let n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):j.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(let n of t5(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(let n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,n){let r=tx(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,t5(e),t))&&(!e.endAt||!!function(e,t,n){let r=tx(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,t5(e),t))}function nt(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function nn(e){return(t,n)=>{let r=!1;for(let i of t5(e)){let e=function(e,t,n){let r=e.field.isKeyField()?j.comparator(t.key,n.key):function(e,t,n){let r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?tc(r,i):S()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return -1*r;default:return S()}}(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n){for(let[t,r]of n)if(this.equalsFn(t,e))return r}}has(e){return void 0!==this.get(e)}set(e,t){let n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){eW(this.inner,(t,n)=>{for(let[t,r]of n)e(t,r)})}isEmpty(){return eH(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ni=new eY(j.comparator),ns=new eY(j.comparator);function na(...e){let t=ns;for(let n of e)t=t.insert(n.key,n);return t}function no(e){let t=ns;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function nl(){return new nr(e=>e.toString(),(e,t)=>e.isEqual(t))}let nu=new eY(j.comparator),nc=new eZ(j.comparator);function nh(...e){let t=nc;for(let n of e)t=t.add(n);return t}let nd=new eZ(q);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nf(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:e_(t)?"-0":t}}function nm(e){return{integerValue:""+e}}function ng(e,t){return eb(t)?nm(t):nf(e,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(){this._=void 0}}function ny(e,t){return e instanceof nE?tm(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class nw extends np{}class nv extends np{constructor(e){super(),this.elements=e}}function nI(e,t){let n=nS(t);for(let t of e.elements)n.some(e=>tl(e,t))||n.push(t);return{arrayValue:{values:n}}}class n_ extends np{constructor(e){super(),this.elements=e}}function nb(e,t){let n=nS(t);for(let t of e.elements)n=n.filter(e=>!tl(e,t));return{arrayValue:{values:n}}}class nE extends np{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function nT(e){return e9(e.integerValue||e.doubleValue)}function nS(e){return tg(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nx{constructor(e,t){this.field=e,this.transform=t}}class nD{constructor(e,t){this.version=e,this.transformResults=t}}class nC{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new nC}static exists(e){return new nC(void 0,e)}static updateTime(e){return new nC(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function nN(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class nk{}function nA(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new nq(e.key,nC.none()):new nF(e.key,e.data,nC.none());{let n=e.data,r=tE.empty(),i=new eZ(Q.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new nL(e.key,r,new e2(i.toArray()),nC.none())}}function nM(e,t,n,r){return e instanceof nF?function(e,t,n,r){if(!nN(e.precondition,t))return n;let i=e.value.clone(),s=nO(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof nL?function(e,t,n,r){if(!nN(e.precondition,t))return n;let i=nO(e.fieldTransforms,r,t),s=t.data;return(s.setAll(nV(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n)?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):nN(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}function nR(e,t){var n,r;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||!(!n||!r)&&U(n,r,(e,t)=>{var n,r;return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof nv&&r instanceof nv||n instanceof n_&&r instanceof n_?U(n.elements,r.elements,tl):n instanceof nE&&r instanceof nE?tl(n.Pe,r.Pe):n instanceof nw&&r instanceof nw)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class nF extends nk{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class nL extends nk{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function nV(e){let t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){let r=e.data.field(n);t.set(n,r)}}),t}function nP(e,t,n){var r;let i=new Map;e.length===n.length||S();for(let s=0;s<n.length;s++){let a=e[s],o=a.transform,l=t.data.field(a.field);i.set(a.field,(r=n[s],o instanceof nv?nI(o,l):o instanceof n_?nb(o,l):r))}return i}function nO(e,t,n){let r=new Map;for(let i of e){let e=i.transform,s=n.data.field(i.field);r.set(i.field,e instanceof nw?function(e,t){let n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&te(t)&&(t=tt(t)),t&&(n.fields.__previous_value__=t),{mapValue:n}}(t,s):e instanceof nv?nI(e,s):e instanceof n_?nb(e,s):function(e,t){let n=ny(e,t),r=nT(n)+nT(e.Pe);return tm(n)&&tm(e.Pe)?nm(r):nf(e.serializer,r)}(e,s))}return r}class nq extends nk{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class nU extends nk{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nB{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var r;r=n[t],i instanceof nF?function(e,t,n){let r=e.value.clone(),i=nP(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(i,e,r):i instanceof nL?function(e,t,n){if(!nN(e.precondition,t))return void t.convertToUnknownDocument(n.version);let r=nP(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(nV(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(i,e,r):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,r)}}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=nM(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=nM(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=nl();return this.mutations.forEach(r=>{let i=e.get(r.key),s=i.overlayedDocument,a=this.applyToLocalView(s,i.mutatedFields),o=nA(s,a=t.has(r.key)?null:a);null!==o&&n.set(r.key,o),s.isValidDocument()||s.convertToNoDocument(z.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),nh())}isEqual(e){return this.batchId===e.batchId&&U(this.mutations,e.mutations,(e,t)=>nR(e,t))&&U(this.baseMutations,e.baseMutations,(e,t)=>nR(e,t))}}class nz{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){e.mutations.length===n.length||S();let r=nu,i=e.mutations;for(let e=0;e<i.length;e++)r=r.insert(i[e].key,n[e].version);return new nz(e,t,n,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nG{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nK{constructor(e,t){this.count=e,this.unchangedNames=t}}function n$(e){switch(e){default:return S();case D.CANCELLED:case D.UNKNOWN:case D.DEADLINE_EXCEEDED:case D.RESOURCE_EXHAUSTED:case D.INTERNAL:case D.UNAVAILABLE:case D.UNAUTHENTICATED:return!1;case D.INVALID_ARGUMENT:case D.NOT_FOUND:case D.ALREADY_EXISTS:case D.PERMISSION_DENIED:case D.FAILED_PRECONDITION:case D.ABORTED:case D.OUT_OF_RANGE:case D.UNIMPLEMENTED:case D.DATA_LOSS:return!0}}function nQ(e){if(void 0===e)return b("GRPC error has no .code"),D.UNKNOWN;switch(e){case r.OK:return D.OK;case r.CANCELLED:return D.CANCELLED;case r.UNKNOWN:return D.UNKNOWN;case r.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case r.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case r.INTERNAL:return D.INTERNAL;case r.UNAVAILABLE:return D.UNAVAILABLE;case r.UNAUTHENTICATED:return D.UNAUTHENTICATED;case r.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case r.NOT_FOUND:return D.NOT_FOUND;case r.ALREADY_EXISTS:return D.ALREADY_EXISTS;case r.PERMISSION_DENIED:return D.PERMISSION_DENIED;case r.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case r.ABORTED:return D.ABORTED;case r.OUT_OF_RANGE:return D.OUT_OF_RANGE;case r.UNIMPLEMENTED:return D.UNIMPLEMENTED;case r.DATA_LOSS:return D.DATA_LOSS;default:return S()}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nj(){return new TextEncoder}(i=r||(r={}))[i.OK=0]="OK",i[i.CANCELLED=1]="CANCELLED",i[i.UNKNOWN=2]="UNKNOWN",i[i.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",i[i.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",i[i.NOT_FOUND=5]="NOT_FOUND",i[i.ALREADY_EXISTS=6]="ALREADY_EXISTS",i[i.PERMISSION_DENIED=7]="PERMISSION_DENIED",i[i.UNAUTHENTICATED=16]="UNAUTHENTICATED",i[i.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",i[i.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",i[i.ABORTED=10]="ABORTED",i[i.OUT_OF_RANGE=11]="OUT_OF_RANGE",i[i.UNIMPLEMENTED=12]="UNIMPLEMENTED",i[i.INTERNAL=13]="INTERNAL",i[i.UNAVAILABLE=14]="UNAVAILABLE",i[i.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nW=new h.z8([4294967295,4294967295],0);function nH(e){let t=nj().encode(e),n=new h.V8;return n.update(t),new Uint8Array(n.digest())}function nY(e){let t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),s=t.getUint32(12,!0);return[new h.z8([n,r],0),new h.z8([i,s],0)]}class nJ{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new nX(`Invalid padding: ${t}`);if(n<0||e.length>0&&0===this.hashCount)throw new nX(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new nX(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=h.z8.fromNumber(this.Ie)}Ee(e,t,n){let r=e.add(t.multiply(h.z8.fromNumber(n)));return 1===r.compare(nW)&&(r=new h.z8([r.getBits(0),r.getBits(1)],0)),r.modulo(this.Te).toNumber()}de(e){return 0!=(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.Ie)return!1;let[t,n]=nY(nH(e));for(let e=0;e<this.hashCount;e++){let r=this.Ee(t,n,e);if(!this.de(r))return!1}return!0}static create(e,t,n){let r=new nJ(new Uint8Array(Math.ceil(e/8)),e%8==0?0:8-e%8,t);return n.forEach(e=>r.insert(e)),r}insert(e){if(0===this.Ie)return;let[t,n]=nY(nH(e));for(let e=0;e<this.hashCount;e++){let r=this.Ee(t,n,e);this.Ae(r)}}Ae(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class nX extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nZ{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){let r=new Map;return r.set(e,n0.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new nZ(z.min(),r,new eY(q),ni,nh())}}class n0{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new n0(n,t,nh(),nh(),nh())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n1{constructor(e,t,n,r){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=r}}class n2{constructor(e,t){this.targetId=e,this.me=t}}class n5{constructor(e,t,n=e3.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class n4{constructor(){this.fe=0,this.ge=n6(),this.pe=e3.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return 0!==this.fe}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}Ce(){let e=nh(),t=nh(),n=nh();return this.ge.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:S()}}),new n0(this.pe,this.ye,e,t,n)}ve(){this.we=!1,this.ge=n6()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,this.fe>=0||S()}Ne(){this.we=!0,this.ye=!0}}class n3{constructor(e){this.Le=e,this.Be=new Map,this.ke=ni,this.qe=n8(),this.Qe=new eY(q)}Ke(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{let n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.ve(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:S()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((e,n)=>{this.ze(n)&&t(n)})}He(e){let t=e.targetId,n=e.me.count,r=this.Je(t);if(r){let i=r.target;if(tH(i)){if(0===n){let e=new j(i.path);this.Ue(t,e,tT.newNoDocument(e,z.min()))}else 1===n||S()}else{let r=this.Ye(t);if(r!==n){let n=this.Ze(e),i=n?this.Xe(n,e,r):1;0!==i&&(this.je(t),this.Qe=this.Qe.insert(t,2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch"))}}}}Ze(e){let t,n;let r=e.me.unchangedNames;if(!r||!r.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:a=0}=r;try{t=e7(i).toUint8Array()}catch(e){if(e instanceof e5)return E("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{n=new nJ(t,s,a)}catch(e){return E(e instanceof nX?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===n.Ie?null:n}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){let n=this.Le.getRemoteKeysForTarget(t),r=0;return n.forEach(n=>{let i=this.Le.tt(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(s)||(this.Ue(t,n,null),r++)}),r}rt(e){let t=new Map;this.Be.forEach((n,r)=>{let i=this.Je(r);if(i){if(n.current&&tH(i.target)){let t=new j(i.target.path);null!==this.ke.get(t)||this.it(r,t)||this.Ue(r,t,tT.newNoDocument(t,e))}n.be&&(t.set(r,n.Ce()),n.ve())}});let n=nh();this.qe.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{let t=this.Je(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.ke.forEach((t,n)=>n.setReadTime(e));let r=new nZ(e,t,this.Qe,this.ke,n);return this.ke=ni,this.qe=n8(),this.Qe=new eY(q),r}$e(e,t){if(!this.ze(e))return;let n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;let r=this.Ge(e);this.it(e,t)?r.Fe(t,1):r.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){let t=this.Ge(e).Ce();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new n4,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new eZ(q),this.qe=this.qe.insert(e,t)),t}ze(e){let t=null!==this.Je(e);return t||_("WatchChangeAggregator","Detected inactive target",e),t}Je(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new n4),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function n8(){return new eY(j.comparator)}function n6(){return new eY(j.comparator)}let n9={asc:"ASCENDING",desc:"DESCENDING"},n7={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},re={and:"AND",or:"OR"};class rt{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function rn(e,t){return e.useProto3Json||eI(t)?t:{value:t}}function rr(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function ri(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function rs(e){return e||S(),z.fromTimestamp(function(e){let t=e6(e);return new B(t.seconds,t.nanos)}(e))}function ra(e,t){return ro(e,t).canonicalString()}function ro(e,t){let n=new K(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?n:n.child(t)}function rl(e){let t=K.fromString(e);return rT(t)||S(),t}function ru(e,t){return ra(e.databaseId,t.path)}function rc(e,t){let n=rl(t);if(n.get(1)!==e.databaseId.projectId)throw new C(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new C(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new j(rm(n))}function rh(e,t){return ra(e.databaseId,t)}function rd(e){let t=rl(e);return 4===t.length?K.emptyPath():rm(t)}function rf(e){return new K(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function rm(e){return e.length>4&&"documents"===e.get(4)||S(),e.popFirst(5)}function rg(e,t,n){return{name:ru(e,t),fields:n.value.mapValue.fields}}function rp(e,t,n){let r=rc(e,t.name),i=rs(t.updateTime),s=t.createTime?rs(t.createTime):z.min(),a=new tE({mapValue:{fields:t.fields}}),o=tT.newFoundDocument(r,i,s,a);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function ry(e,t){var n;let r;if(t instanceof nF)r={update:rg(e,t.key,t.value)};else if(t instanceof nq)r={delete:ru(e,t.key)};else if(t instanceof nL)r={update:rg(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof nU))return S();r={verify:ru(e,t.key)}}return t.fieldTransforms.length>0&&(r.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let n=t.transform;if(n instanceof nw)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof nv)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof n_)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof nE)return{fieldPath:t.field.canonicalString(),increment:n.Pe};throw S()})(0,e))),t.precondition.isNone||(r.currentDocument=void 0!==(n=t.precondition).updateTime?{updateTime:rr(e,n.updateTime.toTimestamp())}:void 0!==n.exists?{exists:n.exists}:S()),r}function rw(e,t){var n;let r=t.currentDocument?void 0!==(n=t.currentDocument).updateTime?nC.updateTime(rs(n.updateTime)):void 0!==n.exists?nC.exists(n.exists):nC.none():nC.none(),i=t.updateTransforms?t.updateTransforms.map(t=>{let n;return n=null,"setToServerValue"in t?("REQUEST_TIME"===t.setToServerValue||S(),n=new nw):"appendMissingElements"in t?n=new nv(t.appendMissingElements.values||[]):"removeAllFromArray"in t?n=new n_(t.removeAllFromArray.values||[]):"increment"in t?n=new nE(e,t.increment):S(),new nx(Q.fromServerFormat(t.fieldPath),n)}):[];if(t.update){t.update.name;let n=rc(e,t.update.name),s=new tE({mapValue:{fields:t.update.fields}});return t.updateMask?new nL(n,s,new e2((t.updateMask.fieldPaths||[]).map(e=>Q.fromServerFormat(e))),r,i):new nF(n,s,r,i)}return t.delete?new nq(rc(e,t.delete),r):t.verify?new nU(rc(e,t.verify),r):S()}function rv(e,t){return{documents:[rh(e,t.path)]}}function rI(e,t){var n,r;let i;let s={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(i=a,s.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=a.popLast(),s.structuredQuery.from=[{collectionId:a.lastSegment()}]),s.parent=rh(e,i);let o=function(e){if(0!==e.length)return function e(t){return t instanceof tk?function(e){if("=="===e.op){if(ty(e.value))return{unaryFilter:{field:rb(e.field),op:"IS_NAN"}};if(tp(e.value))return{unaryFilter:{field:rb(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(ty(e.value))return{unaryFilter:{field:rb(e.field),op:"IS_NOT_NAN"}};if(tp(e.value))return{unaryFilter:{field:rb(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rb(e.field),op:n7[e.op],value:e.value}}}(t):t instanceof tA?function(t){let n=t.getFilters().map(t=>e(t));return 1===n.length?n[0]:{compositeFilter:{op:re[t.op],filters:n}}}(t):S()}(tA.create(e,"and"))}(t.filters);o&&(s.structuredQuery.where=o);let l=function(e){if(0!==e.length)return e.map(e=>({field:rb(e.field),direction:n9[e.dir]}))}(t.orderBy);l&&(s.structuredQuery.orderBy=l);let u=rn(e,t.limit);return null!==u&&(s.structuredQuery.limit=u),t.startAt&&(s.structuredQuery.startAt={before:(n=t.startAt).inclusive,values:n.position}),t.endAt&&(s.structuredQuery.endAt={before:!(r=t.endAt).inclusive,values:r.position}),{_t:s,parent:i}}function r_(e){var t;let n,r=rd(e.parent),i=e.structuredQuery,s=i.from?i.from.length:0,a=null;if(s>0){1===s||S();let e=i.from[0];e.allDescendants?a=e.collectionId:r=r.child(e.collectionId)}let o=[];i.where&&(o=function(e){let t=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=rE(e.unaryFilter.field);return tk.create(t,"==",{doubleValue:NaN});case"IS_NULL":let n=rE(e.unaryFilter.field);return tk.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let r=rE(e.unaryFilter.field);return tk.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=rE(e.unaryFilter.field);return tk.create(i,"!=",{nullValue:"NULL_VALUE"});default:return S()}}(t):void 0!==t.fieldFilter?tk.create(rE(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return S()}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?tA.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return S()}}(t.compositeFilter.op)):S()}(e);return t instanceof tA&&tF(t)?t.getFilters():[t]}(i.where));let l=[];i.orderBy&&(l=i.orderBy.map(e=>new tC(rE(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let u=null;i.limit&&(u=eI(n="object"==typeof(t=i.limit)?t.value:t)?null:n);let c=null;i.startAt&&(c=function(e){let t=!!e.before;return new tS(e.values||[],t)}(i.startAt));let h=null;return i.endAt&&(h=function(e){let t=!e.before;return new tS(e.values||[],t)}(i.endAt)),new tZ(r,a,l,o,u,"F",c,h)}function rb(e){return{fieldPath:e.canonicalString()}}function rE(e){return Q.fromServerFormat(e.fieldPath)}function rT(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rS{constructor(e,t,n,r,i=z.min(),s=z.min(),a=e3.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new rS(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new rS(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new rS(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new rS(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rx{constructor(e){this.ct=e}}function rD(e,t){let n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:rC(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument()){var i;r.document={name:ru(i=e.ct,t.key),fields:t.data.value.mapValue.fields,updateTime:rr(i,t.version.toTimestamp()),createTime:rr(i,t.createTime.toTimestamp())}}else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:rN(t.version)};else{if(!t.isUnknownDocument())return S();r.unknownDocument={path:n.path.toArray(),version:rN(t.version)}}return r}function rC(e){let t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function rN(e){let t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function rk(e){let t=new B(e.seconds,e.nanoseconds);return z.fromTimestamp(t)}function rA(e,t){let n=(t.baseMutations||[]).map(t=>rw(e.ct,t));for(let e=0;e<t.mutations.length-1;++e){let n=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){let r=t.mutations[e+1];n.updateTransforms=r.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}let r=t.mutations.map(t=>rw(e.ct,t)),i=B.fromMillis(t.localWriteTimeMs);return new nB(t.batchId,i,n,r)}function rM(e){var t;let n=rk(e.readTime),r=void 0!==e.lastLimboFreeSnapshotVersion?rk(e.lastLimboFreeSnapshotVersion):z.min();return new rS(void 0!==e.query.documents?(1===(t=e.query).documents.length||S(),t4(t0(rd(t.documents[0])))):t4(r_(e.query)),e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,n,r,e3.fromBase64String(e.resumeToken))}function rR(e,t){let n;let r=rN(t.snapshotVersion),i=rN(t.lastLimboFreeSnapshotVersion);n=tH(t.target)?rv(e.ct,t.target):rI(e.ct,t.target)._t;let s=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:tj(t.target),readTime:r,resumeToken:s,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:i,query:n}}function rF(e){let t=r_({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?t8(t,t.limit,"L"):t}function rL(e,t){return new nG(t.largestBatchId,rw(e.ct,t.overlayMutation))}function rV(e,t){let n=t.path.lastSegment();return[e,eE(t.path.popLast()),n]}function rP(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:rN(r.readTime),documentKey:eE(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rO{getBundleMetadata(e,t){return rq(e).get(t).next(e=>{if(e)return{id:e.bundleId,createTime:rk(e.createTime),version:e.version}})}saveBundleMetadata(e,t){return rq(e).put({bundleId:t.id,createTime:rN(rs(t.createTime)),version:t.version})}getNamedQuery(e,t){return rU(e).get(t).next(e=>{if(e)return{name:e.name,query:rF(e.bundledQuery),readTime:rk(e.readTime)}})}saveNamedQuery(e,t){return rU(e).put({name:t.name,readTime:rN(rs(t.readTime)),bundledQuery:t.bundledQuery})}}function rq(e){return eQ(e,"bundles")}function rU(e){return eQ(e,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rB{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){return new rB(e,t.uid||"")}getOverlay(e,t){return rz(e).get(rV(this.userId,t)).next(e=>e?rL(this.serializer,e):null)}getOverlays(e,t){let n=nl();return ea.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){let r=[];return n.forEach((n,i)=>{let s=new nG(t,i);r.push(this.ht(e,s))}),ea.waitFor(r)}removeOverlaysForBatchId(e,t,n){let r=new Set;t.forEach(e=>r.add(eE(e.getCollectionPath())));let i=[];return r.forEach(t=>{let r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);i.push(rz(e).j("collectionPathOverlayIndex",r))}),ea.waitFor(i)}getOverlaysForCollection(e,t,n){let r=nl(),i=eE(t),s=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return rz(e).U("collectionPathOverlayIndex",s).next(e=>{for(let t of e){let e=rL(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){let i;let s=nl(),a=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return rz(e).J({index:"collectionGroupOverlayIndex",range:a},(e,t,n)=>{let a=rL(this.serializer,t);s.size()<r||a.largestBatchId===i?(s.set(a.getKey(),a),i=a.largestBatchId):n.done()}).next(()=>s)}ht(e,t){return rz(e).put(function(e,t,n){let[r,i,s]=rV(t,n.mutation.key);return{userId:t,collectionPath:i,documentId:s,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:ry(e.ct,n.mutation)}}(this.serializer,this.userId,t))}}function rz(e){return eQ(e,"documentOverlays")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rG{constructor(){}Pt(e,t){this.It(e,t),t.Tt()}It(e,t){if("nullValue"in e)this.Et(t,5);else if("booleanValue"in e)this.Et(t,10),t.dt(e.booleanValue?1:0);else if("integerValue"in e)this.Et(t,15),t.dt(e9(e.integerValue));else if("doubleValue"in e){let n=e9(e.doubleValue);isNaN(n)?this.Et(t,13):(this.Et(t,15),e_(n)?t.dt(0):t.dt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Et(t,20),"string"==typeof n&&(n=e6(n)),t.At(`${n.seconds||""}`),t.dt(n.nanos||0)}else if("stringValue"in e)this.Rt(e.stringValue,t),this.Vt(t);else if("bytesValue"in e)this.Et(t,30),t.ft(e7(e.bytesValue)),this.Vt(t);else if("referenceValue"in e)this.gt(e.referenceValue,t);else if("geoPointValue"in e){let n=e.geoPointValue;this.Et(t,45),t.dt(n.latitude||0),t.dt(n.longitude||0)}else"mapValue"in e?tI(e)?this.Et(t,Number.MAX_SAFE_INTEGER):(this.yt(e.mapValue,t),this.Vt(t)):"arrayValue"in e?(this.wt(e.arrayValue,t),this.Vt(t)):S()}Rt(e,t){this.Et(t,25),this.St(e,t)}St(e,t){t.At(e)}yt(e,t){let n=e.fields||{};for(let e of(this.Et(t,55),Object.keys(n)))this.Rt(e,t),this.It(n[e],t)}wt(e,t){let n=e.values||[];for(let e of(this.Et(t,50),n))this.It(e,t)}gt(e,t){this.Et(t,37),j.fromName(e).path.forEach(e=>{this.Et(t,60),this.St(e,t)})}Et(e,t){e.dt(t)}Vt(e){e.dt(2)}}function rK(e){return Math.ceil((64-function(e){let t=0;for(let n=0;n<8;++n){let r=function(e){if(0===e)return 8;let t=0;return e>>4==0&&(t+=4,e<<=4),e>>6==0&&(t+=2,e<<=2),e>>7==0&&(t+=1),t}(255&e[n]);if(t+=r,8!==r)break}return t}(e))/8)}rG.bt=new rG;class r${constructor(){this.buffer=new Uint8Array(1024),this.position=0}Dt(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.Ct(n.value),n=t.next();this.vt()}Ft(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.Mt(n.value),n=t.next();this.xt()}Ot(e){for(let t of e){let e=t.charCodeAt(0);if(e<128)this.Ct(e);else if(e<2048)this.Ct(960|e>>>6),this.Ct(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Ct(480|e>>>12),this.Ct(128|63&e>>>6),this.Ct(128|63&e);else{let e=t.codePointAt(0);this.Ct(240|e>>>18),this.Ct(128|63&e>>>12),this.Ct(128|63&e>>>6),this.Ct(128|63&e)}}this.vt()}Nt(e){for(let t of e){let e=t.charCodeAt(0);if(e<128)this.Mt(e);else if(e<2048)this.Mt(960|e>>>6),this.Mt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Mt(480|e>>>12),this.Mt(128|63&e>>>6),this.Mt(128|63&e);else{let e=t.codePointAt(0);this.Mt(240|e>>>18),this.Mt(128|63&e>>>12),this.Mt(128|63&e>>>6),this.Mt(128|63&e)}}this.xt()}Lt(e){let t=this.Bt(e),n=rK(t);this.kt(1+n),this.buffer[this.position++]=255&n;for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=255&t[e]}qt(e){let t=this.Bt(e),n=rK(t);this.kt(1+n),this.buffer[this.position++]=~(255&n);for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}Qt(){this.Kt(255),this.Kt(255)}$t(){this.Ut(255),this.Ut(255)}reset(){this.position=0}seed(e){this.kt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Wt(){return this.buffer.slice(0,this.position)}Bt(e){let t=function(e){let t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=0!=(128&t[0]);t[0]^=n?255:128;for(let e=1;e<t.length;++e)t[e]^=n?255:0;return t}Ct(e){let t=255&e;0===t?(this.Kt(0),this.Kt(255)):255===t?(this.Kt(255),this.Kt(0)):this.Kt(t)}Mt(e){let t=255&e;0===t?(this.Ut(0),this.Ut(255)):255===t?(this.Ut(255),this.Ut(0)):this.Ut(e)}vt(){this.Kt(0),this.Kt(1)}xt(){this.Ut(0),this.Ut(1)}Kt(e){this.kt(1),this.buffer[this.position++]=e}Ut(e){this.kt(1),this.buffer[this.position++]=~e}kt(e){let t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);let r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class rQ{constructor(e){this.Gt=e}ft(e){this.Gt.Dt(e)}At(e){this.Gt.Ot(e)}dt(e){this.Gt.Lt(e)}Tt(){this.Gt.Qt()}}class rj{constructor(e){this.Gt=e}ft(e){this.Gt.Ft(e)}At(e){this.Gt.Nt(e)}dt(e){this.Gt.qt(e)}Tt(){this.Gt.$t()}}class rW{constructor(){this.Gt=new r$,this.zt=new rQ(this.Gt),this.jt=new rj(this.Gt)}seed(e){this.Gt.seed(e)}Ht(e){return 0===e?this.zt:this.jt}Wt(){return this.Gt.Wt()}reset(){this.Gt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rH{constructor(e,t,n,r){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=r}Jt(){let e=this.directionalValue.length,t=0===e||255===this.directionalValue[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new rH(this.indexId,this.documentKey,this.arrayValue,n)}}function rY(e,t){let n=e.indexId-t.indexId;return 0!==n?n:0!==(n=rJ(e.arrayValue,t.arrayValue))?n:0!==(n=rJ(e.directionalValue,t.directionalValue))?n:j.comparator(e.documentKey,t.documentKey)}function rJ(e,t){for(let n=0;n<e.length&&n<t.length;++n){let r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rX{constructor(e){for(let t of(this.Yt=new eZ((e,t)=>Q.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.Zt=e.orderBy,this.Xt=[],e.filters))t.isInequality()?this.Yt=this.Yt.add(t):this.Xt.push(t)}get en(){return this.Yt.size>1}tn(e){if(e.collectionGroup===this.collectionId||S(),this.en)return!1;let t=H(e);if(void 0!==t&&!this.nn(t))return!1;let n=Y(e),r=new Set,i=0,s=0;for(;i<n.length&&this.nn(n[i]);++i)r=r.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Yt.size>0){let e=this.Yt.getIterator().getNext();if(!r.has(e.field.canonicalString())){let t=n[i];if(!this.rn(e,t)||!this.sn(this.Zt[s++],t))return!1}++i}for(;i<n.length;++i){let e=n[i];if(s>=this.Zt.length||!this.sn(this.Zt[s++],e))return!1}return!0}on(){if(this.en)return null;let e=new eZ(Q.comparator),t=[];for(let n of this.Xt)if(!n.field.isKeyField()){if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new J(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new J(n.field,0))}}for(let n of this.Zt)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new J(n.field,"asc"===n.dir?0:1)));return new W(W.UNKNOWN_ID,this.collectionId,t,X.empty())}nn(e){for(let t of this.Xt)if(this.rn(t,e))return!0;return!1}rn(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;let n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}sn(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}function rZ(e){return e instanceof tk}function r0(e){return e instanceof tA&&tF(e)}function r1(e){return rZ(e)||r0(e)||function(e){if(e instanceof tA&&tR(e)){for(let t of e.getFilters())if(!rZ(t)&&!r0(t))return!1;return!0}return!1}(e)}function r2(e,t){return e instanceof tk||e instanceof tA||S(),t instanceof tk||t instanceof tA||S(),r4(e instanceof tk?t instanceof tk?tA.create([e,t],"and"):r5(e,t):t instanceof tk?r5(t,e):function(e,t){if(e.filters.length>0&&t.filters.length>0||S(),tM(e)&&tM(t))return tV(e,t.getFilters());let n=tR(e)?e:t,r=tR(e)?t:e,i=n.filters.map(e=>r2(e,r));return tA.create(i,"or")}(e,t))}function r5(e,t){if(tM(t))return tV(t,e.getFilters());{let n=t.filters.map(t=>r2(e,t));return tA.create(n,"or")}}function r4(e){if(e instanceof tk||e instanceof tA||S(),e instanceof tk)return e;let t=e.getFilters();if(1===t.length)return r4(t[0]);if(tL(e))return e;let n=t.map(e=>r4(e)),r=[];return n.forEach(t=>{t instanceof tk?r.push(t):t instanceof tA&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:tA.create(r,e.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r3{constructor(){this._n=new r8}addToCollectionParentIndex(e,t){return this._n.add(t),ea.resolve()}getCollectionParents(e,t){return ea.resolve(this._n.getEntries(t))}addFieldIndex(e,t){return ea.resolve()}deleteFieldIndex(e,t){return ea.resolve()}deleteAllFieldIndexes(e){return ea.resolve()}createTargetIndexes(e,t){return ea.resolve()}getDocumentsMatchingTarget(e,t){return ea.resolve(null)}getIndexType(e,t){return ea.resolve(0)}getFieldIndexes(e,t){return ea.resolve([])}getNextCollectionGroupToUpdate(e){return ea.resolve(null)}getMinOffset(e,t){return ea.resolve(et.min())}getMinOffsetFromCollectionGroup(e,t){return ea.resolve(et.min())}updateCollectionGroup(e,t,n){return ea.resolve()}updateIndexEntries(e,t){return ea.resolve()}}class r8{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new eZ(K.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new eZ(K.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r6=new Uint8Array(0);class r9{constructor(e,t){this.databaseId=t,this.an=new r8,this.un=new nr(e=>tj(e),(e,t)=>tW(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.an.has(t)){let n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.an.add(t)});let i={collectionId:n,parent:eE(r)};return r7(e).put(i)}return ea.resolve()}getCollectionParents(e,t){let n=[],r=IDBKeyRange.bound([t,""],[t+"\0",""],!1,!0);return r7(e).U(r).next(e=>{for(let r of e){if(r.collectionId!==t)break;n.push(eT(r.parent))}return n})}addFieldIndex(e,t){let n=it(e),r={indexId:t.indexId,collectionGroup:t.collectionGroup,fields:t.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])};delete r.indexId;let i=n.add(r);if(t.indexState){let n=ir(e);return i.next(e=>{n.put(rP(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){let n=it(e),r=ir(e),i=ie(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){let t=it(e),n=ie(e),r=ir(e);return t.j().next(()=>n.j()).next(()=>r.j())}createTargetIndexes(e,t){return ea.forEach(this.cn(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){let n=new rX(t).on();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){let n=ie(e),r=!0,i=new Map;return ea.forEach(this.cn(t),t=>this.ln(e,t).next(e=>{r&&(r=!!e),i.set(t,e)})).next(()=>{if(r){let e=nh(),r=[];return ea.forEach(i,(i,s)=>{_("IndexedDbIndexManager",`Using index id=${i.indexId}|cg=${i.collectionGroup}|f=${i.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")} to execute ${tj(t)}`);let a=function(e,t){let n=H(t);if(void 0===n)return null;for(let t of tY(e,n.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null}(s,i),o=function(e,t){let n=new Map;for(let r of Y(t))for(let t of tY(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(s,i),l=function(e,t){let n=[],r=!0;for(let i of Y(t)){let t=0===i.kind?tJ(e,i.fieldPath,e.startAt):tX(e,i.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new tS(n,r)}(s,i),u=function(e,t){let n=[],r=!0;for(let i of Y(t)){let t=0===i.kind?tX(e,i.fieldPath,e.endAt):tJ(e,i.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new tS(n,r)}(s,i),c=this.hn(i,s,l),h=this.hn(i,s,u),d=this.Pn(i,s,o),f=this.In(i.indexId,a,c,l.inclusive,h,u.inclusive,d);return ea.forEach(f,i=>n.G(i,t.limit).next(t=>{t.forEach(t=>{let n=j.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return ea.resolve(null)})}cn(e){let t=this.un.get(e);return t||(t=0===e.filters.length?[e]:(function(e){if(0===e.getFilters().length)return[];let t=function e(t){if(t instanceof tk||t instanceof tA||S(),t instanceof tk)return t;if(1===t.filters.length)return e(t.filters[0]);let n=t.filters.map(t=>e(t)),r=tA.create(n,t.op);return r1(r=r4(r))?r:(r instanceof tA||S(),tM(r)||S(),r.filters.length>1||S(),r.filters.reduce((e,t)=>r2(e,t)))}(/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e(t){var n,r;if(t instanceof tk||t instanceof tA||S(),t instanceof tk){if(t instanceof tz){let e=(null===(r=null===(n=t.value.arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.map(e=>tk.create(t.field,"==",e)))||[];return tA.create(e,"or")}return t}let i=t.filters.map(t=>e(t));return tA.create(i,t.op)}(e));return r1(t)||S(),rZ(t)||r0(t)?[t]:t.getFilters()})(tA.create(e.filters,"and")).map(t=>tQ(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.un.set(e,t)),t}In(e,t,n,r,i,s,a){let o=(null!=t?t.length:1)*Math.max(n.length,i.length),l=o/(null!=t?t.length:1),u=[];for(let c=0;c<o;++c){let o=t?this.Tn(t[c/l]):r6,h=this.En(e,o,n[c%l],r),d=this.dn(e,o,i[c%l],s),f=a.map(t=>this.En(e,o,t,!0));u.push(...this.createRange(h,d,f))}return u}En(e,t,n,r){let i=new rH(e,j.empty(),t,n);return r?i:i.Jt()}dn(e,t,n,r){let i=new rH(e,j.empty(),t,n);return r?i.Jt():i}ln(e,t){let n=new rX(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(let r of e)n.tn(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2,r=this.cn(t);return ea.forEach(r,t=>this.ln(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new eZ(Q.comparator),n=!1;for(let r of e.filters)for(let e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(let n of e.orderBy)n.field.isKeyField()||(t=t.add(n.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>null!==t.limit&&r.length>1&&2===n?1:n)}An(e,t){let n=new rW;for(let r of Y(e)){let e=t.data.field(r.fieldPath);if(null==e)return null;let i=n.Ht(r.kind);rG.bt.Pt(e,i)}return n.Wt()}Tn(e){let t=new rW;return rG.bt.Pt(e,t.Ht(0)),t.Wt()}Rn(e,t){let n=new rW;return rG.bt.Pt(tf(this.databaseId,t),n.Ht(function(e){let t=Y(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.Wt()}Pn(e,t,n){if(null===n)return[];let r=[];r.push(new rW);let i=0;for(let s of Y(e)){let e=n[i++];for(let n of r)if(this.Vn(t,s.fieldPath)&&tg(e))r=this.mn(r,s,e);else{let t=n.Ht(s.kind);rG.bt.Pt(e,t)}}return this.fn(r)}hn(e,t,n){return this.Pn(e,t,n.position)}fn(e){let t=[];for(let n=0;n<e.length;++n)t[n]=e[n].Wt();return t}mn(e,t,n){let r=[...e],i=[];for(let e of n.arrayValue.values||[])for(let n of r){let r=new rW;r.seed(n.Wt()),rG.bt.Pt(e,r.Ht(t.kind)),i.push(r)}return i}Vn(e,t){return!!e.filters.find(e=>e instanceof tk&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){let n=it(e),r=ir(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next(e=>{let t=[];return ea.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){let n=t?new X(t.sequenceNumber,new et(rk(t.readTime),new j(eT(t.documentKey)),t.largestBatchId)):X.empty(),r=e.fields.map(([e,t])=>new J(Q.fromServerFormat(e),t));return new W(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{let n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:q(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){let r=it(e),i=ir(e);return this.gn(e).next(e=>r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(t=>ea.forEach(t,t=>i.put(rP(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){let n=new Map;return ea.forEach(t,(t,r)=>{let i=n.get(t.collectionGroup);return(i?ea.resolve(i):this.getFieldIndexes(e,t.collectionGroup)).next(i=>(n.set(t.collectionGroup,i),ea.forEach(i,n=>this.pn(e,t,n).next(t=>{let i=this.yn(r,n);return t.isEqual(i)?ea.resolve():this.wn(e,r,n,t,i)}))))})}Sn(e,t,n,r){return ie(e).put({indexId:r.indexId,uid:this.uid,arrayValue:r.arrayValue,directionalValue:r.directionalValue,orderedDocumentKey:this.Rn(n,t.key),documentKey:t.key.path.toArray()})}bn(e,t,n,r){return ie(e).delete([r.indexId,this.uid,r.arrayValue,r.directionalValue,this.Rn(n,t.key),t.key.path.toArray()])}pn(e,t,n){let r=ie(e),i=new eZ(rY);return r.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.Rn(n,t)])},(e,r)=>{i=i.add(new rH(n.indexId,t,r.arrayValue,r.directionalValue))}).next(()=>i)}yn(e,t){let n=new eZ(rY),r=this.An(t,e);if(null==r)return n;let i=H(t);if(null!=i){let s=e.data.field(i.fieldPath);if(tg(s))for(let i of s.arrayValue.values||[])n=n.add(new rH(t.indexId,e.key,this.Tn(i),r))}else n=n.add(new rH(t.indexId,e.key,r6,r));return n}wn(e,t,n,r,i){_("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);let s=[];return function(e,t,n,r,i){let s=e.getIterator(),a=t.getIterator(),o=e1(s),l=e1(a);for(;o||l;){let e=!1,t=!1;if(o&&l){let r=n(o,l);r<0?t=!0:r>0&&(e=!0)}else null!=o?t=!0:e=!0;e?(r(l),l=e1(a)):t?(i(o),o=e1(s)):(o=e1(s),l=e1(a))}}(r,i,rY,r=>{s.push(this.Sn(e,t,n,r))},r=>{s.push(this.bn(e,t,n,r))}),ea.waitFor(s)}gn(e){let t=1;return ir(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>rY(e,t)).filter((e,t,n)=>!t||0!==rY(e,n[t-1]));let r=[];for(let i of(r.push(e),n)){let n=rY(i,e),s=rY(i,t);if(0===n)r[0]=e.Jt();else if(n>0&&s<0)r.push(i),r.push(i.Jt());else if(s>0)break}r.push(t);let i=[];for(let e=0;e<r.length;e+=2){if(this.Dn(r[e],r[e+1]))return[];let t=[r[e].indexId,this.uid,r[e].arrayValue,r[e].directionalValue,r6,[]],n=[r[e+1].indexId,this.uid,r[e+1].arrayValue,r[e+1].directionalValue,r6,[]];i.push(IDBKeyRange.bound(t,n))}return i}Dn(e,t){return rY(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(ii)}getMinOffset(e,t){return ea.mapArray(this.cn(t),t=>this.ln(e,t).next(e=>e||S())).next(ii)}}function r7(e){return eQ(e,"collectionParents")}function ie(e){return eQ(e,"indexEntries")}function it(e){return eQ(e,"indexConfiguration")}function ir(e){return eQ(e,"indexState")}function ii(e){0!==e.length||S();let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){let i=e[r].indexState.offset;0>en(i,t)&&(t=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new et(t.readTime,t.documentKey,n)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let is={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class ia{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new ia(e,ia.DEFAULT_COLLECTION_PERCENTILE,ia.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(e,t,n){let r=e.store("mutations"),i=e.store("documentMutations"),s=[],a=IDBKeyRange.only(n.batchId),o=0,l=r.J({range:a},(e,t,n)=>(o++,n.delete()));s.push(l.next(()=>{1===o||S()}));let u=[];for(let e of n.mutations){var c,h;let r=(c=e.key.path,h=n.batchId,[t,eE(c),h]);s.push(i.delete(r)),u.push(e.key)}return ea.waitFor(s).next(()=>u)}function il(e){let t;if(!e)return 0;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw S();t=e.noDocument}return JSON.stringify(t).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ia.DEFAULT_COLLECTION_PERCENTILE=10,ia.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ia.DEFAULT=new ia(41943040,ia.DEFAULT_COLLECTION_PERCENTILE,ia.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ia.DISABLED=new ia(-1,0,0);class iu{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.Cn={}}static lt(e,t,n,r){return""!==e.uid||S(),new iu(e.isAuthenticated()?e.uid:"",t,n,r)}checkEmpty(e){let t=!0,n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return ih(e).J({index:"userMutationsIndex",range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){let i=id(e),s=ih(e);return s.add({}).next(a=>{"number"==typeof a||S();let o=new nB(a,t,n,r),l=function(e,t,n){let r=n.baseMutations.map(t=>ry(e.ct,t)),i=n.mutations.map(t=>ry(e.ct,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:i}}(this.serializer,this.userId,o),u=[],c=new eZ((e,t)=>q(e.canonicalString(),t.canonicalString()));for(let e of r){let t=[this.userId,eE(e.key.path),a];c=c.add(e.key.path.popLast()),u.push(s.put(l)),u.push(i.put(t,ex))}return c.forEach(t=>{u.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.Cn[a]=o.keys()}),ea.waitFor(u).next(()=>o)})}lookupMutationBatch(e,t){return ih(e).get(t).next(e=>e?(e.userId===this.userId||S(),rA(this.serializer,e)):null)}vn(e,t){return this.Cn[t]?ea.resolve(this.Cn[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){let n=e.keys();return this.Cn[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){let n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]),i=null;return ih(e).J({index:"userMutationsIndex",range:r},(e,t,r)=>{t.userId===this.userId&&(t.batchId>=n||S(),i=rA(this.serializer,t)),r.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){let t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]),n=-1;return ih(e).J({index:"userMutationsIndex",range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){let t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return ih(e).U("userMutationsIndex",t).next(e=>e.map(e=>rA(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){let n=[this.userId,eE(t.path)],r=IDBKeyRange.lowerBound(n),i=[];return id(e).J({range:r},(n,r,s)=>{let[a,o,l]=n,u=eT(o);if(a===this.userId&&t.path.isEqual(u))return ih(e).get(l).next(e=>{if(!e)throw S();e.userId===this.userId||S(),i.push(rA(this.serializer,e))});s.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new eZ(q),r=[];return t.forEach(t=>{let i=[this.userId,eE(t.path)],s=IDBKeyRange.lowerBound(i),a=id(e).J({range:s},(e,r,i)=>{let[s,a,o]=e,l=eT(a);s===this.userId&&t.path.isEqual(l)?n=n.add(o):i.done()});r.push(a)}),ea.waitFor(r).next(()=>this.Fn(e,n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=[this.userId,eE(n)],s=IDBKeyRange.lowerBound(i),a=new eZ(q);return id(e).J({range:s},(e,t,i)=>{let[s,o,l]=e,u=eT(o);s===this.userId&&n.isPrefixOf(u)?u.length===r&&(a=a.add(l)):i.done()}).next(()=>this.Fn(e,a))}Fn(e,t){let n=[],r=[];return t.forEach(t=>{r.push(ih(e).get(t).next(e=>{if(null===e)throw S();e.userId===this.userId||S(),n.push(rA(this.serializer,e))}))}),ea.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return io(e._e,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.Mn(t.batchId)}),ea.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}Mn(e){delete this.Cn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return ea.resolve();let n=IDBKeyRange.lowerBound([this.userId]),r=[];return id(e).J({range:n},(e,t,n)=>{if(e[0]===this.userId){let t=eT(e[1]);r.push(t)}else n.done()}).next(()=>{0===r.length||S()})})}containsKey(e,t){return ic(e,this.userId,t)}xn(e){return im(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function ic(e,t,n){let r=[t,eE(n.path)],i=r[1],s=IDBKeyRange.lowerBound(r),a=!1;return id(e).J({range:s,H:!0},(e,n,r)=>{let[s,o,l]=e;s===t&&o===i&&(a=!0),r.done()}).next(()=>a)}function ih(e){return eQ(e,"mutations")}function id(e){return eQ(e,"documentMutations")}function im(e){return eQ(e,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(e){this.On=e}next(){return this.On+=2,this.On}static Nn(){return new ig(0)}static Ln(){return new ig(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Bn(e).next(t=>{let n=new ig(t.highestTargetId);return t.highestTargetId=n.next(),this.kn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Bn(e).next(e=>z.fromTimestamp(new B(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Bn(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.Bn(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.kn(e,r)))}addTargetData(e,t){return this.qn(e,t).next(()=>this.Bn(e).next(n=>(n.targetCount+=1,this.Qn(t,n),this.kn(e,n))))}updateTargetData(e,t){return this.qn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>iy(e).delete(t.targetId)).next(()=>this.Bn(e)).next(t=>(t.targetCount>0||S(),t.targetCount-=1,this.kn(e,t)))}removeTargets(e,t,n){let r=0,i=[];return iy(e).J((s,a)=>{let o=rM(a);o.sequenceNumber<=t&&null===n.get(o.targetId)&&(r++,i.push(this.removeTargetData(e,o)))}).next(()=>ea.waitFor(i)).next(()=>r)}forEachTarget(e,t){return iy(e).J((e,n)=>{t(rM(n))})}Bn(e){return iw(e).get("targetGlobalKey").next(e=>(null!==e||S(),e))}kn(e,t){return iw(e).put("targetGlobalKey",t)}qn(e,t){return iy(e).put(rR(this.serializer,t))}Qn(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.Bn(e).next(e=>e.targetCount)}getTargetData(e,t){let n=tj(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]),i=null;return iy(e).J({range:r,index:"queryTargetsIndex"},(e,n,r)=>{let s=rM(n);tW(t,s.target)&&(i=s,r.done())}).next(()=>i)}addMatchingKeys(e,t,n){let r=[],i=iv(e);return t.forEach(t=>{let s=eE(t.path);r.push(i.put({targetId:n,path:s})),r.push(this.referenceDelegate.addReference(e,n,t))}),ea.waitFor(r)}removeMatchingKeys(e,t,n){let r=iv(e);return ea.forEach(t,t=>{let i=eE(t.path);return ea.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){let n=iv(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){let n=IDBKeyRange.bound([t],[t+1],!1,!0),r=iv(e),i=nh();return r.J({range:n,H:!0},(e,t,n)=>{let r=new j(eT(e[1]));i=i.add(r)}).next(()=>i)}containsKey(e,t){let n=eE(t.path),r=IDBKeyRange.bound([n],[n+"\0"],!1,!0),i=0;return iv(e).J({index:"documentTargetsIndex",H:!0,range:r},([e,t],n,r)=>{0!==e&&(i++,r.done())}).next(()=>i>0)}ot(e,t){return iy(e).get(t).next(e=>e?rM(e):null)}}function iy(e){return eQ(e,"targets")}function iw(e){return eQ(e,"targetGlobal")}function iv(e){return eQ(e,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iI([e,t],[n,r]){let i=q(e,n);return 0===i?q(t,r):i}class i_{constructor(e){this.Kn=e,this.buffer=new eZ(iI),this.$n=0}Un(){return++this.$n}Wn(e){let t=[e,this.Un()];if(this.buffer.size<this.Kn)this.buffer=this.buffer.add(t);else{let e=this.buffer.last();0>iI(t,e)&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class ib{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Gn=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.zn(6e4)}stop(){this.Gn&&(this.Gn.cancel(),this.Gn=null)}get started(){return null!==this.Gn}zn(e){_("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Gn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Gn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){ed(e)?_("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await es(e)}await this.zn(3e5)})}}class iE{constructor(e,t){this.jn=e,this.params=t}calculateTargetCount(e,t){return this.jn.Hn(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return ea.resolve(ev.oe);let n=new i_(t);return this.jn.forEachTarget(e,e=>n.Wn(e.sequenceNumber)).next(()=>this.jn.Jn(e,e=>n.Wn(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.jn.removeOrphanedDocuments(e,t)}collect(e,t){return -1===this.params.cacheSizeCollectionThreshold?(_("LruGarbageCollector","Garbage collection skipped; disabled"),ea.resolve(is)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(_("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),is):this.Yn(e,t))}getCacheSize(e){return this.jn.getCacheSize(e)}Yn(e,t){let n,r,i,s,a,o,l;let c=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(_("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,a=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,o=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(l=Date.now(),v()<=u.in.DEBUG&&_("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-c}ms
	Determined least recently used ${r} in `+(a-s)+"ms\n"+`	Removed ${i} targets in `+(o-a)+"ms\n"+`	Removed ${e} documents in `+(l-o)+"ms\n"+`Total Duration: ${l-c}ms`),ea.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e,t){this.db=e,this.garbageCollector=new iE(this,t)}Hn(e){let t=this.Zn(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}Zn(e){let t=0;return this.Jn(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Jn(e,t){return this.Xn(e,(e,n)=>t(n))}addReference(e,t,n){return iS(e,n)}removeReference(e,t,n){return iS(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return iS(e,t)}er(e,t){let n;return n=!1,im(e).Y(r=>ic(e,r,t).next(e=>(e&&(n=!0),ea.resolve(!e)))).next(()=>n)}removeOrphanedDocuments(e,t){let n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[],i=0;return this.Xn(e,(s,a)=>{if(a<=t){let t=this.er(e,s).next(t=>{if(!t)return i++,n.getEntry(e,s).next(()=>(n.removeEntry(s,z.min()),iv(e).delete([0,eE(s.path)])))});r.push(t)}}).next(()=>ea.waitFor(r)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return iS(e,t)}Xn(e,t){let n=iv(e),r,i=ev.oe;return n.J({index:"documentTargetsIndex"},([e,n],{path:s,sequenceNumber:a})=>{0===e?(i!==ev.oe&&t(new j(eT(r)),i),i=a,r=s):i=ev.oe}).next(()=>{i!==ev.oe&&t(new j(eT(r)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function iS(e,t){var n;return iv(e).put((n=e.currentSequenceNumber,{targetId:0,path:eE(t.path),sequenceNumber:n}))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ix{constructor(){this.changes=new nr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,tT.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return void 0!==n?ea.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iD{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return ik(e).put(n)}removeEntry(e,t,n){return ik(e).delete(function(e,t){let n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],rC(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.tr(e,n)))}getEntry(e,t){let n=tT.newInvalidDocument(t);return ik(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(iA(t))},(e,r)=>{n=this.nr(t,r)}).next(()=>n)}rr(e,t){let n={size:0,document:tT.newInvalidDocument(t)};return ik(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(iA(t))},(e,r)=>{n={document:this.nr(t,r),size:il(r)}}).next(()=>n)}getEntries(e,t){let n=ni;return this.ir(e,t,(e,t)=>{let r=this.nr(e,t);n=n.insert(e,r)}).next(()=>n)}sr(e,t){let n=ni,r=new eY(j.comparator);return this.ir(e,t,(e,t)=>{let i=this.nr(e,t);n=n.insert(e,i),r=r.insert(e,il(t))}).next(()=>({documents:n,_r:r}))}ir(e,t,n){if(t.isEmpty())return ea.resolve();let r=new eZ(iR);t.forEach(e=>r=r.add(e));let i=IDBKeyRange.bound(iA(r.first()),iA(r.last())),s=r.getIterator(),a=s.getNext();return ik(e).J({index:"documentKeyIndex",range:i},(e,t,r)=>{let i=j.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;a&&0>iR(a,i);)n(a,null),a=s.getNext();a&&a.isEqual(i)&&(n(a,t),a=s.hasNext()?s.getNext():null),a?r.$(iA(a)):r.done()}).next(()=>{for(;a;)n(a,null),a=s.hasNext()?s.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,i){let s=t.path,a=[s.popLast().toArray(),s.lastSegment(),rC(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],o=[s.popLast().toArray(),s.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return ik(e).U(IDBKeyRange.bound(a,o,!0)).next(e=>{null==i||i.incrementDocumentReadCount(e.length);let n=ni;for(let i of e){let e=this.nr(j.fromSegments(i.prefixPath.concat(i.collectionGroup,i.documentId)),i);e.isFoundDocument()&&(ne(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let i=ni,s=iM(t,n),a=iM(t,et.max());return ik(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(s,a,!0)},(e,t,n)=>{let s=this.nr(j.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);(i=i.insert(s.key,s)).size===r&&n.done()}).next(()=>i)}newChangeBuffer(e){return new iC(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return iN(e).get("remoteDocumentGlobalKey").next(e=>(e||S(),e))}tr(e,t){return iN(e).put("remoteDocumentGlobalKey",t)}nr(e,t){if(t){let e=function(e,t){let n;if(t.document)n=rp(e.ct,t.document,!!t.hasCommittedMutations);else if(t.noDocument){let e=j.fromSegments(t.noDocument.path),r=rk(t.noDocument.readTime);n=tT.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return S();{let e=j.fromSegments(t.unknownDocument.path),r=rk(t.unknownDocument.version);n=tT.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){let t=new B(e[0],e[1]);return z.fromTimestamp(t)}(t.readTime)),n}(this.serializer,t);if(!(e.isNoDocument()&&e.version.isEqual(z.min())))return e}return tT.newInvalidDocument(e)}}class iC extends ix{constructor(e,t){super(),this.ar=e,this.trackRemovals=t,this.ur=new nr(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){let t=[],n=0,r=new eZ((e,t)=>q(e.canonicalString(),t.canonicalString()));return this.changes.forEach((i,s)=>{let a=this.ur.get(i);if(t.push(this.ar.removeEntry(e,i,a.readTime)),s.isValidDocument()){let o=rD(this.ar.serializer,s);r=r.add(i.path.popLast());let l=il(o);n+=l-a.size,t.push(this.ar.addEntry(e,i,o))}else if(n-=a.size,this.trackRemovals){let n=rD(this.ar.serializer,s.convertToNoDocument(z.min()));t.push(this.ar.addEntry(e,i,n))}}),r.forEach(n=>{t.push(this.ar.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.ar.updateMetadata(e,n)),ea.waitFor(t)}getFromCache(e,t){return this.ar.rr(e,t).next(e=>(this.ur.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.ar.sr(e,t).next(({documents:e,_r:t})=>(t.forEach((t,n)=>{this.ur.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function iN(e){return eQ(e,"remoteDocumentGlobal")}function ik(e){return eQ(e,"remoteDocumentsV14")}function iA(e){let t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function iM(e,t){let n=t.documentKey.path.toArray();return[e,rC(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function iR(e,t){let n=e.path.toArray(),r=t.path.toArray(),i=0;for(let e=0;e<n.length-2&&e<r.length-2;++e)if(i=q(n[e],r[e]))return i;return(i=q(n.length,r.length))||(i=q(n[n.length-2],r[r.length-2]))||q(n[n.length-1],r[r.length-1])}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iF{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iL{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&nM(n.mutation,e,e2.empty(),B.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,nh()).next(()=>t))}getLocalViewOfDocuments(e,t,n=nh()){let r=nl();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=na();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let n=nl();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,nh()))}populateOverlays(e,t,n){let r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=ni,s=nl(),a=nl();return t.forEach((e,t)=>{let a=n.get(t.key);r.has(t.key)&&(void 0===a||a.mutation instanceof nL)?i=i.insert(t.key,t):void 0!==a?(s.set(t.key,a.mutation.getFieldMask()),nM(a.mutation,t,a.mutation.getFieldMask(),B.now())):s.set(t.key,e2.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var n;return a.set(e,new iF(t,null!==(n=s.get(e))&&void 0!==n?n:null))}),a))}recalculateAndSaveOverlays(e,t){let n=nl(),r=new eY((e,t)=>e-t),i=nh();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let a=n.get(e)||e2.empty();a=i.applyToLocalView(s,a),n.set(e,a);let o=(r.get(i.batchId)||nh()).add(e);r=r.insert(i.batchId,o)})}).next(()=>{let s=[],a=r.getReverseIterator();for(;a.hasNext();){let r=a.getNext(),o=r.key,l=r.value,u=nl();l.forEach(e=>{if(!i.has(e)){let r=nA(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,o,u))}return ea.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return j.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):t2(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{let s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):ea.resolve(nl()),a=-1,o=i;return s.next(t=>ea.forEach(t,(t,n)=>(a<n.largestBatchId&&(a=n.largestBatchId),i.get(t)?ea.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,nh())).next(e=>({batchId:a,changes:no(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new j(t)).next(e=>{let t=na();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){let i=t.collectionGroup,s=na();return this.indexManager.getCollectionParents(e,i).next(a=>ea.forEach(a,a=>{let o=new tZ(a.child(i),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,o,n,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r))).next(e=>{i.forEach((t,n)=>{let r=n.getKey();null===e.get(r)&&(e=e.insert(r,tT.newInvalidDocument(r)))});let n=na();return e.forEach((e,r)=>{let s=i.get(e);void 0!==s&&nM(s.mutation,r,e2.empty(),B.now()),ne(t,r)&&(n=n.insert(e,r))}),n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iV{constructor(e){this.serializer=e,this.cr=new Map,this.lr=new Map}getBundleMetadata(e,t){return ea.resolve(this.cr.get(t))}saveBundleMetadata(e,t){return this.cr.set(t.id,{id:t.id,version:t.version,createTime:rs(t.createTime)}),ea.resolve()}getNamedQuery(e,t){return ea.resolve(this.lr.get(t))}saveNamedQuery(e,t){return this.lr.set(t.name,{name:t.name,query:rF(t.bundledQuery),readTime:rs(t.readTime)}),ea.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iP{constructor(){this.overlays=new eY(j.comparator),this.hr=new Map}getOverlay(e,t){return ea.resolve(this.overlays.get(t))}getOverlays(e,t){let n=nl();return ea.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.ht(e,t,r)}),ea.resolve()}removeOverlaysForBatchId(e,t,n){let r=this.hr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.hr.delete(n)),ea.resolve()}getOverlaysForCollection(e,t,n){let r=nl(),i=t.length+1,s=new j(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){let e=a.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return ea.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new eY((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=nl(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=nl(),o=i.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=r)););return ea.resolve(a)}ht(e,t,n){let r=this.overlays.get(n.key);if(null!==r){let e=this.hr.get(r.largestBatchId).delete(n.key);this.hr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new nG(t,n));let i=this.hr.get(t);void 0===i&&(i=nh(),this.hr.set(t,i)),this.hr.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iO{constructor(){this.Pr=new eZ(iq.Ir),this.Tr=new eZ(iq.Er)}isEmpty(){return this.Pr.isEmpty()}addReference(e,t){let n=new iq(e,t);this.Pr=this.Pr.add(n),this.Tr=this.Tr.add(n)}dr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Ar(new iq(e,t))}Rr(e,t){e.forEach(e=>this.removeReference(e,t))}Vr(e){let t=new j(new K([])),n=new iq(t,e),r=new iq(t,e+1),i=[];return this.Tr.forEachInRange([n,r],e=>{this.Ar(e),i.push(e.key)}),i}mr(){this.Pr.forEach(e=>this.Ar(e))}Ar(e){this.Pr=this.Pr.delete(e),this.Tr=this.Tr.delete(e)}gr(e){let t=new j(new K([])),n=new iq(t,e),r=new iq(t,e+1),i=nh();return this.Tr.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new iq(e,0),n=this.Pr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class iq{constructor(e,t){this.key=e,this.pr=t}static Ir(e,t){return j.comparator(e.key,t.key)||q(e.pr,t.pr)}static Er(e,t){return q(e.pr,t.pr)||j.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iU{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.yr=1,this.wr=new eZ(iq.Ir)}checkEmpty(e){return ea.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){let i=this.yr;this.yr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new nB(i,t,n,r);for(let t of(this.mutationQueue.push(s),r))this.wr=this.wr.add(new iq(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return ea.resolve(s)}lookupMutationBatch(e,t){return ea.resolve(this.Sr(t))}getNextMutationBatchAfterBatchId(e,t){let n=this.br(t+1),r=n<0?0:n;return ea.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return ea.resolve(0===this.mutationQueue.length?-1:this.yr-1)}getAllMutationBatches(e){return ea.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new iq(t,0),r=new iq(t,Number.POSITIVE_INFINITY),i=[];return this.wr.forEachInRange([n,r],e=>{let t=this.Sr(e.pr);i.push(t)}),ea.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new eZ(q);return t.forEach(e=>{let t=new iq(e,0),r=new iq(e,Number.POSITIVE_INFINITY);this.wr.forEachInRange([t,r],e=>{n=n.add(e.pr)})}),ea.resolve(this.Dr(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=n;j.isDocumentKey(i)||(i=i.child(""));let s=new iq(new j(i),0),a=new eZ(q);return this.wr.forEachWhile(e=>{let t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(a=a.add(e.pr)),!0)},s),ea.resolve(this.Dr(a))}Dr(e){let t=[];return e.forEach(e=>{let n=this.Sr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){0===this.Cr(t.batchId,"removed")||S(),this.mutationQueue.shift();let n=this.wr;return ea.forEach(t.mutations,r=>{let i=new iq(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.wr=n})}Mn(e){}containsKey(e,t){let n=new iq(t,0),r=this.wr.firstAfterOrEqual(n);return ea.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,ea.resolve()}Cr(e,t){return this.br(e)}br(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Sr(e){let t=this.br(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iB{constructor(e){this.vr=e,this.docs=new eY(j.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.vr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return ea.resolve(n?n.document.mutableCopy():tT.newInvalidDocument(t))}getEntries(e,t){let n=ni;return t.forEach(e=>{let t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():tT.newInvalidDocument(e))}),ea.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=ni,s=t.path,a=new j(s.child("")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){let{key:e,value:{document:a}}=o.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=en(ee(a),n)||(r.has(a.key)||ne(t,a))&&(i=i.insert(a.key,a.mutableCopy()))}return ea.resolve(i)}getAllFromCollectionGroup(e,t,n,r){S()}Fr(e,t){return ea.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new iz(this)}getSize(e){return ea.resolve(this.size)}}class iz extends ix{constructor(e){super(),this.ar=e}applyChanges(e){let t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.ar.addEntry(e,r)):this.ar.removeEntry(n)}),ea.waitFor(t)}getFromCache(e,t){return this.ar.getEntry(e,t)}getAllFromCache(e,t){return this.ar.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iG{constructor(e){this.persistence=e,this.Mr=new nr(e=>tj(e),tW),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.Or=0,this.Nr=new iO,this.targetCount=0,this.Lr=ig.Nn()}forEachTarget(e,t){return this.Mr.forEach((e,n)=>t(n)),ea.resolve()}getLastRemoteSnapshotVersion(e){return ea.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return ea.resolve(this.Or)}allocateTargetId(e){return this.highestTargetId=this.Lr.next(),ea.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Or&&(this.Or=t),ea.resolve()}qn(e){this.Mr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Lr=new ig(t),this.highestTargetId=t),e.sequenceNumber>this.Or&&(this.Or=e.sequenceNumber)}addTargetData(e,t){return this.qn(t),this.targetCount+=1,ea.resolve()}updateTargetData(e,t){return this.qn(t),ea.resolve()}removeTargetData(e,t){return this.Mr.delete(t.target),this.Nr.Vr(t.targetId),this.targetCount-=1,ea.resolve()}removeTargets(e,t,n){let r=0,i=[];return this.Mr.forEach((s,a)=>{a.sequenceNumber<=t&&null===n.get(a.targetId)&&(this.Mr.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),ea.waitFor(i).next(()=>r)}getTargetCount(e){return ea.resolve(this.targetCount)}getTargetData(e,t){let n=this.Mr.get(t)||null;return ea.resolve(n)}addMatchingKeys(e,t,n){return this.Nr.dr(t,n),ea.resolve()}removeMatchingKeys(e,t,n){this.Nr.Rr(t,n);let r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),ea.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Nr.Vr(t),ea.resolve()}getMatchingKeysForTargetId(e,t){let n=this.Nr.gr(t);return ea.resolve(n)}containsKey(e,t){return ea.resolve(this.Nr.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iK{constructor(e,t){this.Br={},this.overlays={},this.kr=new ev(0),this.qr=!1,this.qr=!0,this.referenceDelegate=e(this),this.Qr=new iG(this),this.indexManager=new r3,this.remoteDocumentCache=new iB(e=>this.referenceDelegate.Kr(e)),this.serializer=new rx(t),this.$r=new iV(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.qr=!1,Promise.resolve()}get started(){return this.qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new iP,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Br[e.toKey()];return n||(n=new iU(t,this.referenceDelegate),this.Br[e.toKey()]=n),n}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$r}runTransaction(e,t,n){_("MemoryPersistence","Starting transaction:",e);let r=new i$(this.kr.next());return this.referenceDelegate.Ur(),n(r).next(e=>this.referenceDelegate.Wr(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Gr(e,t){return ea.or(Object.values(this.Br).map(n=>()=>n.containsKey(e,t)))}}class i$ extends ei{constructor(e){super(),this.currentSequenceNumber=e}}class iQ{constructor(e){this.persistence=e,this.zr=new iO,this.jr=null}static Hr(e){return new iQ(e)}get Jr(){if(this.jr)return this.jr;throw S()}addReference(e,t,n){return this.zr.addReference(n,t),this.Jr.delete(n.toString()),ea.resolve()}removeReference(e,t,n){return this.zr.removeReference(n,t),this.Jr.add(n.toString()),ea.resolve()}markPotentiallyOrphaned(e,t){return this.Jr.add(t.toString()),ea.resolve()}removeTarget(e,t){this.zr.Vr(t.targetId).forEach(e=>this.Jr.add(e.toString()));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Jr.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ur(){this.jr=new Set}Wr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return ea.forEach(this.Jr,n=>{let r=j.fromPath(n);return this.Yr(e,r).next(e=>{e||t.removeEntry(r,z.min())})}).next(()=>(this.jr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yr(e,t).next(e=>{e?this.Jr.delete(t.toString()):this.Jr.add(t.toString())})}Kr(e){return 0}Yr(e,t){return ea.or([()=>ea.resolve(this.zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gr(e,t)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ij{constructor(e){this.serializer=e}O(e,t,n,r){let i=new eo("createOrUpgrade",t);n<1&&r>=1&&(!function(e){e.createObjectStore("owner")}(e),e.createObjectStore("mutationQueues",{keyPath:"userId"}),e.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",eS,{unique:!0}),e.createObjectStore("documentMutations"),iW(e),function(e){e.createObjectStore("remoteDocuments")}(e));let s=ea.resolve();return n<3&&r>=3&&(0!==n&&(e.deleteObjectStore("targetDocuments"),e.deleteObjectStore("targets"),e.deleteObjectStore("targetGlobal"),iW(e)),s=s.next(()=>(function(e){let t=e.store("targetGlobal"),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:z.min().toTimestamp(),targetCount:0};return t.put("targetGlobalKey",n)})(i))),n<4&&r>=4&&(0!==n&&(s=s.next(()=>i.store("mutations").U().next(t=>{e.deleteObjectStore("mutations"),e.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",eS,{unique:!0});let n=i.store("mutations"),r=t.map(e=>n.put(e));return ea.waitFor(r)}))),s=s.next(()=>{!function(e){e.createObjectStore("clientMetadata",{keyPath:"clientId"})}(e)})),n<5&&r>=5&&(s=s.next(()=>this.Xr(i))),n<6&&r>=6&&(s=s.next(()=>((function(e){e.createObjectStore("remoteDocumentGlobal")})(e),this.ei(i)))),n<7&&r>=7&&(s=s.next(()=>this.ti(i))),n<8&&r>=8&&(s=s.next(()=>this.ni(e,i))),n<9&&r>=9&&(s=s.next(()=>{e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")})),n<10&&r>=10&&(s=s.next(()=>this.ri(i))),n<11&&r>=11&&(s=s.next(()=>{(function(e){e.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(e){e.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&r>=12&&(s=s.next(()=>{!function(e){let t=e.createObjectStore("documentOverlays",{keyPath:eO});t.createIndex("collectionPathOverlayIndex",eq,{unique:!1}),t.createIndex("collectionGroupOverlayIndex",eU,{unique:!1})}(e)})),n<13&&r>=13&&(s=s.next(()=>(function(e){let t=e.createObjectStore("remoteDocumentsV14",{keyPath:eD});t.createIndex("documentKeyIndex",eC),t.createIndex("collectionGroupIndex",eN)})(e)).next(()=>this.ii(e,i)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&r>=14&&(s=s.next(()=>this.si(e,i))),n<15&&r>=15&&(s=s.next(()=>{e.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),e.createObjectStore("indexState",{keyPath:eF}).createIndex("sequenceNumberIndex",eL,{unique:!1}),e.createObjectStore("indexEntries",{keyPath:eV}).createIndex("documentKeyIndex",eP,{unique:!1})})),n<16&&r>=16&&(s=s.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),s}ei(e){let t=0;return e.store("remoteDocuments").J((e,n)=>{t+=il(n)}).next(()=>{let n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}Xr(e){let t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next(t=>ea.forEach(t,t=>{let r=IDBKeyRange.bound([t.userId,-1],[t.userId,t.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",r).next(n=>ea.forEach(n,n=>{n.userId===t.userId||S();let r=rA(this.serializer,n);return io(e,t.userId,r).next(()=>{})}))}))}ti(e){let t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(e=>{let r=[];return n.J((n,i)=>{let s=new K(n),a=[0,eE(s)];r.push(t.get(a).next(n=>n?ea.resolve():t.put({targetId:0,path:eE(s),sequenceNumber:e.highestListenSequenceNumber})))}).next(()=>ea.waitFor(r))})}ni(e,t){e.createObjectStore("collectionParents",{keyPath:eR});let n=t.store("collectionParents"),r=new r8,i=e=>{if(r.add(e)){let t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:eE(r)})}};return t.store("remoteDocuments").J({H:!0},(e,t)=>i(new K(e).popLast())).next(()=>t.store("documentMutations").J({H:!0},([e,t,n],r)=>i(eT(t).popLast())))}ri(e){let t=e.store("targets");return t.J((e,n)=>{let r=rM(n),i=rR(this.serializer,r);return t.put(i)})}ii(e,t){let n=t.store("remoteDocuments"),r=[];return n.J((e,n)=>{let i=t.store("remoteDocumentsV14"),s=(n.document?new j(K.fromString(n.document.name).popFirst(5)):n.noDocument?j.fromSegments(n.noDocument.path):n.unknownDocument?j.fromSegments(n.unknownDocument.path):S()).path.toArray(),a={prefixPath:s.slice(0,s.length-2),collectionGroup:s[s.length-2],documentId:s[s.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(i.put(a))}).next(()=>ea.waitFor(r))}si(e,t){let n=t.store("mutations"),r=new iD(this.serializer),i=new iK(iQ.Hr,this.serializer.ct);return n.U().next(e=>{let n=new Map;return e.forEach(e=>{var t;let r=null!==(t=n.get(e.userId))&&void 0!==t?t:nh();rA(this.serializer,e).keys().forEach(e=>r=r.add(e)),n.set(e.userId,r)}),ea.forEach(n,(e,n)=>{let s=new p(n),a=rB.lt(this.serializer,s),o=i.getIndexManager(s);return new iL(r,iu.lt(s,this.serializer,o,i.referenceDelegate),a,o).recalculateAndSaveOverlaysForDocumentKeys(new e$(t,ev.oe),e).next()})})}}function iW(e){e.createObjectStore("targetDocuments",{keyPath:eA}).createIndex("documentTargetsIndex",eM,{unique:!0}),e.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",ek,{unique:!0}),e.createObjectStore("targetGlobal")}let iH="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class iY{constructor(e,t,n,r,i,s,a,o,l,u,c=16){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.oi=i,this.window=s,this.document=a,this._i=l,this.ai=u,this.ui=c,this.kr=null,this.qr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ci=null,this.inForeground=!1,this.li=null,this.hi=null,this.Pi=Number.NEGATIVE_INFINITY,this.Ii=e=>Promise.resolve(),!iY.D())throw new C(D.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new iT(this,r),this.Ti=t+"main",this.serializer=new rx(o),this.Ei=new el(this.Ti,this.ui,new ij(this.serializer)),this.Qr=new ip(this.referenceDelegate,this.serializer),this.remoteDocumentCache=new iD(this.serializer),this.$r=new rO,this.window&&this.window.localStorage?this.di=this.window.localStorage:(this.di=null,!1===u&&b("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ai().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new C(D.FAILED_PRECONDITION,iH);return this.Ri(),this.Vi(),this.mi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Qr.getHighestSequenceNumber(e))}).then(e=>{this.kr=new ev(e,this._i)}).then(()=>{this.qr=!0}).catch(e=>(this.Ei&&this.Ei.close(),Promise.reject(e)))}fi(e){return this.Ii=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ei.L(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.oi.enqueueAndForget(async()=>{this.started&&await this.Ai()}))}Ai(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>iX(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.gi(e).next(e=>{e||(this.isPrimary=!1,this.oi.enqueueRetryable(()=>this.Ii(!1)))})}).next(()=>this.pi(e)).next(t=>this.isPrimary&&!t?this.yi(e).next(()=>!1):!!t&&this.wi(e).next(()=>!0))).catch(e=>{if(ed(e))return _("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return _("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.oi.enqueueRetryable(()=>this.Ii(e)),this.isPrimary=e})}gi(e){return iJ(e).get("owner").next(e=>ea.resolve(this.Si(e)))}bi(e){return iX(e).delete(this.clientId)}async Di(){if(this.isPrimary&&!this.Ci(this.Pi,18e5)){this.Pi=Date.now();let e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{let t=eQ(e,"clientMetadata");return t.U().next(e=>{let n=this.vi(e,18e5),r=e.filter(e=>-1===n.indexOf(e));return ea.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.di)for(let t of e)this.di.removeItem(this.Fi(t.clientId))}}mi(){this.hi=this.oi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ai().then(()=>this.Di()).then(()=>this.mi()))}Si(e){return!!e&&e.ownerId===this.clientId}pi(e){return this.ai?ea.resolve(!0):iJ(e).get("owner").next(t=>{if(null!==t&&this.Ci(t.leaseTimestampMs,5e3)&&!this.Mi(t.ownerId)){if(this.Si(t)&&this.networkEnabled)return!0;if(!this.Si(t)){if(!t.allowTabSynchronization)throw new C(D.FAILED_PRECONDITION,iH);return!1}}return!(!this.networkEnabled||!this.inForeground)||iX(e).U().next(e=>void 0===this.vi(e,5e3).find(e=>{if(this.clientId!==e.clientId){let t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&_("IndexedDbPersistence",`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.qr=!1,this.xi(),this.hi&&(this.hi.cancel(),this.hi=null),this.Oi(),this.Ni(),await this.Ei.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{let t=new e$(e,ev.oe);return this.yi(t).next(()=>this.bi(t))}),this.Ei.close(),this.Li()}vi(e,t){return e.filter(e=>this.Ci(e.updateTimeMs,t)&&!this.Mi(e.clientId))}Bi(){return this.runTransaction("getActiveClients","readonly",e=>iX(e).U().next(e=>this.vi(e,18e5).map(e=>e.clientId)))}get started(){return this.qr}getMutationQueue(e,t){return iu.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new r9(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return rB.lt(this.serializer,e)}getBundleCache(){return this.$r}runTransaction(e,t,n){var r;let i;_("IndexedDbPersistence","Starting transaction:",e);let s=16===(r=this.ui)?eK:15===r?eK:14===r?eG:13===r?eG:12===r?ez:11===r?eB:void S();return this.Ei.runTransaction(e,"readonly"===t?"readonly":"readwrite",s,r=>(i=new e$(r,this.kr?this.kr.next():ev.oe),"readwrite-primary"===t?this.gi(i).next(e=>!!e||this.pi(i)).next(t=>{if(!t)throw b(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.oi.enqueueRetryable(()=>this.Ii(!1)),new C(D.FAILED_PRECONDITION,er);return n(i)}).next(e=>this.wi(i).next(()=>e)):this.ki(i).next(()=>n(i)))).then(e=>(i.raiseOnCommittedEvent(),e))}ki(e){return iJ(e).get("owner").next(e=>{if(null!==e&&this.Ci(e.leaseTimestampMs,5e3)&&!this.Mi(e.ownerId)&&!this.Si(e)&&!(this.ai||this.allowTabSynchronization&&e.allowTabSynchronization))throw new C(D.FAILED_PRECONDITION,iH)})}wi(e){let t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return iJ(e).put("owner",t)}static D(){return el.D()}yi(e){let t=iJ(e);return t.get("owner").next(e=>this.Si(e)?(_("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):ea.resolve())}Ci(e,t){let n=Date.now();return!(e<n-t)&&(!(e>n)||(b(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Ri(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.li=()=>{this.oi.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.Ai()))},this.document.addEventListener("visibilitychange",this.li),this.inForeground="visible"===this.document.visibilityState)}Oi(){this.li&&(this.document.removeEventListener("visibilitychange",this.li),this.li=null)}Vi(){var e;"function"==typeof(null===(e=this.window)||void 0===e?void 0:e.addEventListener)&&(this.ci=()=>{this.xi();let e=/(?:Version|Mobile)\/1[456]/;(0,c.G6)()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.oi.enterRestrictedMode(!0),this.oi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.ci))}Ni(){this.ci&&(this.window.removeEventListener("pagehide",this.ci),this.ci=null)}Mi(e){var t;try{let n=null!==(null===(t=this.di)||void 0===t?void 0:t.getItem(this.Fi(e)));return _("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(e){return b("IndexedDbPersistence","Failed to get zombied client id.",e),!1}}xi(){if(this.di)try{this.di.setItem(this.Fi(this.clientId),String(Date.now()))}catch(e){b("Failed to set zombie client id.",e)}}Li(){if(this.di)try{this.di.removeItem(this.Fi(this.clientId))}catch(e){}}Fi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function iJ(e){return eQ(e,"owner")}function iX(e){return eQ(e,"clientMetadata")}function iZ(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.qi=n,this.Qi=r}static Ki(e,t){let n=nh(),r=nh();for(let e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new i0(e,t.fromCache,n,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i1{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i2{constructor(){this.$i=!1,this.Ui=!1,this.Wi=100,this.Gi=(0,c.G6)()?8:eu((0,c.z$)())>0?6:4}initialize(e,t){this.zi=e,this.indexManager=t,this.$i=!0}getDocumentsMatchingQuery(e,t,n,r){let i={result:null};return this.ji(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.Hi(e,t,r,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;let n=new i1;return this.Ji(e,t,n).next(r=>{if(i.result=r,this.Ui)return this.Yi(e,t,n,r.size)})}).next(()=>i.result)}Yi(e,t,n,r){return n.documentReadCount<this.Wi?(v()<=u.in.DEBUG&&_("QueryEngine","SDK will not create cache indexes for query:",t7(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Wi,"documents"),ea.resolve()):(v()<=u.in.DEBUG&&_("QueryEngine","Query:",t7(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.Gi*r?(v()<=u.in.DEBUG&&_("QueryEngine","The SDK decides to create cache indexes for query:",t7(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,t4(t))):ea.resolve())}ji(e,t){if(t1(t))return ea.resolve(null);let n=t4(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(n=t4(t=t8(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{let i=nh(...r);return this.zi.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{let s=this.Zi(t,r);return this.Xi(t,s,i,n.readTime)?this.ji(e,t8(t,null,"F")):this.es(e,s,t,n)}))})))}Hi(e,t,n,r){return t1(t)||r.isEqual(z.min())?ea.resolve(null):this.zi.getDocuments(e,n).next(i=>{let s=this.Zi(t,i);return this.Xi(t,s,n,r)?ea.resolve(null):(v()<=u.in.DEBUG&&_("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),t7(t)),this.es(e,s,t,Z(r,-1)).next(e=>e))})}Zi(e,t){let n=new eZ(nn(e));return t.forEach((t,r)=>{ne(e,r)&&(n=n.add(r))}),n}Xi(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ji(e,t,n){return v()<=u.in.DEBUG&&_("QueryEngine","Using full collection scan to execute query:",t7(t)),this.zi.getDocumentsMatchingQuery(e,t,et.min(),n)}es(e,t,n,r){return this.zi.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i5{constructor(e,t,n,r){this.persistence=e,this.ts=t,this.serializer=r,this.ns=new eY(q),this.rs=new nr(e=>tj(e),tW),this.ss=new Map,this.os=e.getRemoteDocumentCache(),this.Qr=e.getTargetCache(),this.$r=e.getBundleCache(),this._s(n)}_s(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new iL(this.os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.os.setIndexManager(this.indexManager),this.ts.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ns))}}async function i4(e,t){return await e.persistence.runTransaction("Handle user change","readonly",n=>{let r;return e.mutationQueue.getAllMutationBatches(n).next(i=>(r=i,e._s(t),e.mutationQueue.getAllMutationBatches(n))).next(t=>{let i=[],s=[],a=nh();for(let e of r)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(n,a).next(e=>({us:e,removedBatchIds:i,addedBatchIds:s}))})})}function i3(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Qr.getLastRemoteSnapshotVersion(t))}function i8(e,t,n){let r=nh(),i=nh();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=ni;return n.forEach((n,s)=>{let a=e.get(n);s.isFoundDocument()!==a.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(z.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!a.isValidDocument()||s.version.compareTo(a.version)>0||0===s.version.compareTo(a.version)&&a.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):_("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",s.version)}),{cs:r,ls:i}})}function i6(e,t){return e.persistence.runTransaction("Allocate target","readwrite",n=>{let r;return e.Qr.getTargetData(n,t).next(i=>i?(r=i,ea.resolve(r)):e.Qr.allocateTargetId(n).next(i=>(r=new rS(t,i,"TargetPurposeListen",n.currentSequenceNumber),e.Qr.addTargetData(n,r).next(()=>r))))}).then(n=>{let r=e.ns.get(n.targetId);return(null===r||n.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(e.ns=e.ns.insert(n.targetId,n),e.rs.set(t,n.targetId)),n})}async function i9(e,t,n){let r=e.ns.get(t);try{n||await e.persistence.runTransaction("Release target",n?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,r))}catch(e){if(!ed(e))throw e;_("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}e.ns=e.ns.remove(t),e.rs.delete(r.target)}function i7(e,t,n){let r=z.min(),i=nh();return e.persistence.runTransaction("Execute query","readwrite",s=>(function(e,t,n){let r=e.rs.get(n);return void 0!==r?ea.resolve(e.ns.get(r)):e.Qr.getTargetData(t,n)})(e,s,t4(t)).next(t=>{if(t)return r=t.lastLimboFreeSnapshotVersion,e.Qr.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.ts.getDocumentsMatchingQuery(s,t,n?r:z.min(),n?i:nh())).next(n=>(sn(e,nt(t),n),{documents:n,hs:i})))}function se(e,t){let n=e.Qr,r=e.ns.get(t);return r?Promise.resolve(r.target):e.persistence.runTransaction("Get target data","readonly",e=>n.ot(e,t).next(e=>e?e.target:null))}function st(e,t){let n=e.ss.get(t)||z.min();return e.persistence.runTransaction("Get new document changes","readonly",r=>e.os.getAllFromCollectionGroup(r,t,Z(n,-1),Number.MAX_SAFE_INTEGER)).then(n=>(sn(e,t,n),n))}function sn(e,t,n){let r=e.ss.get(t)||z.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.ss.set(t,r)}async function sr(e,t,n,r){let i=nh(),s=ni;for(let e of n){let n=t.Ps(e.metadata.name);e.document&&(i=i.add(n));let r=t.Is(e);r.setReadTime(t.Ts(e.metadata.readTime)),s=s.insert(n,r)}let a=e.os.newChangeBuffer({trackRemovals:!0}),o=await i6(e,t4(t0(K.fromString(`__bundle__/docs/${r}`))));return e.persistence.runTransaction("Apply bundle documents","readwrite",t=>i8(t,a,s).next(e=>(a.apply(t),e)).next(n=>e.Qr.removeMatchingKeysForTargetId(t,o.targetId).next(()=>e.Qr.addMatchingKeys(t,i,o.targetId)).next(()=>e.localDocuments.getLocalViewOfDocuments(t,n.cs,n.ls)).next(()=>n.cs)))}async function si(e,t,n=nh()){let r=await i6(e,t4(rF(t.bundledQuery)));return e.persistence.runTransaction("Save named query","readwrite",i=>{let s=rs(t.readTime);if(r.snapshotVersion.compareTo(s)>=0)return e.$r.saveNamedQuery(i,t);let a=r.withResumeToken(e3.EMPTY_BYTE_STRING,s);return e.ns=e.ns.insert(a.targetId,a),e.Qr.updateTargetData(i,a).next(()=>e.Qr.removeMatchingKeysForTargetId(i,r.targetId)).next(()=>e.Qr.addMatchingKeys(i,n,r.targetId)).next(()=>e.$r.saveNamedQuery(i,t))})}function ss(e,t){return`firestore_clients_${e}_${t}`}function sa(e,t,n){let r=`firestore_mutations_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}function so(e,t){return`firestore_targets_${e}_${t}`}class sl{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static Es(e,t,n){let r=JSON.parse(n),i,s="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return s&&r.error&&(s="string"==typeof r.error.message&&"string"==typeof r.error.code)&&(i=new C(r.error.code,r.error.message)),s?new sl(e,t,r.state,i):(b("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}ds(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class su{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Es(e,t){let n=JSON.parse(t),r,i="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return i&&n.error&&(i="string"==typeof n.error.message&&"string"==typeof n.error.code)&&(r=new C(n.error.code,n.error.message)),i?new su(e,n.state,r):(b("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}ds(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class sc{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Es(e,t){let n=JSON.parse(t),r="object"==typeof n&&n.activeTargetIds instanceof Array,i=nd;for(let e=0;r&&e<n.activeTargetIds.length;++e)r=eb(n.activeTargetIds[e]),i=i.add(n.activeTargetIds[e]);return r?new sc(e,i):(b("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class sh{constructor(e,t){this.clientId=e,this.onlineState=t}static Es(e){let t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new sh(t.clientId,t.onlineState):(b("SharedClientState",`Failed to parse online state: ${e}`),null)}}class sd{constructor(){this.activeTargetIds=nd}As(e){this.activeTargetIds=this.activeTargetIds.add(e)}Rs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ds(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class sf{constructor(e,t,n,r,i){var s,a,o;this.window=e,this.oi=t,this.persistenceKey=n,this.Vs=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.fs=this.gs.bind(this),this.ps=new eY(q),this.started=!1,this.ys=[];let l=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.ws=ss(this.persistenceKey,this.Vs),this.Ss=(s=this.persistenceKey,`firestore_sequence_number_${s}`),this.ps=this.ps.insert(this.Vs,new sd),this.bs=RegExp(`^firestore_clients_${l}_([^_]*)$`),this.Ds=RegExp(`^firestore_mutations_${l}_(\\d+)(?:_(.*))?$`),this.Cs=RegExp(`^firestore_targets_${l}_(\\d+)$`),this.vs=(a=this.persistenceKey,`firestore_online_state_${a}`),this.Fs=(o=this.persistenceKey,`firestore_bundle_loaded_v2_${o}`),this.window.addEventListener("storage",this.fs)}static D(e){return!(!e||!e.localStorage)}async start(){for(let e of(await this.syncEngine.Bi())){if(e===this.Vs)continue;let t=this.getItem(ss(this.persistenceKey,e));if(t){let n=sc.Es(e,t);n&&(this.ps=this.ps.insert(n.clientId,n))}}this.Ms();let e=this.storage.getItem(this.vs);if(e){let t=this.xs(e);t&&this.Os(t)}for(let e of this.ys)this.gs(e);this.ys=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ss,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Ns(this.ps)}isActiveQueryTarget(e){let t=!1;return this.ps.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.Ls(e,"pending")}updateMutationState(e,t,n){this.Ls(e,t,n),this.Bs(e)}addLocalQueryTarget(e){let t="not-current";if(this.isActiveQueryTarget(e)){let n=this.storage.getItem(so(this.persistenceKey,e));if(n){let r=su.Es(e,n);r&&(t=r.state)}}return this.ks.As(e),this.Ms(),t}removeLocalQueryTarget(e){this.ks.Rs(e),this.Ms()}isLocalQueryTarget(e){return this.ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(so(this.persistenceKey,e))}updateQueryState(e,t,n){this.qs(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.Bs(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.Qs(e)}notifyBundleLoaded(e){this.Ks(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.fs),this.removeItem(this.ws),this.started=!1)}getItem(e){let t=this.storage.getItem(e);return _("SharedClientState","READ",e,t),t}setItem(e,t){_("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){_("SharedClientState","REMOVE",e),this.storage.removeItem(e)}gs(e){if(e.storageArea===this.storage){if(_("SharedClientState","EVENT",e.key,e.newValue),e.key===this.ws)return void b("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.oi.enqueueRetryable(async()=>{if(this.started){if(null!==e.key){if(this.bs.test(e.key)){if(null==e.newValue){let t=this.$s(e.key);return this.Us(t,null)}{let t=this.Ws(e.key,e.newValue);if(t)return this.Us(t.clientId,t)}}else if(this.Ds.test(e.key)){if(null!==e.newValue){let t=this.Gs(e.key,e.newValue);if(t)return this.zs(t)}}else if(this.Cs.test(e.key)){if(null!==e.newValue){let t=this.js(e.key,e.newValue);if(t)return this.Hs(t)}}else if(e.key===this.vs){if(null!==e.newValue){let t=this.xs(e.newValue);if(t)return this.Os(t)}}else if(e.key===this.Ss){let t=function(e){let t=ev.oe;if(null!=e)try{let n=JSON.parse(e);"number"==typeof n||S(),t=n}catch(e){b("SharedClientState","Failed to read sequence number from WebStorage",e)}return t}(e.newValue);t!==ev.oe&&this.sequenceNumberHandler(t)}else if(e.key===this.Fs){let t=this.Js(e.newValue);await Promise.all(t.map(e=>this.syncEngine.Ys(e)))}}}else this.ys.push(e)})}}get ks(){return this.ps.get(this.Vs)}Ms(){this.setItem(this.ws,this.ks.ds())}Ls(e,t,n){let r=new sl(this.currentUser,e,t,n),i=sa(this.persistenceKey,this.currentUser,e);this.setItem(i,r.ds())}Bs(e){let t=sa(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Qs(e){let t={clientId:this.Vs,onlineState:e};this.storage.setItem(this.vs,JSON.stringify(t))}qs(e,t,n){let r=so(this.persistenceKey,e),i=new su(e,t,n);this.setItem(r,i.ds())}Ks(e){let t=JSON.stringify(Array.from(e));this.setItem(this.Fs,t)}$s(e){let t=this.bs.exec(e);return t?t[1]:null}Ws(e,t){let n=this.$s(e);return sc.Es(n,t)}Gs(e,t){let n=this.Ds.exec(e),r=Number(n[1]),i=void 0!==n[2]?n[2]:null;return sl.Es(new p(i),r,t)}js(e,t){let n=Number(this.Cs.exec(e)[1]);return su.Es(n,t)}xs(e){return sh.Es(e)}Js(e){return JSON.parse(e)}async zs(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Zs(e.batchId,e.state,e.error);_("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Hs(e){return this.syncEngine.Xs(e.targetId,e.state,e.error)}Us(e,t){let n=t?this.ps.insert(e,t):this.ps.remove(e),r=this.Ns(this.ps),i=this.Ns(n),s=[],a=[];return i.forEach(e=>{r.has(e)||s.push(e)}),r.forEach(e=>{i.has(e)||a.push(e)}),this.syncEngine.eo(s,a).then(()=>{this.ps=n})}Os(e){this.ps.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Ns(e){let t=nd;return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class sm{constructor(){this.no=new sd,this.ro={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.no.As(e),this.ro[e]||"not-current"}updateQueryState(e,t,n){this.ro[e]=t}removeLocalQueryTarget(e){this.no.Rs(e)}isLocalQueryTarget(e){return this.no.activeTargetIds.has(e)}clearQueryState(e){delete this.ro[e]}getAllActiveQueryTargets(){return this.no.activeTargetIds}isActiveQueryTarget(e){return this.no.activeTargetIds.has(e)}start(){return this.no=new sd,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{io(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(){this.so=()=>this.oo(),this._o=()=>this.ao(),this.uo=[],this.co()}io(e){this.uo.push(e)}shutdown(){window.removeEventListener("online",this.so),window.removeEventListener("offline",this._o)}co(){window.addEventListener("online",this.so),window.addEventListener("offline",this._o)}oo(){for(let e of(_("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.uo))e(0)}ao(){for(let e of(_("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.uo))e(1)}static D(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sy=null;function sw(){return null===sy?sy=268435456+Math.round(2147483648*Math.random()):sy++,"0x"+sy.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e){this.lo=e.lo,this.ho=e.ho}Po(e){this.Io=e}To(e){this.Eo=e}Ao(e){this.Ro=e}onMessage(e){this.Vo=e}close(){this.ho()}send(e){this.lo(e)}mo(){this.Io()}fo(){this.Eo()}po(e){this.Ro(e)}yo(e){this.Vo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s_="WebChannelConnection";class sb extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.wo=t+"://"+e.host,this.So=`projects/${n}/databases/${r}`,this.bo="(default)"===this.databaseId.database?`project_id=${n}`:`project_id=${n}&database_id=${r}`}get Do(){return!1}Co(e,t,n,r,i){let s=sw(),a=this.vo(e,t.toUriEncodedString());_("RestConnection",`Sending RPC '${e}' ${s}:`,a,n);let o={"google-cloud-resource-prefix":this.So,"x-goog-request-params":this.bo};return this.Fo(o,r,i),this.Mo(e,a,o,n).then(t=>(_("RestConnection",`Received RPC '${e}' ${s}: `,t),t),t=>{throw E("RestConnection",`RPC '${e}' ${s} failed with error: `,t,"url: ",a,"request:",n),t})}xo(e,t,n,r,i,s){return this.Co(e,t,n,r,i)}Fo(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+y}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}vo(e,t){let n=sv[e];return`${this.wo}/v1/${t}:${n}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Mo(e,t,n,r){let i=sw();return new Promise((s,a)=>{let o=new d.JJ;o.setWithCredentials(!0),o.listenOnce(d.tw.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case d.jK.NO_ERROR:let t=o.getResponseJson();_(s_,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case d.jK.TIMEOUT:_(s_,`RPC '${e}' ${i} timed out`),a(new C(D.DEADLINE_EXCEEDED,"Request time out"));break;case d.jK.HTTP_ERROR:let n=o.getStatus();if(_(s_,`RPC '${e}' ${i} failed with status:`,n,"response text:",o.getResponseText()),n>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=null==e?void 0:e.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(t)>=0?t:D.UNKNOWN}(t.status);a(new C(e,t.message))}else a(new C(D.UNKNOWN,"Server responded with status "+o.getStatus()))}else a(new C(D.UNAVAILABLE,"Connection failed."));break;default:S()}}finally{_(s_,`RPC '${e}' ${i} completed.`)}});let l=JSON.stringify(r);_(s_,`RPC '${e}' ${i} sending request:`,r),o.send(t,"POST",l,n,15)})}Oo(e,t,n){let i=sw(),s=[this.wo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=(0,d.UE)(),o=(0,d.FJ)(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.xmlHttpFactory=new d.zI({})),this.Fo(l.initMessageHeaders,t,n),l.encodeInitMessageHeaders=!0;let c=s.join("");_(s_,`Creating RPC '${e}' stream ${i}: ${c}`,l);let h=a.createWebChannel(c,l),f=!1,m=!1,g=new sI({lo:t=>{m?_(s_,`Not sending because RPC '${e}' stream ${i} is closed:`,t):(f||(_(s_,`Opening RPC '${e}' stream ${i} transport.`),h.open(),f=!0),_(s_,`RPC '${e}' stream ${i} sending:`,t),h.send(t))},ho:()=>h.close()}),p=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return p(h,d.ii.EventType.OPEN,()=>{m||(_(s_,`RPC '${e}' stream ${i} transport opened.`),g.mo())}),p(h,d.ii.EventType.CLOSE,()=>{m||(m=!0,_(s_,`RPC '${e}' stream ${i} transport closed`),g.po())}),p(h,d.ii.EventType.ERROR,t=>{m||(m=!0,E(s_,`RPC '${e}' stream ${i} transport errored:`,t),g.po(new C(D.UNAVAILABLE,"The operation could not be completed")))}),p(h,d.ii.EventType.MESSAGE,t=>{var n;if(!m){let s=t.data[0];s||S();let a=s.error||(null===(n=s[0])||void 0===n?void 0:n.error);if(a){_(s_,`RPC '${e}' stream ${i} received error:`,a);let t=a.status,n=function(e){let t=r[e];if(void 0!==t)return nQ(t)}(t),s=a.message;void 0===n&&(n=D.INTERNAL,s="Unknown error status: "+t+" with message "+a.message),m=!0,g.po(new C(n,s)),h.close()}else _(s_,`RPC '${e}' stream ${i} received:`,s),g.yo(s)}}),p(o,d.ju.STAT_EVENT,t=>{t.stat===d.kN.PROXY?_(s_,`RPC '${e}' stream ${i} detected buffering proxy`):t.stat===d.kN.NOPROXY&&_(s_,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{g.fo()},0),g}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sE(){return"undefined"!=typeof window?window:null}function sT(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sS(e){return new rt(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sx{constructor(e,t,n=1e3,r=1.5,i=6e4){this.oi=e,this.timerId=t,this.No=n,this.Lo=r,this.Bo=i,this.ko=0,this.qo=null,this.Qo=Date.now(),this.reset()}reset(){this.ko=0}Ko(){this.ko=this.Bo}$o(e){this.cancel();let t=Math.floor(this.ko+this.Uo()),n=Math.max(0,Date.now()-this.Qo),r=Math.max(0,t-n);r>0&&_("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.qo=this.oi.enqueueAfterDelay(this.timerId,r,()=>(this.Qo=Date.now(),e())),this.ko*=this.Lo,this.ko<this.No&&(this.ko=this.No),this.ko>this.Bo&&(this.ko=this.Bo)}Wo(){null!==this.qo&&(this.qo.skipDelay(),this.qo=null)}cancel(){null!==this.qo&&(this.qo.cancel(),this.qo=null)}Uo(){return(Math.random()-.5)*this.ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sD{constructor(e,t,n,r,i,s,a,o){this.oi=e,this.Go=n,this.zo=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.jo=0,this.Ho=null,this.Jo=null,this.stream=null,this.Yo=new sx(e,t)}Zo(){return 1===this.state||5===this.state||this.Xo()}Xo(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.e_()}async stop(){this.Zo()&&await this.close(0)}t_(){this.state=0,this.Yo.reset()}n_(){this.Xo()&&null===this.Ho&&(this.Ho=this.oi.enqueueAfterDelay(this.Go,6e4,()=>this.r_()))}i_(e){this.s_(),this.stream.send(e)}async r_(){if(this.Xo())return this.close(0)}s_(){this.Ho&&(this.Ho.cancel(),this.Ho=null)}o_(){this.Jo&&(this.Jo.cancel(),this.Jo=null)}async close(e,t){this.s_(),this.o_(),this.Yo.cancel(),this.jo++,4!==e?this.Yo.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(b(t.toString()),b("Using maximum backoff delay to prevent overloading the backend."),this.Yo.Ko()):t&&t.code===D.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.__(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ao(t)}__(){}auth(){this.state=1;let e=this.a_(this.jo),t=this.jo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.jo===t&&this.u_(e,n)},t=>{e(()=>{let e=new C(D.UNKNOWN,"Fetching auth token failed: "+t.message);return this.c_(e)})})}u_(e,t){let n=this.a_(this.jo);this.stream=this.l_(e,t),this.stream.Po(()=>{n(()=>this.listener.Po())}),this.stream.To(()=>{n(()=>(this.state=2,this.Jo=this.oi.enqueueAfterDelay(this.zo,1e4,()=>(this.Xo()&&(this.state=3),Promise.resolve())),this.listener.To()))}),this.stream.Ao(e=>{n(()=>this.c_(e))}),this.stream.onMessage(e=>{n(()=>this.onMessage(e))})}e_(){this.state=5,this.Yo.$o(async()=>{this.state=0,this.start()})}c_(e){return _("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}a_(e){return t=>{this.oi.enqueueAndForget(()=>this.jo===e?t():(_("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class sC extends sD{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}l_(e,t){return this.connection.Oo("Listen",e,t)}onMessage(e){this.Yo.reset();let t=function(e,t){let n;if("targetChange"in t){var r,i;t.targetChange;let s="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:S(),a=t.targetChange.targetIds||[],o=(i=t.targetChange.resumeToken,e.useProto3Json?(void 0===i||"string"==typeof i||S(),e3.fromBase64String(i||"")):(void 0===i||i instanceof m||i instanceof Uint8Array||S(),e3.fromUint8Array(i||new Uint8Array))),l=t.targetChange.cause;n=new n5(s,a,o,l&&new C(void 0===l.code?D.UNKNOWN:nQ(l.code),l.message||"")||null)}else if("documentChange"in t){t.documentChange;let r=t.documentChange;r.document,r.document.name,r.document.updateTime;let i=rc(e,r.document.name),s=rs(r.document.updateTime),a=r.document.createTime?rs(r.document.createTime):z.min(),o=new tE({mapValue:{fields:r.document.fields}}),l=tT.newFoundDocument(i,s,a,o);n=new n1(r.targetIds||[],r.removedTargetIds||[],l.key,l)}else if("documentDelete"in t){t.documentDelete;let r=t.documentDelete;r.document;let i=rc(e,r.document),s=r.readTime?rs(r.readTime):z.min(),a=tT.newNoDocument(i,s);n=new n1([],r.removedTargetIds||[],a.key,a)}else if("documentRemove"in t){t.documentRemove;let r=t.documentRemove;r.document;let i=rc(e,r.document);n=new n1([],r.removedTargetIds||[],i,null)}else{if(!("filter"in t))return S();{t.filter;let e=t.filter;e.targetId;let{count:r=0,unchangedNames:i}=e,s=new nK(r,i);n=new n2(e.targetId,s)}}return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return z.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?z.min():t.readTime?rs(t.readTime):z.min()}(e);return this.listener.h_(t,n)}P_(e){let t={};t.database=rf(this.serializer),t.addTarget=function(e,t){let n;let r=t.target;if((n=tH(r)?{documents:rv(e,r)}:{query:rI(e,r)._t}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=ri(e,t.resumeToken);let r=rn(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(z.min())>0){n.readTime=rr(e,t.snapshotVersion.toTimestamp());let r=rn(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);let n=function(e,t){let n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return S()}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.i_(t)}I_(e){let t={};t.database=rf(this.serializer),t.removeTarget=e,this.i_(t)}}class sN extends sD{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i,this.T_=!1}get E_(){return this.T_}start(){this.T_=!1,this.lastStreamToken=void 0,super.start()}__(){this.T_&&this.d_([])}l_(e,t){return this.connection.Oo("Write",e,t)}onMessage(e){var t,n;if(e.streamToken||S(),this.lastStreamToken=e.streamToken,this.T_){this.Yo.reset();let r=(t=e.writeResults,n=e.commitTime,t&&t.length>0?(void 0!==n||S(),t.map(e=>{let t;return(t=e.updateTime?rs(e.updateTime):rs(n)).isEqual(z.min())&&(t=rs(n)),new nD(t,e.transformResults||[])})):[]),i=rs(e.commitTime);return this.listener.A_(i,r)}return e.writeResults&&0!==e.writeResults.length&&S(),this.T_=!0,this.listener.R_()}V_(){let e={};e.database=rf(this.serializer),this.i_(e)}d_(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>ry(this.serializer,e))};this.i_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sk extends class{}{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.m_=!1}f_(){if(this.m_)throw new C(D.FAILED_PRECONDITION,"The client has already been terminated.")}Co(e,t,n,r){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Co(e,ro(t,n),r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new C(D.UNKNOWN,e.toString())})}xo(e,t,n,r,i){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.xo(e,ro(t,n),r,s,a,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new C(D.UNKNOWN,e.toString())})}terminate(){this.m_=!0,this.connection.terminate()}}class sA{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.g_=0,this.p_=null,this.y_=!0}w_(){0===this.g_&&(this.S_("Unknown"),this.p_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.p_=null,this.b_("Backend didn't respond within 10 seconds."),this.S_("Offline"),Promise.resolve())))}D_(e){"Online"===this.state?this.S_("Unknown"):(this.g_++,this.g_>=1&&(this.C_(),this.b_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.S_("Offline")))}set(e){this.C_(),this.g_=0,"Online"===e&&(this.y_=!1),this.S_(e)}S_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}b_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.y_?(b(t),this.y_=!1):_("OnlineStateTracker",t)}C_(){null!==this.p_&&(this.p_.cancel(),this.p_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sM{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.v_=[],this.F_=new Map,this.M_=new Set,this.x_=[],this.O_=i,this.O_.io(e=>{n.enqueueAndForget(async()=>{sB(this)&&(_("RemoteStore","Restarting streams for network reachability change."),await async function(e){e.M_.add(4),await sF(e),e.N_.set("Unknown"),e.M_.delete(4),await sR(e)}(this))})}),this.N_=new sA(n,r)}}async function sR(e){if(sB(e))for(let t of e.x_)await t(!0)}async function sF(e){for(let t of e.x_)await t(!1)}function sL(e,t){e.F_.has(t.targetId)||(e.F_.set(t.targetId,t),sU(e)?sq(e):s5(e).Xo()&&sP(e,t))}function sV(e,t){let n=s5(e);e.F_.delete(t),n.Xo()&&sO(e,t),0===e.F_.size&&(n.Xo()?n.n_():sB(e)&&e.N_.set("Unknown"))}function sP(e,t){if(e.L_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(z.min())>0){let n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}s5(e).P_(t)}function sO(e,t){e.L_.xe(t),s5(e).I_(t)}function sq(e){e.L_=new n3({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>e.F_.get(t)||null,tt:()=>e.datastore.serializer.databaseId}),s5(e).start(),e.N_.w_()}function sU(e){return sB(e)&&!s5(e).Zo()&&e.F_.size>0}function sB(e){return 0===e.M_.size}async function sz(e){e.N_.set("Online")}async function sG(e){e.F_.forEach((t,n)=>{sP(e,t)})}async function sK(e,t){e.L_=void 0,sU(e)?(e.N_.D_(t),sq(e)):e.N_.set("Unknown")}async function s$(e,t,n){if(e.N_.set("Online"),t instanceof n5&&2===t.state&&t.cause)try{await async function(e,t){let n=t.cause;for(let r of t.targetIds)e.F_.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.F_.delete(r),e.L_.removeTarget(r))}(e,t)}catch(n){_("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await sQ(e,n)}else if(t instanceof n1?e.L_.Ke(t):t instanceof n2?e.L_.He(t):e.L_.We(t),!n.isEqual(z.min()))try{let t=await i3(e.localStore);n.compareTo(t)>=0&&await function(e,t){let n=e.L_.rt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){let i=e.F_.get(r);i&&e.F_.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{let r=e.F_.get(t);if(!r)return;e.F_.set(t,r.withResumeToken(e3.EMPTY_BYTE_STRING,r.snapshotVersion)),sO(e,t);let i=new rS(r.target,t,n,r.sequenceNumber);sP(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){_("RemoteStore","Failed to raise snapshot:",t),await sQ(e,t)}}async function sQ(e,t,n){if(!ed(t))throw t;e.M_.add(1),await sF(e),e.N_.set("Offline"),n||(n=()=>i3(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{_("RemoteStore","Retrying IndexedDB access"),await n(),e.M_.delete(1),await sR(e)})}function sj(e,t){return t().catch(n=>sQ(e,n,t))}async function sW(e){let t=s4(e),n=e.v_.length>0?e.v_[e.v_.length-1].batchId:-1;for(;sB(e)&&e.v_.length<10;)try{let r=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}(e.localStore,n);if(null===r){0===e.v_.length&&t.n_();break}n=r.batchId,function(e,t){e.v_.push(t);let n=s4(e);n.Xo()&&n.E_&&n.d_(t.mutations)}(e,r)}catch(t){await sQ(e,t)}sH(e)&&sY(e)}function sH(e){return sB(e)&&!s4(e).Zo()&&e.v_.length>0}function sY(e){s4(e).start()}async function sJ(e){s4(e).V_()}async function sX(e){let t=s4(e);for(let n of e.v_)t.d_(n.mutations)}async function sZ(e,t,n){let r=e.v_.shift(),i=nz.from(r,t,n);await sj(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await sW(e)}async function s0(e,t){t&&s4(e).E_&&await async function(e,t){var n;if(n$(n=t.code)&&n!==D.ABORTED){let n=e.v_.shift();s4(e).t_(),await sj(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await sW(e)}}(e,t),sH(e)&&sY(e)}async function s1(e,t){e.asyncQueue.verifyOperationInProgress(),_("RemoteStore","RemoteStore received new credentials");let n=sB(e);e.M_.add(3),await sF(e),n&&e.N_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.M_.delete(3),await sR(e)}async function s2(e,t){t?(e.M_.delete(2),await sR(e)):t||(e.M_.add(2),await sF(e),e.N_.set("Unknown"))}function s5(e){var t,n,r;return e.B_||(e.B_=(t=e.datastore,n=e.asyncQueue,r={Po:sz.bind(null,e),To:sG.bind(null,e),Ao:sK.bind(null,e),h_:s$.bind(null,e)},t.f_(),new sC(n,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,r)),e.x_.push(async t=>{t?(e.B_.t_(),sU(e)?sq(e):e.N_.set("Unknown")):(await e.B_.stop(),e.L_=void 0)})),e.B_}function s4(e){var t,n,r;return e.k_||(e.k_=(t=e.datastore,n=e.asyncQueue,r={Po:()=>Promise.resolve(),To:sJ.bind(null,e),Ao:s0.bind(null,e),R_:sX.bind(null,e),A_:sZ.bind(null,e)},t.f_(),new sN(n,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,r)),e.x_.push(async t=>{t?(e.k_.t_(),await sW(e)):(await e.k_.stop(),e.v_.length>0&&(_("RemoteStore",`Stopping write stream with ${e.v_.length} pending writes`),e.v_=[]))})),e.k_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s3{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new N,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){let s=new s3(e,t,Date.now()+n,r,i);return s.start(n),s}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new C(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function s8(e,t){if(b("AsyncQueue",`${t}: ${e}`),ed(e))return new C(D.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s6{constructor(e){this.comparator=e?(t,n)=>e(t,n)||j.comparator(t.key,n.key):(e,t)=>j.comparator(e.key,t.key),this.keyedMap=na(),this.sortedSet=new eY(this.comparator)}static emptySet(e){return new s6(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof s6)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let n=new s6;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s9{constructor(){this.q_=new eY(j.comparator)}track(e){let t=e.doc.key,n=this.q_.get(t);n?0!==e.type&&3===n.type?this.q_=this.q_.insert(t,e):3===e.type&&1!==n.type?this.q_=this.q_.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.q_=this.q_.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.q_=this.q_.remove(t):1===e.type&&2===n.type?this.q_=this.q_.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):S():this.q_=this.q_.insert(t,e)}Q_(){let e=[];return this.q_.inorderTraversal((t,n)=>{e.push(n)}),e}}class s7{constructor(e,t,n,r,i,s,a,o,l){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=l}static fromInitialDocuments(e,t,n,r,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new s7(e,t,s6.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&t6(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(){this.K_=void 0,this.U_=[]}W_(){return this.U_.some(e=>e.G_())}}class at{constructor(){this.queries=new nr(e=>t9(e),t6),this.onlineState="Unknown",this.z_=new Set}}async function an(e,t){let n=3,r=t.query,i=e.queries.get(r);i?!i.W_()&&t.G_()&&(n=2):(i=new ae,n=t.G_()?0:1);try{switch(n){case 0:i.K_=await e.onListen(r,!0);break;case 1:i.K_=await e.onListen(r,!1);break;case 2:await e.onFirstRemoteStoreListen(r)}}catch(n){let e=s8(n,`Initialization of query '${t7(t.query)}' failed`);return void t.onError(e)}e.queries.set(r,i),i.U_.push(t),t.j_(e.onlineState),i.K_&&t.H_(i.K_)&&aa(e)}async function ar(e,t){let n=t.query,r=3,i=e.queries.get(n);if(i){let e=i.U_.indexOf(t);e>=0&&(i.U_.splice(e,1),0===i.U_.length?r=t.G_()?0:1:!i.W_()&&t.G_()&&(r=2))}switch(r){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function ai(e,t){let n=!1;for(let r of t){let t=r.query,i=e.queries.get(t);if(i){for(let e of i.U_)e.H_(r)&&(n=!0);i.K_=r}}n&&aa(e)}function as(e,t,n){let r=e.queries.get(t);if(r)for(let e of r.U_)e.onError(n);e.queries.delete(t)}function aa(e){e.z_.forEach(e=>{e.next()})}(a=s||(s={})).J_="default",a.Cache="cache";class ao{constructor(e,t,n){this.query=e,this.Y_=t,this.Z_=!1,this.X_=null,this.onlineState="Unknown",this.options=n||{}}H_(e){if(!this.options.includeMetadataChanges){let t=[];for(let n of e.docChanges)3!==n.type&&t.push(n);e=new s7(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Z_?this.ea(e)&&(this.Y_.next(e),t=!0):this.ta(e,this.onlineState)&&(this.na(e),t=!0),this.X_=e,t}onError(e){this.Y_.error(e)}j_(e){this.onlineState=e;let t=!1;return this.X_&&!this.Z_&&this.ta(this.X_,e)&&(this.na(this.X_),t=!0),t}ta(e,t){return!(e.fromCache&&this.G_())||(!this.options.ra||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}ea(e){if(e.docChanges.length>0)return!0;let t=this.X_&&this.X_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}na(e){e=s7.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Z_=!0,this.Y_.next(e)}G_(){return this.options.source!==s.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(e,t){this.ia=e,this.byteLength=t}sa(){return"metadata"in this.ia}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e){this.serializer=e}Ps(e){return rc(this.serializer,e)}Is(e){return e.metadata.exists?rp(this.serializer,e.document,!1):tT.newNoDocument(this.Ps(e.metadata.name),this.Ts(e.metadata.readTime))}Ts(e){return rs(e)}}class ac{constructor(e,t,n){this.oa=e,this.localStore=t,this.serializer=n,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=ah(e)}_a(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.ia.namedQuery)this.queries.push(e.ia.namedQuery);else if(e.ia.documentMetadata){this.documents.push({metadata:e.ia.documentMetadata}),e.ia.documentMetadata.exists||++t;let n=K.fromString(e.ia.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.ia.document&&(this.documents[this.documents.length-1].document=e.ia.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}aa(e){let t=new Map,n=new au(this.serializer);for(let r of e)if(r.metadata.queries){let e=n.Ps(r.metadata.name);for(let n of r.metadata.queries){let r=(t.get(n)||nh()).add(e);t.set(n,r)}}return t}async complete(){let e=await sr(this.localStore,new au(this.serializer),this.documents,this.oa.id),t=this.aa(this.documents);for(let e of this.queries)await si(this.localStore,e,t.get(e.name));return this.progress.taskState="Success",{progress:this.progress,ua:this.collectionGroups,ca:e}}}function ah(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(e){this.key=e}}class af{constructor(e){this.key=e}}class am{constructor(e,t){this.query=e,this.la=t,this.ha=null,this.hasCachedResults=!1,this.current=!1,this.Pa=nh(),this.mutatedKeys=nh(),this.Ia=nn(e),this.Ta=new s6(this.Ia)}get Ea(){return this.la}da(e,t){let n=t?t.Aa:new s9,r=t?t.Ta:this.Ta,i=t?t.mutatedKeys:this.mutatedKeys,s=r,a=!1,o="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,l="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{let u=r.get(e),c=ne(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),d=!!c&&(c.hasLocalMutations||this.mutatedKeys.has(c.key)&&c.hasCommittedMutations),f=!1;u&&c?u.data.isEqual(c.data)?h!==d&&(n.track({type:3,doc:c}),f=!0):this.Ra(u,c)||(n.track({type:2,doc:c}),f=!0,(o&&this.Ia(c,o)>0||l&&0>this.Ia(c,l))&&(a=!0)):!u&&c?(n.track({type:0,doc:c}),f=!0):u&&!c&&(n.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(c?(s=s.add(c),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{Ta:s,Aa:n,Xi:a,mutatedKeys:i}}Ra(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){let i=this.Ta;this.Ta=e.Ta,this.mutatedKeys=e.mutatedKeys;let s=e.Aa.Q_();s.sort((e,t)=>(function(e,t){let n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return S()}};return n(e)-n(t)})(e.type,t.type)||this.Ia(e.doc,t.doc)),this.Va(n),r=null!=r&&r;let a=t&&!r?this.ma():[],o=0===this.Pa.size&&this.current&&!r?1:0,l=o!==this.ha;return(this.ha=o,0!==s.length||l)?{snapshot:new s7(this.query,e.Ta,i,s,e.mutatedKeys,0===o,l,!1,!!n&&n.resumeToken.approximateByteSize()>0),fa:a}:{fa:a}}j_(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Ta:this.Ta,Aa:new s9,mutatedKeys:this.mutatedKeys,Xi:!1},!1)):{fa:[]}}ga(e){return!this.la.has(e)&&!!this.Ta.has(e)&&!this.Ta.get(e).hasLocalMutations}Va(e){e&&(e.addedDocuments.forEach(e=>this.la=this.la.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.la=this.la.delete(e)),this.current=e.current)}ma(){if(!this.current)return[];let e=this.Pa;this.Pa=nh(),this.Ta.forEach(e=>{this.ga(e.key)&&(this.Pa=this.Pa.add(e.key))});let t=[];return e.forEach(e=>{this.Pa.has(e)||t.push(new af(e))}),this.Pa.forEach(n=>{e.has(n)||t.push(new ad(n))}),t}pa(e){this.la=e.hs,this.Pa=nh();let t=this.da(e.documents);return this.applyChanges(t,!0)}ya(){return s7.fromInitialDocuments(this.query,this.Ta,this.mutatedKeys,0===this.ha,this.hasCachedResults)}}class ag{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class ap{constructor(e){this.key=e,this.wa=!1}}class ay{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Sa={},this.ba=new nr(e=>t9(e),t6),this.Da=new Map,this.Ca=new Set,this.va=new eY(j.comparator),this.Fa=new Map,this.Ma=new iO,this.xa={},this.Oa=new Map,this.Na=ig.Ln(),this.onlineState="Unknown",this.La=void 0}get isPrimaryClient(){return!0===this.La}}async function aw(e,t,n=!0){let r;let i=aH(e),s=i.ba.get(t);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),r=s.view.ya()):r=await aI(i,t,n,!0),r}async function av(e,t){let n=aH(e);await aI(n,t,!0,!1)}async function aI(e,t,n,r){let i;let s=await i6(e.localStore,t4(t)),a=s.targetId,o=n?e.sharedClientState.addLocalQueryTarget(a):"not-current";return r&&(i=await a_(e,t,a,"current"===o,s.resumeToken)),e.isPrimaryClient&&n&&sL(e.remoteStore,s),i}async function a_(e,t,n,r,i){e.Ba=(t,n,r)=>(async function(e,t,n,r){let i=t.view.da(n);i.Xi&&(i=await i7(e.localStore,t.query,!1).then(({documents:e})=>t.view.da(e,i)));let s=r&&r.targetChanges.get(t.targetId),a=r&&null!=r.targetMismatches.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s,a);return aL(e,t.targetId,o.fa),o.snapshot})(e,t,n,r);let s=await i7(e.localStore,t,!0),a=new am(t,s.hs),o=a.da(s.documents),l=n0.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=a.applyChanges(o,e.isPrimaryClient,l);aL(e,n,u.fa);let c=new ag(t,n,a);return e.ba.set(t,c),e.Da.has(n)?e.Da.get(n).push(t):e.Da.set(n,[t]),u.snapshot}async function ab(e,t,n){let r=e.ba.get(t),i=e.Da.get(r.targetId);if(i.length>1)return e.Da.set(r.targetId,i.filter(e=>!t6(e,t))),void e.ba.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(r.targetId),e.sharedClientState.isActiveQueryTarget(r.targetId)||await i9(e.localStore,r.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(r.targetId),n&&sV(e.remoteStore,r.targetId),aR(e,r.targetId)}).catch(es)):(aR(e,r.targetId),await i9(e.localStore,r.targetId,!0))}async function aE(e,t){let n=e.ba.get(t),r=e.Da.get(n.targetId);e.isPrimaryClient&&1===r.length&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),sV(e.remoteStore,n.targetId))}async function aT(e,t,n){let r=aY(e);try{var i;let e;let s=await function(e,t){let n,r;let i=B.now(),s=t.reduce((e,t)=>e.add(t.key),nh());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=ni,l=nh();return e.os.getEntries(a,s).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(l=l.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(r=>{n=r;let s=[];for(let e of t){let t=function(e,t){let n=null;for(let r of e.fieldTransforms){let e=t.data.field(r.field),i=ny(r.transform,e||null);null!=i&&(null===n&&(n=tE.empty()),n.set(r.field,i))}return n||null}(e,n.get(e.key).overlayedDocument);null!=t&&s.push(new nL(e.key,t,function e(t){let n=[];return eW(t.fields,(t,r)=>{let i=new Q([t]);if(tw(r)){let t=e(r.mapValue).fields;if(0===t.length)n.push(i);else for(let e of t)n.push(i.child(e))}else n.push(i)}),new e2(n)}(t.value.mapValue),nC.exists(!0)))}return e.mutationQueue.addMutationBatch(a,i,s,t)}).next(t=>{r=t;let i=t.applyToLocalDocumentSet(n,l);return e.documentOverlayCache.saveOverlays(a,t.batchId,i)})}).then(()=>({batchId:r.batchId,changes:no(n)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),i=s.batchId,(e=r.xa[r.currentUser.toKey()])||(e=new eY(q)),e=e.insert(i,n),r.xa[r.currentUser.toKey()]=e,await aP(r,s.changes),await sW(r.remoteStore)}catch(t){let e=s8(t,"Failed to persist write");n.reject(e)}}async function aS(e,t){try{let n=await function(e,t){let n=t.snapshotVersion,r=e.ns;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{let s=e.os.newChangeBuffer({trackRemovals:!0});r=e.ns;let a=[];t.targetChanges.forEach((s,o)=>{var l;let u=r.get(o);if(!u)return;a.push(e.Qr.removeMatchingKeys(i,s.removedDocuments,o).next(()=>e.Qr.addMatchingKeys(i,s.addedDocuments,o)));let c=u.withSequenceNumber(i.currentSequenceNumber);null!==t.targetMismatches.get(o)?c=c.withResumeToken(e3.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):s.resumeToken.approximateByteSize()>0&&(c=c.withResumeToken(s.resumeToken,n)),r=r.insert(o,c),l=c,(0===u.resumeToken.approximateByteSize()||l.snapshotVersion.toMicroseconds()-u.snapshotVersion.toMicroseconds()>=3e8||s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size>0)&&a.push(e.Qr.updateTargetData(i,c))});let o=ni,l=nh();if(t.documentUpdates.forEach(n=>{t.resolvedLimboDocuments.has(n)&&a.push(e.persistence.referenceDelegate.updateLimboDocument(i,n))}),a.push(i8(i,s,t.documentUpdates).next(e=>{o=e.cs,l=e.ls})),!n.isEqual(z.min())){let t=e.Qr.getLastRemoteSnapshotVersion(i).next(t=>e.Qr.setTargetsMetadata(i,i.currentSequenceNumber,n));a.push(t)}return ea.waitFor(a).next(()=>s.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,o,l)).next(()=>o)}).then(t=>(e.ns=r,t))}(e.localStore,t);t.targetChanges.forEach((t,n)=>{let r=e.Fa.get(n);r&&(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1||S(),t.addedDocuments.size>0?r.wa=!0:t.modifiedDocuments.size>0?r.wa||S():t.removedDocuments.size>0&&(r.wa||S(),r.wa=!1))}),await aP(e,n,t)}catch(e){await es(e)}}function ax(e,t,n){var r;if(e.isPrimaryClient&&0===n||!e.isPrimaryClient&&1===n){let n;let i=[];e.ba.forEach((e,n)=>{let r=n.view.j_(t);r.snapshot&&i.push(r.snapshot)}),(r=e.eventManager).onlineState=t,n=!1,r.queries.forEach((e,r)=>{for(let e of r.U_)e.j_(t)&&(n=!0)}),n&&aa(r),i.length&&e.Sa.h_(i),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function aD(e,t,n){e.sharedClientState.updateQueryState(t,"rejected",n);let r=e.Fa.get(t),i=r&&r.key;if(i){let n=new eY(j.comparator);n=n.insert(i,tT.newNoDocument(i,z.min()));let r=nh().add(i),s=new nZ(z.min(),new Map,new eY(q),n,r);await aS(e,s),e.va=e.va.remove(i),e.Fa.delete(t),aV(e)}else await i9(e.localStore,t,!1).then(()=>aR(e,t,n)).catch(es)}async function aC(e,t){var n;let r=t.batch.batchId;try{let i=await (n=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let r=t.batch.keys(),i=n.os.newChangeBuffer({trackRemovals:!0});return(function(e,t,n,r){let i=n.batch,s=i.keys(),a=ea.resolve();return s.forEach(e=>{a=a.next(()=>r.getEntry(t,e)).next(t=>{let s=n.docVersions.get(e);null!==s||S(),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=nh();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))});aM(e,r,null),aA(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await aP(e,i)}catch(e){await es(e)}}async function aN(e,t,n){var r;try{let i=await (r=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let n;return r.mutationQueue.lookupMutationBatch(e,t).next(t=>(null!==t||S(),n=t.keys(),r.mutationQueue.removeMutationBatch(e,t))).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,n)).next(()=>r.localDocuments.getDocuments(e,n))});aM(e,t,n),aA(e,t),e.sharedClientState.updateMutationState(t,"rejected",n),await aP(e,i)}catch(e){await es(e)}}async function ak(e,t){var n;sB(e.remoteStore)||_("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{let r=await (n=e.localStore).persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>n.mutationQueue.getHighestUnacknowledgedBatchId(e));if(-1===r)return void t.resolve();let i=e.Oa.get(r)||[];i.push(t),e.Oa.set(r,i)}catch(n){let e=s8(n,"Initialization of waitForPendingWrites() operation failed");t.reject(e)}}function aA(e,t){(e.Oa.get(t)||[]).forEach(e=>{e.resolve()}),e.Oa.delete(t)}function aM(e,t,n){let r=e.xa[e.currentUser.toKey()];if(r){let i=r.get(t);i&&(n?i.reject(n):i.resolve(),r=r.remove(t)),e.xa[e.currentUser.toKey()]=r}}function aR(e,t,n=null){for(let r of(e.sharedClientState.removeLocalQueryTarget(t),e.Da.get(t)))e.ba.delete(r),n&&e.Sa.ka(r,n);e.Da.delete(t),e.isPrimaryClient&&e.Ma.Vr(t).forEach(t=>{e.Ma.containsKey(t)||aF(e,t)})}function aF(e,t){e.Ca.delete(t.path.canonicalString());let n=e.va.get(t);null!==n&&(sV(e.remoteStore,n),e.va=e.va.remove(t),e.Fa.delete(n),aV(e))}function aL(e,t,n){for(let r of n)r instanceof ad?(e.Ma.addReference(r.key,t),function(e,t){let n=t.key,r=n.path.canonicalString();e.va.get(n)||e.Ca.has(r)||(_("SyncEngine","New document in limbo: "+n),e.Ca.add(r),aV(e))}(e,r)):r instanceof af?(_("SyncEngine","Document no longer in limbo: "+r.key),e.Ma.removeReference(r.key,t),e.Ma.containsKey(r.key)||aF(e,r.key)):S()}function aV(e){for(;e.Ca.size>0&&e.va.size<e.maxConcurrentLimboResolutions;){let t=e.Ca.values().next().value;e.Ca.delete(t);let n=new j(K.fromString(t)),r=e.Na.next();e.Fa.set(r,new ap(n)),e.va=e.va.insert(n,r),sL(e.remoteStore,new rS(t4(t0(n.path)),r,"TargetPurposeLimboResolution",ev.oe))}}async function aP(e,t,n){let r=[],i=[],s=[];e.ba.isEmpty()||(e.ba.forEach((a,o)=>{s.push(e.Ba(o,t,n).then(t=>{if((t||n)&&e.isPrimaryClient){let n=t&&!t.fromCache;e.sharedClientState.updateQueryState(o.targetId,n?"current":"not-current")}if(t){r.push(t);let e=i0.Ki(o.targetId,t);i.push(e)}}))}),await Promise.all(s),e.Sa.h_(r),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",n=>ea.forEach(t,t=>ea.forEach(t.qi,r=>e.persistence.referenceDelegate.addReference(n,t.targetId,r)).next(()=>ea.forEach(t.Qi,r=>e.persistence.referenceDelegate.removeReference(n,t.targetId,r)))))}catch(e){if(!ed(e))throw e;_("LocalStore","Failed to update sequence numbers: "+e)}for(let n of t){let t=n.targetId;if(!n.fromCache){let n=e.ns.get(t),r=n.snapshotVersion,i=n.withLastLimboFreeSnapshotVersion(r);e.ns=e.ns.insert(t,i)}}}(e.localStore,i))}async function aO(e,t){var n;if(!e.currentUser.isEqual(t)){_("SyncEngine","User change. New user:",t.toKey());let r=await i4(e.localStore,t);e.currentUser=t,n="'waitForPendingWrites' promise is rejected due to a user change.",e.Oa.forEach(e=>{e.forEach(e=>{e.reject(new C(D.CANCELLED,n))})}),e.Oa.clear(),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await aP(e,r.us)}}function aq(e,t){let n=e.Fa.get(t);if(n&&n.wa)return nh().add(n.key);{let n=nh(),r=e.Da.get(t);if(!r)return n;for(let t of r){let r=e.ba.get(t);n=n.unionWith(r.view.Ea)}return n}}async function aU(e,t){let n=await i7(e.localStore,t.query,!0),r=t.view.pa(n);return e.isPrimaryClient&&aL(e,t.targetId,r.fa),r}async function aB(e,t){return st(e.localStore,t).then(t=>aP(e,t))}async function az(e,t,n,r){let i=await function(e,t){let n=e.mutationQueue;return e.persistence.runTransaction("Lookup mutation documents","readonly",r=>n.vn(r,t).next(t=>t?e.localDocuments.getDocuments(r,t):ea.resolve(null)))}(e.localStore,t);null!==i?("pending"===n?await sW(e.remoteStore):"acknowledged"===n||"rejected"===n?(aM(e,t,r||null),aA(e,t),function(e,t){e.mutationQueue.Mn(t)}(e.localStore,t)):S(),await aP(e,i)):_("SyncEngine","Cannot apply mutation batch with id: "+t)}async function aG(e,t){if(aH(e),aY(e),!0===t&&!0!==e.La){let t=e.sharedClientState.getAllActiveQueryTargets(),n=await aK(e,t.toArray());for(let t of(e.La=!0,await s2(e.remoteStore,!0),n))sL(e.remoteStore,t)}else if(!1===t&&!1!==e.La){let t=[],n=Promise.resolve();e.Da.forEach((r,i)=>{e.sharedClientState.isLocalQueryTarget(i)?t.push(i):n=n.then(()=>(aR(e,i),i9(e.localStore,i,!0))),sV(e.remoteStore,i)}),await n,await aK(e,t),e.Fa.forEach((t,n)=>{sV(e.remoteStore,n)}),e.Ma.mr(),e.Fa=new Map,e.va=new eY(j.comparator),e.La=!1,await s2(e.remoteStore,!1)}}async function aK(e,t,n){let r=[],i=[];for(let n of t){let t;let s=e.Da.get(n);if(s&&0!==s.length)for(let n of(t=await i6(e.localStore,t4(s[0])),s)){let t=e.ba.get(n),r=await aU(e,t);r.snapshot&&i.push(r.snapshot)}else{let r=await se(e.localStore,n);t=await i6(e.localStore,r),await a_(e,a$(r),n,!1,t.resumeToken)}r.push(t)}return e.Sa.h_(i),r}function a$(e){var t,n,r,i;return t=e.path,n=e.collectionGroup,r=e.orderBy,i=e.filters,new tZ(t,n,r,i,e.limit,"F",e.startAt,e.endAt)}function aQ(e){return e.localStore.persistence.Bi()}async function aj(e,t,n,r){if(e.La)return void _("SyncEngine","Ignoring unexpected query state notification.");let i=e.Da.get(t);if(i&&i.length>0)switch(n){case"current":case"not-current":{let r=await st(e.localStore,nt(i[0])),s=nZ.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,e3.EMPTY_BYTE_STRING);await aP(e,r,s);break}case"rejected":await i9(e.localStore,t,!0),aR(e,t,r);break;default:S()}}async function aW(e,t,n){let r=aH(e);if(r.La){for(let e of t){if(r.Da.has(e)&&r.sharedClientState.isActiveQueryTarget(e)){_("SyncEngine","Adding an already active target "+e);continue}let t=await se(r.localStore,e),n=await i6(r.localStore,t);await a_(r,a$(t),n.targetId,!1,n.resumeToken),sL(r.remoteStore,n)}for(let e of n)r.Da.has(e)&&await i9(r.localStore,e,!1).then(()=>{sV(r.remoteStore,e),aR(r,e)}).catch(es)}}function aH(e){return e.remoteStore.remoteSyncer.applyRemoteEvent=aS.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=aq.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=aD.bind(null,e),e.Sa.h_=ai.bind(null,e.eventManager),e.Sa.ka=as.bind(null,e.eventManager),e}function aY(e){return e.remoteStore.remoteSyncer.applySuccessfulWrite=aC.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=aN.bind(null,e),e}class aJ{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=sS(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){var t;return t=this.persistence,new i5(t,new i2,e.initialUser,this.serializer)}createPersistence(e){return new iK(iQ.Hr,this.serializer)}createSharedClientState(e){return new sm}async terminate(){var e,t;null===(e=this.gcScheduler)||void 0===e||e.stop(),null===(t=this.indexBackfillerScheduler)||void 0===t||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class aX extends aJ{constructor(e,t,n){super(),this.Qa=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Qa.initialize(this,e),await aY(this.Qa.syncEngine),await sW(this.Qa.remoteStore),await this.persistence.fi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}createLocalStore(e){var t;return t=this.persistence,new i5(t,new i2,e.initialUser,this.serializer)}createGarbageCollectionScheduler(e,t){return new ib(this.persistence.referenceDelegate.garbageCollector,e.asyncQueue,t)}createIndexBackfillerScheduler(e,t){let n=new ew(t,this.persistence);return new ey(e.asyncQueue,n)}createPersistence(e){let t=iZ(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?ia.withCacheSize(this.cacheSizeBytes):ia.DEFAULT;return new iY(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,sE(),sT(),this.serializer,this.sharedClientState,!!this.forceOwnership)}createSharedClientState(e){return new sm}}class aZ extends aX{constructor(e,t){super(e,t,!1),this.Qa=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);let t=this.Qa.syncEngine;this.sharedClientState instanceof sf&&(this.sharedClientState.syncEngine={Zs:az.bind(null,t),Xs:aj.bind(null,t),eo:aW.bind(null,t),Bi:aQ.bind(null,t),Ys:aB.bind(null,t)},await this.sharedClientState.start()),await this.persistence.fi(async e=>{await aG(this.Qa.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}createSharedClientState(e){let t=sE();if(!sf.D(t))throw new C(D.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");let n=iZ(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new sf(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class a0{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>ax(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=aO.bind(null,this.syncEngine),await s2(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new at}createDatastore(e){let t=sS(e.databaseInfo.databaseId),n=new sb(e.databaseInfo);return new sk(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){var t;return t=this.localStore,new sM(t,this.datastore,e.asyncQueue,e=>ax(this.syncEngine,e,0),sp.D()?new sp:new sg)}createSyncEngine(e,t){return function(e,t,n,r,i,s,a){let o=new ay(e,t,n,r,i,s);return a&&(o.La=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e;await async function(e){_("RemoteStore","RemoteStore shutting down."),e.M_.add(5),await sF(e),e.O_.shutdown(),e.N_.set("Unknown")}(this.remoteStore),null===(e=this.datastore)||void 0===e||e.terminate()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a1(e,t=10240){let n=0;return{async read(){if(n<e.byteLength){let r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a2{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ka(this.observer.next,e)}error(e){this.observer.error?this.Ka(this.observer.error,e):b("Uncaught Error in snapshot listener:",e.toString())}$a(){this.muted=!0}Ka(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a5{constructor(e,t){this.Ua=e,this.serializer=t,this.metadata=new N,this.buffer=new Uint8Array,this.Wa=new TextDecoder("utf-8"),this.Ga().then(e=>{e&&e.sa()?this.metadata.resolve(e.ia.metadata):this.metadata.reject(Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(null==e?void 0:e.ia)}`))},e=>this.metadata.reject(e))}close(){return this.Ua.cancel()}async getMetadata(){return this.metadata.promise}async qa(){return await this.getMetadata(),this.Ga()}async Ga(){let e=await this.za();if(null===e)return null;let t=this.Wa.decode(e),n=Number(t);return isNaN(n)&&this.ja(`length string (${t}) is not valid number`),new al(JSON.parse(await this.Ha(n)),e.length+n)}Ja(){return this.buffer.findIndex(e=>123===e)}async za(){for(;0>this.Ja()&&!await this.Ya(););if(0===this.buffer.length)return null;let e=this.Ja();e<0&&this.ja("Reached the end of bundle when a length string is expected.");let t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Ha(e){for(;this.buffer.length<e;)await this.Ya()&&this.ja("Reached the end of bundle when more is expected.");let t=this.Wa.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ja(e){throw this.Ua.cancel(),Error(`Invalid bundle format: ${e}`)}async Ya(){let e=await this.Ua.read();if(!e.done){let t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a4{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new C(D.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await async function(e,t){let n={documents:t.map(t=>ru(e.serializer,t))},r=await e.xo("BatchGetDocuments",e.serializer.databaseId,K.emptyPath(),n,t.length),i=new Map;r.forEach(t=>{var n;let r=(n=e.serializer,"found"in t?function(e,t){t.found||S(),t.found.name,t.found.updateTime;let n=rc(e,t.found.name),r=rs(t.found.updateTime),i=t.found.createTime?rs(t.found.createTime):z.min(),s=new tE({mapValue:{fields:t.found.fields}});return tT.newFoundDocument(n,r,i,s)}(n,t):"missing"in t?function(e,t){t.missing||S(),t.readTime||S();let n=rc(e,t.missing),r=rs(t.readTime);return tT.newNoDocument(n,r)}(n,t):S());i.set(r.key.toString(),r)});let s=[];return t.forEach(e=>{let t=i.get(e.toString());t||S(),s.push(t)}),s}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new nq(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{let n=j.fromPath(t);this.mutations.push(new nU(n,this.precondition(n)))}),await async function(e,t){let n={writes:t.map(t=>ry(e.serializer,t))};await e.Co("Commit",e.serializer.databaseId,K.emptyPath(),n)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw S();t=z.min()}let n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new C(D.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(z.min())?nC.exists(!1):nC.updateTime(t):nC.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(z.min()))throw new C(D.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return nC.updateTime(t)}return nC.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a3{constructor(e,t,n,r,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=i,this.Za=n.maxAttempts,this.Yo=new sx(this.asyncQueue,"transaction_retry")}Xa(){this.Za-=1,this.eu()}eu(){this.Yo.$o(async()=>{let e=new a4(this.datastore),t=this.tu(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.nu(e)}))}).catch(e=>{this.nu(e)})})}tu(e){try{let t=this.updateFunction(e);return!eI(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}nu(e){this.Za>0&&this.ru(e)?(this.Za-=1,this.asyncQueue.enqueueAndForget(()=>(this.eu(),Promise.resolve()))):this.deferred.reject(e)}ru(e){if("FirebaseError"===e.name){let t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!n$(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a8{constructor(e,t,n,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=p.UNAUTHENTICATED,this.clientId=O.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,async e=>{_("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(_("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new C(D.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new N;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){let t=s8(n,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function a6(e,t){e.asyncQueue.verifyOperationInProgress(),_("FirestoreClient","Initializing OfflineComponentProvider");let n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await i4(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function a9(e,t){e.asyncQueue.verifyOperationInProgress();let n=await oe(e);_("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>s1(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>s1(t.remoteStore,n)),e._onlineComponents=t}function a7(e){return"FirebaseError"===e.name?e.code===D.FAILED_PRECONDITION||e.code===D.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}async function oe(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){_("FirestoreClient","Using user provided OfflineComponentProvider");try{await a6(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!a7(t))throw t;E("Error using user provided cache. Falling back to memory cache: "+t),await a6(e,new aJ)}}else _("FirestoreClient","Using default OfflineComponentProvider"),await a6(e,new aJ)}return e._offlineComponents}async function ot(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(_("FirestoreClient","Using user provided OnlineComponentProvider"),await a9(e,e._uninitializedComponentsProvider._online)):(_("FirestoreClient","Using default OnlineComponentProvider"),await a9(e,new a0))),e._onlineComponents}function on(e){return oe(e).then(e=>e.persistence)}function or(e){return oe(e).then(e=>e.localStore)}function oi(e){return ot(e).then(e=>e.remoteStore)}function os(e){return ot(e).then(e=>e.syncEngine)}async function oa(e){let t=await ot(e),n=t.eventManager;return n.onListen=aw.bind(null,t.syncEngine),n.onUnlisten=ab.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=av.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=aE.bind(null,t.syncEngine),n}function oo(e,t,n={}){let r=new N;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new a2({next:s=>{t.enqueueAndForget(()=>ar(e,a));let o=s.docs.has(n);!o&&s.fromCache?i.reject(new C(D.UNAVAILABLE,"Failed to get document because the client is offline.")):o&&s.fromCache&&r&&"server"===r.source?i.reject(new C(D.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(s)},error:e=>i.reject(e)}),a=new ao(t0(n.path),s,{includeMetadataChanges:!0,ra:!0});return an(e,a)})(await oa(e),e.asyncQueue,t,n,r)),r.promise}function ol(e,t,n={}){let r=new N;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new ao(n,new a2({next:n=>{t.enqueueAndForget(()=>ar(e,s)),n.fromCache&&"server"===r.source?i.reject(new C(D.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),{includeMetadataChanges:!0,ra:!0});return an(e,s)})(await oa(e),e.asyncQueue,t,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ou(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oc=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(e,t,n){if(!n)throw new C(D.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function od(e,t,n,r){if(!0===t&&!0===r)throw new C(D.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function of(e){if(!j.isDocumentKey(e))throw new C(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function om(e){if(j.isDocumentKey(e))throw new C(D.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function og(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}return"function"==typeof e?"a function":S()}function op(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new C(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=og(e);throw new C(D.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function oy(e,t){if(t<=0)throw new C(D.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ow{constructor(e){var t,n;if(void 0===e.host){if(void 0!==e.ssl)throw new C(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new C(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}od("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ou(null!==(n=e.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new C(D.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new C(D.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new C(D.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,n;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ov{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ow({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new C(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new C(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ow(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new A;switch(e.type){case"firstParty":return new L(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new C(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=oc.get(e);t&&(_("ComponentProvider","Removing Datastore"),oc.delete(e),t.terminate())}(this),Promise.resolve()}}function oI(e,t,n,r={}){var i;let s=(e=op(e,ov))._getSettings(),a=`${t}:${n}`;if("firestore.googleapis.com"!==s.host&&s.host!==a&&E("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),r.mockUserToken){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=p.MOCK_USER;else{t=(0,c.Sg)(r.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);let s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new C(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new p(s)}e._authCredentials=new M(new k(t,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new o_(this.firestore,e,this._query)}}class ob{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new oE(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ob(this.firestore,e,this._key)}}class oE extends o_{constructor(e,t,n){super(e,t,t0(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new ob(this.firestore,null,new j(e))}withConverter(e){return new oE(this.firestore,e,this._path)}}function oT(e,t,...n){if(e=(0,c.m9)(e),oh("collection","path",t),e instanceof ov){let r=K.fromString(t,...n);return om(r),new oE(e,null,r)}{if(!(e instanceof ob||e instanceof oE))throw new C(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=e._path.child(K.fromString(t,...n));return om(r),new oE(e.firestore,null,r)}}function oS(e,t){if(e=op(e,ov),oh("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new C(D.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new o_(e,null,new tZ(K.emptyPath(),t))}function ox(e,t,...n){if(e=(0,c.m9)(e),1==arguments.length&&(t=O.newId()),oh("doc","path",t),e instanceof ov){let r=K.fromString(t,...n);return of(r),new ob(e,null,new j(r))}{if(!(e instanceof ob||e instanceof oE))throw new C(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=e._path.child(K.fromString(t,...n));return of(r),new ob(e.firestore,e instanceof oE?e.converter:null,new j(r))}}function oD(e,t){return e=(0,c.m9)(e),t=(0,c.m9)(t),(e instanceof ob||e instanceof oE)&&(t instanceof ob||t instanceof oE)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function oC(e,t){return e=(0,c.m9)(e),t=(0,c.m9)(t),e instanceof o_&&t instanceof o_&&e.firestore===t.firestore&&t6(e._query,t._query)&&e.converter===t.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oN{constructor(){this.iu=Promise.resolve(),this.su=[],this.ou=!1,this._u=[],this.au=null,this.uu=!1,this.cu=!1,this.lu=[],this.Yo=new sx(this,"async_queue_retry"),this.hu=()=>{let e=sT();e&&_("AsyncQueue","Visibility state changed to "+e.visibilityState),this.Yo.Wo()};let e=sT();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.hu)}get isShuttingDown(){return this.ou}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pu(),this.Iu(e)}enterRestrictedMode(e){if(!this.ou){this.ou=!0,this.cu=e||!1;let t=sT();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.hu)}}enqueue(e){if(this.Pu(),this.ou)return new Promise(()=>{});let t=new N;return this.Iu(()=>this.ou&&this.cu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.su.push(e),this.Tu()))}async Tu(){if(0!==this.su.length){try{await this.su[0](),this.su.shift(),this.Yo.reset()}catch(e){if(!ed(e))throw e;_("AsyncQueue","Operation failed with retryable error: "+e)}this.su.length>0&&this.Yo.$o(()=>this.Tu())}}Iu(e){let t=this.iu.then(()=>(this.uu=!0,e().catch(e=>{let t;throw this.au=e,this.uu=!1,b("INTERNAL UNHANDLED ERROR: ",(t=e.message||"",e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t)),e}).then(e=>(this.uu=!1,e))));return this.iu=t,t}enqueueAfterDelay(e,t,n){this.Pu(),this.lu.indexOf(e)>-1&&(t=0);let r=s3.createAndSchedule(this,e,t,n,e=>this.Eu(e));return this._u.push(r),r}Pu(){this.au&&S()}verifyOperationInProgress(){}async du(){let e;do e=this.iu,await e;while(e!==this.iu)}Au(e){for(let t of this._u)if(t.timerId===e)return!0;return!1}Ru(e){return this.du().then(()=>{for(let t of(this._u.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this._u))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.du()})}Vu(e){this.lu.push(e)}Eu(e){let t=this._u.indexOf(e);this._u.splice(t,1)}}function ok(e){return function(e,t){if("object"!=typeof e||null===e)return!1;for(let n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])}class oA{constructor(){this._progressObserver={},this._taskCompletionResolver=new N,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oM=-1;class oR extends ov{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new oN,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||oL(this),this._firestoreClient.terminate()}}function oF(e){return e._firestoreClient||oL(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function oL(e){var t,n,r,i;let s=e._freezeSettings(),a=(i=e._databaseId,new tr(i,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,ou(s.experimentalLongPollingOptions),s.useFetchStreams));e._firestoreClient=new a8(e._authCredentials,e._appCheckCredentials,e._queue,a),(null===(n=s.localCache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(r=s.localCache)||void 0===r?void 0:r._onlineComponentProvider)&&(e._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.localCache.kind,_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider})}function oV(e,t){o$(e=op(e,oR));let n=oF(e);if(n._uninitializedComponentsProvider)throw new C(D.FAILED_PRECONDITION,"SDK cache is already specified.");E("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");let r=e._freezeSettings(),i=new a0;return oO(n,i,new aX(i,r.cacheSizeBytes,null==t?void 0:t.forceOwnership))}function oP(e){o$(e=op(e,oR));let t=oF(e);if(t._uninitializedComponentsProvider)throw new C(D.FAILED_PRECONDITION,"SDK cache is already specified.");E("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");let n=e._freezeSettings(),r=new a0;return oO(t,r,new aZ(r,n.cacheSizeBytes))}function oO(e,t,n){let r=new N;return e.asyncQueue.enqueue(async()=>{try{await a6(e,n),await a9(e,t),r.resolve()}catch(e){if(!a7(e))throw e;E("Error enabling indexeddb cache. Falling back to memory cache: "+e),r.reject(e)}}).then(()=>r.promise)}function oq(e){if(e._initialized&&!e._terminated)throw new C(D.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");let t=new N;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!el.D())return Promise.resolve();await el.delete(e+"main")}(iZ(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function oU(e){return function(e){let t=new N;return e.asyncQueue.enqueueAndForget(async()=>ak(await os(e),t)),t.promise}(oF(e=op(e,oR)))}function oB(e){var t;return(t=oF(e=op(e,oR))).asyncQueue.enqueue(async()=>{let e=await on(t),n=await oi(t);return e.setNetworkEnabled(!0),n.M_.delete(0),sR(n)})}function oz(e){var t;return(t=oF(e=op(e,oR))).asyncQueue.enqueue(async()=>{let e=await on(t),n=await oi(t);return e.setNetworkEnabled(!1),async function(e){e.M_.add(0),await sF(e),e.N_.set("Offline")}(n)})}function oG(e,t){let n=oF(e=op(e,oR)),r=new oA;return function(e,t,n,r){var i;let s=(i=sS(t),new a5(function(e,t){if(e instanceof Uint8Array)return a1(e,void 0);if(e instanceof ArrayBuffer)return a1(new Uint8Array(e),void 0);if(e instanceof ReadableStream)return e.getReader();throw Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}("string"==typeof n?nj().encode(n):n),i));e.asyncQueue.enqueueAndForget(async()=>{!function(e,t,n){(async function(e,t,n){try{var r;let i=await t.getMetadata();if(await function(e,t){let n=rs(t.createTime);return e.persistence.runTransaction("hasNewerBundle","readonly",n=>e.$r.getBundleMetadata(n,t.id)).then(e=>!!e&&e.createTime.compareTo(n)>=0)}(e.localStore,i))return await t.close(),n._completeWith({taskState:"Success",documentsLoaded:i.totalDocuments,bytesLoaded:i.totalBytes,totalDocuments:i.totalDocuments,totalBytes:i.totalBytes}),Promise.resolve(new Set);n._updateProgress(ah(i));let s=new ac(i,e.localStore,t.serializer),a=await t.qa();for(;a;){let e=await s._a(a);e&&n._updateProgress(e),a=await t.qa()}let o=await s.complete();return await aP(e,o.ca,void 0),await (r=e.localStore).persistence.runTransaction("Save bundle","readwrite",e=>r.$r.saveBundleMetadata(e,i)),n._completeWith(o.progress),Promise.resolve(o.ua)}catch(e){return E("SyncEngine",`Loading bundle failed with ${e}`),n._failWith(e),Promise.resolve(new Set)}})(e,t,n).then(t=>{e.sharedClientState.notifyBundleLoaded(t)})}(await os(e),s,r)})}(n,e._databaseId,t,r),r}function oK(e,t){var n;return(n=oF(e=op(e,oR))).asyncQueue.enqueue(async()=>{var e;return(e=await or(n)).persistence.runTransaction("Get named query","readonly",n=>e.$r.getNamedQuery(n,t))}).then(t=>t?new o_(e,null,t.query):null)}function o$(e){if(e._initialized||e._terminated)throw new C(D.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oQ{constructor(e){this._byteString=e}static fromBase64String(e){try{return new oQ(e3.fromBase64String(e))}catch(e){throw new C(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new oQ(e3.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oj{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new C(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Q(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oW{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oH{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new C(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new C(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return q(this._lat,e._lat)||q(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oY=/^__.*__$/;class oJ{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new nL(e,this.data,this.fieldMask,t,this.fieldTransforms):new nF(e,this.data,t,this.fieldTransforms)}}class oX{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new nL(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function oZ(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw S()}}class o0{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.mu(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get fu(){return this.settings.fu}gu(e){return new o0(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}pu(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.gu({path:n,yu:!1});return r.wu(e),r}Su(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.gu({path:n,yu:!1});return r.mu(),r}bu(e){return this.gu({path:void 0,yu:!0})}Du(e){return lc(e,this.settings.methodName,this.settings.Cu||!1,this.path,this.settings.vu)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}mu(){if(this.path)for(let e=0;e<this.path.length;e++)this.wu(this.path.get(e))}wu(e){if(0===e.length)throw this.Du("Document fields must not be empty");if(oZ(this.fu)&&oY.test(e))throw this.Du('Document fields cannot begin and end with "__"')}}class o1{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||sS(e)}Fu(e,t,n,r=!1){return new o0({fu:e,methodName:t,vu:n,path:Q.emptyPath(),yu:!1,Cu:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function o2(e){let t=e._freezeSettings(),n=sS(e._databaseId);return new o1(e._databaseId,!!t.ignoreUndefinedProperties,n)}function o5(e,t,n,r,i,s={}){let a,o;let l=e.Fu(s.merge||s.mergeFields?2:0,t,n,i);la("Data must be an object, but it was:",l,r);let u=li(r,l);if(s.merge)a=new e2(l.fieldMask),o=l.fieldTransforms;else if(s.mergeFields){let e=[];for(let r of s.mergeFields){let i=lo(t,r,n);if(!l.contains(i))throw new C(D.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);lh(e,i)||e.push(i)}a=new e2(e),o=l.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=l.fieldTransforms;return new oJ(new tE(u),a,o)}class o4 extends oW{_toFieldTransform(e){if(2!==e.fu)throw 1===e.fu?e.Du(`${this._methodName}() can only appear at the top level of your update data`):e.Du(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof o4}}function o3(e,t,n){return new o0({fu:3,vu:t.settings.vu,methodName:e._methodName,yu:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class o8 extends oW{_toFieldTransform(e){return new nx(e.path,new nw)}isEqual(e){return e instanceof o8}}class o6 extends oW{constructor(e,t){super(e),this.Mu=t}_toFieldTransform(e){let t=o3(this,e,!0),n=new nv(this.Mu.map(e=>lr(e,t)));return new nx(e.path,n)}isEqual(e){return e instanceof o6&&(0,c.vZ)(this.Mu,e.Mu)}}class o9 extends oW{constructor(e,t){super(e),this.Mu=t}_toFieldTransform(e){let t=o3(this,e,!0),n=new n_(this.Mu.map(e=>lr(e,t)));return new nx(e.path,n)}isEqual(e){return e instanceof o9&&(0,c.vZ)(this.Mu,e.Mu)}}class o7 extends oW{constructor(e,t){super(e),this.xu=t}_toFieldTransform(e){let t=new nE(e.serializer,ng(e.serializer,this.xu));return new nx(e.path,t)}isEqual(e){return e instanceof o7&&this.xu===e.xu}}function le(e,t,n,r){let i=e.Fu(1,t,n);la("Data must be an object, but it was:",i,r);let s=[],a=tE.empty();return eW(r,(e,r)=>{let o=lu(t,e,n);r=(0,c.m9)(r);let l=i.Su(o);if(r instanceof o4)s.push(o);else{let e=lr(r,l);null!=e&&(s.push(o),a.set(o,e))}}),new oX(a,new e2(s),i.fieldTransforms)}function lt(e,t,n,r,i,s){let a=e.Fu(1,t,n),o=[lo(t,r,n)],l=[i];if(s.length%2!=0)throw new C(D.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<s.length;e+=2)o.push(lo(t,s[e])),l.push(s[e+1]);let u=[],h=tE.empty();for(let e=o.length-1;e>=0;--e)if(!lh(u,o[e])){let t=o[e],n=l[e];n=(0,c.m9)(n);let r=a.Su(t);if(n instanceof o4)u.push(t);else{let e=lr(n,r);null!=e&&(u.push(t),h.set(t,e))}}return new oX(h,new e2(u),a.fieldTransforms)}function ln(e,t,n,r=!1){return lr(n,e.Fu(r?4:3,t))}function lr(e,t){if(ls(e=(0,c.m9)(e)))return la("Unsupported field value:",t,e),li(e,t);if(e instanceof oW)return function(e,t){if(!oZ(t.fu))throw t.Du(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Du(`${e._methodName}() is not currently supported inside arrays`);let n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.yu&&4!==t.fu)throw t.Du("Nested arrays are not supported");return function(e,t){let n=[],r=0;for(let i of e){let e=lr(i,t.bu(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,c.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return ng(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let n=B.fromDate(e);return{timestampValue:rr(t.serializer,n)}}if(e instanceof B){let n=new B(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:rr(t.serializer,n)}}if(e instanceof oH)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof oQ)return{bytesValue:ri(t.serializer,e._byteString)};if(e instanceof ob){let n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.Du(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:ra(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.Du(`Unsupported field value: ${og(e)}`)}(e,t)}function li(e,t){let n={};return eH(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):eW(e,(e,r)=>{let i=lr(r,t.pu(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function ls(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof B||e instanceof oH||e instanceof oQ||e instanceof ob||e instanceof oW)}function la(e,t,n){if(!ls(n)||!("object"==typeof n&&null!==n&&(Object.getPrototypeOf(n)===Object.prototype||null===Object.getPrototypeOf(n)))){let r=og(n);throw"an object"===r?t.Du(e+" a custom object"):t.Du(e+" "+r)}}function lo(e,t,n){if((t=(0,c.m9)(t))instanceof oj)return t._internalPath;if("string"==typeof t)return lu(e,t);throw lc("Field path arguments must be of type string or ",e,!1,void 0,n)}let ll=RegExp("[~\\*/\\[\\]]");function lu(e,t,n){if(t.search(ll)>=0)throw lc(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new oj(...t.split("."))._internalPath}catch(r){throw lc(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function lc(e,t,n,r,i){let s=r&&!r.isEmpty(),a=void 0!==i,o=`Function ${t}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new C(D.INVALID_ARGUMENT,o+e+l)}function lh(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ob(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new lf(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(lm("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class lf extends ld{data(){return super.data()}}function lm(e,t){return"string"==typeof t?lu(e,t):t instanceof oj?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lg(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new C(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class lp{}class ly extends lp{}function lw(e,t,...n){let r=[];for(let i of(t instanceof lp&&r.push(t),function(e){let t=e.filter(e=>e instanceof l_).length,n=e.filter(e=>e instanceof lv).length;if(t>1||t>0&&n>0)throw new C(D.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r=r.concat(n)),r))e=i._apply(e);return e}class lv extends ly{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new lv(e,t,n)}_apply(e){let t=this._parse(e);return lV(e._query,t),new o_(e.firestore,e.converter,t3(e._query,t))}_parse(e){let t=o2(e.firestore);return function(e,t,n,r,i,s,a){let o;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new C(D.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){lL(a,s);let t=[];for(let n of a)t.push(lF(r,e,n));o={arrayValue:{values:t}}}else o=lF(r,e,a)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||lL(a,s),o=ln(n,t,a,"in"===s||"not-in"===s);return tk.create(i,s,o)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function lI(e,t,n){let r=lm("where",e);return lv._create(r,t,n)}class l_ extends lp{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new l_(e,t)}_parse(e){let t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:tA.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;for(let e of t.getFlattenedFilters())lV(n,e),n=t3(n,e)}(e._query,t),new o_(e.firestore,e.converter,t3(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class lb extends ly{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new lb(e,t)}_apply(e){let t=function(e,t,n){if(null!==e.startAt)throw new C(D.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new C(D.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new tC(t,n)}(e._query,this._field,this._direction);return new o_(e.firestore,e.converter,function(e,t){let n=e.explicitOrderBy.concat([t]);return new tZ(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function lE(e,t="asc"){let n=lm("orderBy",e);return lb._create(n,t)}class lT extends ly{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new lT(e,t,n)}_apply(e){return new o_(e.firestore,e.converter,t8(e._query,this._limit,this._limitType))}}function lS(e){return oy("limit",e),lT._create("limit",e,"F")}function lx(e){return oy("limitToLast",e),lT._create("limitToLast",e,"L")}class lD extends ly{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new lD(e,t,n)}_apply(e){var t;let n=lR(e,this.type,this._docOrFields,this._inclusive);return new o_(e.firestore,e.converter,new tZ((t=e._query).path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,n,t.endAt))}}function lC(...e){return lD._create("startAt",e,!0)}function lN(...e){return lD._create("startAfter",e,!1)}class lk extends ly{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new lk(e,t,n)}_apply(e){var t;let n=lR(e,this.type,this._docOrFields,this._inclusive);return new o_(e.firestore,e.converter,new tZ((t=e._query).path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,n))}}function lA(...e){return lk._create("endBefore",e,!1)}function lM(...e){return lk._create("endAt",e,!0)}function lR(e,t,n,r){if(n[0]=(0,c.m9)(n[0]),n[0]instanceof ld)return function(e,t,n,r,i){if(!r)throw new C(D.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);let s=[];for(let n of t5(e))if(n.field.isKeyField())s.push(tf(t,r.key));else{let e=r.data.field(n.field);if(te(e))throw new C(D.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){let e=n.field.canonicalString();throw new C(D.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}s.push(e)}return new tS(s,i)}(e._query,e.firestore._databaseId,t,n[0]._document,r);{let i=o2(e.firestore);return function(e,t,n,r,i,s){let a=e.explicitOrderBy;if(i.length>a.length)throw new C(D.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);let o=[];for(let s=0;s<i.length;s++){let l=i[s];if(a[s].field.isKeyField()){if("string"!=typeof l)throw new C(D.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof l}`);if(!t2(e)&&-1!==l.indexOf("/"))throw new C(D.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${l}' contains a slash.`);let n=e.path.child(K.fromString(l));if(!j.isDocumentKey(n))throw new C(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);let i=new j(n);o.push(tf(t,i))}else{let e=ln(n,r,l);o.push(e)}}return new tS(o,s)}(e._query,e.firestore._databaseId,i,t,n,r)}}function lF(e,t,n){if("string"==typeof(n=(0,c.m9)(n))){if(""===n)throw new C(D.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!t2(t)&&-1!==n.indexOf("/"))throw new C(D.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);let r=t.path.child(K.fromString(n));if(!j.isDocumentKey(r))throw new C(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return tf(e,new j(r))}if(n instanceof ob)return tf(e,n._key);throw new C(D.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${og(n)}.`)}function lL(e,t){if(!Array.isArray(e)||0===e.length)throw new C(D.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function lV(e,t){let n=function(e,t){for(let n of e)for(let e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new C(D.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new C(D.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}class lP{convertValue(e,t="none"){switch(to(e)){case 0:return null;case 1:return e.booleanValue;case 2:return e9(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(e7(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw S()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let n={};return eW(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertGeoPoint(e){return new oH(e9(e.latitude),e9(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let n=tt(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(tn(e));default:return null}}convertTimestamp(e){let t=e6(e);return new B(t.seconds,t.nanos)}convertDocumentKey(e,t){let n=K.fromString(e);rT(n)||S();let r=new ti(n.get(1),n.get(3)),i=new j(n.popFirst(5));return r.isEqual(t)||b(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lO(e,t,n){return e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t}class lq extends lP{constructor(e){super(),this.firestore=e}convertBytes(e){return new oQ(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new ob(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lU{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class lB extends ld{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new lz(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let n=this._document.data.field(lm("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class lz extends lB{data(e={}){return super.data(e)}}class lG{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new lU(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new lz(this._firestore,this._userDataWriter,n.key,n,new lU(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new C(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{let r=new lz(e._firestore,e._userDataWriter,n.doc.key,n.doc,new lU(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let r=new lz(e._firestore,e._userDataWriter,t.doc.key,t.doc,new lU(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(s=(n=n.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return S()}}(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function lK(e,t){return e instanceof lB&&t instanceof lB?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof lG&&t instanceof lG&&e._firestore===t._firestore&&oC(e.query,t.query)&&e.metadata.isEqual(t.metadata)&&e._snapshot.isEqual(t._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l$(e){e=op(e,ob);let t=op(e.firestore,oR);return oo(oF(t),e._key).then(n=>l3(t,e,n))}class lQ extends lP{constructor(e){super(),this.firestore=e}convertBytes(e){return new oQ(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new ob(this.firestore,null,t)}}function lj(e){e=op(e,ob);let t=op(e.firestore,oR),n=oF(t),r=new lQ(t);return(function(e,t){let n=new N;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,n){try{let r=await e.persistence.runTransaction("read document","readonly",n=>e.localDocuments.getDocument(n,t));r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new C(D.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(r){let e=s8(r,`Failed to get document '${t} from cache`);n.reject(e)}})(await or(e),t,n)),n.promise})(n,e._key).then(n=>new lB(t,r,e._key,n,new lU(null!==n&&n.hasLocalMutations,!0),e.converter))}function lW(e){e=op(e,ob);let t=op(e.firestore,oR);return oo(oF(t),e._key,{source:"server"}).then(n=>l3(t,e,n))}function lH(e){e=op(e,o_);let t=op(e.firestore,oR),n=oF(t),r=new lQ(t);return lg(e._query),ol(n,e._query).then(n=>new lG(t,r,e,n))}function lY(e){e=op(e,o_);let t=op(e.firestore,oR),n=oF(t),r=new lQ(t);return(function(e,t){let n=new N;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,n){try{let r=await i7(e,t,!0),i=new am(t,r.hs),s=i.da(r.documents),a=i.applyChanges(s,!1);n.resolve(a.snapshot)}catch(r){let e=s8(r,`Failed to execute query '${t} against cache`);n.reject(e)}})(await or(e),t,n)),n.promise})(n,e._query).then(n=>new lG(t,r,e,n))}function lJ(e){e=op(e,o_);let t=op(e.firestore,oR),n=oF(t),r=new lQ(t);return ol(n,e._query,{source:"server"}).then(n=>new lG(t,r,e,n))}function lX(e,t,n){e=op(e,ob);let r=op(e.firestore,oR),i=lO(e.converter,t,n);return l4(r,[o5(o2(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,nC.none())])}function lZ(e,t,n,...r){e=op(e,ob);let i=op(e.firestore,oR),s=o2(i);return l4(i,[("string"==typeof(t=(0,c.m9)(t))||t instanceof oj?lt(s,"updateDoc",e._key,t,n,r):le(s,"updateDoc",e._key,t)).toMutation(e._key,nC.exists(!0))])}function l0(e){return l4(op(e.firestore,oR),[new nq(e._key,nC.none())])}function l1(e,t){let n=op(e.firestore,oR),r=ox(e),i=lO(e.converter,t);return l4(n,[o5(o2(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,nC.exists(!1))]).then(()=>r)}function l2(e,...t){var n,r,i;let s,a,o;e=(0,c.m9)(e);let l={includeMetadataChanges:!1,source:"default"},u=0;"object"!=typeof t[0]||ok(t[u])||(l=t[u],u++);let h={includeMetadataChanges:l.includeMetadataChanges,source:l.source};if(ok(t[u])){let e=t[u];t[u]=null===(n=e.next)||void 0===n?void 0:n.bind(e),t[u+1]=null===(r=e.error)||void 0===r?void 0:r.bind(e),t[u+2]=null===(i=e.complete)||void 0===i?void 0:i.bind(e)}if(e instanceof ob)a=op(e.firestore,oR),o=t0(e._key.path),s={next:n=>{t[u]&&t[u](l3(a,e,n))},error:t[u+1],complete:t[u+2]};else{let n=op(e,o_);a=op(n.firestore,oR),o=n._query;let r=new lQ(a);s={next:e=>{t[u]&&t[u](new lG(a,r,n,e))},error:t[u+1],complete:t[u+2]},lg(e._query)}return function(e,t,n,r){let i=new a2(r),s=new ao(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>an(await oa(e),s)),()=>{i.$a(),e.asyncQueue.enqueueAndForget(async()=>ar(await oa(e),s))}}(oF(a),o,h,s)}function l5(e,t){return function(e,t){let n=new a2(t);return e.asyncQueue.enqueueAndForget(async()=>{(await oa(e)).z_.add(n),n.next()}),()=>{n.$a(),e.asyncQueue.enqueueAndForget(async()=>(function(e,t){e.z_.delete(t)})(await oa(e),n))}}(oF(e=op(e,oR)),ok(t)?t:{next:t})}function l4(e,t){return function(e,t){let n=new N;return e.asyncQueue.enqueueAndForget(async()=>aT(await os(e),t,n)),n.promise}(oF(e),t)}function l3(e,t,n){let r=n.docs.get(t._key),i=new lQ(e);return new lB(e,i,t._key,r,new lU(n.hasPendingWrites,n.fromCache),t.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let l8={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l6{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=o2(e)}set(e,t,n){this._verifyNotCommitted();let r=l9(e,this._firestore),i=lO(r.converter,t,n),s=o5(this._dataReader,"WriteBatch.set",r._key,i,null!==r.converter,n);return this._mutations.push(s.toMutation(r._key,nC.none())),this}update(e,t,n,...r){let i;this._verifyNotCommitted();let s=l9(e,this._firestore);return i="string"==typeof(t=(0,c.m9)(t))||t instanceof oj?lt(this._dataReader,"WriteBatch.update",s._key,t,n,r):le(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(i.toMutation(s._key,nC.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=l9(e,this._firestore);return this._mutations=this._mutations.concat(new nq(t._key,nC.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new C(D.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function l9(e,t){if((e=(0,c.m9)(e)).firestore!==t)throw new C(D.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l7 extends class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=o2(e)}get(e){let t=l9(e,this._firestore),n=new lq(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return S();let r=e[0];if(r.isFoundDocument())return new ld(this._firestore,n,r.key,r,t.converter);if(r.isNoDocument())return new ld(this._firestore,n,t._key,null,t.converter);throw S()})}set(e,t,n){let r=l9(e,this._firestore),i=lO(r.converter,t,n),s=o5(this._dataReader,"Transaction.set",r._key,i,null!==r.converter,n);return this._transaction.set(r._key,s),this}update(e,t,n,...r){let i;let s=l9(e,this._firestore);return i="string"==typeof(t=(0,c.m9)(t))||t instanceof oj?lt(this._dataReader,"Transaction.update",s._key,t,n,r):le(this._dataReader,"Transaction.update",s._key,t),this._transaction.update(s._key,i),this}delete(e){let t=l9(e,this._firestore);return this._transaction.delete(t._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=l9(e,this._firestore),n=new lQ(this._firestore);return super.get(e).then(e=>new lB(this._firestore,n,t._key,e._document,new lU(!1,!1),t.converter))}}function ue(e,t,n){e=op(e,oR);let r=Object.assign(Object.assign({},l8),n);return!function(e){if(e.maxAttempts<1)throw new C(D.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(e,t,n){let r=new N;return e.asyncQueue.enqueueAndForget(async()=>{let i=await ot(e).then(e=>e.datastore);new a3(e.asyncQueue,i,n,t,r).Xa()}),r.promise}(oF(e),n=>t(new l7(e,n)),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(){return new o4("deleteField")}function un(){return new o8("serverTimestamp")}function ur(...e){return new o6("arrayUnion",e)}function ui(...e){return new o9("arrayRemove",e)}function us(e){return new o7("increment",e)}new WeakMap,function(e=!0){y=o.SDK_VERSION,(0,o._registerComponent)(new l.wA("firestore",(t,{instanceIdentifier:n,options:r})=>{let i=t.getProvider("app").getImmediate(),s=new oR(new R(t.getProvider("auth-internal")),new P(t.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new C(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ti(e.options.projectId,t)}(i,n),i);return r=Object.assign({useFetchStreams:e},r),s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),(0,o.registerVersion)(g,"4.6.3",void 0),(0,o.registerVersion)(g,"4.6.3","esm2017")}()}}]);