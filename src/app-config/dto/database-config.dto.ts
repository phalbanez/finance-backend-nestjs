export abstract class DatabaseConfigDto {
  type: string;
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}
