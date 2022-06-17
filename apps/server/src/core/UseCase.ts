export default interface UseCase<T, R> {
  execute(request: T): R | Promise<R>;
}
