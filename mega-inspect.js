(() => {
  const head = document.querySelector('.collections-mega-head');
  if (!head) return 'no head';
  const mega = head.closest('.collections-mega');
  mega.style.setProperty('display', 'block', 'important');
  mega.style.setProperty('visibility', 'visible', 'important');
  head.style.outline = '3px solid #f44336';
  head.style.outlineOffset = '2px';
  head.style.background = 'rgba(244, 67, 54, 0.10)';

  const kicker = head.querySelector('.collections-mega-kicker');
  const title = head.querySelector('.collections-mega-title');
  const cs = (el) => getComputedStyle(el);
  const H = cs(head), K = cs(kicker), T = cs(title);

  const row = (k, v, warn) =>
    `<div style="display:flex;justify-content:space-between;padding:2px 8px;border-bottom:1px solid #333;"><span style="color:#9cdcfe">${k}</span><span style="color:${warn ? '#f48771' : '#ce9178'}">${v}</span></div>`;

  const panel = document.createElement('div');
  panel.id = 'devtools-inspector';
  panel.style.cssText = 'position:fixed;left:12px;bottom:12px;width:640px;z-index:2147483647;background:#202124;color:#e8eaed;font:12px/1.5 Consolas,Menlo,monospace;border:1px solid #5f6368;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,.6);overflow:hidden;';

  panel.innerHTML = `
    <div style="display:flex;gap:2px;background:#292a2d;padding:6px 8px 0;">
      <span style="padding:4px 12px;color:#9aa0a6">Elements</span>
      <span style="padding:4px 12px;color:#9aa0a6">Styles</span>
      <span style="padding:4px 12px;background:#202124;border:1px solid #5f6368;border-bottom:none;border-radius:6px 6px 0 0;color:#e8eaed;font-weight:bold;">Computed</span>
    </div>
    <div style="padding:10px 12px;">
      <div style="color:#f48771;font-weight:bold;margin-bottom:6px;font-size:12px;">Elements Panel — 选中节点: div.collections-mega-head</div>
      <div style="background:#292a2d;border-radius:4px;padding:8px 10px;white-space:pre-wrap;line-height:1.6;">&lt;<span style="color:#569cd6">div</span> <span style="color:#9cdcfe">class</span>=<span style="color:#ce9178">"collections-mega-head"</span>&gt;   <span style="color:#f48771;background:rgba(244,67,54,.15);padding:0 4px;">← 选中 (computed display: block)</span>
  &lt;<span style="color:#569cd6">span</span> <span style="color:#9cdcfe">class</span>=<span style="color:#ce9178">"collections-mega-kicker"</span>&gt;Wholesale&lt;/<span style="color:#569cd6">span</span>&gt;
  &lt;<span style="color:#569cd6">span</span> <span style="color:#9cdcfe">class</span>=<span style="color:#ce9178">"collections-mega-title"</span>&gt;Customizable Foundations…&lt;/<span style="color:#569cd6">span</span>&gt;
&lt;/<span style="color:#569cd6">div</span>&gt;</div>
      <div style="color:#f48771;font-weight:bold;margin:10px 0 6px;font-size:12px;">Computed Tab — div.collections-mega-head（父容器）</div>
      <div style="background:#292a2d;border-radius:4px;overflow:hidden;">
        ${row('display', H.display, H.display === 'flex')}
        ${row('position', H.position)}
        ${row('flex-direction', H.flexDirection, H.flexDirection === 'column')}
        ${row('align-items', H.alignItems)}
        ${row('gap', H.gap)}
        ${row('float', H.float)}
      </div>
      <div style="color:#f48771;font-weight:bold;margin:10px 0 6px;font-size:12px;">Computed Tab — 子元素（kicker / title）</div>
      <div style="background:#292a2d;border-radius:4px;overflow:hidden;">
        ${row('span.collections-mega-kicker → display', K.display)}
        ${row('span.collections-mega-kicker → position', K.position + ' / float: ' + K.float + ' / margin: ' + K.margin)}
        ${row('span.collections-mega-title → display', T.display)}
        ${row('span.collections-mega-title → position', T.position + ' / float: ' + T.float + ' / margin: ' + T.margin)}
      </div>
      <div style="margin-top:10px;padding:8px 10px;background:rgba(244,67,54,.12);border:1px solid #f48771;border-radius:4px;color:#f48771;font-weight:bold;">
        ❌ 根因：.collections-mega-head 规则只有 flex-direction:column / align-items:flex-start / gap:6px，<u>缺少 display:flex</u> → computed display = block，flex 属性全部失效；kicker/title 保持 inline 排成一行。
      </div>
    </div>`;
  document.body.appendChild(panel);
  return { injected: true, headDisplay: H.display, kickerDisplay: K.display, titleDisplay: T.display, megaPos: cs(mega).position };
})()