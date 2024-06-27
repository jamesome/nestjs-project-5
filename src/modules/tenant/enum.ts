export enum StockStatus {
  NORMAL = 'normal', // 정상
  ABNORMAL = 'abnormal', // 비정상
  DISPOSED = 'disposed', // 폐기
}

export enum Category {
  INCOMING = 'incoming', // 입고
  OUTGOING = 'outgoing', // 출고
  MOVEMENT = 'movement', // 이동
}

export enum InputType {
  WEB_INCOMING = 'Web > 입고',
  WEB_LOCATION_MOVEMENT = 'Web > 로케이션 이동',
}
