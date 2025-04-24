export interface ICommand<T = {[key: string]: any}> {
  execute(args: T): Promise<boolean>;
}
