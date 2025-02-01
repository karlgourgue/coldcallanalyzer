"use strict";(()=>{var e={};e.id=516,e.ids=[516],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},2079:e=>{e.exports=import("openai")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},8960:(e,t,n)=>{n.a(e,async(e,r)=>{try{n.r(t),n.d(t,{config:()=>d,default:()=>c,routeModule:()=>p});var a=n(1802),i=n(7153),o=n(6249),s=n(8298),l=e([s]);s=(l.then?(await l)():l)[0];let c=(0,o.l)(s,"default"),d=(0,o.l)(s,"config"),p=new a.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/analyze",pathname:"/api/analyze",bundlePath:"",filename:""},userland:s});r()}catch(e){r(e)}})},3960:(e,t,n)=>{n.d(t,{Z:()=>a});let r={OPENAI_API_KEY:process.env.OPENAI_API_KEY,NODE_ENV:"production"};if(!r.OPENAI_API_KEY)throw Error("OPENAI_API_KEY is required");let a=r},8298:(e,t,n)=>{n.a(e,async(e,r)=>{try{n.r(t),n.d(t,{default:()=>l});var a=n(2079),i=n(3960),o=n(152),s=e([a]);a=(s.then?(await s)():s)[0],console.log("Initializing OpenAI client with key:",i.Z.OPENAI_API_KEY?.slice(0,10)+"...");let c=new a.default({apiKey:i.Z.OPENAI_API_KEY}),d=`Analyze the following cold call transcript and provide a structured assessment based on the framework from Cold Calling Sucks (And That's Why It Works) by Armand Farrokh and Nick Cegelski. 

Context: The caller represents Opus Training, a mobile-first learning management system (LMS) designed for deskless workers in industries like hospitality, retail, and manufacturing. Opus Training helps businesses streamline onboarding, upskill employees, and ensure compliance through bite-sized, easy-to-access training modules delivered directly to workers' phones. The platform emphasizes simplicity, speed, and real-time tracking to meet the unique needs of frontline teams, driving productivity and reducing turnover.

Break down the analysis into the following sections. For each section, start with "SCORE: X" on its own line where X is the score out of 10:

1. Overall Score & Summary
SCORE: X
• Brief summary of the call's strengths and weaknesses in 2-3 sentences.

2. Opener Analysis
SCORE: X
• Did the rep establish context and credibility quickly?
• Was the opening question engaging, or did it lead to immediate resistance?
• Suggest a stronger alternative opener if needed.

3. Problem Proposition
SCORE: X
• Did the rep introduce a compelling problem that resonates with the prospect?
• Was the problem framed in a way that made the solution feel necessary and urgent?
• Provide a more effective problem proposition statement if applicable.

4. Objection Handling
SCORE: X
• Did the rep acknowledge, explore, and reframe objections effectively?
• Were objections handled with curiosity and control, or did the conversation stall?
• Suggest a better response framework for any missed objections.

5. Engagement & Flow
SCORE: X
• Did the prospect actively engage, or did they shut down quickly?
• Were there moments of rapport-building or did the call feel transactional?
• Recommend ways to make the call more conversational and prospect-driven.

6. Closing & Next Steps
SCORE: X
• Did the rep secure a clear next step (e.g., meeting, follow-up, interest confirmation)?
• Was there a sense of urgency and value in the ask?
• Suggest a stronger closing statement if needed.

7. Actionable Takeaways
• Provide three concise recommendations the rep can implement immediately.
• Offer one alternative script example for a key section that needs improvement.

Be direct, tactical, and specific. Focus on actionable feedback rather than generic advice. The caller's name is Karl, and you should refer to him as Karl and you in your notes. When suggesting alternatives, make sure they specifically reference Opus Training's unique value propositions around mobile-first learning, bite-sized modules, and real-time tracking for frontline teams.

Format your response with clear section headings and bullet points for easy parsing. Remember to start each scored section with "SCORE: X" on its own line.`;async function l(e,t){if("POST"!==e.method)return t.status(405).json({success:!1,error:"Method not allowed"});let{transcription:n}=e.body;if(!n)return t.status(400).json({success:!1,error:"Missing transcription in request body"});try{var r;console.log("Starting analysis with GPT-4...");let e=await c.chat.completions.create({model:"gpt-4",messages:[{role:"system",content:d},{role:"user",content:`Please analyze this cold call transcription:

${n}`}],temperature:.7}),a=e.choices[0]?.message?.content;if(!a)throw Error("No analysis generated");console.log("Analysis complete. Parsing feedback...");let i=(0,o.r)(a,"1. Overall Score","2."),s=(0,o.r)(a,"2. Opener Analysis","3."),l=(0,o.r)(a,"3. Problem Proposition","4."),p=(0,o.r)(a,"4. Objection Handling","5."),m=(0,o.r)(a,"5. Engagement & Flow","6."),u=(0,o.r)(a,"6. Closing & Next Steps","7."),g=(0,o.r)(a,"7. Actionable Takeaways"),h={overallScore:(r={overallScore:{...(0,o.h)(i,!0),summary:i},openerAnalysis:{...(0,o.h)(s),alternativeOpener:(0,o.h)(s).alternative},problemProposition:{...(0,o.h)(l),alternativeProposition:(0,o.h)(l).alternative},objectionHandling:{...(0,o.h)(p),alternativeFramework:(0,o.h)(p).alternative},engagementAndFlow:{...(0,o.h)(m),recommendations:(0,o.h)(m).feedback},closingAndNextSteps:{...(0,o.h)(u),alternativeClosing:(0,o.h)(u).alternative},actionableTakeaways:{improvements:(0,o.h)(g,!1).feedback,scriptExample:(0,o.r)(g,"Example Script:")}}).overallScore.score||0,summary:r.overallScore.summary,sections:{opener:{score:r.openerAnalysis.score||0,feedback:r.openerAnalysis.feedback,improvement:r.openerAnalysis.alternativeOpener},problemProposition:{score:r.problemProposition.score||0,feedback:r.problemProposition.feedback,improvement:r.problemProposition.alternativeProposition},objectionHandling:{score:r.objectionHandling.score||0,feedback:r.objectionHandling.feedback,improvement:r.objectionHandling.alternativeFramework},engagementAndFlow:{score:r.engagementAndFlow.score||0,feedback:r.engagementAndFlow.recommendations},closingAndNextSteps:{score:r.closingAndNextSteps.score||0,feedback:r.closingAndNextSteps.feedback,improvement:r.closingAndNextSteps.alternativeClosing}},actionableTakeaways:{quickWins:r.actionableTakeaways.improvements,scriptExample:r.actionableTakeaways.scriptExample}};return t.status(200).json({success:!0,data:{analysis:h}})}catch(e){return console.error("Analysis error:",e),t.status(500).json({success:!1,error:"Failed to analyze call"})}}r()}catch(e){r(e)}})},152:(e,t,n)=>{function r(e,t,n){let r=e.indexOf(t);if(-1===r)return"";let a=r+t.length,i=n?e.indexOf(n,a):e.length;return -1===i?e.slice(a).trim():e.slice(a,i).trim()}function a(e,t=!0){let n={feedback:[]};if(t){let t=e.match(/SCORE:\s*(\d+(?:\.\d+)?)/);t&&(n.score=parseFloat(t[1]))}let r=e.match(/•[^\n]+/g)||[];for(let t of(n.feedback=r.map(e=>e.replace("•","").trim()),["Suggested alternative:","Alternative opener:","Alternative framework:","Alternative closing:","Better approach:","Suggestion:"])){let r=e.indexOf(t);if(-1!==r){let a=r+t.length,i=e.indexOf("\n",a);n.alternative=e.slice(a,-1===i?void 0:i).trim();break}}return n}n.d(t,{h:()=>a,r:()=>r})},7153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},1802:(e,t,n)=>{e.exports=n(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var n=t(t.s=8960);module.exports=n})();