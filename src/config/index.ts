export class Config {
  public static PORT = Bun.env.PORT;
  public static SECRET_KEY = Bun.env.SECRET_KEY || "secret";
}
