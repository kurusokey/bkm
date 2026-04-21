interface OrderNotificationInput {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerMessage?: string;
  items: Array<{ name: string; quantity: number; unitPriceCents: number }>;
  totalCents: number;
}

const euro = (cents: number) => `${(cents / 100).toFixed(2)} €`;
const escapeMd = (text: string) =>
  text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');

export async function sendOrderTelegramNotification(input: OrderNotificationInput) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID non configuré');
    return;
  }

  const shortRef = input.orderId.slice(0, 8).toUpperCase();
  const itemsLines = input.items
    .map((it) => `• ${escapeMd(it.name)} × ${it.quantity} — ${escapeMd(euro(it.unitPriceCents * it.quantity))}`)
    .join('\n');

  const text = [
    `🍹 *Nouvelle commande* \\#${shortRef}`,
    '',
    `👤 ${escapeMd(input.customerName)}`,
    `✉️ ${escapeMd(input.customerEmail)}`,
    ...(input.customerMessage
      ? ['', `💬 _${escapeMd(input.customerMessage)}_`]
      : []),
    '',
    itemsLines,
    '',
    `💰 *Total : ${escapeMd(euro(input.totalCents))}*`,
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'MarkdownV2',
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API ${response.status}: ${body}`);
  }
}
