import { Resend } from 'resend';

export interface OrderEmailItem {
  name: string;
  quantity: number;
  unitPriceCents: number;
}

interface SendOrderEmailsInput {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerMessage?: string;
  items: OrderEmailItem[];
  totalCents: number;
}

const euro = (cents: number) => `${(cents / 100).toFixed(2)} €`;

const adminRecipient = process.env.ORDER_ADMIN_EMAIL ?? 'kurusokey@gmail.com';
const fromAddress = process.env.RESEND_FROM ?? 'Bô Kay Mwen <commandes@laroutedurhum.com>';

function buildItemRows(items: OrderEmailItem[]) {
  return items
    .map(
      (it) => `
        <tr>
          <td style="padding:12px 8px;border-bottom:1px solid rgba(200,162,77,0.15);color:#e8e0d0;">${it.name}</td>
          <td style="padding:12px 8px;border-bottom:1px solid rgba(200,162,77,0.15);text-align:center;color:rgba(232,224,208,0.7);">${it.quantity}</td>
          <td style="padding:12px 8px;border-bottom:1px solid rgba(200,162,77,0.15);text-align:right;color:rgba(232,224,208,0.7);">${euro(it.unitPriceCents)}</td>
          <td style="padding:12px 8px;border-bottom:1px solid rgba(200,162,77,0.15);text-align:right;color:#C8A24D;font-weight:600;">${euro(it.unitPriceCents * it.quantity)}</td>
        </tr>`,
    )
    .join('');
}

const emailShell = (inner: string) => `
  <div style="font-family:Georgia,'Cormorant Garamond',serif;max-width:640px;margin:0 auto;padding:40px 32px;background:#060e07;color:#e8e0d0;border-radius:16px;border:1px solid rgba(200,162,77,0.2);">
    <div style="text-align:center;margin-bottom:32px;">
      <p style="color:#C8A24D;font-size:11px;letter-spacing:0.38em;text-transform:uppercase;margin:0 0 8px;opacity:0.7;">Bô Kay Mwen</p>
      <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(200,162,77,0.4),transparent);"></div>
    </div>
    ${inner}
    <div style="margin-top:40px;padding-top:24px;border-top:1px solid rgba(200,162,77,0.15);text-align:center;">
      <p style="font-size:10px;color:rgba(232,224,208,0.3);line-height:1.6;">L'abus d'alcool est dangereux pour la santé.<br>À consommer avec modération.</p>
    </div>
  </div>
`;

