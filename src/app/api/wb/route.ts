import { NextRequest, NextResponse } from 'next/server';

function getBasketHost(article: number): string {
  const vol = Math.floor(article / 100000);
  let basket: number;
  if (vol <= 143) basket = 1;
  else if (vol <= 287) basket = 2;
  else if (vol <= 431) basket = 3;
  else if (vol <= 719) basket = 4;
  else if (vol <= 1007) basket = 5;
  else if (vol <= 1061) basket = 6;
  else if (vol <= 1115) basket = 7;
  else if (vol <= 1169) basket = 8;
  else if (vol <= 1313) basket = 9;
  else if (vol <= 1601) basket = 10;
  else if (vol <= 1655) basket = 11;
  else if (vol <= 1919) basket = 12;
  else if (vol <= 2045) basket = 13;
  else if (vol <= 2189) basket = 14;
  else if (vol <= 2405) basket = 15;
  else if (vol <= 2621) basket = 16;
  else if (vol <= 2837) basket = 17;
  else basket = 18;
  return `https://basket-${String(basket).padStart(2, '0')}.wbbasket.ru`;
}

const WB_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'ru-RU,ru;q=0.9',
  Origin: 'https://www.wildberries.ru',
  Referer: 'https://www.wildberries.ru/',
};

export async function GET(req: NextRequest) {
  const article = req.nextUrl.searchParams.get('article');
  if (!article || !/^\d+$/.test(article)) {
    return NextResponse.json({ error: 'Укажите корректный артикул' }, { status: 400 });
  }

  const nm = parseInt(article, 10);
  const vol = Math.floor(nm / 100000);
  const part = Math.floor(nm / 1000);
  const host = getBasketHost(nm);

  const [cardRes, priceRes, feedbackRes] = await Promise.allSettled([
    fetch(`${host}/vol${vol}/part${part}/${nm}/info/ru/card.json`, { headers: WB_HEADERS }),
    fetch(`${host}/vol${vol}/part${part}/${nm}/info/price-history.json`, { headers: WB_HEADERS }),
    fetch(`https://feedbacks1.wb.ru/feedbacks/v2/${nm}`, { headers: WB_HEADERS }),
  ]);

  if (cardRes.status === 'rejected' || !cardRes.value.ok) {
    return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
  }

  const card = await cardRes.value.json();

  // Цена: последняя запись в price-history (в копейках / 100)
  let priceU = 0;
  let salePriceU = 0;
  if (priceRes.status === 'fulfilled' && priceRes.value.ok) {
    const history: { dt: number; price: { RUB: number } }[] = await priceRes.value.json();
    if (history.length > 0) {
      // Последняя = актуальная цена в копейках
      const latest = history[history.length - 1];
      salePriceU = Math.round(latest.price.RUB / 100);
      // Максимальная = оригинальная цена
      priceU = Math.round(Math.max(...history.map((h) => h.price.RUB)) / 100);
    }
  }

  // Рейтинг и отзывы
  let rating = 0;
  let feedbacks = 0;
  if (feedbackRes.status === 'fulfilled' && feedbackRes.value.ok) {
    const fb = await feedbackRes.value.json();
    rating = parseFloat(fb.valuation) || 0;
    feedbacks = fb.feedbackCount ?? 0;
  }

  const result = {
    id: nm,
    name: card.imt_name ?? '—',
    brand: card.selling?.brand_name ?? '—',
    category: card.subj_name ?? '—',
    description: (card.description as string | undefined)?.slice(0, 300) ?? '',
    priceU,
    salePriceU,
    rating,
    feedbacks,
    url: `https://www.wildberries.ru/catalog/${nm}/detail.aspx`,
  };

  return NextResponse.json(result);
}
