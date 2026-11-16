const formatter = new Intl.NumberFormat("ru-RU");

export function formatPrice(price: number | null) {
  return price === null ? "Стоимость по запросу" : `от ${formatter.format(price)} ₽`;
}
