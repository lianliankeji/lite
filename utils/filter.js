export function mapTranstype(num) {
  switch(num) {
    case "0":
      return "转账"
    case "1":
      return "支持"
    case "2":
      return "交易"
    default:
      return "交易"
  }
}