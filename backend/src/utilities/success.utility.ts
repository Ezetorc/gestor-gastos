export function success(value: any, message?: string) {
  return message ? { message, userId: value } : { value };
}
