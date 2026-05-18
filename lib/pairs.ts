export interface PairQuestion {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  question: string;
  axis: string;
  sub: string;
  analysisA: string;
  analysisB: string;
  specimenA: string;
  specimenB: string;
}

// 14 specimen HTML blocks preserved verbatim from the pre-Next.js build.
// Each renders via iframe srcDoc in PairSpecimen.tsx so CSS stays isolated.

export const QUESTIONS: PairQuestion[] = [
  {
    id: 1,
    question: 'What do you notice first?',
    axis: 'Type hierarchy vs color zone hierarchy',
    sub: 'Same flyer, two ways to organize what you see. Pick the one your eye lands on without arguing.',
    analysisA:
      'You read structure through type. Scale and weight do the organizing — no color blocks needed.',
    analysisB:
      'You read structure through color and space. Visual zones land before any word does.',
    specimenA: `<div style="background:#FAFAF6;min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px 24px;text-align:center">
<div style="font-family:Georgia,serif;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:#9C9080;margin-bottom:14px">a curated gathering</div>
<div style="font-family:Georgia,serif;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#9C9080;margin-bottom:3px">The</div>
<div style="font-family:Georgia,serif;font-size:38px;font-weight:400;line-height:1;color:#1A1918">Maker's</div>
<div style="font-family:Georgia,serif;font-size:38px;font-weight:400;line-height:1;color:#1A1918;margin-bottom:14px">Market</div>
<div style="width:20px;height:1px;background:#C8C2B6;margin-bottom:14px"></div>
<div style="font-family:Georgia,serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#9C9080;line-height:1.9">Saturday, June 20<br>9am · Dillsburg</div>
</div>`,
    specimenB: `<div style="min-height:320px;display:flex;flex-direction:column">
<div style="background:#1C3829;padding:26px 20px 22px">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#5C8870;margin-bottom:9px">Dillsburg Town Square</div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;line-height:.92;color:#F4EFE4;letter-spacing:-.01em">THE<br>MAKER'S<br>MARKET</div>
</div>
<div style="height:3px;background:#B87333"></div>
<div style="background:#F4EFE4;padding:16px 20px;flex:1">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#2A2018;margin-bottom:4px">Saturday, June 20th</div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#6B5E4E">9am until 3pm</div>
</div>
</div>`,
  },
  {
    id: 2,
    question: 'One person or a room?',
    axis: 'Intimate vs broadcast register',
    sub: 'Same announcement, two volumes. Which one would you make?',
    analysisA: 'You speak to one person at conversational distance. Quiet, personal, close.',
    analysisB: 'You command a room. Bold, declarative, readable from across the street.',
    specimenA: `<div style="background:#F7F3EC;min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:38px 26px;text-align:center">
<div style="font-family:Georgia,serif;font-size:10px;font-style:italic;color:#A09080;margin-bottom:22px">you're invited to</div>
<div style="font-family:Georgia,serif;font-size:20px;font-weight:400;color:#2A2018;margin-bottom:4px">The Maker's Market</div>
<div style="width:16px;height:1px;background:#C4B8A8;margin:13px auto"></div>
<div style="font-family:Georgia,serif;font-size:11px;color:#2A2018;line-height:2;margin-bottom:3px">This Saturday, June 20th</div>
<div style="font-family:Georgia,serif;font-size:10px;color:#8A7E70;line-height:1.9">Nine in the morning until three<br>Dillsburg Town Square</div>
</div>`,
    specimenB: `<div style="background:#161614;min-height:320px;display:flex;flex-direction:column;justify-content:center;padding:26px 22px">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:48px;font-weight:800;line-height:.88;color:#FFF;letter-spacing:-.03em;margin-bottom:16px">MAKER'S<br>MARKET</div>
<div style="height:2px;background:#B87333;margin-bottom:14px"></div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#666">JUNE 20 · DILLSBURG · 9AM</div>
</div>`,
  },
  {
    id: 3,
    question: 'Everything or only what matters?',
    axis: 'Reduction vs accumulation',
    sub: 'One strips to the essential, one gives you the full picture. Both are correct, for different people.',
    analysisA: 'You strip until only the essential remains. Negative space is doing work.',
    analysisB: 'You give the full picture. Detail and information are generosity, not clutter.',
    specimenA: `<div style="background:#FFF;min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:50px 34px;text-align:center">
<div style="font-family:Georgia,serif;font-size:23px;font-weight:400;color:#1A1918;margin-bottom:24px;letter-spacing:-.01em">Maker's Market</div>
<div style="font-family:Georgia,serif;font-size:12px;color:#8B8478;margin-bottom:8px;letter-spacing:.04em">June 20</div>
<div style="font-family:Georgia,serif;font-size:12px;color:#8B8478;letter-spacing:.04em">Dillsburg</div>
</div>`,
    specimenB: `<div style="background:#F2EDE3;min-height:320px;display:flex;flex-direction:column;padding:20px">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:#1A1918;margin-bottom:3px">The Maker's Market</div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;color:#7A6E60;margin-bottom:11px">Handmade goods · Local food · Community</div>
<div style="height:.5px;background:#C8BFB0;margin-bottom:11px"></div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#2A2018;line-height:1.9;margin-bottom:11px">Saturday, June 20th<br>9am until 3pm<br>Dillsburg Town Square</div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#5A5248;line-height:1.7;margin-bottom:11px">Ceramics · Textiles · Woodwork<br>Plants · Preserves · Jewelry · Art</div>
<div style="height:.5px;background:#C8BFB0;margin-bottom:8px"></div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;color:#8A7E70;line-height:1.7">Free admission · All ages welcome · Rain or shine</div>
</div>`,
  },
  {
    id: 4,
    question: 'Understand or feel first?',
    axis: 'Legibility vs atmosphere',
    sub: 'Which arrives at the reader first — the facts, or the mood?',
    analysisA: 'You want instant comprehension. Maximum contrast, no mood in the way.',
    analysisB: 'You lead with feeling. The mood arrives before the facts and sets the terms.',
    specimenA: `<div style="background:#FFF;min-height:320px;display:flex;flex-direction:column;justify-content:center;padding:26px 22px">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:26px;font-weight:800;color:#000;letter-spacing:-.02em;margin-bottom:11px;line-height:1">MAKER'S<br>MARKET</div>
<div style="height:3px;background:#000;margin-bottom:11px"></div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;color:#000;margin-bottom:4px">SAT JUNE 20 · 9AM–3PM</div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#555;letter-spacing:.04em">DILLSBURG TOWN SQUARE</div>
</div>`,
    specimenB: `<div style="background:#2A1F14;min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:34px 22px;text-align:center">
<div style="font-family:Georgia,serif;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#7A6248;margin-bottom:16px">a gathering of makers</div>
<div style="font-family:Georgia,serif;font-size:21px;font-weight:400;font-style:italic;color:#C4A882;line-height:1.3;margin-bottom:16px">The Maker's<br>Market</div>
<div style="width:13px;height:1px;background:#5A4030;margin-bottom:16px"></div>
<div style="font-family:Georgia,serif;font-size:10px;color:#7A6248;letter-spacing:.1em;line-height:2">june 20 · dillsburg<br>nine until three</div>
</div>`,
  },
  {
    id: 5,
    question: 'Rules or gut?',
    axis: 'System vs expression',
    sub: 'Same content, organized by grid or organized by feel. Which one is yours?',
    analysisA: 'You trust the grid. Consistent spacing and structural logic carry the work.',
    analysisB: 'You trust your hand. Elements land by feel — energy first, formula second.',
    specimenA: `<div style="background:#F8F8F5;min-height:320px;display:flex;flex-direction:column;justify-content:flex-start;padding:24px 20px">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#888880;margin-bottom:13px">Saturday June 20</div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:21px;font-weight:700;color:#1A1A18;letter-spacing:-.01em;margin-bottom:13px;line-height:1.1">The Maker's<br>Market</div>
<div style="height:.5px;background:#D4D4C8;margin-bottom:13px"></div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#5A5A54;line-height:2">9am – 3pm<br>Dillsburg Town Square<br>Free · All welcome</div>
</div>`,
    specimenB: `<div style="background:#FAFAF6;min-height:320px;position:relative;overflow:hidden;padding:20px">
<div style="font-family:Georgia,serif;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#B0A898;position:absolute;top:24px;left:20px">The</div>
<div style="font-family:Georgia,serif;font-size:42px;font-weight:400;color:#1A1918;line-height:.9;position:absolute;top:38px;left:14px;letter-spacing:-.02em">Maker's</div>
<div style="font-family:Georgia,serif;font-size:20px;font-weight:400;color:#1A1918;position:absolute;top:106px;left:52px;letter-spacing:-.01em">Market</div>
<div style="position:absolute;bottom:34px;left:20px">
<div style="font-family:Georgia,serif;font-size:10px;color:#8B8478;line-height:2">June 20 · 9am<br>Dillsburg</div>
</div>
</div>`,
  },
  {
    id: 6,
    question: 'One thing dominates, or balanced?',
    axis: 'Scale drama vs proportion',
    sub: 'Pick the composition that feels right — one element loud, or everything in conversation.',
    analysisA: 'You let one element take the whole room. Everything else steps back on purpose.',
    analysisB: 'You compose in balance. Nothing overwhelms — the whole thing resolves together.',
    specimenA: `<div style="background:#1A1A18;min-height:320px;display:flex;flex-direction:column;justify-content:space-between;padding:20px 24px">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#555550">June</div>
<div style="font-family:Georgia,serif;font-size:92px;font-weight:400;color:#FFF;line-height:1;letter-spacing:-.04em;margin:-12px 0">20</div>
<div>
<div style="height:.5px;background:#333;margin-bottom:9px"></div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;color:#555550;letter-spacing:.12em;line-height:1.9">MAKER'S MARKET<br>DILLSBURG · 9AM–3PM</div>
</div>
</div>`,
    specimenB: `<div style="background:#F4EFE4;min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px 24px;text-align:center">
<div style="font-family:Georgia,serif;font-size:20px;font-weight:400;color:#1A1918;margin-bottom:9px">The Maker's Market</div>
<div style="width:16px;height:1px;background:#C0B8A8;margin-bottom:9px"></div>
<div style="font-family:Georgia,serif;font-size:12px;color:#5A5248;margin-bottom:5px">Saturday, June 20th</div>
<div style="font-family:Georgia,serif;font-size:12px;color:#5A5248;margin-bottom:5px">9am to 3pm</div>
<div style="font-family:Georgia,serif;font-size:12px;color:#5A5248">Dillsburg Town Square</div>
</div>`,
  },
  {
    id: 7,
    question: 'Computer or hands?',
    axis: 'Screen-born vs physically rooted',
    sub: 'One feels born inside the file. One feels like it passed through someone’s hands.',
    analysisA: 'You work in digital precision. Flat, exact, pixel-true, no material reference.',
    analysisB: 'You leave a human trace. Tactile, handmade, the analog world is in the work.',
    specimenA: `<div style="background:#FFF;min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:34px 26px;text-align:center">
<div style="width:26px;height:26px;border:1.5px solid #1A1918;border-radius:50%;margin-bottom:18px"></div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;font-weight:300;letter-spacing:.1em;color:#1A1918;text-transform:uppercase;margin-bottom:17px">Maker's Market</div>
<div style="width:100%;height:.5px;background:#EAEAEA;margin-bottom:17px"></div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;font-weight:400;letter-spacing:.16em;color:#999;text-transform:uppercase;line-height:2">June 20 · 9am–3pm<br>Dillsburg Town Square</div>
</div>`,
    specimenB: `<div style="background:#EDE4D3;min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:34px 24px;text-align:center;outline:1px solid #D4C8B0;outline-offset:-8px">
<div style="font-family:Georgia,serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#8A7A60;margin-bottom:15px">— a gathering —</div>
<div style="font-family:Georgia,serif;font-size:23px;font-weight:400;color:#2A2018;margin-bottom:4px;line-height:1.25">The Maker's<br>Market</div>
<div style="font-family:Georgia,serif;font-size:9px;font-style:italic;color:#8A7A60;margin:11px 0">Dillsburg Town Square</div>
<div style="width:34px;height:1px;background:#B0A080;margin:0 auto 11px"></div>
<div style="font-family:Georgia,serif;font-size:10px;color:#5A4E3C;line-height:1.9">Saturday the 20th of June<br>Nine in the morning until three</div>
</div>`,
  },
];