export async function sendOrderEmails(input: SendOrderEmailsInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(apiKey);
  const rows = buildItemRows(input.items);
  const shortRef = input.orderId.slice(0, 8).toUpperCase();

  const tableHtml = `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;background:rgba(200,162,77,0.04);">
      <thead>
        <tr>
          <th style="padding:10px 8px;text-align:left;border-bottom:2px solid rgba(200,162,77,0.35);color:#C8A24D;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:normal;">Produit</th>
          <th style="padding:10px 8px;text-align:center;border-bottom:2px solid rgba(200,162,77,0.35);color:#C8A24D;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:normal;">Qté</th>
          <th style="padding:10px 8px;text-align:right;border-bottom:2px solid rgba(200,162,77,0.35);color:#C8A24D;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:normal;">Prix</th>
          <th style="padding:10px 8px;text-align:right;border-bottom:2px solid rgba(200,162,77,0.35);color:#C8A24D;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:normal;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding:16px 8px;text-align:right;color:#e8e0d0;font-size:14px;">Total</td>
          <td style="padding:16px 8px;text-align:right;color:#C8A24D;font-size:18px;font-weight:bold;">${euro(input.totalCents)}</td>
        </tr>
      </tfoot>
    </table>
  `;

  const adminInner = `
    <h1 style="font-family:Georgia,serif;color:#C8A24D;font-size:24px;margin:0 0 8px;text-align:center;font-weight:normal;letter-spacing:0.05em;">Nouvelle commande #${shortRef}</h1>
    <p style="text-align:center;color:rgba(232,224,208,0.5);font-style:italic;margin:0 0 32px;">Reçue le ${new Date().toLocaleString('fr-FR')}</p>

    <h2 style="color:#C8A24D;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;border-bottom:1px solid rgba(200,162,77,0.15);padding-bottom:8px;margin:24px 0 16px;font-weight:normal;">Client</h2>
    <p style="margin:6px 0;color:#e8e0d0;"><strong style="color:#C8A24D;">Nom :</strong> ${input.customerName}</p>
    <p style="margin:6px 0;color:#e8e0d0;"><strong style="color:#C8A24D;">Email :</strong> <a href="mailto:${input.customerEmail}" style="color:#C8A24D;text-decoration:none;">${input.customerEmail}</a></p>
    <p style="margin:6px 0;color:#e8e0d0;"><strong style="color:#C8A24D;">Adresse :</strong><br><span style="color:rgba(232,224,208,0.8);line-height:1.6;">${input.customerAddress.replace(/\n/g, '<br>')}</span></p>
    ${input.customerMessage ? `<p style="margin:16px 0 6px;color:#e8e0d0;"><strong style="color:#C8A24D;">Message :</strong><br><em style="color:rgba(232,224,208,0.7);">${input.customerMessage.replace(/\n/g, '<br>')}</em></p>` : ''}

    <h2 style="color:#C8A24D;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;border-bottom:1px solid rgba(200,162,77,0.15);padding-bottom:8px;margin:32px 0 16px;font-weight:normal;">Commande</h2>
    ${tableHtml}

    <p style="font-size:11px;color:rgba(232,224,208,0.3);margin-top:32px;text-align:center;">
      Réf complète : <code style="color:rgba(200,162,77,0.5);">${input.orderId}</code>
    </p>
  `;

  const customerInner = `
    <div style="text-align:center;margin-bottom:32px;">
      <svg width="56" height="56" viewBox="0 0 64 64" fill="none" style="display:inline-block;">
        <circle cx="32" cy="32" r="30" stroke="#C8A24D" stroke-width="1.5" fill="rgba(200,162,77,0.06)"></circle>
        <path d="M20 32 L28 40 L44 24" stroke="#C8A24D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
      </svg>
    </div>

    <p style="text-align:center;color:rgba(200,162,77,0.6);font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 12px;">Commande bien reçue</p>
    <h1 style="font-family:Georgia,serif;color:#C8A24D;font-size:28px;margin:0 0 8px;text-align:center;font-weight:normal;letter-spacing:0.03em;">Mèsi anpil, ${input.customerName} !</h1>
    <p style="text-align:center;color:rgba(232,224,208,0.6);font-style:italic;margin:0 0 32px;">Votre commande a bien été enregistrée</p>

    ${tableHtml}

    <div style="background:rgba(42,124,123,0.08);border:1px solid rgba(42,124,123,0.25);border-radius:8px;padding:20px 24px;margin-top:32px;">
      <p style="margin:0 0 8px;color:#C8A24D;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;">Prochaine étape</p>
      <p style="margin:0;color:rgba(232,224,208,0.8);line-height:1.7;font-size:14px;">
        Nous vous recontactons par email dans les 24-48h pour confirmer la disponibilité,
        organiser le paiement (virement, chèque ou espèces) et la livraison de votre punch.
      </p>
    </div>

    <p style="text-align:center;font-size:11px;color:rgba(232,224,208,0.35);margin-top:32px;">
      Référence&nbsp;: <span style="color:#C8A24D;font-family:monospace;">#${shortRef}</span>
    </p>
  `;

  const [adminRes, customerRes] = await Promise.all([
    resend.emails.send({
      from: fromAddress,
      to: adminRecipient,
      replyTo: input.customerEmail,
      subject: `[Bô Kay Mwen] Nouvelle commande #${shortRef} — ${euro(input.totalCents)}`,
      html: emailShell(adminInner),
    }),
    resend.emails.send({
      from: fromAddress,
      to: input.customerEmail,
      subject: `Bô Kay Mwen — Confirmation de votre commande #${shortRef}`,
      html: emailShell(customerInner),
    }),
  ]);

  return { adminRes, customerRes };
}
