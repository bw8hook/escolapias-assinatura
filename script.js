/* ============================================================
   ESCOLAS ESCOLÁPIAS — Gerador de Assinatura de E-mail
   script.js
   ============================================================ */

const SCHOOLS = {
  'madre-paula': {
    bg:    'assets/fundos/madre-paula.png',
    label: 'Colégio Madre Paula Montal Escolápias'
  },
  'sao-jose': {
    bg:    'assets/fundos/sao-jose.png',
    label: 'Colégio São José Escolápias'
  }
};

/* ─── Helpers ──────────────────────────────────────────────── */

function setRow(rowId, spanId, value, show) {
  document.getElementById(spanId).textContent = value;
  document.getElementById(rowId).style.display = (show && value) ? '' : 'none';
}

function showToast(msg, bg, border, color) {
  const t = document.getElementById('toast');
  t.textContent       = msg    || '✅ Copiado!';
  t.style.background  = bg     || '#1e3a2f';
  t.style.borderColor = border || '#2d6a4f';
  t.style.color       = color  || '#52b788';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

function requireSchool() {
  if (!document.getElementById('in-escola').value) {
    showToast('⚠️ Selecione uma escola primeiro!', '#3a1e1e', '#6a2d2d', '#f88888');
    return false;
  }
  return true;
}

/* ─── Toggle campo via checkbox ────────────────────────────── */
function toggleField(fieldId, cb) {
  document.getElementById(fieldId).classList.toggle('field-hidden', !cb.checked);
  updatePreview();
}

/* ─── Preview ───────────────────────────────────────────────── */
function updatePreview() {
  const escola = document.getElementById('in-escola').value;
  const nome   = document.getElementById('in-nome').value.trim();
  const cargo  = document.getElementById('in-cargo').value.trim();
  const tel    = document.getElementById('in-tel').value.trim();
  const whats  = document.getElementById('in-whats').value.trim();
  const email  = document.getElementById('in-email').value.trim();
  const end    = document.getElementById('in-end').value.trim();
  const web    = document.getElementById('in-web').value.trim();
  const fb     = document.getElementById('in-fb').value.trim();
  const ig     = document.getElementById('in-ig').value.trim();
  const globe  = document.getElementById('in-globe').value.trim();

  const showNome    = document.getElementById('cb-nome').checked;
  const showCargo   = document.getElementById('cb-cargo').checked;
  const showTel     = document.getElementById('cb-tel').checked;
  const showWhats   = document.getElementById('cb-whats').checked;
  const showEmail   = document.getElementById('cb-email').checked;
  const showEnd     = document.getElementById('cb-end').checked;
  const showWeb     = document.getElementById('cb-web').checked;
  const showSocial  = document.getElementById('cb-social').checked;
  const showDivider = document.getElementById('cb-divider').checked;

  /* Nome e Cargo */
  const nameEl = document.getElementById('sig-name');
  nameEl.textContent   = nome || 'Nome Completo';
  nameEl.style.display = showNome ? '' : 'none';

  const roleEl = document.getElementById('sig-role');
  roleEl.textContent   = cargo || 'Cargo / Função';
  roleEl.style.display = showCargo ? '' : 'none';

  /* Linhas de contato */
  setRow('sig-tel-row',   'sig-tel-text',   tel,   showTel);
  setRow('sig-whats-row', 'sig-whats-text', whats, showWhats);
  setRow('sig-email-row', 'sig-email-text', email, showEmail);
  setRow('sig-end-row',   'sig-end-text',   end,   showEnd);
  setRow('sig-web-row',   'sig-web-text',   web,   showWeb);

  /* Fundo da escola */
  const sigBg = document.getElementById('sig-bg');
  if (escola && SCHOOLS[escola]) {
    sigBg.style.backgroundImage    = `url('${SCHOOLS[escola].bg}')`;
    sigBg.style.backgroundSize     = 'cover';
    sigBg.style.backgroundPosition = 'center';
  } else {
    sigBg.style.backgroundImage = 'none';
  }

  /* Barra divisória */
  document.getElementById('sig-divider').style.display = showDivider ? '' : 'none';

  /* Coluna direita: só aparece se tiver redes ou divisor ativo */
  const sigRight = document.getElementById('sig-right');
  sigRight.style.display = showSocial ? '' : 'none';

  /* Redes sociais */
  const socFb    = document.getElementById('soc-fb');
  const socIg    = document.getElementById('soc-ig');
  const socGlobe = document.getElementById('soc-globe');

  socFb.style.display    = fb    ? '' : 'none';  socFb.href    = fb    || '#';
  socIg.style.display    = ig    ? '' : 'none';  socIg.href    = ig    || '#';
  socGlobe.style.display = globe ? '' : 'none';  socGlobe.href = globe || '#';
}

/* ─── Geração do HTML exportado ─────────────────────────────── */
function getSignatureHTML() {
  const escola = document.getElementById('in-escola').value;
  const nome   = document.getElementById('in-nome').value.trim()  || 'Nome Completo';
  const cargo  = document.getElementById('in-cargo').value.trim() || 'Cargo / Função';
  const tel    = document.getElementById('in-tel').value.trim();
  const whats  = document.getElementById('in-whats').value.trim();
  const email  = document.getElementById('in-email').value.trim();
  const end    = document.getElementById('in-end').value.trim();
  const web    = document.getElementById('in-web').value.trim();
  const fb     = document.getElementById('in-fb').value.trim();
  const ig     = document.getElementById('in-ig').value.trim();
  const globe  = document.getElementById('in-globe').value.trim();

  const showNome    = document.getElementById('cb-nome').checked;
  const showCargo   = document.getElementById('cb-cargo').checked;
  const showTel     = document.getElementById('cb-tel').checked;
  const showWhats   = document.getElementById('cb-whats').checked;
  const showEmail   = document.getElementById('cb-email').checked;
  const showEnd     = document.getElementById('cb-end').checked;
  const showWeb     = document.getElementById('cb-web').checked;
  const showSocial  = document.getElementById('cb-social').checked;
  const showDivider = document.getElementById('cb-divider').checked;

  const bgSrc   = (escola && SCHOOLS[escola]) ? SCHOOLS[escola].bg : '';
  const bgStyle = bgSrc
    ? `background:url('${bgSrc}') center/cover no-repeat;`
    : 'background:#1a3a6b;';

  const overlay  = 'background:rgba(5,20,60,0.35);';
  const csContact = 'padding:2px 0;font-size:13px;color:rgba(255,255,255,0.9);';

  let rows = '';
  if (showTel   && tel)   rows += `<tr><td style="${csContact}">&#128222;&nbsp;${tel}</td></tr>`;
  if (showWhats && whats) rows += `<tr><td style="${csContact}">&#128242;&nbsp;${whats}</td></tr>`;
  if (showEmail && email) rows += `<tr><td style="${csContact}">&#9993;&nbsp;${email}</td></tr>`;
  if (showEnd   && end)   rows += `<tr><td style="${csContact}">&#128205;&nbsp;${end}</td></tr>`;
  if (showWeb   && web)   rows += `<tr><td style="${csContact}">&#127760;&nbsp;${web}</td></tr>`;

  const csSoc = 'display:inline-block;width:28px;height:28px;background:rgba(255,255,255,0.2);border-radius:6px;text-align:center;line-height:28px;color:#fff;text-decoration:none;font-size:13px;margin:0 3px;';
  let socials = '';
  if (showSocial) {
    if (globe) socials += `<a href="${globe}" style="${csSoc}">&#127760;</a>`;
    if (fb)    socials += `<a href="${fb}"    style="${csSoc}">f</a>`;
    if (ig)    socials += `<a href="${ig}"    style="${csSoc}">&#128247;</a>`;
  }

  /* Coluna do divisor + coluna direita só se necessário */
  const dividerCol = showDivider
    ? `<td style="width:1px;padding:40px 0;${overlay}"><div style="width:1px;height:220px;background:rgba(201,168,76,0.6);"></div></td>`
    : '';

  const rightCol = socials
    ? `<td style="padding:32px 40px;vertical-align:middle;text-align:center;${overlay}">${socials}</td>`
    : '';

  return `<table cellpadding="0" cellspacing="0" border="0" style="width:900px;height:300px;${bgStyle}border-radius:12px;font-family:Roboto,Arial,sans-serif;">
  <tr>
    <td style="padding:32px 50px;vertical-align:middle;${overlay}">
      ${showNome  ? `<div style="font-size:36px;font-weight:800;line-height:110%;color:#ffffff;margin-bottom:4px;">${nome}</div>` : ''}
      ${showCargo ? `<div style="font-size:16px;font-weight:500;color:#F0D080;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:14px;">${cargo}</div>` : ''}
      <table cellpadding="0" cellspacing="0" border="0">${rows}</table>
    </td>
    ${dividerCol}
    ${rightCol}
  </tr>
</table>`;
}

/* ─── Ações ─────────────────────────────────────────────────── */
function copyHTML() {
  if (!requireSchool()) return;
  navigator.clipboard.writeText(getSignatureHTML()).then(() => {
    showToast('📋 HTML copiado! Cole no campo de assinatura do seu e-mail.');
  });
}

function copySignature() {
  if (!requireSchool()) return;
  const html = getSignatureHTML();
  try {
    const blob = new Blob([html], { type: 'text/html' });
    navigator.clipboard.write([new ClipboardItem({ 'text/html': blob })]).then(() => {
      showToast('✅ Assinatura copiada! Cole diretamente no cliente de e-mail.');
    });
  } catch {
    navigator.clipboard.writeText(html).then(() => showToast('📋 HTML copiado.'));
  }
}

function downloadPNG() {
  html2canvas(document.getElementById('signature-preview'), {
    scale: 2, useCORS: true, allowTaint: true
  }).then(canvas => {
    const a = document.createElement('a');
    a.download = 'assinatura-escolapias-' + escola + '.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });
}

/* ─── Init ──────────────────────────────────────────────────── */
updatePreview();