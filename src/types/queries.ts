import { User } from '../users/entities/user.entity';

export type TUserSearchQuery = { [keys in keyof User]?: User[keys] };
