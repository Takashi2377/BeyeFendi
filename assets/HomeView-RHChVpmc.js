import{_ as f,r as v,o as b,c as x,b as t,d as c,w as d,t as n,F as g,g as y,e as a,p as w,h as D}from"./index-QsjaM_6j.js";var k={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"yuetin-hexschool",BASE_URL:"/FinalMission-Edtion1/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:B,VITE_PATH:H}=k,V={data(){return{products:[],user:{username:"aka05068@gmail.com",password:"Zg+1whyha"}}},methods:{getData(){const e=`${B}/api/${H}/products/all`;this.$http.get(e).then(i=>{console.log(i.data.products),this.products=i.data.products}).catch(i=>{alert(i.response.data.message)})}},mounted(){this.getData()}},s=e=>(w("data-v-3c8c3c07"),e=e(),D(),e),M={class:"position-relative"},E=s(()=>t("div",{class:"position-absolute z-n1",style:{top:"0",bottom:"0",left:"0",right:"0","background-image":"url(https://images.unsplash.com/photo-1495704907664-81f74a7efd9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)","background-position":"center center",opacity:"0.2"}},null,-1)),R={class:"container d-flex flex-column",style:{"min-height":"100vh"}},j={class:"row justify-content-center my-auto"},A={class:"col-md-4 text-center"},I=s(()=>t("h2",{class:"pb-3 title"},"The Watch Collections",-1)),T=s(()=>t("p",{class:"text-muted mb-0"},"尊崇悠久傳統，祟尚精巧工藝，助您成為更加優雅的紳士。",-1)),q={class:"container"},G={class:"row mt-5"},S=s(()=>t("h2",{class:"text-center py-2"},"Recommended Goods",-1)),C={class:"col-md-4 mt-md-4"},N={class:"card border-0 mb-4"},W=["src"],U={class:"card-body text-center"},z=s(()=>t("div",{class:"d-flex justify-content-center"},[t("p",{class:"card-text text-muted mb-0"}," 年度限量，擁抱時尚奢華魅力。 ")],-1)),L={class:"col-md-4 mt-md-4"},Z={class:"card border-0 mb-4"},F=["src"],Y={class:"card-body text-center"},$=s(()=>t("div",{class:"d-flex justify-content-center"},[t("p",{class:"card-text text-muted mb-0"}," 探險精神，上山下海無所不能。 ")],-1)),O={class:"col-md-4 mt-md-4"},P={class:"card border-0 mb-4"},K=["src"],J={class:"card-body text-center"},Q=s(()=>t("div",{class:"d-flex justify-content-center"},[t("p",{class:"card-text text-muted mb-0"}," 平價、時尚、實用，輕鬆入手。 ")],-1)),X=y('<div class="bg-light mt-7 quote" data-v-3c8c3c07><div class="container" data-v-3c8c3c07><div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-v-3c8c3c07><div class="carousel-inner" data-v-3c8c3c07><div class="carousel-item active" data-v-3c8c3c07><div class="row justify-content-center py-7" data-v-3c8c3c07><div class="col-md-6 text-center" data-v-3c8c3c07><p class="my-5 h5" data-v-3c8c3c07>“ 完美，是時間的孩子。 ”</p><p data-v-3c8c3c07><small class="text-muted" data-v-3c8c3c07>— Recep, the founder of BeyeFendi —</small></p></div></div></div></div></div></div></div>',1),tt={class:"container my-7"},st={class:"row"},et=s(()=>t("div",{class:"col-md-6"},[t("img",{src:"https://images.unsplash.com/photo-1617317376997-8748e6862c01?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"",class:"img-fluid"})],-1)),ot={class:"col-md-4 m-auto text-center"},ct=s(()=>t("h4",{class:"my-4"},"Blazer",-1)),dt=s(()=>t("p",{class:"text-muted text-start lh-lg",style:{"text-indent":"2rem"}},"Blazer系列融合了經典與時尚的設計元素，適合配戴於正式或商務場合。精選高品質的錶殼與錶帶材質， 展現出品味與品質的完美結合，讓您隨時掌握時間，展現紳士風範。",-1)),at={class:"row flex-row-reverse justify-content-between mt-4"},it=s(()=>t("div",{class:"col-md-6"},[t("img",{src:"https://images.unsplash.com/photo-1704782625031-7e26bdf2e0fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"",class:"img-fluid"})],-1)),lt={class:"col-md-4 m-auto text-center"},nt=s(()=>t("h4",{class:"my-4"},"Wild-Conqueror",-1)),rt=s(()=>t("p",{class:"text-muted text-start lh-lg",style:{"text-indent":"2rem"}},"Wild-Conqueror系列是專為潛水、戶外愛好者而設計的錶款，具有優異的防水性能和耐用性，讓您在外出探險時無憂無慮。 此系列擁有清晰的夜間顯示、計時功能等，讓您在戶外探險的過程中輕鬆掌握各項數據、享受樂趣。",-1));function ut(e,i,_t,mt,l,ht){var r,u,_,m,h,p;const o=v("RouterLink");return b(),x(g,null,[t("div",M,[E,t("div",R,[t("div",j,[t("div",A,[I,T,c(o,{type:"button",class:"btn btn-outline-dark rounded-2 mt-6",to:"/about"},{default:d(()=>[a("前往了解")]),_:1})])])])]),t("div",q,[t("div",G,[S,t("div",C,[t("div",N,[t("img",{src:(r=l.products[7])==null?void 0:r.imageUrl,class:"card-img-top rounded-0",alt:"...",height:"258"},null,8,W),t("div",U,[t("h4",null,n((u=this.products[7])==null?void 0:u.title),1),z,c(o,{type:"button",class:"btn btn-outline-dark rounded-2 mt-3",to:"/product/-NtiddYRZGHZKd2zIZme"},{default:d(()=>[a("立即選購")]),_:1})])])]),t("div",L,[t("div",Z,[t("img",{src:(_=l.products[0])==null?void 0:_.imageUrl,class:"card-img-top rounded-0",alt:"...",height:"258"},null,8,F),t("div",Y,[t("h4",null,n((m=this.products[0])==null?void 0:m.title),1),$,c(o,{type:"button",class:"btn btn-outline-dark rounded-2 mt-3",to:"/product/-NnTk5olgZotge7lBeki"},{default:d(()=>[a("立即選購")]),_:1})])])]),t("div",O,[t("div",P,[t("img",{src:(h=l.products[4])==null?void 0:h.imageUrl,class:"card-img-top rounded-0",alt:"...",height:"258"},null,8,K),t("div",J,[t("h4",null,n((p=this.products[4])==null?void 0:p.title),1),Q,c(o,{type:"button",class:"btn btn-outline-dark rounded-2 mt-3",to:"/product/-Ntib9p5dqOp-wm24bs9"},{default:d(()=>[a("立即選購")]),_:1})])])])])]),X,t("div",tt,[t("div",st,[et,t("div",ot,[ct,dt,c(o,{type:"button",class:"btn btn-outline-dark rounded-2 mt-2",to:"/products?category=Blazer"},{default:d(()=>[a("系列總覽")]),_:1})])]),t("div",at,[it,t("div",lt,[nt,rt,c(o,{type:"button",class:"btn btn-outline-dark rounded-2 mt-2",to:"/products?category=Wild-Conqueror"},{default:d(()=>[a("系列總覽")]),_:1})])])])],64)}const ft=f(V,[["render",ut],["__scopeId","data-v-3c8c3c07"]]);export{ft as default};